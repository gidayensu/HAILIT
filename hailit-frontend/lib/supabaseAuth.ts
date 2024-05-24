
import { createClient } from "@supabase/supabase-js";
import { postFetch, getFetch } from "./fetch";

export type Inputs = {
  email: string;
  password: string;
};

export const supabaseProjectId = process.env.NEXT_PUBLIC_SUPABASE_ID;
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const publicAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, publicAnonKey);


export const supabaseSignUp = async (userInputs: Inputs) => {
  const { data, error } = await supabase.auth.signUp({
    email: userInputs.email,
    password: userInputs.password,
  });

  if (error) {
    return "Error occurred signing up user"
  }
  const userData = {
    user_id: data.user?.id,
    email: data.user?.email,
  }
  const bearerToken = data.session?.token_type ? data.session.token_type + ' ' + data.session.access_token : '';
  const signUpData = await postFetch({bearerToken:bearerToken, data: userData, url: 'http://localhost:5000/api/v1/user/register'  })
  return signUpData
  
};

export const supabaseSignIn = async (userInputs: Inputs) => {
  try {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: userInputs.email,
    password: userInputs.password,
  });
  
  if (error) {
    throw new Error('Failed to Sign user in')
  }

  const user_id = data.user?.id
  const bearerToken = data.session?.token_type ? data.session.token_type + ' ' + data.session.access_token : '';
  const signInData = await getFetch({bearerToken, url: `http://localhost:5000/api/v1/user/${user_id}`})
  console.log('signInData', signInData)
  return signInData;

  } catch (err) {
    return {error: `Error Occurred: ${err}`}
  }
};

export const googleSupabaseSignIn = async ()=> {
  try {
  const {data, error} = await supabase.auth.signInWithOAuth({
    provider: 'google'
  })
  if (error) {
    return {
      error: "Error signing in via google"
    }
  }

  return data;

 } catch (err) {
  return {error: `Error Occurred: ${err}`}
 }
}
export const supabaseSession = async ()=> {
    
const { data, error } = await supabase.auth.getSession()
if(error) {
  return {
    error: "Error retrieving session"
  }
}
return data;

}


export const sessionAccessToken = async ()=> {
    
  const { data, error } = await supabase.auth.getSession()
  if(error) {
    return {
      message: "Error retrieving session"
    }
  }
  const accessToken = data.session?.access_token;
  
  return accessToken;
  
  }

export const supabaseSignOut = async () => {
  await supabase.auth.signOut()
  window.location.reload();
  
};
