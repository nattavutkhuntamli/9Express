const jwt = require('jsonwebtoken');
const Users = require('../models/users')
exports.auth = async(req, res, next) => {
    try {
        let JWT_SECREF = process.env.SECRET || "HimyNameisneverdie";
        // let token = req?.headers?.authorization?.startsWith("Bearer")
        let token = req.headers['authtoken']
        if(!token){
            return res.status(401).send('Unauthorized')
        }

        let existingUser = await Users.findOne({ token, status: true }).exec();
        if (!existingUser) {
            return res.status(401).send('Unauthorized');
        }
        
        const decode = jwt.verify(token,process.env.SECRET)
        req.user = decode
        next()
      
    } catch (error) {
        console.log(error)
        return res.send(`Token Invalid`).status(500)
    }
}