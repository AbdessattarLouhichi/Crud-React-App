import React,{useState}  from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [warning, setWarning] = useState(false);


  const submit = (e)=>{
    e.preventDefault();

    axios.get('http://localhost:3000/users')
      .then(response =>{
            const Found = response.data.find(user => user.email === Email && user.password === Password)
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
    <form className="row g-3" onSubmit={submit}>
        <div className=" my-2 ">
            <label htmlFor="Email" className="">Email</label>
            <input type="text"  className="form-control" id="Email" value={Email} onChange={(e)=>setEmail(e.target.value)} placeholder='example@mail'/>
        </div>
        <div className=" my-2">
            <label htmlFor="Password" className="">Password</label>
            <input type="password" className="form-control" id="Password" value={Password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
        </div>
        <div className="text-center d-grid gap-2">
            <button type="submit" className="btn btn-dark  mb-3 rounded-pill">Sign In</button>
        </div>
        <div className="text-center">
          <p className="text-center text-muted mt-5 mb-0">Not a member? <Link className='fw-bold text-body' to="/register">Register</Link></p>
        </div>
    </form>
</div>
  )
}

export default Login