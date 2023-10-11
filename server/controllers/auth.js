const Users = require('../models/users')
const BcryptPass = require('../util/bcrypt_pass').BcryptPass

const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const existingUser = await Users.findOne({ email: req.body.email }).exec();
    
        if (existingUser) {
            return res.status(409).json({ msg: "มี email นี้อยู่ในระบบแล้ว" });
        } else {
            const username = req.body.username
            const email = req.body.email
            const hashedPassword = await BcryptPass.password_hash(req.body.password);
            const fullname = req.body.fullname

            const createUser = await Users.create({
                username:username,
                password: hashedPassword,
                fullname: fullname,
                email: email,
            });
    
            if (createUser) {
                return res.status(201).json({ msg: "เพิ่มข้อมูลสำเร็จ", Response: createUser });
            } else {
                return res.status(400).json({ msg: "เพิ่มข้อมูลไม่สำเร็จ" });
            }
        }
    } catch (error) {
        console.log(error);
    }
}

exports.login  = async(req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password

        //1.check User
        const existingUser = await Users.findOne({username:username}).exec()
        if(!existingUser){
            return res.status(400).json({msg:"ไม่พบข้อมูล username หรือ password นี้ในระบบ"})
        }

        if(existingUser.status != true){
            return res.status(400).json({msg:"ยูสนี้ถูกปิดการใช้งานแล้ว"})
        }

        const isMatch  = await BcryptPass.password_hash(password, existingUser.password)
        if(!isMatch){
            return res.status(400).json({msg:"Password Invalid!!!"})
        }


        //2. Payload
        let payload = {
            user:{
                username:existingUser.username,
                fullname:existingUser.fullname,
                email:existingUser.email,
                status:existingUser.status
            }
        }
        
        //3. Generate
        /**
         *  expirseIn กำหนดระยะเวลาในโทเคนที่จะมีอายุถ้ากำหนดแบบไม่หมดอายุจะใช้  -1
         *  sing คือ generate โทเคนโดยใช้ .sing(playload,screekey)  ชึ่ง playload เราจะใส่ username ไป และ screekey จะใส่อะไรก็ได้
         */
        let JWT_SECREF = process.env.SECRET || "HimyNameisneverdie";
        const token = jwt.sign(payload, JWT_SECREF, { expiresIn: '1095day' }); //สร่าง token
        
        const updateToken = await Users.findOneAndUpdate({ _id: existingUser._id }, { token }, { new: true }).exec();
        return res.status(200).json({msg:'success',response:{payload,token}})

        // jwt.sign(payload,existingUser.password, { expiresIn:-1 }, ( err, token) => {
        //     if(err) throw err
        //     res.json({token,payload})
        // })
    } catch (error) {
        console.log(error)
    }
}