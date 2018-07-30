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
  avatarURL: {
    type: String,
    default: 'https://www.gravatar.com/avatar/a5717a649d346ed0c51be68888c130cd?f=y&d=identicon'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

let UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
