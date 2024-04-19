const allowedUserRoles = ['admin', 'driver', 'rider', 'client'];

const userRoleValidation = async (req, res, next)=> {
    
    if(req.body.user_role || req.body.user_role === ''){
        
        if(!allowedUserRoles.includes(req.body.user_role)) {
            return res.status(401).json({message: "Wrong user role"})
        } 
    }
    next();
}

module.exports = userRoleValidation;