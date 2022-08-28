const mongoose = require('mongoose')

const voterListSchema = new mongoose.Schema({
    _id: { type: String },
    epic: { type: String },
    name: { type: String },
    authkey: { type: String },
    ac: { type: String },
    pc: { type: String }
}, {
    collection: 'voterList'

})

const voterList = mongoose.model('Voter', voterListSchema)
module.exports = voterList;