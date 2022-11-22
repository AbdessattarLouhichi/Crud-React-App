import React from 'react';
import {Link, useNavigate} from 'react-router-dom'
//import { v1 as uuidv1} from 'uuid';
import axios from 'axios';
import {Formik,Form,Field,ErrorMessage} from 'formik';
import * as Yup from 'yup'


function Register() {

     /* const [data, setData] = useState([{
                                    firstName :'',
                                    lastName :'',
                                    email :'',
                                    password :''
                            }]);
                        }
      
       
  {  const handleChange = (e) =>{
        setData({...data,
                id: uuidv1,
                [e.target.id] :e.target.value
            
            })
        console.log(data)
        
    };*/

    const navigate = useNavigate();
  

    const handleUser =  (values)=>{
        
        axios.post('http://localhost:3000/users',values)
        .then(response =>{
                            console.log(response.data)
                            navigate ('/login')
                        })
        .catch(error =>{console.log(error.message)})
    };

   const initialValues ={
    firstName: '',
    lastName:'',
    inputEmail:'',
    inputPassword:'',
    confPassword:''
   };

   const validationSchema = Yup.object({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    inputEmail: Yup.string()
      .email('Invalid email format')
      .required('Required'),  
    inputPassword: Yup.string()
        .required('Password is required')
        .min(8, 'Password is too short - should be 8 chars minimum.')
        .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
    confPassword: Yup.string()
     .oneOf([Yup.ref('inputPassword'), null], 'Passwords must match')
  });
         
  return (
   
        <div className='col-md-6 offset-md-3 bg-white  rounded my-3 px-5 py-3'>
            <h1 className='text-center text-uppercase mb-5'>Create an account</h1>
            <Formik
                initialValues={initialValues}
                validationSchema ={validationSchema}
                onSubmit = {handleUser}>

                {formik => {
                return(
                <Form className="row g-3">
                    <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <Field type="text" className="form-control" id="firstName" name="firstName"/>
                    <ErrorMessage name='firstName' component={'div'} className="text-danger"/>
                    </div>
                    <div className="col-md-6 ">
                        <label htmlFor="validationServer02" className="form-label">Last Name</label>
                        <Field type="text" className="form-control" id="lastName" name="lastName"/>
                        <ErrorMessage name='lastName' component={'div'} className="text-danger"/>
                    </div>
                    <div className=" my-2 ">
                        <label htmlFor="inputEmail" className="">Email</label>
                        <Field type="text"  className="form-control" id="inputEmail" name="inputEmail" placeholder='example@mail'/>
                        <ErrorMessage name='inputEmail' component={'div'} className="text-danger" />
                    </div>
                    <div className=" my-2">
                        <label htmlFor="inputPassword" className="">Password</label>
                        <Field type="password" className="form-control" id="inputPassword" name="inputPassword" placeholder="Password"/>
                        <ErrorMessage name='inputPassword' component={'div'} className="text-danger" />
                    </div>
                    <div className=" my-2">
                        <label htmlFor="confPassword" className="">Confirm Password</label>
                        <Field type="password" className="form-control" id="confPassword" name="confPassword"/>
                        <ErrorMessage name='confPassword' component={'div'} className="text-danger" />
                    </div>
                    <div className="text-center d-grid gap-2">
                        <button type="submit" className="btn btn-dark  mb-3 rounded-pill"  disabled={!formik.isValid || formik.isSubmitting}>Sign Up</button>
                    </div>
                    <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login"
                            className="fw-bold text-body"><u>Login here</u></Link></p>
                </Form>
                )}}
            </Formik>
        </div>
 
    
  )
}

export default Register