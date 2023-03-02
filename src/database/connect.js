const mongoose = require("mongoose");

const connectToDatabase = async () => {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@aprendendonodejs.yw9b18d.mongodb.net/?retryWrites=true&w=majority`
  );
};

module.exports = connectToDatabase;
