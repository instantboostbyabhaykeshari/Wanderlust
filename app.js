const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./models/listing");
const path = require("path");
const { url } = require("inspector");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const port = 8080;
const Mongo_Url = "mongodb://127.0.0.1:27017/wanderlust";


async function main() {
    await mongoose.connect(Mongo_Url);
}

main()
    .then((res)=>{
        console.log("Connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    })

app.get("/", (req, res)=>{
    res.send("I, am Abhay");
});

//Index Route
app.get("/listings", async(req, res)=>{
    const allListings = await listing.find({});
    res.render("./listings/index.ejs", {allListings});
});

//New route
app.get("/listings/new", (req, res)=>{
    res.render("./listings/new.ejs");
});

app.post("/listings", async(req, res)=>{
    let {title, description, price, location, country} = req.body;
    let newListing = new listing({
        title: title,
        description: description,
        price: price,
        location: location,
        country: country,
    });
    await newListing.save();
    res.redirect("/listings");
});

//Show route
app.get("/listings/:id", async(req, res)=>{
    let {id} = req.params;
    const listingItem  = await listing.findById(id);
    res.render("./listings/show.ejs", {listingItem})
});

//Update route
app.get("/listings/:id/edit", async(req, res)=>{
    let {id} = req.params;
    let editListing = await listing.findById(id);
    res.render("./listings/edit.ejs", {editListing})
});

app.put("/listings/:id", async(req, res)=>{
    let {id} = req.params;
    let {title, description, price, location, country} = req.body;
    await listing.findByIdAndUpdate(id, {
        title: title,
        description: description,
        price: price,
        location: location,
        country: country,
    });
    res.redirect(`/listings/${id}`);
});

//Delete route
app.delete("/listings/:id", async(req, res)=>{
    let {id} = req.params;
    let deleteListing = await listing.findByIdAndDelete(id, {new: true});
    console.log(deleteListing);
    res.redirect("/listings");
});


// app.get("/testing", async(req, res)=>{
//     let sampleListing = new listing({
//         title: "My New Villa",
//         description: "By the Beach",
//         price: 12000,
//         location: "Calangute, Goa",
//         country: "India",
//     })

//     await sampleListing.save();
//     res.send("Successful testing");
// });

app.listen(port, ()=>{
    console.log(`App is listening on ${port}`);
});