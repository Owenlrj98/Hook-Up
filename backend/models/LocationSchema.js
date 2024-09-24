const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    name: { type: [String],
    enum: ['Boruda', 'Boulder+', 'Climb Central', 'Fit Bloc', 'Lighthouse Climbing', 'Kinetics', 'Ground Up'],
    },
    address: { type: String },
    postal: {type: String},
});  

LocationSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      delete returnedObject.hashedPassword;
    },
  });
  
  module.exports = mongoose.model('Location', LocationSchema);
