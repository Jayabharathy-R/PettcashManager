import { Button } from '@mui/material';
import React,{useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { userExpenseAction } from '../redux/slices/expenseSlice';
import { useDispatch ,useSelector} from 'react-redux';


const columns = [
    { id: 'title', label: 'Title', minWidth: 170 },
    {
        id: 'amount',
        label: 'Amount',
        minWidth: 170,
        align: 'center',
       
      },
    { id: 'type', label: 'Catagory', minWidth: 100 },
   
    {
      id: 'description',
      label: 'Description',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: 'date',
      label: 'Date',
      minWidth: 170,
      align: 'center',
      format: (value) => value.toLocaleString('en-US'),
    },
  ];
  
 
 

function Profile() {
    const dispatch=useDispatch();
    const [rows,setRows]=useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const userExpense=useSelector((state)=>state?.expense.userExpense);
   console.log(userExpense);
    setRows(userExpense);


      useEffect(()=>{
          const getExpense=()=>{
          dispatch(userExpenseAction());
          }
          getExpense();
        
        },[]);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
   

    return ( 
        <div>
            
           <div id="entrybtn">
        <select name="type">
            <option>Search by catagory</option>
            <option value="expense">Expense</option>
            <option value="cashIn">Cash in</option>
            <option value="cashOut">Cash out</option>
        </select>
        <div><Button variant="contained" >Add Expense</Button></div>
        <div><Button variant="contained" >Cash In</Button></div>
        <div><Button variant="contained">Cash Out</Button></div>
      </div>

      <Paper sx={{ width: '90%', overflow: 'hidden',margin:'50px auto' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow >
              {columns.map((column) => (
                <TableCell sx={{fontWeight:'bold',backgroundColor:'lightgray'}}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
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

export default Profile;