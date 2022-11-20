import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { v1 as uuidv1} from 'uuid';
import axios from 'axios';


function Register() {

    const navigate = useNavigate();
    const [data, setData] = useState([{
                                    firstName :'',
                                    lastName :'',
                                    email :'',
                                    password :''
                            }])
   
      
       
    const handleChange = (e) =>{
        setData({...data,
                id: uuidv1,
                [e.target.id] :e.target.value
            
            })
        console.log(data)
        
    }

    const handleUser = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:3000/users',{
                                        firstName :data.firstName,
                                        lastName :data.lastName,
                                        email : data.inputEmail,
                                        password : data.inputPassword
                    })
        .then(response =>{
                            console.log(response.data)
                            navigate ('/login')
                        })
        .catch(error =>{console.log(error.message)})
    }

   
         
  return (
    <div className='col-md-6 offset-md-3 bg-white  rounded my-3 px-5 py-3'>
        <h1 className='text-center text-uppercase mb-5'>Create an account</h1>
        <form className="row g-3" onSubmit={handleUser}>
            <div className="col-md-6">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input type="text" className="form-control" id="firstName" name="firstName" onChange={handleChange}/>
            </div>
            <div className="col-md-6 ">
                <label htmlFor="validationServer02" className="form-label">Last Name</label>
                <input type="text" className="form-control" id="lastName" name="lastName" onChange={handleChange}/>
                
            </div>
            <div className=" my-2 ">
                <label htmlFor="inputEmail" className="">Email</label>
                <input type="text"  className="form-control" id="inputEmail" name="inputEmail" placeholder='example@mail' onChange={handleChange}/>
            </div>
            <div className=" my-2">
                <label htmlFor="inputPassword" className="">Password</label>
                <input type="password" className="form-control" id="inputPassword" name="inputPassword" placeholder="Password" onChange={handleChange}/>
            </div>
            <div className=" my-2">
                <label htmlFor="confPassword" className="">Confirm Password</label>
                <input type="password" className="form-control" id="confPassword" name="confPassword" onChange={handleChange}/>
            </div>
            <div className="text-center d-grid gap-2">
                <button type="submit" className="btn btn-dark  mb-3 rounded-pill">Sign Up</button>
            </div>
            <p className="text-center text-muted mt-5 mb-0">Have already an account? <Link to="/login"
                    className="fw-bold text-body"><u>Login here</u></Link></p>
        </form>
    </div>
  )
}

export default Register