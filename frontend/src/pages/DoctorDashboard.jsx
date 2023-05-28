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
import { SelectAllRounded } from "@mui/icons-material";

const DoctorDashboard = () => {
  const [patient, setPatients] = useState([]);
  const [patientData,setPatientData]= useState([]);
  const [selectPatient,setSelectPatient]= useState([]);

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
  
 

  useEffect(() => {
    fetch("http://34.93.44.181/api/v1/doctor/get/patients", {
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
    const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, '0');
const day = today.getDate().toString().padStart(2, '0');
    fetch("http://34.93.44.181/api/v1/doctor/get/patientdetails", {
      method: "POST",
      
      headers: {
        "Content-Type": "application/json",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsibmFtZSI6IkRyLiBTYXdhbnQiLCJlbWFpbCI6InNhd2FudGRyQGdtYWlsLmNvbSJ9LCJpYXQiOjE2ODE1NTg3NDIsImV4cCI6MTY4NDE1MDc0Mn0.c5dw8IDhDEmM_T_w2qj3yV-KK6hA6Ioxzh-wf8ptga4",
      },
      body:JSON.stringify({
        "id":patient._id,
        "date":`${year}/${month}/${day}`
      })
    })
      .then((res) => res.json())
      .then((data) => {
       
        console.log(data);
        setPatientData(data);
        makeData();
        
      })
      .catch((e) => console.log(e));
    // setSelectedPatient(patient);
  };

  const makeData=()=> {
    var bp=[];
    var heart=[];
    console.log(patientData,"data")
    for(var i=0;i<patientData.length;i++){
      bp[i]=patientData[i].bloodPressure.sistolic === -1?patientData[i].bloodPressure.sistolic:"NA";

      if(patientData[i].pulse===-1) continue;
      heart[i]= patientData[i].pulse;
    }

    setSelectPatient({bloodPressure:bp,pulse:heart})
  }

  const chartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        label: "Blood Pressure",
        data: selectPatient.bloodPressure,
        fill: false,
        borderColor: "#EC932F",
        tension: 0.1,
      },
      {
        label: "Heart Rate",
        data: selectPatient ? selectPatient.pulse : [],
        fill: false,
        borderColor: "#36A2EB",
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
                      onClick={() => handlePatientClick(p)}
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
          {/* {selectedPatient ? selectedPatient.name : "No patient selected"} */}
        </Typography>
        <br />
        <Line data={chartData} options={options} />
        <PatientTable data={patientData}/>
      </Grid>
    </Grid>
  );
};

export default DoctorDashboard;
