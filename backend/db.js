const mongoose = require('mongoose');

// MongoDB connection URI
const mongoURI = 'mongodb://adityasingh9554575339:Aditya10@ac-v2q571h-shard-00-00.qtcqoub.mongodb.net:27017,ac-v2q571h-shard-00-01.qtcqoub.mongodb.net:27017,ac-v2q571h-shard-00-02.qtcqoub.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-ihh33n-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');

    // Fetch data from food_items collection
    const fetched_data = mongoose.connection.db.collection("food_items");
    const data = await fetched_data.find({}).toArray();
    
    global.food_items = data;
    //console.log('Food items:', global.food_items);

    // Fetch data from Categories collection
    const category_data = mongoose.connection.db.collection("foodCategory");
    const categories = await category_data.find({}).toArray();
    
    global.foodCategory = categories;
   // console.log('categories:', global.foodCategory);

  } catch (err) {
    console.error("Error connecting to MongoDB or fetching data:", err);
  }
};

module.exports = connectDB;
