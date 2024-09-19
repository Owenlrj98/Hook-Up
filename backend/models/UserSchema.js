const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    experience: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    preferences: { type: [String], enum: ['Top Rope', 'Lead Climbing', 'Bouldering', 'Outdoor Climbing'] },

});  

UserSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      delete returnedObject.hashedPassword;
    },
  });
  
  module.exports = mongoose.model('User', UserSchema);
