const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  picture: { type: String },
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true, unique: true },
  postal: { type: String, required: true, unique: true },
  facilities: {
    type: [String], // Array of strings to hold multiple facilities
    required: true,
  },
});

LocationSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

module.exports = mongoose.model("Location", LocationSchema);
