/* eslint-disable import/no-extraneous-dependencies */
const fs = require("fs");
const color = require("colors");
const Product = require("../../models/Product")

require("dotenv").config({ path: "../../.env" })
require("../../config/connect");

const products = JSON.parse(fs.readFileSync("./product.json"));
// console.log(products);

const insertData = async () => {
    const product = await Product.create(products);
    if (!product) return new Error("The Product Can't Be Created!");
    console.log(color.green("Successfully Create!!"));
    process.exit(1)
}

const deleteData = async () => {
    const product = await Product.deleteMany();
    if (!product) return new Error("Can't Delete Products");
    console.log(color.red("Successfully Delete!!"));
    process.exit(1)
}

if (process.argv[2] === "-i") {
    insertData();
} else if (process.argv[2] === "-d") {
    deleteData();
}