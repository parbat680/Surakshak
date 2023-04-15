import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom'
import { deepPurple } from '@mui/material/colors';
import { useEffect } from 'react';
import axios from 'axios';
import { constant } from '../constants';
import { useState } from 'react';

function MyElders() {

  const [elders, setElders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log(token)
    const formdata = new FormData()

    axios.post(constant.API_URL + '/api/v1/volunteer/display/patients', formdata, {
      headers: {
        'Content-Type': 'application/json',
        'token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiZW1haWwiOiJyaWNoYXJkQHRlc3QuY29tIiwibmFtZSI6IkNocmlzIERpYXMgIn0sImlhdCI6MTY4MTU5Mzc4MywiZXhwIjoxNjg0MTg1NzgzfQ.Xk-rCqsi8YeUugPiuUnnw3SffJput-uudl-JK-gn4PM"
      },
    })
      .then(res => {
        // setLoader(false);
        setElders(res.data)
        console.log(res)
      })
      .catch(err => {
        alert("Something went wrong")
        console.log("Frontend err: ", err)
      });
  }, [])



  const navigate = useNavigate();

  const navigateToElderStats = () => {
    navigate('/elderstats')
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '80px' }}>
      <br></br>

      <p className='text-center text-4xl font-alkatra text-blue-800'>It's our duty to take care of our elders</p>
      <br></br>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

        {
          elders.length > 0 ? elders.map((item, index) =>
            <div style={{ backgroundColor: '#e8e8e8', paddingTop: '5px', paddingBottom: '5px', marginLeft: '5%', marginRight: '5%', marginTop: '5px', border: '1px solid grey', borderRadius: '4px', paddingLeft: '1%', paddingRight: '10%' }} role="presentation" onClick={navigateToElderStats}>
              <Breadcrumbs sx={{ display: 'flex', justifyContent: 'center' }} aria-label="breadcrumb">
                <Avatar
                  sx={{ bgcolor: deepPurple[500] }}
                  alt="Remy Sharp"
                  src="broken-image.jpg"
                />
                <div>
                  <Typography variant="h6" component="div">
                    {item.seniorId.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {item.seniorId.phone}
                  </Typography>
                </div>
              </Breadcrumbs>
            </div>
          ) : <h1>No products found</h1>
        }




      </div>

    </div>
  )
}

export default MyElders
