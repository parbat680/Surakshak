import React from 'react'
import Nurse from '../assets/nurse.png';

const ServiceCard = ({data}) => {
    return (
        <div>
            <div className="w-[400px] mb-10 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-sky-50 flex flex-row">
                <div className='flex justify-center w-[30%]'>
                    <img className='object-fit items-center w-25 h-20  p-1 border-4 border-teal-300 rounded-full hover:bg-teal-300' src={data.imgae} alt="" />
                </div>

                <div className='ml-4 w-[70%]'>
                    <p className='text-center text-2xl font-alkatra text-blue-800'>{data.service}</p>
                    <p className="mb-3 text-lg mt-2 px-4 font-normal text-gray-500 font-poppins">Go to this step by step guideline process on how to certify for your weekly benefits:</p>
                </div>
            </div>
        </div>
    )
}

export default ServiceCard