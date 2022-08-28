const mongoose = require('mongoose')

const voteSchema = new mongoose.Schema({
    epic: { type: String },
    status: { type: String }
}, {
    collection: "voteRecord"
})

const Vote = mongoose.model("Vote", voteSchema)
module.exports = Vote;