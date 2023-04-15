import React from 'react'
import Header from '../components/Navbar'

import HeroPic from '../assets/HeroPic.png';
import Event from '../components/Event';
// import ServiceCard from '../components/ServiceCard';
import Service from '../components/Service';



const Hero = () => {
  return (
    <>
      <Header />
      <div className="w-full px-28">

        <div className="mb-16 px-14 -mt-16">
          <div className="flex flex-row items-center h-screen">
            <div className="">
              <p className="text-6xl font-semibold">Welcome to
                <span className="font-bold font-alkatra text-teal-400 underline underline-offset-3 ml-4 decoration-4 decoration-[#8685EF]">
                  Surakshak
                </span>{" "}
              </p>
              <p className="max-w-3xl pt-4 px-1 mt-8 text-gray-500 text-2xl">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam unde quam consequatur. Vel, illum architecto nam repellendus tempora molestias neque cum officia, cupiditate ipsa delectus velit praesentium quis illo nihil!
              </p>
            </div>
            <div className="w-[45%] ml-auto mt-8">
              <img className="" src={HeroPic} alt="Elder" />
            </div>
          </div>

          <section className='h-auto mb-16' id='service'>
            <div className="font-bold flex items-center pl-4 mb-16 text-4xl bg-teal-300 text-blue-800 rounded-lg shadow-lg h-16">
              Services
            </div>
            <div className='max-w-7xl ml-12'>
              <p className='font-alkatra text-5xl text-center text-blue-700 font-bold mb-16'>We Believe Everyone Deserves <span className='text-teal-400'>Our Quality</span> Care</p>
              <Service />
            </div>

          </section>
          <section className='h-screen' id='events'>
            <div className="font-bold flex items-center pl-4 mb-16 text-4xl bg-teal-300 text-blue-800 rounded-lg shadow-lg h-16">
              Events Conducted by AgeWell
            </div>
            <div className='max-w-7xl ml-12'>
              <p className='font-alkatra text-5xl text-center text-blue-700 font-bold mb-16'>Join This Events for <span className='text-teal-400'>Exciting and Informative</span> experience!</p>
              <Event />
            </div>

          </section>
        </div>
      </div>
    </>
  )
}

export default Hero