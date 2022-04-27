import *  as React from 'react';
import { useState, useEffect } from 'react'
import _ from "loadsh"
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { TextField } from '@mui/material';
import Showcolumn from './Showcolumn';
import './Tablecom.css'


export default function Tablecom({ columnNames, listData }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [show, setShow] = useState(false)     //to show pop up like component for the column choosed to only view
    const [liData, setData] = useState([])
    const [showData, setshowData] = useState({})
    const [sorted, setSorted] = useState(false)
    const [searchData, setSearchData] = useState({})

    useEffect(() => {
        setData(listData)
    }, [])


    //Adding index column name
    //Adding index column name
    columnNames = ["Index", ...columnNames]
    const columns = columnNames.map((ele) => {
        return { id: ele, label: _.toUpper(ele), minWidth: 170 }
    })

    //Adding index value in each list
    //Adding index value in each list
    const rows = liData.map((ele, idx) => {
        ele = [idx + 1, ...ele]
        return createData(ele)
    })


    //Event function for page change
    //Event function for page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    //Event function to select row per page
    //Event function to select row per page
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    //Function to create Json object of each row from listData
    //Function to create Json object of each row from listData
    function createData(lidata) {
        let tmp = {}
        let j = 0;
        for (let i = 0; i < columnNames.length; i++) {
            if (lidata[j] === null) {
                tmp[columnNames[i]] = '-';
            }
            else if (lidata[j] === true || lidata[j] === false) {
                tmp[columnNames[i]] = JSON.stringify(lidata[j]);
            }
            else
                tmp[columnNames[i]] = lidata[j];
            j++;
        }
        return tmp;
    }

    function handleSort(e) {
        let i = parseInt(e.target.name) - 1;

        const tmp = [...listData]    //changing refernce to re-render cause arrays are referenced and that reference has to be changed to re-render
        tmp.sort((a, b) => {
            if (a[i] === b[i])
                return 0;
            else
                return a[i] > b[i] ? 1 : -1
        })
        setData(tmp);
        setSorted(true)
    }
    function handleShow(e) {
        setShow(true)
        let tmp1 = liData.map((ele, idx) => [idx + 1, ele[e.target.name - 1]])
        let tmp2 = ['index', columnNames[e.target.name]]
        setshowData({ data: tmp1, col: tmp2 })
    }
    function handleSort2(e) {
        setShow(false)
    }

    function handleFilter(e) {
        setSearchData((prev) => {
            if (e.target.value === 'all') {
                return { ...prev, col: e.target.value }
            }
            return { ...prev, col: e.target.value - 1 }
        })
    }

    function handleChange(e) {
        setSearchData((prev) => {
            return { ...prev, row: e.target.value }
        })
    }

    function handleFilterSubmit(e) {
        if (searchData['col'] === 'all') {
            setSorted(false)
            setData(listData)
            return;
        }
        let tmp = listData.filter((ele) => {
            return typeof (ele[searchData['col']]) === 'number' || typeof(ele[searchData['col']]) === 'boolean'? JSON.stringify(ele[searchData['col']]) === searchData['row'] : ele[searchData['col']] === searchData['row']
        })
        setData(tmp)
    }

    return (
        <div>
            {show ? <div> 
                <Button 
                variant="contained" 
                onClick={handleSort2} 
                style={{ color: "white", width: "10px", margin: "5px 5px 30px 50px" }}>
                    Back
                    </Button>
                    <Showcolumn 
                    data={showData} 
                    sorted={sorted} 
                    />
                    </div> :
                <><FormControl>
                    <FormLabel id="demo-radio-buttons-group-label">Filter</FormLabel>
                    <RadioGroup
                        className='tablecom__radio'
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        <div className='tablecom__filter'>
                            {columnNames.map((ele, idx) => {
                                return idx === 0 ? <></> : <FormControlLabel value={idx} control={<Radio />} onClick={handleFilter} label={_.toUpper(ele)} />
                            })}
                        </div>
                        <FormControlLabel value='all' control={<Radio />} onClick={handleFilter} label='SHOW ALL' />
                        <TextField id="outlined-basic" label="Value" variant="outlined" onChange={handleChange} />
                        <Button className='tablecom__text__submit' onClick={handleFilterSubmit} variant="contained">Search</Button>
                    </RadioGroup>
                </FormControl>
                    <Paper className='tablecom' sx={{ width: '90%', padding: "20px", margin: "auto", boxShadow: "0 0 20px 2px gray", borderRadius: "10px" }}>
                        <TableContainer sx={{ height: '40vh' }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column, idx) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ top: 0, minWidth: column.minWidth, fontWeight: "800", fontSize: "14px", backgroundColor: "whitesmoke" }}
                                            >
                                                {column.label}
                                                <br />

                                                {idx !== 0 && <><Button variant="outlined" onClick={handleSort} name={idx} style={{ borderColor: "black", color: "black", width: "10px", margin: "5px 5px 0 0" }}>Sort</Button>
                                                    <Button variant="outlined" name={idx} onClick={handleShow} style={{ borderColor: "blue", color: "blue", width: "10px", margin: "5px 5px 0 0" }}>Show</Button></>}
                                            </TableCell>

                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper></>}

        </div>
    );
}
