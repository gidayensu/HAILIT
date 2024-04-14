const jwt = require('jsonwebtoken');
const userModel = require('../model/user.model')
 

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
    console.log('user:',user)
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

//the role of the user can be passed as part of the payload that is to be decoded by the isAdmin function below.
//however a more robust approach is used to query for admin details each time before allowing any admin role to be performed.
//this ensures that except if the database is compromised, changing user role by having access to the secret key will still not
//allow access as an admin;

const isAdmin = async(req, res, next)=> {
    const {user_id} = req.user;
    try {const adminStatus = await userModel.isAdmin(user_id);
    if (!adminStatus) {
        res.status(403).json({message: "Access denied"})
    }

    next();
    } catch (err) {
        return {message: `Authorization error occurred: ${err}`}
    }
}

module.exports = authenticateToken
































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