const mongoose = require('mongoose');

const InviteSchema = new mongoose.Schema({
    date: Date,
    time: { type: String },
    location: { type: String },
    activity: { type: [String], enum: ['Top Rope', 'Lead Climbing', 'Bouldering', 'Outdoor Climbing'] },
    accepted: Boolean, 
});  

InviteSchema.set("toJSON", {
    transform: (document, returnedObject) => {
      delete returnedObject.hashedPassword;
    },
  });
  
  module.exports = mongoose.model('Invite', InviteSchema);
