const {userIsUserRole} = require ('../../utils/util');

const isUserRole = async (req, res, next) => {
    
    try {
        const path = req.path;
        const { userId } = req.params;
        const userRole = req.user.user_role
        const jwtUserId = req.user.user_id;
        const isAdmin = await userIsUserRole(jwtUserId, 'admin');
        const isRole = await userIsUserRole(jwtUserId, userRole);
                
        if ((userId === jwtUserId && isRole )|| isAdmin) {
             next ();
        } else {
         return  res.status(401).json({message:`Unauthorized to access ${path}`})
        }
    } catch (err) {
        return res.status(401).json({message:`Unauthorized`})
    }
}

module.exports = isUserRole;