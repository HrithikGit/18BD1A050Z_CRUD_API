const mongoose = require("mongoose")

const ventSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    vid : {
        type : String
    },
    vstat :{
        type: String        // String tp indicate Status
    }
})

module.exports = mongoose.model('ventilator',ventSchema);