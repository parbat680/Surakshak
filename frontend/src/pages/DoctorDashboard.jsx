import React, { useState} from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from "react-chartjs-2";

const DoctorDashboard = () => {


    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      );

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };
  const [selectedPatient, setSelectedPatient] = useState(null);
  const patients = [
    {
      id: 1,
      name: "John Doe",
      bloodPressure: [120, 130, 125, 140, 115],
      heartRate: [70, 80, 85, 90, 95],
      diabetes: [90, 95, 100, 105, 110],
    },
    {
      id: 2,
      name: "Jane Smith",
      bloodPressure: [130, 140, 135, 150, 125],
      heartRate: [80, 90, 95, 100, 105],
      diabetes: [80, 85, 90, 95, 100],
    },
    {
      id: 3,
      name: "Bob Johnson",
      bloodPressure: [140, 150, 145, 160, 135],
      heartRate: [90, 100, 105, 110, 115],
      diabetes: [70, 75, 80, 85, 90],
    },
  ];

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };

  const chartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        label: "Blood Pressure",
        data: selectedPatient ? selectedPatient.bloodPressure : [],
        fill: false,
        borderColor: "#EC932F",
        tension: 0.1,
      },
      {
        label: "Heart Rate",
        data: selectedPatient ? selectedPatient.heartRate : [],
        fill: false,
        borderColor: "#36A2EB",
        tension: 0.1,
      },
      {
        label: "Diabetes",
        data: selectedPatient ? selectedPatient.diabetes : [],
        fill: false,
        borderColor: "#FF6384",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    
        scales: {
          x: {
            type: "category",
            labels: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
            ],
          },
          y: {
            beginAtZero: true,
          },
        },
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Patient List</Typography>
      </Grid>
      <Grid item xs={4}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.id}</TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handlePatientClick(patient)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h4">
          {selectedPatient ? selectedPatient.name : "No patient selected"}
        </Typography>
        <br />
        <Line data={chartData} options={options}/>
        
      </Grid>
    </Grid>
  );
};

export default DoctorDashboard;

            
