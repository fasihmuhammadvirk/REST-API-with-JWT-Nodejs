const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({

    Email:{
        type:String,
        required:true,
    },
    Password:{
        type:String,
        required:true,
    },


})
module.exports = mongoose.model("User",userSchema)