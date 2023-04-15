import React from 'react'
import EventCard from './EventCard'

const Event = () => {
    const EventData = [
        {
          "_id": "64284066c4b8c8b12029237d",
          "organiserEmail": "aged2@gmail.com",
          "name": "Music",
          "day": "Monday",
          "date": "2023-04-01T00:00:00.000Z",
          "organiser": "Aged",
          "organiserPhone": "9876543110",
          "address": "Kandivali",
          "facilities": "Drinks",
          "duration": "10:30-1:30",
          "food": true,
          "pick": false,
          "desc": "Musical event",
          "__v": 0
        },
        {
          "_id": "64284078c4b8c8b120292380",
          "organiserEmail": "aged2@gmail.com",
          "name": "Dance",
          "day": "Monday",
          "date": "2023-04-01T00:00:00.000Z",
          "organiser": "Aged",
          "organiserPhone": "9876543110",
          "address": "Borivali",
          "facilities": "Drinks",
          "duration": "10:30-1:30",
          "food": true,
          "pick": false,
          "desc": "Dance event",
          "__v": 0
        },
        {
          "_id": "64284090c4b8c8b120292383",
          "organiserEmail": "aged2@gmail.com",
          "name": "Games",
          "day": "Wednesday",
          "date": "2023-04-03T00:00:00.000Z",
          "organiser": "Aged",
          "organiserPhone": "9876543110",
          "address": "Malad",
          "facilities": "Drinks",
          "duration": "10:30-1:30",
          "food": true,
          "pick": false,
          "desc": "Games event",
          "__v": 0
        }
      ]

    return (
        <div>
            <div className='grid grid-cols-3'>
                {EventData.map((event, id) => {
                    // console.log(event)
                    return (
                        <EventCard key={id} data={event} />
                    )
                })}
            </div>
        </div>
    )
}

export default Event