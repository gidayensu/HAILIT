const {userIsAdmin} = require('../utils/util')

const isAdmin = async(req, res, next)=> {
    
    const {user_id} = req.user;
    
    if (!user_id) {
        return res.status(400).json({ message: "User ID not provided in request" });
    }

    try {
        const adminStatus = await userIsAdmin(user_id);
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