const mongoose = require("mongoose")

const hospitalSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    ventcount : {
        type: Number,
        default : 0
    }
})

module.exports = mongoose.model('hospital',hospitalSchema);