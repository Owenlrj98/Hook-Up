const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    picture: { type: String },
    name: { type: String },
    address: { type: String },
    postal: {type: String},
});  

LocationSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      delete returnedObject.hashedPassword;
    },
  });
  
  module.exports = mongoose.model('Location', LocationSchema);
