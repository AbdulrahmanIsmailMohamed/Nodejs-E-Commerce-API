const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const errorHandling = require("./middlewares/errorHandling");
const APIError = require("./util/APIError");
const connectDB = require("./config/connect");

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
const categoryRoute = require('./routes/category.routes');
app.use(`${api}/categories`, categoryRoute)

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

// Handling synchronous exciption
process.on("uncaughtException", (err) => {
    console.log(`unhandlingException:: nameError: ${err.name} | errorMessage: ${err.message}`);
});

// Handling Asynchronouns 
process.on("unhandledRejection", (err) => {
    server.close(() => {
        console.log("Server Shut Down....");
        console.log(`UnHandledRejection:: nameError: ${err.name} | errorMessage: ${err.message}`);
        process.exit(1);
    })
})
