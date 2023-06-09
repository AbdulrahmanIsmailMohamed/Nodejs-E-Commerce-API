"use strict";

const path = require('path')

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require('compression');
const Csrf = require("csrf");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const hpp = require('hpp');
const mongoSanitize = require("express-mongo-sanitize");
const xss = require('xss-clean');
const helmet = require("helmet");

require("dotenv").config();

const { createWebhookCheckout } = require("./src/controllers/order.controller")
const errorHandling = require("./src/middlewares/errorHandling");
const APIError = require("./src/util/APIError");

// db
require("./src/config/connect");

// routes
const mounter = require('./src/routes');

const app = express();
const api = process.env.API;

// cors => allow other domains to access your routes
app.use(cors());
app.options('*', cors()); // include before other routes

// compression all responses
app.use(compression());

// Add various HTTP headers
app.use(helmet())

// webhook
app.post(
    `${api}/webhook-checkout`,
    express.raw({ type: 'application/json' }),
    createWebhookCheckout
);

// middleware
app.use(express.urlencoded({ extended: false, limit: "20kb" }));
app.use(express.json({ limit: "20kb" }));
app.use(`${api}`, express.static(path.join(__dirname, './src/uploads')));

// morgan to log any request
if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line global-require
    const logger = require('./logger');
    app.use(morgan("tiny", { stream: logger.stream }));
    console.log(`mode: ${process.env.NODE_ENV}`);
}

// to apply data senitization 
app.use(mongoSanitize());
app.use(xss())

// Store Session in mongodb
const store = new MongoDBStore({
    uri: process.env.MONGO_URL,
    collection: 'mySessions'
});

// Catch errors from store session
store.on('error', (error) => {
    console.log(error);
});

// CSRF
const tokens = new Csrf();
app.use(session({
    secret: process.env.CSRF_SEC,
    resave: false,
    saveUninitialized: false,
    store
}));
app.use((req, res, next) => {
    if (!req.session.csrfSecret) {
        req.session.csrfSecret = tokens.secretSync();
    }
    res.locals._csrf = tokens.create(req.session.csrfSecret);
    next();
});

// session
app.use(session({
    secret: process.env.SESSION_SEC,
    name: "my-session-cookie",
    cookie: { secure: true, httpOnly: true, path: '/auth', sameSite: true },
    resave: false,
    saveUninitialized: false,
    store
}));

// Middleware to protect against HTTP Parameter Pollution attacks
app.use(
    hpp({
        whitelist: [
            "quantity",
            "sold",
            "price",
            "ratingsQuantity",
            "ratingsAverage",
            "images"
        ]
    })
);

app.get(`/`, (req, res, next) => {
    res.redirect(`${api}/products`)
})

// routes
mounter(app, api);

app.all('*', (req, res, next) => {
    next(new APIError(`Can't Find This Route ${req.originalUrl}!!`, 404))
});

// Glopal Error Handling Middleware In Express
app.use(errorHandling);

// listing server 
const port = process.env.PORT || 3333
const server = app.listen(port, () => {
    console.log(`URL: http://localhost:${port}/api/v1`);
    console.log(`The Server Running In Port ${port}`);
});

// Any error can happen out express.
// Handling Asynchronous
process.on("unhandledRejection", (err) => {
    console.log({
        unhandledRejection: true,
        nameError: `${err.name} `,
        message: `${err.message}`,
        stack: `${err.stack}`
    });
    server.close(() => {
        console.log("Server Shut Down....");
        process.exit(1);
    });
});

// Handling synchronous exciption
process.on("uncaughtException", (err) => {
    console.log({
        unhandlingException: true,
        nameError: `${err.name} `,
        message: `${err.message}`,
        stack: `${err.stack}`
    });
});