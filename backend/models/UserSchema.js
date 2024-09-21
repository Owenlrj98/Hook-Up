const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  picture: { type: String },
  name: { type: String },
  experience: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
  preferences: {
    type: [String],
    enum: ["Top Rope", "Lead Climbing", "Bouldering", "Outdoor Climbing"],
  },
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: { type: ProfileSchema, default: {} },
});

UserSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.hashedPassword;
  },
});

module.exports = mongoose.model("User", UserSchema);
