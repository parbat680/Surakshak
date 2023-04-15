import React, { useState } from 'react'
import Lottie from 'react-lottie'
import RegisterPic from '../assets/register.json'
import { ToastContainer, toast } from 'react-toastify';
import Button from '@mui/material/Button';
import axios from 'axios';
import { constant } from '../constants';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Logo from '../assets/surakshak-logo-white.png'
import 'react-toastify/dist/ReactToastify.css';
import { unique } from '@tensorflow/tfjs-core';
import { useNavigate } from 'react-router-dom';


const VolunteerDashboard = ({ isLoggedIn, setisLoggedIn, setuserid }) => {
    const DefaultOptions = {
        loop: true,
        autoplay: true,
        animationData: RegisterPic,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const [input, setInput] = useState(false);
    const [uniqueId, setUniqueId] = useState('')

    const navigate = useNavigate();

    const navigateToMyElders = () => {
        navigate('/myelders')
    }

    const showInput = () => {
        setInput(true);
    }

    const handleInputChange = (event) => {
        setUniqueId(event.target.value)
    }

    const registerVolunter = (e) => {
        e.preventDefault();

        if (localStorage.getItem('type') === 'volunteer') {
            const formdata = new FormData
            formdata.append('id', uniqueId)
            axios.post(constant.API_URL + '/api/v1/volunteer/add', formdata, {
                headers: {
                    'Content-Type': 'application/json',
                    'token': localStorage.getItem('token')
                },
            })
                .then(res => {
                    // setLoader(false);
                    console.log(res)

                    if (res.status === 200) {
                        alert("Volunteer registration completed successfully")
                        setUniqueId('');
                    } else {
                        alert("Something went wrong")
                    }
                })
                .catch(err => {
                    alert("Something went wrong")
                    console.log("Frontend err: ", err)
                });
        }

    }




    return (


        <div className='grid grid-cols-2 bg-gray-50' style={{ display: 'flex', flexDirection: 'column' }}>
            <br></br>   <br></br> <br></br> <br></br>
            <h1 className="text-3xl text-center font-bold leading-tight tracking-tight text-teal-400 md:text-3xl">
                Volunteer Dashboard
            </h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div className="w-[300px] bg-white rounded-lg drop-shadow-lg">
                    <div className="space-y-2 py-8 px-10" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                        <img
                            src={Logo}
                            className="mb-5"
                            alt="Agewell Logo"
                            width={120} height={80}
                        />

                        <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                            <Button onClick={navigateToMyElders} sx={{ backgroundColor: '#f2f7ff' }} variant="text">Manage my Elders</Button>
                            <br></br>
                            <Button onClick={showInput} sx={{ backgroundColor: '#3d94f2' }} variant="contained">Become a volunteer</Button>
                            <br></br><br></br><br></br>

                            {
                                (input === true) ?
                                    <> <TextField id="filled-basic" label="Enter User's unique ID" variant="filled" onChange={handleInputChange}/>
                                        <br></br>
                                        <Button sx={{ backgroundColor: '#005eff', width: '100px' }} variant="contained" onClick={registerVolunter}>Submit</Button>
                                    </>
                                    :
                                    <></>
                            }


                        </div>
                    </div>
                </div>
                <div className='mt-16 mr-28'>
                    <Lottie options={DefaultOptions} height={650} width={650} />
                    <ToastContainer
                        position="bottom-center"
                        autoClose={4000}
                        hideProgressBar={false}
                        newestOnTop={true}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </div>
            </div>
        </div>
    )
}

export default VolunteerDashboard