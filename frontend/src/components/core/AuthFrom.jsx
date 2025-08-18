
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { login, signup } from '../../services/api';
import { toast } from 'sonner';
import { useRoutes } from 'react-router-dom';


const AuthFrom = ({type}) => {

    console.log(type);
    const [userData, setUserData] = useState({
        name : "",
        email : "",
        accountType : "",
        password : "",
        confirmPassword : ""
    });

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const changeHandler = (e) => {
        setUserData({
            ...userData,
            [e.target.name] : e.target.value,
        })
    }

    async function submitHandler(e) {
        e.preventDefault(); 
        setLoading(true);
        try{
            if(type === "signup"){
                const response = await signup(userData);
                if(!response.data){
                    toast.error(response.message);
                    setLoading(false);
                    return

                }

                toast.success(response.message);
                setLoading(false);
                navigate("/login");
            }else {

                const response = await login(userData);
                if(!response.data){
                    toast.error(response.message);
                    setLoading(false);
                    return
                }

                toast.success(response.message);
                setLoading(false);
                navigate("/home");

            }
        }
        catch(error){
            console.log(error);
        }
        setLoading(false);
    }

    if(loading){
        return (
            <div>
                Loading...
            </div>
        )
    }


  return (
    <div className='flex items-center justify-center min-h-screen'>
        <div className='bg-gray-50 w-[35%] mx-auto px-6 py-8 border-2 border-orange-300 rounded-xl flex flex-col gap-4'>
            <div className='flex flex-col gap-1 items-center justify-center'>
                <h1 className='text-3xl font-bold'>{type === "signup" ? "Create Account" : "Welcome Back"}</h1>
                <p className='text-xl font-sans text-gray-400'>{type == "signup" ? "Sign up to get started with our Platform" : "Sign in to your account to continue"}</p>
            </div>

            <div className=' space-y-2'>
                <form className='flex flex-col gap-3 pt-4' onSubmit={submitHandler}>
                    { type === "signup" && (
                            <div className='flex gap-2 flex-col'>
                                <label className='text-sm' htmlFor='name'>Full Name<sup>*</sup></label>
                                <input 
                                    type="text"
                                    id='name'
                                    value={userData.name}
                                    name='name'
                                    onChange={changeHandler} 
                                    placeholder='Enter You Full Name'
                                    className="p-2 shadow-sm shadow-gray-200 border-1 border-gray-100 rounded-md"
                                    required
                                />
                            </div>
                        )   
                    }

                     <div className='flex gap-2 flex-col'>
                        <label htmlFor='email'>Email<sup>*</sup></label>
                        <input 
                            type='email'
                            id='email'
                            value={userData.email}
                            name='email'
                            placeholder='Enter Your Email'
                            className="p-2 shadow-sm shadow-gray-200 border-1 border-gray-100 rounded-md"
                            onChange={changeHandler} 
                            
                            required
                         />
                    </div>

                    {
                        type === "signup" && (
                        <div className='flex gap-2 flex-col'>
                            <label htmlFor='accountType'>Account Type<sup>*</sup></label>
                            <select 
                                id='accountType'
                                value={userData.accountType}
                                name='accountType'
                                onChange={changeHandler} 
                                className="p-2 shadow-sm shadow-gray-200 border-1 border-gray-100 rounded-md"
                                required
                            >
                                <option value='User'>User</option>
                                <option value='Host'>Host</option>
                            </select>
                        </div>
                        )
                    }

                    <div className='flex gap-2 flex-col'>
                        <label htmlFor="password">Password<sup>*</sup></label>
                        <input 
                            type="password"
                            id='password'
                            value={userData.password}
                            name='password'
                            placeholder='Password'
                            onChange={changeHandler}
                            className="p-2 shadow-sm shadow-gray-200 border-1 border-gray-100 rounded-md"
                            required
                        />
                    </div>

                    {
                        type === "signup" && (
                             <div className='flex gap-2 flex-col'>
                                <label htmlFor="confirmPassword">Confirm Password<sup>*</sup></label>
                                <input 
                                    type="password"
                                    id='confirmPassword'
                                    value={userData.confirmPassword}
                                    name='confirmPassword'
                                    onChange={changeHandler}
                                    placeholder='Confirm Password'
                                    className="p-2 shadow-sm shadow-gray-200 border-1 border-gray-100 rounded-md"
                                    required
                                />
                            </div>
                        )
                    }

                    {
                        type === "signup" ? (
                            <button className='bg-orange-400 p-2 rounded-xl text-xl font-semibold cursor-pointer flex gap-2 items-center justify-center text-white' type='submit'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                </svg>

                                <span>
                                    Create Account
                                </span>
                            </button>
                        ) : (
                             <button className='bg-orange-400 p-2 rounded-xl text-xl font-semibold cursor-pointer flex gap-2 items-center justify-center text-white' type='submit'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                </svg>


                                <span>
                                    Login
                                </span>
                            </button>
                        )
                    }

                   
                </form>

                <div className='flex items-center justify-center gap-2'>
                    <p>
                       {
                        type === "singup" ? "Already Have Account?" : "Don't Have Account"
                       }
                    </p>
                    <Link className='text-orange-400' to={`${type === "signup" ? "/login" : "/"}`}>
                        {
                            type === "signup" ? "Login here" : "Signup Here"
                        }
                    </Link>
                </div>
              
            </div>
        </div>
    </div>
  )
}

export default AuthFrom