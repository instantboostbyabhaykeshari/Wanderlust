const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");

const Mongo_Url = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then((res)=>{
        console.log("Connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main() {
    await mongoose.connect(Mongo_Url);
}

const initDB = async()=>{
    await listing.insertMany(initData.data);
    console.log("Data was initialized");
}

initDB();

