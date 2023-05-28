import React, { useState } from 'react'
import Lottie from 'react-lottie'
import RegisterPic from '../assets/register.json'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const VolunteerSignUp = () => {
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
  const [age, setAge] = useState(18);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (age < 18) {
      toast.error("Age Should be greater than 18")
    } else if (name.length < 3) {
      toast.error("Name must contain atleast 3 characters")
    } else if (password.length < 5) {
      toast.error("Password must contain atleast 6 characters")
    }

    // toast.success("Login Successful!")

    try {
      const response = await fetch("http://34.93.44.181/api/v1/volunteer/signup",
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, phone, age, password }),

        }
      );

      if (response.status === 200) {
        alert('Signed Up successfully')
        const resp = await response.json();
        localStorage.setItem("token", resp.token);
        localStorage.setItem("type", 'volunteer');
        navigate('/volunteerdashboard')
      }


      console.log(response);
      toast.success("Your Registration Successful");
    } catch (err) {
      console.log(err);
      alert("Something Went Wrong");
    }
    //  setEmail("");
    //  setPassword("");
  }
  return (
    <div className='grid grid-cols-2 bg-gray-50'>
      <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto pl-28 md:h-screen lg:py-0">
        <h2 className='text-teal-400 font-bold text-3xl mb-4'>Logo</h2>
        <div className="w-[500px] bg-white rounded-lg drop-shadow-lg">
          <div className="space-y-2 py-8 px-10">
            <h1 className="text-2xl text-center font-bold leading-tight tracking-tight text-teal-400 md:text-2xl">
              Sign Up as Volunteer
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-4" action="#">
              <div>
                <label htmlFor="name" className="block mb-2 text-base font-medium text-gray-900">Volunteer name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your name" required="" />
              </div>
              <div>
                <label htmlFor="age" className="block mb-2 text-base font-medium text-gray-900">Age (Must be above 18)</label>
                <input value={age} onChange={(e) => setAge(e.target.value)} type="number" name="age" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Must be above 55" required="" />
              </div>
              <div>
                <label htmlFor="phone" className="block mb-2 text-base font-medium text-gray-900">Phone number</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" name="phone" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your phone number" required="" />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-base font-medium text-gray-900">Your email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@example.com" required="" />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-base font-medium text-gray-900">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
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

export default VolunteerSignUp