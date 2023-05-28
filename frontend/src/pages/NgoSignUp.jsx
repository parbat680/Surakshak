import React, { useState } from 'react'
import Lottie from 'react-lottie'
import RegisterPic from '../assets/register.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const NGOSignUp = () => {
    const DefaultOptions = {
        loop: true,
        autoplay: true,
        animationData: RegisterPic,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [ngotype, setNgotype] = useState("");
    const [address, setAddress] = useState("");
    const [helpline, setHelpline] = useState("");
    const [regisnum, setRegisnum] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.length < 3) {
            toast.error("Name must contain atleast 3 characters")
        } else if (password.length < 5) {
            toast.error("Password must contain atleast 6 characters")
        }
        // console.log(name, email, ngotype, address, helpline, regisnum, password);
        try {
            const response = await fetch("http://34.93.44.181/api/v1/ngo/signup",
                {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, "ngoType": ngotype, address, "phone": helpline, "regNo": regisnum, password }),

                }
            );

            if (response.status === 200) {
                const resp = await response.json();
                alert('Your NGO is registered successfully!!')
                toast.success("Your Registration Successful");
                localStorage.setItem("token", resp.token);
                localStorage.setItem("type", 'ngo');
                navigate('/addevent')
            } else {
                alert("Something went wrong")
            }


        } catch (err) {
            console.log(err);
            alert("Something went wrong")
        }
    }
    return (
            <div className='grid grid-cols-2 bg-gray-50'>

                <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto my-16 pl-28 lg:py-0">
                    {/* <h2 className='text-teal-400 font-bold text-3xl mb-4'>Logo</h2> */}
                    <div className="w-[600px] bg-white rounded-lg drop-shadow-lg">
                        <div className="space-y-2 py-8 px-10">
                            <h1 className="text-2xl text-center font-bold leading-tight tracking-tight text-teal-400 md:text-2xl">
                                Sign Up as NGO
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-4" action="#">
                                <div>
                                    <label for="name" className="block mb-1 text-base font-medium text-gray-900">NGO name</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your name" required="" />
                                </div>
                                <div>
                                    <label for="ngotype" className="block mb-1 text-base font-medium text-gray-900">Select NGO Type</label>
                                    <select value={ngotype} onChange={(e) => setNgotype(e.target.value)} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                        <option selected>Choose a NGO Type</option>
                                        <option value="private">Private Sector Companies (Sec 8/25)</option>
                                        <option value="society">Registered Societies (Non-Government)</option>
                                        <option value="trust">Trust (Non-Government)</option>
                                    </select>
                                </div>
                                <div>
                                    <label for="helpline" className="block mb-1 text-base font-medium text-gray-900">Helpline number</label>
                                    <input value={helpline} onChange={(e) => setHelpline(e.target.value)} type="text" name="helpline" id="helpline" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your helpline number" required="" />
                                </div>
                                <div>
                                    <label for="email" className="block mb-1 text-base font-medium text-gray-900">Your email</label>
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@example.com" required="" />
                                </div>
                                <div>
                                    <label for="password" className="block mb-1 text-base font-medium text-gray-900">Password</label>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                                </div>
                                <div>
                                    <label for="register" className="block mb-1 text-base font-medium text-gray-900">Unique Registration number</label>
                                    <input value={regisnum} onChange={(e) => setRegisnum(e.target.value)} type="text" name="regisnum" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter NGO's unique registration number" required="" />
                                </div>
                                <div>
                                    <label for="addres" className="block mb-1 text-base font-medium text-gray-900">Address</label>
                                    <textarea value={address} onChange={(e) => setAddress(e.target.value)} type="text" name="address" id="password" placeholder="Write your address..." rows={2}
                                        cols={40} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                                </div>

                                <button type="submit" className="w-full text-white bg-teal-400 hover:bg-teal-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-base px-5 py-2.5 text-center ">Sign Up</button>
                                <p className="text-base font-normal text-gray-800">
                                    Alreay have an account ? <a href="/login" className="font-medium text-lg text-teal-500 hover:underline ">Login</a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='mt-16 mr-28'>
                    <Lottie options={DefaultOptions} height={650} width={650} />
                    <ToastContainer
                        position="bottom-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                    />
                </div>
            </div>
    )
}

export default NGOSignUp