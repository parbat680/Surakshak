import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import moment from 'moment/moment';
function createData(Date, BP, HeartBeat, Diabetes) {
  return { Date, BP, HeartBeat, Diabetes};
}

const rows = [
  createData('15/4/23', 159, 6.0, 24,),
  createData('16/4/23', 237, 9.0, 37),
  createData('17/4/23', 262, 16.0, 24),
  createData('18/4/23', 305, 3.7, 67),
  createData('19/4/23', 356, 16.0, 49),
];

export default function PatientTable(props) {


    
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">BP</TableCell>
            <TableCell align="right">Heart Beat</TableCell>
            
            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow
              key={row.Date}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {moment(row.date).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell align="right">{row.bloodPressure.sistolic}</TableCell>
              <TableCell align="right">{row.pulse}</TableCell>
              
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}