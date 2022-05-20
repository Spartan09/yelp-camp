const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  autoIndex: false,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(places)} ${sample(descriptors)}`,
      image: `https://source.unsplash.com/collection/483251`,
      description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias corporis assumenda quas. Corrupti aut tempora quas, ut debitis minus sed id, ipsum obcaecati facere quisquam tempore iste iusto vero labore?`,
      price: price,
    });
    await camp.save();
  }
};


seedDB().then(() => {
    console.log("Seeding complete");
    mongoose.connection.close();
});
