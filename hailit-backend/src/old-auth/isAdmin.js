const {userIsUserRole} = require('../utils/util')

const isAdmin = async(req, res, next)=> {
    
    const {user_id} = req.user;
    console.log(user_id)
    
    

    try {
        if (!user_id) {
            return res.status(400).json({ message: "User ID not provided in request" });
        }
        const adminStatus = await userIsUserRole(user_id, 'admin');
        console.log(adminStatus)
    if (!adminStatus) {
        return res.status(403).json({message: "Access denied"})
    }

    next();
    } catch (err) {
        console.log(`Authorization error occurred: ${err}`)
        return res.status(500).json({message: 'Internal Server Error'})
    }
}

module.exports = isAdmin;