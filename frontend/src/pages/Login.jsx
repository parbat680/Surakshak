import React, { useState } from 'react'
import Lottie from 'react-lottie'
import RegisterPic from '../assets/register.json'
// import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Logo from '../assets/surakshak-logo-white.png';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const DefaultOptions = {
        loop: true,
        autoplay: true,
        animationData: RegisterPic,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [type, setType] = useState("")

   
    const handleTypeChange = (event) => {
        setType(event.target.value)
    }

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password, type)
        try {
            const response = await fetch(`http://34.93.44.181/api/v1/${type}/login`,
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password }),

                }
            );
            console.log(response);

            if(response.status===200){
                console.log(response)
                alert("Logged In successfully!!!")
                let res = await response.json();
                console.log('res: ', res)
                localStorage.setItem('token', res.token);
                localStorage.setItem('type', type);
                navigate(`/${type}dashboard`)
            }


        } catch (err) {
            console.log(err);
            alert("Something Went Wrong");
        }
        setEmail("");
        setPassword("");
    }
    return (
        <>
            <div className='grid grid-cols-2 bg-gray-50'>
                <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto pl-28 md:h-screen lg:py-0">
                    <img
                        src={Logo}
                        className="mb-8"
                        alt="Agewell Logo"
                        width={100} height={80}
                    />
                    <div className="w-[500px] bg-white rounded-lg drop-shadow-lg">
                        <div className="space-y-2 py-8 px-10">
                            <h1 className="text-2xl text-center font-bold leading-tight tracking-tight text-teal-400 md:text-2xl">
                                Login
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-4" action="#">

                                {/* <div>
                                <label htmlFor="logintype" className="block mb-2 text-base font-medium text-gray-900">Login As</label>
                                <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div class="flex items-center pl-3">
                                            <input value={userType} onChange={(e) => setUserType(e.target.value)} id="horizontal-list-radio-license" type="radio" name="list-radio" class="w-4 h-4 text-teal-400 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="horizontal-list-radio-license" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">NGO</label>
                                        </div>
                                    </li>
                                    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div class="flex items-center pl-3">
                                            <input value={userType} onChange={(e) => setUserType(e.target.value)} id="horizontal-list-radio-id" type="radio" name="list-radio" class="w-4 h-4 text-teal-400 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="horizontal-list-radio-id" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Hospital</label>
                                        </div>
                                    </li>
                                    <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div class="flex items-center pl-3">
                                            <input value={userType} onChange={(e) => setUserType(e.target.value)} id="horizontal-list-radio-millitary" type="radio" name="list-radio" class="w-4 h-4 textteal-400 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="horizontal-list-radio-millitary" class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Volunteer</label>
                                        </div>
                                    </li>
                                </ul>
                            </div> */}
                                <div>
                                    <label htmlFor="email" className="block mb-2 text-base font-medium text-gray-900">Your email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@example.com" required="" />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-base font-medium text-gray-900">Password</label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                                </div>

                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Login Type</InputLabel>
                                    <Select
                                    onChange={handleTypeChange}
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={type}
                                        // onChange={handleChange}
                                        label="Login Type"
                                    >
                                        <MenuItem value="">
                                        </MenuItem>
                                        <MenuItem value={'volunteer'}>Volunteer</MenuItem>
                                        <MenuItem value={'doctor'}>Doctor</MenuItem>
                                        <MenuItem value={'ngo'}>NGO</MenuItem>
                                        <MenuItem value={'hospital'}>Hospital</MenuItem>
                                    </Select>
                                </FormControl>


                                <button type="submit" className="w-full text-white bg-teal-400 hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center ">Sign In</button>
                                <p className="text-base font-normal text-gray-800">
                                    Don't have an account yet ? <label className='text-teal-400'>Sign Up</label>
                                    <div>
                                        <ul class="items-center w-full text-sm text-gray-900 border border-gray-400 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                            <li class="w-full border-b border-gray-400 sm:border-b-0 sm:border-r dark:border-gray-600">
                                                <div class="flex items-center pl-3 py-2 text-center">
                                                    <Link to='/ngosignup' className='hover:underline'>As NGO</Link>
                                                </div>
                                            </li>
                                            <li class="w-full border-b border-gray-400 sm:border-b-0 sm:border-r dark:border-gray-600">
                                                <div class="flex items-center pl-3 py-2 text-center">
                                                    <Link to='/hospitalsignup' className='hover:underline'>As Hospital</Link>
                                                </div>
                                            </li>
                                            <li class="w-full border-b border-gray-400 sm:border-b-0 sm:border-r dark:border-gray-600">
                                                <div class="flex items-center pl-3">
                                                    <Link to='/volunteersignup' className='hover:underline'>As Volunteer</Link>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>

                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='mt-16 mr-28'>
                    <Lottie options={DefaultOptions} height={650} width={650} />
                </div>
            </div>
        </>
    )
}

export default Login