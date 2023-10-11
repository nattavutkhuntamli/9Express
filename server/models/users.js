const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:[true,'กรุณาระบุอีเมล์']
    },
    password:{
        type:String,
        required:[true,'กรุณาระบุรหัสผ่าน']

    },
    fullname:{
        type:String,
        required:[true,'กรุณาระบุชื่อนามสกุล']
    },
    status:{
        type:Boolean,
        default:true
    },
    token:{
        type:String
    }
}, {timestamps:true} )

module.exports = mongoose.model('users',userSchema)