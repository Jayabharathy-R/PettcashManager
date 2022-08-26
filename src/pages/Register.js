import React,{useEffect} from 'react';
import {useFormik} from 'formik'; 
import {useNavigate} from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import * as Yup from 'yup';  
import { registerUserAction } from '../redux/slices/userSlice';
import '../App.css';

const validationSchema = Yup.object({
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Lastname is required"),   
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
});

function Register() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const user=useSelector((state)=>state?.user);
    const {userAppErr,userLoading,userServerErr,userAuth}=user;
        const formik=useFormik({
        initialValues:{
            firstname:"",
            lastname:"",
            email:"",
            password:"",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
           dispatch(registerUserAction(values));
        }
    });
    useEffect(()=>{
        if(userAuth){
            navigate('/');
            alert("Registered succussfully!!! Login to continue..");
        }
    },[userAuth,navigate]);
    return (
        <div  >
             <div className="row align-items-center" id="grid-col-1">

                <div className="col-1 " >
                    </div>
                <div className="col-sm-9 col-lg-3 col-md-5 bg-light p-3">
                    <form onSubmit={formik.handleSubmit}>
                        <h4 class="text-center mb-3">Create your account</h4>
                        {userAppErr||userServerErr ? 
                            <div className='alert alert-danger text-center'>
                                {userAppErr} {userServerErr}
                             </div>:null}
                        <input
                            class="form-control mt-1 mb-2 "
                            name="firstname"
                            placeholder='firstname'
                            value={formik.values.firstname}
                            onChange={formik.handleChange("firstname")}
                            onBlur={formik.handleBlur("firstname")} />
                        {/* error */}
                        <div class="text-danger mb-2">
                            {formik.touched.firstname && formik.errors.firstname}

                        </div>

                        <input
                            class="form-control mt-1 mb-2 "
                            name="lastname"
                            placeholder='lastname'
                            value={formik.values.lastname}
                            onChange={formik.handleChange("lastname")}
                            onBlur={formik.handleBlur("lastname")} />
                        {/* error */}
                        <div class="text-danger mb-2">
                            {formik.touched.lastname && formik.errors.lastname}

                        </div>

                        <input
                            className="form-control mt-1 mb-2"
                            type="email" name="email" placeholder='Email'
                            value={formik.values.email}
                            onChange={formik.handleChange("email")}
                            onBlur={formik.handleBlur("email")} />

                        {/* error */}
                        <div class="text-danger mb-2">
                            {formik.touched.email && formik.errors.email}
                        </div>


                        <input
                            class="form-control mt-1 mb-2"
                            type="password" name="password"
                            placeholder='Password'
                            value={formik.values.password}
                            onChange={formik.handleChange("password")}
                            onBlur={formik.handleBlur("password")} />
                        {/* error */}
                        <div class="text-danger mb-2">
                            {formik.touched.password && formik.errors.password}

                        </div>

                        
                        <button type="submit" class="btn btn-primary mt-2 mb-2 w-100">Register</button>
                        {userLoading?
                          <span>you'll be redirected soon..</span>:null}
                    </form>
                </div>
                <div className="text-center col-12 col-lg-6 col-md-5 " >
                <div id="title">
          <h1>
            welcome to pettycash manager  <br />
            <span>Hassle-free Fund Management </span>
          </h1>
        </div>

                </div>

                
            </div>
        </div>
    );
}

export default Register;