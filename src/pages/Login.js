import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction } from '../redux/slices/userSlice';
import '../App.css';

const validationSchema = Yup.object({
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
});

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.user);
    const { userAppErr, userLoading, userServerErr, userAuth } = user;
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(loginUserAction(values))
        }
    });
    useEffect(() => {
        if (userAuth?.token) {
            navigate('/profile')
        }
      
        
    }, [userAuth,navigate]);

    return (
        <div>

            <div className="row align-items-center" id="grid-col-1">
            <div className="col-1 col-sm-3 col-md-1 " >
                    </div>
                <div className="col-10 col-sm-7 col-lg-3 col-md-5 bg-light p-3">
                    <form onSubmit={formik.handleSubmit}>
                        <h4 className='text-center mb-3'>Login to your account</h4>

                        {userAppErr || userServerErr ?
                            <div className='alert alert-danger text-center'>
                                {userAppErr} {userServerErr}
                            </div> : null}

                        <input
                            className="form-control mb-2"
                            type="email" name="email" placeholder='Email'
                            value={formik.values.email}
                            onChange={formik.handleChange("email")}
                            onBlur={formik.handleBlur("email")} />

                        {/* error */}
                        <div class="text-danger mb-2">
                            {formik.touched.email && formik.errors.email}
                        </div>


                        <input
                            class="form-control mb-2"
                            type="password" name="password"
                            placeholder='Password'
                            value={formik.values.password}
                            onChange={formik.handleChange("password")}
                            onBlur={formik.handleBlur("password")} />
                        {/* error */}
                        <div class="text-danger mb-2">
                            {formik.touched.password && formik.errors.password}

                        </div>
                        <button type="submit" class="btn btn-primary mt-2 w-100">Login</button>
                        {userLoading ?
                            <span>Loading please wait..</span> : null}
                        <br/><br/>
                        <span>Don't Have An Account?</span>
                        <button type="submit" onClick={()=>navigate('/register')} class="btn btn-primary  ms-3">Signup</button>
    
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

export default Login;
