const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'กรุณาระบุชื่อสินค้า']
    },
    detail:{
        type:String
    },
    price:{
        type:Number
    },
    complete:{
        type:Boolean
    }

}, {timestamps:true} )

module.exports = mongoose.model('product',productSchema)