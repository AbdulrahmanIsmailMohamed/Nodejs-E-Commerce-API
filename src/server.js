const path = require('path')

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const compression = require('compression');

require("dotenv").config();

// routes
const mounter = require('./routes');

require("./config/connect");
const errorHandling = require("./middlewares/errorHandling");
const APIError = require("./util/APIError");

const app = express();
const api = process.env.API;

// cors => allow other domains to access your routes
app.use(cors());
app.options('*', cors()); // include before other routes

// compression all responses
app.use(compression());

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(`${api}`, express.static(path.join(__dirname, 'uploads')));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.NODE_ENV}`);
}

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