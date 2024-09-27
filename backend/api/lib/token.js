const jwt = require('jsonwebtoken');

module.exports.generateAccessToken = (obj)=>{
  delete obj['_id']
  return jwt.sign(obj, process.env.JWT_SECRET, { expiresIn: process.env.TOKEN_EXPIRE_TIME });
}

module.exports.generateRefreshToken = (obj)=>{
  delete obj['_id']
  return jwt.sign(obj, process.env.JWT_SECRET);
}

module.exports.validateToken = (token)=>{
    
  try {
    return jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    console.log(error)
    return 'expired'
  }
}