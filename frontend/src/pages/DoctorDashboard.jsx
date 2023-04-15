import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import PatientTable from "../components/PatientTable";

const DoctorDashboard = () => {
  const [patient, setPatients] = useState([]);

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
        position: "top",
      },
      title: {
        display: true,
        text: "Doctor Report",
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

  useEffect(() => {
    fetch("http://35.154.145.51:5000/api/v1/doctor/get/patients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsibmFtZSI6IkRyLiBTYXdhbnQiLCJlbWFpbCI6InNhd2FudGRyQGdtYWlsLmNvbSJ9LCJpYXQiOjE2ODE1NTg3NDIsImV4cCI6MTY4NDE1MDc0Mn0.c5dw8IDhDEmM_T_w2qj3yV-KK6hA6Ioxzh-wf8ptga4",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPatients(data[0].seniorId);
        console.log(data);
      })
      .catch((e) => console.log(e));
  }, []);

  const handlePatientClick = (patient) => {
    let now = new Date();
    var date= dateformat(now, 'yyyyy/MM/dd');
    fetch("http://35.154.145.51:5000/api/v1/doctor/get/patientdetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsibmFtZSI6IkRyLiBTYXdhbnQiLCJlbWFpbCI6InNhd2FudGRyQGdtYWlsLmNvbSJ9LCJpYXQiOjE2ODE1NTg3NDIsImV4cCI6MTY4NDE1MDc0Mn0.c5dw8IDhDEmM_T_w2qj3yV-KK6hA6Ioxzh-wf8ptga4",
      },
      body:JSON.stringify({
        "id":patient._id,
        "date":date
      })
    })
      .then((res) => res.json())
      .then((data) => {
        setPatients(data[0].seniorId);
        console.log(data);
      })
      .catch((e) => console.log(e));
    // setSelectedPatient(patient);
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

  return (
    <Grid container spacing={3} sx={{ height: "100vh" }}>
      <Grid item xs={12}>
        <Typography variant="h4">Patient List</Typography>
      </Grid>
      <Grid item md={4} xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Phone</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patient.map((p) => (
                <TableRow key={p.uniqueId}>
                  <TableCell>{p.phone}</TableCell>
                  <TableCell>{p.name}</TableCell>
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
      <Grid item md={8} xs={12} sx={{ overflow: "hidden" }}>
        <Typography variant="h4">
          {selectedPatient ? selectedPatient.name : "No patient selected"}
        </Typography>
        <br />
        <Line data={chartData} options={options} />
        <PatientTable />
      </Grid>
    </Grid>
  );
};

export default DoctorDashboard;
