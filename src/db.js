const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://leoarrieta93:sYbQfbM67f0RtDKS@cluster0.uowx8nz.mongodb.net/"
    );
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
