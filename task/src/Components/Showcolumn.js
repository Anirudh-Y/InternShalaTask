import React, { useEffect, useState } from 'react'
import _ from 'loadsh'
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import './Showcolumn.css'

function Showcolumn({ data,sorted }) {

  const [rows, setrows] = useState([])
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    setrows((prev) => {
      let tmp = data.data.map((e) => {
        let tmp2 = {}
        tmp2[col[0]] = e[0];
        tmp2[col[1]] = e[1];
        return tmp2
      })
      return tmp
    })
  }, [])


  const col = data.col
  const columns = [{ id: col[0], label: _.toUpper(col[0]), minWidth: 170 },
  { id: col[1], label: _.toUpper(col[1]), minWidth: 170 }]

  function handleSort(e) {
    let tmp = [...rows]
    tmp.sort((a, b) => {
      if (a[col[1]] === b[col[1]])
        return 0
      else
        return a[col[1]] > b[col[1]] ? 1 : -1

    })
    for (let i = 0; i < tmp.length; i++){
      tmp[i]['index']=i+1
    }
    setrows(tmp)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <div>  
      <Paper sx={{ width: '90%', padding: "20px", margin: "auto", boxShadow: "0 0 20px 2px gray", borderRadius: "10px" }}>
        <TableContainer sx={{ height: '60vh' }}>
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
                    {sorted || idx===0 ?<></>: <Button variant="outlined" onClick={handleSort} name={idx} style={{ borderColor: "black", color: "black", width: "10px", margin: "5px 5px 0 0" }}>Sort</Button>}
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
      </Paper>

    </div>
  );
}

export default Showcolumn