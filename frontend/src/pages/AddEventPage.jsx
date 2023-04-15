import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/featured/?senior-citizens)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
  },
}));

export default function AddEventPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}>
            <Typography variant="h5" component="h2">
              Add Event
            </Typography>
            <form noValidate autoComplete="off">
              <TextField
                id="name"
                label="Name"
                fullWidth
              />
              <TextField
                id="day"
                label="Day"
                fullWidth
              />
              <TextField
                id="date"
                label="Date"
                type="date"
                defaultValue={new Date().toISOString().slice(0,10)}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
              <TextField
                id="organiser"
                label="Organiser"
                fullWidth
              />
              <TextField
                id="address"
                label="Address"
                fullWidth
              />
              <TextField
                id="facilities"
                label="Facilities"
                fullWidth
              />
              <TextField
                id="duration"
                label="Duration"
                fullWidth
              />
              <TextField
                id="desc"
                label="Description"
                multiline
                rows={4}
                fullWidth
              />
              <TextField
                id="location"
                label="Location"
                fullWidth
              />
              <Button variant="contained" color="primary">
                Add Event
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.image} />
        </Grid>
      </Grid>
    </div>
  );
}
