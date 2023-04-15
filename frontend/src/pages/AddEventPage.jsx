import { Container, Grid, TextField, Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from '../assets/HeroPic.png'
import { useState } from 'react';
import { constant } from '../constants';
import axios from 'axios';import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2196f3', // set primary color to light blue
        },
        background: {
            default: '#fff', // set background color to white
        },
    },
});

function AddEventPage() {

    const [imageUpload, setImageUpload] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        day: '',
        date: '',
        organiser: '',
        address: '',
        facilities: '',
        duration: '',
        food: false,
        pick: false,
        desc: '',
        location: '',
        image:'',
    });

    const handleNameChange = (event) => {
        setFormData({ ...formData, name: event.target.value });
    }
    const handleDayChange = (event) => {
        setFormData({ ...formData, day: event.target.value });
    }
    const handleDateChange = (event) => {
        setFormData({ ...formData, date: event.target.value });
    }
    const handleOrganiserChange = (event) => {
        setFormData({ ...formData, organiser: event.target.value });
    }
    const handleAddressChange = (event) => {
        setFormData({ ...formData, address: event.target.value });
    }
    const handleFacilitiesChange = (event) => {
        setFormData({ ...formData, facilities: event.target.value });
    }
    const handleDurationChange = (event) => {
        setFormData({ ...formData, duration: event.target.value });
    }
    const handleDescriptionChange = (event) => {
        setFormData({ ...formData, desc: event.target.value });
    }
    const handleLocationChange = (event) => {
        setFormData({ ...formData, location: event.target.value });
    }
    const handleImageChange = (event) => {
        setFormData({ ...formData, image: event.target.files[0] });
        setImageUpload(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(localStorage.getItem('token'))

        const formdata = new FormData();
        formdata.append('name', formData.name);
        formdata.append('day', formData.day);
        formdata.append('date', formData.date);
        formdata.append('organiser', formData.organiser);
        formdata.append('address', formData.address);
        formdata.append('facilities', formData.facilities);
        formdata.append('duration', formData.duration);
        formdata.append('food', formData.food);
        formdata.append('pick', formData.pick);
        formdata.append('desc', formData.desc);
        formdata.append('image', formData.image);


        axios.post(constant.API_URL + '/api/v1/event/add', formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'token': localStorage.getItem('token')
            },
        })
            .then(res => {
                // setLoader(false);
                console.log(res)

                if (res.status === 200) {
                    alert("Event added Successfully")
                } else {
                    alert("Something went wrong")
                }
            })
            .catch(err => {
                console.log("Frontend err: ", err)
            });
    }




    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <br></br><br></br><br></br><br></br>
                <p className='text-center text-4xl font-alkatra text-blue-800'>Add Event</p>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField onChange={handleNameChange} fullWidth label="Name" name="name" required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleDayChange} fullWidth label="Day" name="day" required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleDateChange} fullWidth label="Date" name="date" required type="date" InputLabelProps={{ shrink: true }} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleOrganiserChange} fullWidth label="Organiser" name="organiser" required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleAddressChange} fullWidth label="Address" name="address" required />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleFacilitiesChange} fullWidth label="Facilities" name="facilities" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleDurationChange} fullWidth label="Duration" name="duration" />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleDescriptionChange} fullWidth label="Description" name="description" multiline rows={4} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={handleLocationChange} fullWidth label="Location" name="location" required />
                                </Grid>
                                <Button variant="contained" value={formData.image} component="label" onChange={handleImageChange}>
                                    Upload
                                    <input hidden type="file" />
                                </Button>
                                <IconButton color="primary" aria-label="upload picture" component="label" onChange={handleImageChange}>
                                    <input hidden type="file" name="image" />
                                    <PhotoCamera />
                                </IconButton>
                                <Grid item xs={12}>
                                    <Button onClick={handleSubmit} variant="contained" color="primary" type="submit" fullWidth>
                                        Add Event
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <img src={Image} alt="event" style={{ maxWidth: '100%', height: 'auto' }} />
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

export default AddEventPage;
