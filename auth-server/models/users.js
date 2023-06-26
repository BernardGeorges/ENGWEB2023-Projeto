const mongoose = require('mongoose')
var passportLocalMongoose = require('passport-local-mongoose');

var usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    cart: [String],
    history: [String],
    wishlist: [String],
    admin: Boolean,
    active: Boolean,
    dateCreated: String
  });

usersSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', usersSchema)