import { Button, Dialog, DialogActions, DialogContent, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import '../App.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { userExpenseCreateAction } from '../redux/slices/expenseSlice';


const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    amount: Yup.number().required("Amount is required"),
    description: Yup.string().required("Description is required"),
});

function EntryButton({totalBal}) {
    const dispatch=useDispatch();
   useEffect(()=>{
    setCurBal(totalBal);
   },[totalBal]);

    const [curBal,setCurBal]=useState(0);
    const [totalExpense,setTotalExpense]=useState(0);
    
      const formik = useFormik({
        initialValues: {
            type: "",
            title: "",
            amount: "",
            description: "",
        },
        validationSchema: validationSchema,
        onSubmit:async (values) => {
           
            dispatch(userExpenseCreateAction(values));
         
            if(values.type==='Cash In'){
                setCurBal(curBal+Number(values.amount));
                
            }
            else
            {
            setCurBal(curBal-Number(values.amount));
            setTotalExpense(totalExpense+Number(values.amount));
        }
    }

    });
    
    const [open, setOpen] = React.useState(false);
    const [cashInOpen, setCashInOpen] = React.useState(false);
    const [cashOutOpen, setCashOutOpen] = React.useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleClickCashInOpen = () => {
        setCashInOpen(true);
    };
    const handleCashInClose = () => {
        setCashInOpen(false);
    };

    const handleClickCashOutOpen = () => {
        setCashOutOpen(true);
    };
    const handleCashOutClose = () => {
        setCashOutOpen(false);
    };
    return (
        <div>
            <div id="entrybtn">
               <div>
               <b className='text-success'>Current Balance={curBal}</b>
              
               </div>
                <div><Button variant="contained" onClick={handleClickOpen}>Add Expense</Button>
                    <Dialog open={open}>
                        <DialogContent>
                            <form className='entryform' onSubmit={formik.handleSubmit}>
                               <div> <TextField id="filled-basic"  label="Expense" variant="filled" disabled 
                               name="type" 
                              
                                // value="expense"
                                /></div><br/>
                               <div><TextField id="outlined-basic" label="Title" variant="outlined" 
                               name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}/></div><br/>
                               <div><TextField id="outlined-basic" label="Amount" variant="outlined"
                               name="amount"
                               value={formik.values.amount}
                               onChange={formik.handleChange}
                               error={formik.touched.amount && Boolean(formik.errors.amount)}
                               helperText={formik.touched.amount && formik.errors.amount} /></div><br/>
                               <div><TextField 
                               name="description"
                               value={formik.values.description}
                               onChange={formik.handleChange}
                               error={formik.touched.description && Boolean(formik.errors.description)}
                               helperText={formik.touched.description && formik.errors.description}
                              multiline
                              maxRows={4}
                               label="Description" variant="outlined" /></div>
                                <br />
                                <Button  type="submit"autoFocus onClick={()=>{
                                     formik.values.type="Expense";
                                     handleClose();}}>
                                Submit
                            </Button>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button  type="submit"autoFocus onClick={handleClose}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog></div>
                <div><Button variant="contained" onClick={handleClickCashInOpen}>Cash In</Button>
                <Dialog open={cashInOpen}>
                        <DialogContent>
                            <form className='entryform' onSubmit={formik.handleSubmit}>
                               <div> <TextField id="filled-basic" label="Cash In"  variant="filled" disabled 
                               name="type" 
                              
                                
                                /></div><br/>
                               <div><TextField id="outlined-basic" label="Title" variant="outlined" 
                               name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}/></div><br/>
                               <div><TextField id="outlined-basic" label="Amount" variant="outlined"
                               name="amount"
                               value={formik.values.amount}
                               onChange={formik.handleChange}
                               error={formik.touched.amount && Boolean(formik.errors.amount)}
                               helperText={formik.touched.amount && formik.errors.amount} /></div><br/>
                               <div><TextField 
                               name="description"
                               value={formik.values.description}
                               onChange={formik.handleChange}
                               error={formik.touched.description && Boolean(formik.errors.description)}
                               helperText={formik.touched.description && formik.errors.description}
                              multiline
                              maxRows={4}
                               label="Description" variant="outlined" /></div>
                                <br />
                                <Button  type="submit" autoFocus onClick={()=>{
                                     formik.values.type="Cash In";
                                     handleCashInClose();}}>
                                Submit
                            </Button>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button  type="submit"autoFocus onClick={handleCashInClose}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog></div>
                <div><Button variant="contained" onClick={handleClickCashOutOpen}>Cash Out</Button>
                <Dialog open={cashOutOpen}>
                        <DialogContent>
                            <form className='entryform' onSubmit={formik.handleSubmit}>
                               <div> <TextField id="filled-basic" label="Cash Out"  variant="filled" disabled 
                               name="type" 
                              
                                
                                /></div><br/>
                               <div><TextField id="outlined-basic" label="Title" variant="outlined" 
                               name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}/></div><br/>
                               <div><TextField id="outlined-basic" label="Amount" variant="outlined"
                               name="amount"
                               value={formik.values.amount}
                               onChange={formik.handleChange}
                               error={formik.touched.amount && Boolean(formik.errors.amount)}
                               helperText={formik.touched.amount && formik.errors.amount} /></div><br/>
                               <div><TextField 
                               name="description"
                               value={formik.values.description}
                               onChange={formik.handleChange}
                               error={formik.touched.description && Boolean(formik.errors.description)}
                               helperText={formik.touched.description && formik.errors.description}
                              multiline
                              maxRows={4}
                               label="Description" variant="outlined" /></div>
                                <br />
                                <Button  type="submit" autoFocus onClick={()=>{
                                     formik.values.type="Cash Out";
                                     handleCashOutClose();}}>
                                Submit
                            </Button>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button  type="submit"autoFocus onClick={handleCashOutClose}>
                                Cancel
                            </Button>
                        </DialogActions>
                    </Dialog></div>
            </div>
        </div>
    );
}

export default EntryButton;