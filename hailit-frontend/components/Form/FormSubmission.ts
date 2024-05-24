
import { putFetch } from "@/lib/fetch";

import { sessionAccessToken } from "@/lib/supabaseAuth";

export const updateUserDetails = async ({data, user_id}:{data:Object, user_id:string}) => {
    
    
    const url = `http://localhost:5000/api/v1/user/${user_id}`
    const accessToken = await sessionAccessToken();
    const bearerToken = `bearer ${accessToken}`
        const updateUser = await putFetch({bearerToken, data, url});
        console.log('updateUser.error', updateUser.error)
        if (updateUser.error) {
            return {error: "Error Occurred in updating user detail"}
        }
            
        return updateUser;

        
}

