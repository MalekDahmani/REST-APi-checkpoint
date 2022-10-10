const mongoose = require ('mongoose')

const UserScehma = new mongoose.Schema({
    FirstName: String,
    LastName: String,

})

module.exports = mongoose.model('User',UserScehma)