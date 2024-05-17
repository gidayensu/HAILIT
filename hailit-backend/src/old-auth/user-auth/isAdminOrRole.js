const {userIsUserRole} = require ('../../utils/util');

const isUserRole = (role) => {
    return async (req, res, next) => {
    try {
        const path = req.path;
        const { userId } = req.params;
        const jwtUserId = req.user.user_id;
        const isAdmin = await userIsUserRole(jwtUserId, 'admin');
        const isRole = await userIsUserRole(jwtUserId, role);
        // for (let i = 0; i<role.length; i++) {
        //      isRole = await userIsUserRole(jwtUserId, role[i]);
        //     console.log('isRole:', isRole)
        //     if(isRole === true) {
        //         break;
        //     }
        // }
        
        
        if ((userId === jwtUserId && isRole )|| isAdmin) {
            
             next ();
        } else {
         return  res.status(401).json({message:`Unauthorized to access ${path}`})
        }
    } catch (err) {
        return "Authorization Error"
    }}
}

module.exports = isUserRole;