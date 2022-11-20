import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { v1 as uuidv1} from 'uuid';
import axios from 'axios';

function CreateCategory() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([{
                                          Name: '',
                                          Description :'',  
                                 }]);
  

  const handleChange =(e )=>{
    
    setCategory({...category,
      id: uuidv1,
      [e.target.id] : e.target.value,
    }) 
  }


  const addCategory = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:3000/categories',{
                                
                                categoryName: category.categoryName,
                                categoryDescription :category.categoryDescription,
    })
    .then(response =>{
      console.log(response.data)
      navigate ('/dashboard')
      })
    .catch(error =>{console.log(error.message)})
  }
  return (
    <div>
      <div className="container justify-content-center pt-5 "> 
    <div className="row d-flex justify-content-center">
        
        <div className="col-10 bg-white my-4 p-5 rounded">
           {/* Add Produt input form -*/}
            <form onSubmit={addCategory}>
              {/* Product Name input type text*/}
              <div className="form-group">
                <label htmlFor="productName" className="font-weight-bold">Category</label>
                <input type="text" className="form-control" id="categoryName" onChange={handleChange} placeholder="Product Name"/>
              </div>
              {/* Category Description input textarea */}
              <div className="form-group my-3">
                <label htmlFor="description" className="font-weight-bold">Description</label>
                <textarea className="form-control" id="categoryDescription" onChange={handleChange} rows="3"></textarea>
              </div>
             
              {/*Click button  to add category*/}
              <button  type="submit"  className="btn btn-dark   font-weight-bold">Add Category</button>
            </form>
        </div>
        
    </div>   
</div>
 
    </div>
  )
}

export default CreateCategory