const {userIsUserRole, driverUserId} = require ('../../utils/util');

const isAdminOrRider = async (req, res, next) => {
    
    try {
        const path = req.path;
        const { driver_id } = req.params;
        const jwtUserId = req.user.user_id;
        const isAdmin = await userIsUserRole(jwtUserId, 'admin');
        const driver_user_id = await driverUserId(driver_id);
        // for (let i = 0; i<role.length; i++) {
        //      isRole = await userIsUserRole(jwtUserId, role[i]);
        //     console.log('isRole:', isRole)
        //     if(isRole === true) {
        //         break;
        //     }
        // }
        
        
        if (driver_user_id === jwtUserId || isAdmin) {
             next ();
        } else {
         return  res.status(401).json({message:`Unauthorized to access ${path}`})
        }
    } catch (err) {
        return "Authorization Error"
    }
}


module.exports = isAdminOrRider;