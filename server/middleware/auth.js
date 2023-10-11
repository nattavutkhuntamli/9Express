const jwt = require('jsonwebtoken');

exports.auth = async(req, res, next) => {
    try {
        let JWT_SECREF = process.env.SECRET || "HimyNameisneverdie";
        // let token = req?.headers?.authorization?.startsWith("Bearer")
        let token = req.headers['authtoken']
        if(!token){
            return res.status(401).send('No to ken')
        }
        const decode = jwt.verify(token,process.env.SECRET)
        req.user = decode.email
        next()
      
    } catch (error) {
        console.log(error)
        return res.send(`Token Invalid`).status(500)
    }
}