import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { useState } from 'react';
import TablePagination from '@mui/material/TablePagination';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rowsPerPage = 10;


export default function ElderStats() {

    const [page, setPage] = useState(0);

    const rows = [
        createData('19th April', 159, 6.0),
        createData('19th April', 237, 9.0),
        createData('19th April', 262, 16.0),
        createData('19th April', 305, 3.7),
        createData('19th April', 356, 16.0),
        createData('19th April', 356, 16.0),
        createData('19th April', 356, 16.0),
        createData('19th April', 356, 16.0),
        createData('19th April', 356, 16.0),
        createData('19th April', 356, 16.0),
        createData('19th April', 356, 16.0),
        createData('19th April', 356, 16.0),
        createData('19th April', 356, 16.0),
        createData('19th April', 356, 16.0),
        createData('19th April', 356, 16.0),
        createData('19th April', 356, 16.0),
        createData('19th April', 356, 16.0),
        createData('19th April', 356, 16.0),
        createData('19th April', 356, 16.0),
        createData('19th April', 356, 16.0)
    ];

    // handle changing the page
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div style={{ display: 'flex', marginTop: '50px', flexDirection: 'column' }}>
           

            <TableContainer sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column', backgroundColor: '#e8e8e8', alignItems: 'center', paddingTop: '30px', paddingBottom: '50px' }} component={Paper}>
                <Typography variant="h5" component="div">
                    Name: Chris Dias
                </Typography>
                <br></br>
                <Table sx={{ minWidth: 350, maxWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ backgroundColor: '#3f83f8', color: 'white' }}>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Blood Pressure</TableCell>
                            <TableCell align="right">Pulse Rate</TableCell>
                            <TableCell align="right"></TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ backgroundColor: 'white' }}>
                        {rows && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: 'white' }}
                            >
                                <TableCell component="th" scope="row">{row.name}</TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                />
            </TableContainer>
        </div>
    );
}
