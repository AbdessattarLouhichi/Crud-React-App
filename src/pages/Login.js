import React,{useState}  from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, ErrorMessage,Field } from 'formik';
import * as Yup from 'yup';

function Login() {

  const initialValues = {
    Email: '',
    Password: ''
  }

  const validationSchema = Yup.object({
    Email: Yup.string()
      .email('Invalid email format')
      .required('Required'),
    Password: Yup.string()
    .required('Password is required')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  })
  const navigate = useNavigate();
  //const [Email, setEmail] = useState('');
  //const [Password, setPassword] = useState('');
  const [warning, setWarning] = useState(false);


  const onSubmit =  async (values)=>{
    await  axios.get('http://localhost:3000/users')
        .then(response =>{
              const Found = response.data.find(user => user.inputEmail === values.Email && user.inputPassword === values.Password)
              if (Found) {
                warning && setWarning(false)
                //SUCCESS LOGIN MESSAGE!  You are successfully logged in
                navigate('/dashboard')

            } else {
                setWarning(true)
            }
        })
        .catch(err=>{console.log(err.message)})   
  }

  const warningMsg = warning && <div className='alert alert-danger mt-5'>Please check your email and password and try again !</div>


  return (
    <div className='col-md-6 offset-md-3 bg-white  rounded my-3 px-5 py-3'>
    <h1 className='text-center text-uppercase mb-5'>Sign into your account</h1>
      {warningMsg}
    <Formik 
       initialValues={initialValues}
       validationSchema={validationSchema}
       onSubmit={onSubmit}>
      {formik => {
        return(
        <Form className="row g-3">
            <div className=" my-2 ">
                <label htmlFor="Email" className="">Email</label>
                <Field type="text"  className="form-control" id="Email" name='Email'  placeholder='example@mail'/>
                <ErrorMessage name='Email' component={'div'} className="text-danger"/>
            </div>
            <div className=" my-2">
                <label htmlFor="Password" className="">Password</label>
                <Field type="password" className="form-control" id="Password" name='Password'   placeholder="Password"/>
                <ErrorMessage name='Password' component={'div'} className="text-danger"/>
            </div>
            <div className="text-center d-grid gap-2">
                <button type="submit" className="btn btn-dark  mb-3 rounded-pill" disabled={!formik.isValid}>Sign In</button>
            </div>
            <div className="text-center">
              <p className="text-center text-muted mt-5 mb-0">Not a member? <Link className='fw-bold text-body' to="/register">Register</Link></p>
            </div>
        </Form>
        )}}
    </Formik>
</div>
  )
}

export default Login