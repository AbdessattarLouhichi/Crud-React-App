import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CreateProduct from './pages/CreateProduct';
import UpdateProduct from './components/UpdateProduct';
import CreateCategory from './pages/CreateCategory';
import Header from './components/Header';
import ErrorPage from './components/ErrorPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css';


function App() {
  return (
    <div className='container-fluide pb-3'>
        <BrowserRouter className="container mt-3">
          <Header/>
          <Routes>
          <Route path='/' element={<Home/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/addProduct' element={<CreateProduct/>}/>
            <Route path='/addCategory' element={<CreateCategory/>}/>
            <Route path='/updateProduct/:id' element={<UpdateProduct/>} />
            <Route path='*' element={<ErrorPage/>}/>
          </Routes>
          
        </BrowserRouter>
    </div>
    
  );
}

export default App;
