import type { ThunkDispatch } from "@reduxjs/toolkit";



interface UserData {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  user_role: string;
  onboard: boolean;
}

export default function useUserDataDispatch ({dispatch, setUserState, userData}: {dispatch:any, setUserState: any, userData: UserData}) {
  

  const updateUser = () => {
    
  };

  return updateUser;
};
