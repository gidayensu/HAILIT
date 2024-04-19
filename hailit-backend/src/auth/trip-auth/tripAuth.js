const {associatedWithTrip, userIsUserRole} = require ('../../utils/util')


const tripAuth = async (req, res, next)=> {
    
    try {
    const path = req.path;
    const {driver_id, user_id, user_role} = req.user;
    
    const {trip_id} = req.params;
    const isAdmin = await userIsUserRole(user_id, 'admin');
        console.log('driver_id:', driver_id)
    //in trips 'driver' represents both rider and driver
    let role = 'client';
    user_role === 'driver' || user_role === 'rider' ? role = 'driver' : role;
    

    if (path.includes('/rate-trip/') && role === 'driver') {
        return res.status(401).json({message: 'You cannot access trip'});
    }
     
    let tripAssociation= false;
    
    user_role === 'driver' ? tripAssociation = await associatedWithTrip(driver_id, trip_id, role) : tripAssociation = await associatedWithTrip(user_id, trip_id, role)
    console.log('tripAssociation:', tripAssociation)
    
    
    if(tripAssociation ===true || isAdmin) {
    
        next();
    } else {
        return res.status(401).json({message: 'You cannot access trip'});
    }
    
} catch (err) {
    return "Trip Access Authorization Error"
}

}



module.exports = tripAuth;