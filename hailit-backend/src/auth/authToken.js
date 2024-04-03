const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next)=> {
    try {
    const authHeader =  req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({message: "unauthorized"})
    }
    console.log('authHeader:',authHeader)
    const token =   authHeader.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
    } catch (err) {
        console.log(err)
        return res.status(403).json({message: "Authentication Error"})
    }
}



const generateTokens = (payload)=> {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '15min'});
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '7d'});
    return {accessToken, refreshToken}
}

module.exports = {generateTokens, generateTokens};
































// const jwt = require('jsonwebtoken')

// const authenticateToken = async (req, res, next)=> {
//     try {
//     const authHeader = req.headers.authorization;
    
//     if (!authHeader) {
//       return res.status(401).json({message: "Unauthorized"})
//     }
  
//     const token = authHeader.split(' ')[1];
//      const user = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = user;
//       next();
    
  
//   } catch (err) {
//     return res.status(400).json({message: "Authentication Error"});
//   }
  
//   }

 module.exports = authenticateToken;