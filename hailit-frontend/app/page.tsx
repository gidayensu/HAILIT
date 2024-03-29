'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

type SignUpState = {
  first_name: string,
  last_name: string, 
  email: string,
  phone_number: string,
  password: string
}

type LoginState = {
  email: string,
  password: string, 
}

type Login = boolean; 

export default function Home() {
  const router = useRouter(); 

  const [signUpData, setSignUpData] = useState<SignUpState>({
    first_name: '', 
    last_name: '',
    email: '',
    phone_number: '',
    password: ''
  })

  const [loginData, setLoginData] = useState<LoginState>({
    email: '',
    password: ''
  })

  const [login, setLogin] = useState<Login>(false);

  const handleLogin=()=> setLogin(()=>!login)

  const handleSignUpChange = (e: any)=> {
    const {name, value} = e.target;
    
    setSignUpData((prevData)=>({
      ...prevData, [name]: value
    }) )
  };
  
  const handleLoginChange = (e: any)=> {
    const {name, value} = e.target;
    setLoginData((prevData)=>({
      ...prevData, [name]: value
    }) )
    
  };

  
  const handleSubmit = async (e: any, userData: LoginState | SignUpState) => {
    e.preventDefault();
    
    let url = '';
    let method = null;

    if (userData.hasOwnProperty('phone_number')) {
      url = 'http://localhost:5000/api/v1/customer/'
      method = 'POST';
    } else {
      url = 'http://localhost:5000/api/v1/customer/verify'
      method = 'POST';
    }

    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify(userData)
    })

    if (!response.ok) {
    const data = await response.json();
      throw new Error(data.message || 'Unknown Error Occurred');
    } 

    const data = await response.json();
    data.message === true ? router.push('/profile') : data
    return data;
  }

  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={!login? ()=>handleSubmit(event, signUpData) : ()=>handleSubmit(event, loginData)} className="border-2 h-96 w-80 rounded-xl flex flex-col items-center justify-center border-black border-opacity-30">
        {!login && <div className="grid grid-cols-2 justify-center items-center mb-4 gap-8">
          <div className="flex flex-row justify-start items-center ">
            <label className="absolute text-black z-10 text-sm ml-4">**</label>
            <input
              onChange={handleSignUpChange}
              type="text"
              className="relative border border-black h-10 w-32 rounded-xl text-sm pl-9"
              placeholder="First Name"
              name="first_name"
              value={signUpData.first_name}
            />
          </div>
          <div className="flex flex-row justify-start items-center">
            <label className="absolute text-black z-10 text-sm ml-4">**</label>
            <input
              onChange={handleSignUpChange}
              type="text"
              className="relative border border-black h-10 w-32 rounded-xl text-sm pl-9"
              name="last_name"
              value={signUpData.last_name}
              placeholder="Last Name"
            />
          </div>
        </div>}
        <div className="flex flex-row justify-start items-center mb-4">
          <label className="absolute text-black z-10 text-sm ml-4">**</label>
          <input
            onChange={!login ? handleSignUpChange : handleLoginChange}
            type="text"
            className="relative border border-black h-10 w-72 rounded-xl text-sm pl-9"
            placeholder="Email"
            name="email"
            value={!login ? signUpData.email : loginData.email}
          />
        </div>
        <div className="flex flex-row justify-start items-center mb-4">
          <label className="absolute text-black z-10 text-sm ml-4">**</label>
          <input
            onChange={!login ? handleSignUpChange: handleLoginChange}
            type="password"
            className="relative border border-black h-10 w-72 rounded-xl text-sm pl-9"
            placeholder="Password"
            name="password"
            value={!login ? signUpData.password : loginData.password}
          />
        </div>

        {!login && <div className="flex flex-row justify-start items-center mb-4">
          <label className="absolute text-black z-10 text-sm ml-4">**</label>
          <input
            onChange={handleSignUpChange}
            type="text"
            className="relative border border-black h-10 w-72 rounded-xl text-sm pl-9"
            placeholder="Phone Number"
            name="phone_number"
            value={signUpData.phone_number}
          />
        </div>}
        <button
          type="submit"
          className="rounded-lg h-12 w-40 bg-black text-white"
        >
          
          {login? "login" :  "sign up"}
          
        </button>
        <p onClick={handleLogin}>{login? "Don't have an account? sign up" :  "Have an account? login"} </p>
      </form>
    </main>
  );
}
