const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,'กรุณาระบุ username']
    },
   
    password:{
        type:String,
        required:[true,'กรุณาระบุรหัสผ่าน']

    },
    fullname:{
        type:String,
        required:[true,'กรุณาระบุชื่อนามสกุล']
    },
    email:{
        type:String,
        required:[true,'กรุณาระบุอีเมล์']
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