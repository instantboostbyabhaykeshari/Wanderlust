const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename: String,
        url: {
            type: String,
            default: "https://pixabay.com/photos/house-architecture-building-villa-7310177/",
            set: (v) => v===""? "https://pixabay.com/photos/house-architecture-building-villa-7310177/" : v, 
        }
    },
    price: Number,
    location: String,
    country: String,
});

const listing = mongoose.model("listing", listingSchema);

module.exports = listing;
