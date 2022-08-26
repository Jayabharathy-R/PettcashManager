import React,{useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
// import { userExpenseAction } from '../redux/slices/expenseSlice';
import { useSelector} from 'react-redux';
import axios from 'axios';
import baseUrl from '../utilities/baseUrl';
import EntryButton from './EntryButton';




const columns = [
    { id: 'title', label: 'Title', minWidth: 150 },
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
    // const dispatch=useDispatch();
    const [totalBal,setTotalBal]=useState(0);
    const [rows,setRows]=useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const userToken=useSelector((state)=>state?.user?.userAuth?.token);
    // const expense=useSelector((state)=>state?.expense);
    // const {  userExpense } = expense;
    console.log(rows);
    
    //  const totalBalance=rows.reduce((acc,row)=>{
    // return (row.type=='Cash In')? acc+row.amount: acc-row.amount;
    //  },0);
    //  console.log(totalBalance);
     useEffect(()=>{
      const totalBalance=rows.reduce((acc,row)=>{
        return (row.type==='Cash In')? acc+row.amount: acc-row.amount;
         },0);
      setTotalBal(totalBalance);
     },[rows]);
    

    useEffect(()=>{
      const config={
        headers:{
            Authorization: `Bearer ${userToken}`,
        }
    }
      const getExpense=async()=>{
       const {data}= await axios.get(`${baseUrl}/expense/userExpense`, config);
      
      setRows(data);
      }
            getExpense();
            
    },[userToken])
    // setRows(userExpense);


    //   useEffect(()=>{
    //       const getExpense=()=>{
    //       dispatch(userExpenseAction());
    //       }
    //       getExpense();
        
    //     },[dispatch]);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
   

    return ( 
        <div>
            
      
        <EntryButton totalBal={totalBal}/>
      <Paper sx={{ width: '90%', overflow: 'hidden',margin:'auto',marginTop:'50px' }}>
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