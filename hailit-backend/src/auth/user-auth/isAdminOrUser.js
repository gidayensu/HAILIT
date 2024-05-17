const {userIsUserRole} = require ('../../utils/util');

const isAdminOrUserAuth = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const jwtUserId = req.user.user_id;
        
        const isAdmin = await userIsUserRole(jwtUserId, 'admin');
        const isDriver = await userIsUserRole(jwtUserId, 'driver');
        const isRider =  await userIsUserRole(jwtUserId, 'rider');
        const isClient  =  await userIsUserRole(jwtUserId, 'client');
      
        
            const userDetails = req.body;
            if (!userDetails) {
                return res.status(401).json({ message: "Invalid request body" });
            }
                
            if (userId === jwtUserId || isAdmin) {
                
                
                if (
                    (userDetails.user_role === 'admin' && isAdmin) ||
                    (userDetails.user_role === 'driver' && isDriver || isAdmin) ||
                    (userDetails.user_role === 'rider' && isRider || isAdmin) ||
                    (userDetails.user_role === 'client' && isClient || isAdmin) || !userDetails.user_role
                ) {
                    
                    next();
                }  else {
                    return res.status(401).json({ message: "Unauthorized to get/add/update" });    
                }  
            } else {
                return res.status(401).json({ message: "Unauthorized to get/add/update" });
            }          
    } catch (err) {
        return "Authorization Error"
    }
}

module.exports = isAdminOrUserAuth;


