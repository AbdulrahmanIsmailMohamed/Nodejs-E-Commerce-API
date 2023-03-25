const express = require("express");
const morgan = require("morgan");
require("dotenv").config()
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

// error Handling Middleware
const errorHandling = require("./middlewares/errorHandling");
errorHandling.routeError(app)
app.use(errorHandling.errorHandling);

// listing server and connect DB
const connectDB = require("./config/connect");
const server = async () => {
    await connectDB()
    const port = process.env.PORT || 3333
    app.listen(port, () => {
        console.log(`The Server Running In Port ${port}`)
        console.log(`URL: http://localhost:${port}`)
    });
}
server();