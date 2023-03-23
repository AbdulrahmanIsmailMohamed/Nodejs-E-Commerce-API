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


app.get("/", (req, res) => {
    res.send('Hello World')
})

// listing server and connect DB
const connectDB = require("./config/connect");
const server = async () => {
    await connectDB()
    const port = process.env.PORT || 3333
    app.listen(port, () => console.log(`The Server Running In Port ${port}`));
}
server();