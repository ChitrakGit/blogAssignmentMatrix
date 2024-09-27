
const dbClient = require("../config/db");
const bcrypt = require('bcrypt');
const { collections } = require("../constant/collections");
const {  generateAccessToken, generateRefreshToken, validateToken } = require("../lib/token");



module.exports.login = async (req, res) => {
    try {
        // Synchronize the model with the database
        const payload = req.body;
        const db = await dbClient.getClient();
        const user = await db.collection(collections.USERS).findOne({ email:payload.email });

        if (!user) {
          return res.send({ success: false, message: 'user not found' });
        }
        const validPassword = await bcrypt.compare(payload.password, user.password);

        if (!validPassword) {
            return res.send({ success: false, message: 'Invalid credentials' });
        }

        delete user['password']

        let accessToken = generateAccessToken(user);
        let refreshToken = generateRefreshToken(user);

        return res.status(200).send({success: true,token:{accessToken,refreshToken},user})
        // return res.status(200).send({test:"success"})
    }
    catch (error) {
        return res.status(400).send({message:error.message})
    }
}

module.exports.revalidate = async (req, res) => {
    try {
        const {token} = req.body;
        if (!token) {
            return res.status(403).send({ success: false, message: 'No token provided.' });
        
        }
        

        const _userInfo = validateToken(token);
        
        let accessToken = generateAccessToken({name:_userInfo.name,email:_userInfo.email});

        return res.status(200).send({success: true,replaceToken:true,token:{accessToken},user:_userInfo})
        // return res.status(200).send({test:"success"})
    }
    catch (error) {
        return res.status(400).send({message:error.message})
    }
}


module.exports.register = async (req, res) => {
    try {
        const payload = req.body;
        const db = await dbClient.getClient();
        const user = await db.collection(collections.USERS).findOne({ email:payload.email });

        if (user) {
          return res.send({ success: false, message: 'already reagistered' });
        }
        
        const salt = bcrypt.genSaltSync(10);
        const password = payload.password;
        payload.password = bcrypt.hashSync(password, salt);

        await db.collection(collections.USERS).insertOne(payload);
        delete payload['password']

        let accessToken = generateAccessToken(payload);
        let refreshToken = generateRefreshToken(payload);

        return res.status(200).send({success: true,token:{accessToken,refreshToken},user:payload})
        // return res.status(200).send({test:"success"})
    }
    catch (error) {
        return res.status(400).send({message:error.message})
    }
}