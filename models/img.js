const mongoose = require("mongoose");
const ImgSchema = new mongoose.Schema({
    Name:{
        type:String,
        require:false
    },
	Image:{
        data:Buffer,
        ContentType:String
    },

});
module.exports = mongoose.model("Image", ImgSchema);
