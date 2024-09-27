const { validateToken } = require("../lib/token");

module.exports.userValidate = (req, res, next) =>{
    const accessToken = (req.headers['authorization']).replace('Bearer ','');
    console.log(accessToken)
    if (!accessToken) {
      return res.status(403).send({ success: false, message: 'No token provided.' });
    }
    console.log("=================",accessToken)
    const userInfo = validateToken(accessToken);
    console.log("=================",userInfo)
    if(userInfo != 'expired'){
        req.userInfo = userInfo;
        next();
    }else{
      console.log("==========098908908908=======",userInfo)
      return res.status(401).send({ success: false, message: 'token expired' });
    }
    
  
      // If everything is good, save to request for use in other routes
      
  }