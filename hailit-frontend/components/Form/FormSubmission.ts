
import { putFetch, postFetch } from "@/lib/fetch";

import { sessionAccessToken } from "@/lib/supabaseAuth";

export const updateUserDetails = async ({data, user_id}:{data:Object, user_id:string}) => {
    
    
    const url = `http://localhost:5000/api/v1/user/${user_id}`
    const accessToken = await sessionAccessToken();
    const bearerToken = `bearer ${accessToken}`
        const updateUser = await putFetch({bearerToken, data, url});
        
        if (updateUser.error) {
            return {error: "Error Occurred in updating user detail"}
        }
        console.log('updateUser:', updateUser)
        return updateUser;

        
}

export const createNewTrip = async (data:Object) => {
    const url = `http://localhost:5000/api/v1/trip/add/`
    const accessToken = await sessionAccessToken();
    const bearerToken = `bearer ${accessToken}`
        const createTrip = await postFetch({bearerToken, data, url});
        
        if (createTrip.error) {
            return {error: "Error Occurred in updating user detail"}
        }
        
        return createTrip;
}
