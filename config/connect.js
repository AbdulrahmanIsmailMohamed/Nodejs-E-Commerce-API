const mongoose = require("mongoose");

const mongoDB = async () => {
    await mongoose
        .set("strictQuery", false)
        .connect(process.env.MONGO_URL)
        .then((data) => {
            console.log(`DataBase Connected: ${data.connection.host}`);
        }).catch((err) => {
            console.log(err);
            process.exit(1);
        })

    module.exports = mongoose
}

module.exports = mongoDB