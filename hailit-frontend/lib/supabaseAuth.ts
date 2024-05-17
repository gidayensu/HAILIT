
import { createClient } from "@supabase/supabase-js";


export type Inputs = {
  email: string;
  password: string;
};

export const supabaseProjectId = process.env.NEXT_PUBLIC_SUPABASE_ID;
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const publicAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, publicAnonKey);

// export const getToken = () => {
//   const storageKey = `sb-${supabaseProjectId}-auth-token`;
//   const sessionDataString = localStorage.getItem(storageKey);
//   const sessionData = JSON.parse(sessionDataString || "null");
//   const token = sessionData?.access_token;

//   return token;
// };

export const supabaseSignUp = async (userInputs: Inputs) => {
  const { data, error } = await supabase.auth.signUp({
    email: userInputs.email,
    password: userInputs.password,
  });

  if (error) {
    return "Error occurred signing up user"
  }
  const bearerToken = data.session?.token_type ? data.session.token_type + ' ' + data.session.access_token : '';
  const response = await fetch('http://localhost:5000/api/v1/user/register', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      authorization: bearerToken
    },
    body: JSON.stringify({
      user_id: data.user?.id,
      email: data.user?.email,
    })
  });
  const signUpData = await response.json()
  return signUpData
  
};

export const supabaseSignIn = async (userInputs: Inputs) => {
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userInputs.email,
    password: userInputs.password,
  });
  
  const user_id = data.user?.id
  const bearerToken = data.session?.token_type ? data.session.token_type + ' ' + data.session.access_token : '';
  const response = await fetch(`http://localhost:5000/api/v1/user/${user_id}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      authorization: bearerToken
    }
  });
  const signInData = await response.json();
  
  return signInData;
  
};


export const supabaseSession = async ()=> {
    
const { data, error } = await supabase.auth.getSession()
if(error) {
  return {
    message: "Error retrieving session"
  }
}
return data;

}

export const supabaseSignOut = () => {
  supabase.auth.signOut().then(() => {
    window.location.reload();
  });
};
