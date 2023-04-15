import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom'
import { deepPurple } from '@mui/material/colors';

function MyElders() {

  const navigate = useNavigate();

  const navigateToElderStats = () => {
    navigate('/elderstats')
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '80px' }}>
      <br></br>

      <p className='text-center text-4xl font-alkatra text-blue-800'>It's our duty to take care of our elders</p>
      <br></br>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent:'center' }}>

        <div style={{ backgroundColor: '#e8e8e8', paddingTop: '10px', paddingBottom: '10px', marginLeft: '5%', marginRight: '5%', marginTop: '5px', border: '1px solid grey', borderRadius: '4px', paddingLeft: '1%', paddingRight: '10%' }} role="presentation" onClick={navigateToElderStats}>
          <Breadcrumbs sx={{ display: 'flex', justifyContent: 'center' }} aria-label="breadcrumb">
            <Avatar
              sx={{ bgcolor: deepPurple[500] }}
              alt="Remy Sharp"
              src="/broken-image.jpg"
            />
            <Typography color="text.primary">Chris Dias</Typography>
          </Breadcrumbs>
        </div>

        <div style={{ backgroundColor: '#e8e8e8', paddingTop: '10px', paddingBottom: '10px', marginLeft: '5%', marginRight: '5%', marginTop: '5px', border: '1px solid grey', borderRadius: '4px', paddingLeft: '1%', paddingRight: '10%' }} role="presentation" onClick={navigateToElderStats}>
          <Breadcrumbs sx={{ display: 'flex', justifyContent: 'center' }} aria-label="breadcrumb">
            <Avatar
              sx={{ bgcolor: deepPurple[500] }}
              alt="Remy Sharp"
              src="/broken-image.jpg"
            />
            <Typography color="text.primary">Chris Dias</Typography>
          </Breadcrumbs>
        </div>
        <div style={{ backgroundColor: '#e8e8e8', paddingTop: '10px', paddingBottom: '10px', marginLeft: '5%', marginRight: '5%', marginTop: '5px', border: '1px solid grey', borderRadius: '4px', paddingLeft: '1%', paddingRight: '10%' }} role="presentation" onClick={navigateToElderStats}>
          <Breadcrumbs sx={{ display: 'flex', justifyContent: 'center' }} aria-label="breadcrumb">
            <Avatar
              sx={{ bgcolor: deepPurple[500] }}
              alt="Remy Sharp"
              src="/broken-image.jpg"
            />
            <Typography color="text.primary">Chris Dias</Typography>
          </Breadcrumbs>
        </div>
        <div style={{ backgroundColor: '#e8e8e8', paddingTop: '10px', paddingBottom: '10px', marginLeft: '5%', marginRight: '5%', marginTop: '5px', border: '1px solid grey', borderRadius: '4px', paddingLeft: '1%', paddingRight: '10%' }} role="presentation" onClick={navigateToElderStats}>
          <Breadcrumbs sx={{ display: 'flex', justifyContent: 'center' }} aria-label="breadcrumb">
            <Avatar
              sx={{ bgcolor: deepPurple[500] }}
              alt="Remy Sharp"
              src="/broken-image.jpg"
            />
            <Typography color="text.primary">Chris Dias</Typography>
          </Breadcrumbs>
        </div>
        <div style={{ backgroundColor: '#e8e8e8', paddingTop: '10px', paddingBottom: '10px', marginLeft: '5%', marginRight: '5%', marginTop: '5px', border: '1px solid grey', borderRadius: '4px', paddingLeft: '1%', paddingRight: '10%' }} role="presentation" onClick={navigateToElderStats}>
          <Breadcrumbs sx={{ display: 'flex', justifyContent: 'center' }} aria-label="breadcrumb">
            <Avatar
              sx={{ bgcolor: deepPurple[500] }}
              alt="Remy Sharp"
              src="/broken-image.jpg"
            />
            <Typography color="text.primary">Chris Dias</Typography>
          </Breadcrumbs>
        </div>
        <div style={{ backgroundColor: '#e8e8e8', paddingTop: '10px', paddingBottom: '10px', marginLeft: '5%', marginRight: '5%', marginTop: '5px', border: '1px solid grey', borderRadius: '4px', paddingLeft: '1%', paddingRight: '10%' }} role="presentation" onClick={navigateToElderStats}>
          <Breadcrumbs sx={{ display: 'flex', justifyContent: 'center' }} aria-label="breadcrumb">
            <Avatar
              sx={{ bgcolor: deepPurple[500] }}
              alt="Remy Sharp"
              src="/broken-image.jpg"
            />
            <Typography color="text.primary">Chris Dias</Typography>
          </Breadcrumbs>
        </div>
        <div style={{ backgroundColor: '#e8e8e8', paddingTop: '10px', paddingBottom: '10px', marginLeft: '5%', marginRight: '5%', marginTop: '5px', border: '1px solid grey', borderRadius: '4px', paddingLeft: '1%', paddingRight: '10%' }} role="presentation" onClick={navigateToElderStats}>
          <Breadcrumbs sx={{ display: 'flex', justifyContent: 'center' }} aria-label="breadcrumb">
            <Avatar
              sx={{ bgcolor: deepPurple[500] }}
              alt="Remy Sharp"
              src="/broken-image.jpg"
            />
            <Typography color="text.primary">Chris Dias</Typography>
          </Breadcrumbs>
        </div>
        
        
      </div>

    </div>
  )
}

export default MyElders
