import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom'

function MyElders() {

  const navigate = useNavigate();

  const navigateToElderStats = () => {
    navigate('/elderstats')
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop:'80px' }}>

      <div style={{ backgroundColor: '#e8e8e8', paddingTop: '10px', paddingBottom: '10px', marginLeft: '5%', marginRight: '5%', marginTop: '5px', border: '1px solid grey', borderRadius: '4px' }} role="presentation" onClick={navigateToElderStats}>
        <Breadcrumbs sx={{ display: 'flex', justifyContent: 'center' }} aria-label="breadcrumb">
          <Typography color="text.primary">Chris Dias</Typography>
        </Breadcrumbs>
      </div>
      <div style={{ backgroundColor: '#e8e8e8', paddingTop: '10px', paddingBottom: '10px', marginLeft: '5%', marginRight: '5%', marginTop: '5px', border: '1px solid grey', borderRadius: '4px' }} role="presentation" onClick={navigateToElderStats}>
        <Breadcrumbs sx={{ display: 'flex', justifyContent: 'center' }} aria-label="breadcrumb">
          <Typography color="text.primary">Chris Dias</Typography>
        </Breadcrumbs>
      </div>
      <div style={{ backgroundColor: '#e8e8e8', paddingTop: '10px', paddingBottom: '10px', marginLeft: '5%', marginRight: '5%', marginTop: '5px', border: '1px solid grey', borderRadius: '4px' }} role="presentation" onClick={navigateToElderStats}>
        <Breadcrumbs sx={{ display: 'flex', justifyContent: 'center' }} aria-label="breadcrumb">
          <Typography color="text.primary">Chris Dias</Typography>
        </Breadcrumbs>
      </div>
      <div style={{ backgroundColor: '#e8e8e8', paddingTop: '10px', paddingBottom: '10px', marginLeft: '5%', marginRight: '5%', marginTop: '5px', border: '1px solid grey', borderRadius: '4px' }} role="presentation" onClick={navigateToElderStats}>
        <Breadcrumbs sx={{ display: 'flex', justifyContent: 'center' }} aria-label="breadcrumb">
          <Typography color="text.primary">Chris Dias</Typography>
        </Breadcrumbs>
      </div>
      <div style={{ backgroundColor: '#e8e8e8', paddingTop: '10px', paddingBottom: '10px', marginLeft: '5%', marginRight: '5%', marginTop: '5px', border: '1px solid grey', borderRadius: '4px' }} role="presentation" onClick={navigateToElderStats}>
        <Breadcrumbs sx={{ display: 'flex', justifyContent: 'center' }} aria-label="breadcrumb">
          <Typography color="text.primary">Chris Dias</Typography>
        </Breadcrumbs>
      </div>
      <div style={{ backgroundColor: '#e8e8e8', paddingTop: '10px', paddingBottom: '10px', marginLeft: '5%', marginRight: '5%', marginTop: '5px', border: '1px solid grey', borderRadius: '4px' }} role="presentation" onClick={navigateToElderStats}>
        <Breadcrumbs sx={{ display: 'flex', justifyContent: 'center' }} aria-label="breadcrumb">
          <Typography color="text.primary">Chris Dias</Typography>
        </Breadcrumbs>
      </div>
      <div style={{ backgroundColor: '#e8e8e8', paddingTop: '10px', paddingBottom: '10px', marginLeft: '5%', marginRight: '5%', marginTop: '5px', border: '1px solid grey', borderRadius: '4px' }} role="presentation" onClick={navigateToElderStats}>
        <Breadcrumbs sx={{ display: 'flex', justifyContent: 'center' }} aria-label="breadcrumb">
          <Typography color="text.primary">Chris Dias</Typography>
        </Breadcrumbs>
      </div>

      <div style={{ backgroundColor: '#e8e8e8', paddingTop: '10px', paddingBottom: '10px', marginLeft: '5%', marginRight: '5%', marginTop: '5px', border: '1px solid grey', borderRadius: '4px' }} role="presentation" onClick={navigateToElderStats}>
        <Breadcrumbs sx={{ display: 'flex', justifyContent: 'center' }} aria-label="breadcrumb">
          <Typography color="text.primary">Chris Dias</Typography>
        </Breadcrumbs>
      </div>

    </div>
  )
}

export default MyElders
