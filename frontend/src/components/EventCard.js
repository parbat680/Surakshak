import React from 'react'
import Event from '../assets/event.jpg'
import LocationIcon from '../assets/location.png'
import { Link } from 'react-router-dom'

const EventCard = ({ data }) => {
    return (
        <>
            <div className="w-[350px] bg-white border border-gray-200 rounded-lg shadow">
                <a href="#">
                    <img className="rounded-t-lg object-fit w-full" src={Event} alt="" />
                </a>
                <div className="p-5">
                    <label className='text-2xl font-bold tracking-tight text-gray-900 mb-2'>{data.name}</label>
                    <div className='flex flex-row p-1 bg-blue-300 rounded-xl py-1 px-3 text-xl my-1'><img src={LocationIcon} alt="location icon" width={28} />{data.address}</div>
                    <p className="mb-3 text-gray-700 ">{data.desc}</p>
                    <div className='flex flex-row justify-between '>
                        <div><label className='font-semibold text-lg'>Date : </label>{data.date}</div>
                        <div><label className='font-semibold text-lg'>Time : </label>{data.duration}</div>
                    </div>
                    <div className='w-[50%] mt-2 ml-auto items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300'>
                        <Link to='/'> View on map</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventCard