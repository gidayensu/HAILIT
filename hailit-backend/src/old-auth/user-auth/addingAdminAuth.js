const jwt = require('jsonwebtoken');
const {userIsUserRole} = require('../../utils/util');
const addingAdminAuth = async (req, res, next) => {
    try {

        if(req.body && req.body.user_role === 'admin') {
            const authHeader = req.headers.authorization;
            if(!authHeader) {
                return res.status(401).json({message: "unauthorized"});
                
            }

            const token =   authHeader.split(' ')[1];
            const user = jwt.verify(token, process.env.JWT_SECRET);
            const {user_id} = user;
            const isAdmin = await userIsUserRole(user_id, 'admin');
            console.log('isAdmin:', isAdmin)
            if( !isAdmin) {
                return res.status(401).json({message: "unauthorized"});
            }
            
            
        }

        next()
} catch (err) {
        console.log(err)
        return res.status(403).json({message: "Authentication Error"})
    }
}

module.exports = addingAdminAuth;