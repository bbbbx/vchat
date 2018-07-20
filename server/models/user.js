const mongoose = require('./');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  account: {
    type: String,
    required: true,
    unique: true
  },
  username: String,
  password: String,
  friends: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

let UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
