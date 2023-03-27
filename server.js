const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const errorHandling = require("./middlewares/errorHandling");
const APIError = require("./util/APIError");
require("./config/connect");

const categoryRoute = require('./routes/category.routes');
const subcategoryRoute = require('./routes/subCategory.routes');

const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.NODE_ENV}`);
}

// routes
const api = process.env.API
app.use(`${api}/categories`, categoryRoute)
app.use(`${api}/sub-categories`, subcategoryRoute)

app.all('*', (req, res, nxt) => {
    nxt(new APIError(`Can't Find This Route ${req.originalUrl}!!`, 400))
});

// Glopal Error Handling Middleware In Express
app.use(errorHandling);

// listing server 
const port = process.env.PORT || 3333
const server = app.listen(port, () => {
    console.log(`URL: http://localhost:${port}/api/v1`);
    console.log(`The Server Running In Port ${port}`);
});

// Any error can happen out express
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

