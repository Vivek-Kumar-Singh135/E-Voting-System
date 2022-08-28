const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    _id: { type: String },
    aadhar: { type: String },
    epic: { type: String },
    authkey: { type: String },
    password: { type: String }
}, {
    collection: 'userList'
})
const User = mongoose.model('User', userSchema);
module.exports = User;