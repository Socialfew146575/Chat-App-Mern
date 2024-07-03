const mongoose = require("mongoose");
mongoose.set("strict", false); // Corrected option name

const connectToDb = async (uri) => {
  try {
    const connection = await mongoose.connect(uri);
    console.log(`Database connected ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDb