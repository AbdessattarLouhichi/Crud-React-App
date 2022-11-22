import React, {useState,useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { v1 as uuidv1} from 'uuid';
import axios from 'axios';

function CreateProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [post, setPost] = useState({});
  const [product, setProduct] = useState([{
                                          Product:'',
                                          Category: '',
                                          Price:'',
                                          Description :'',
                                          Photo :''
  }]);
  
 useEffect(() => {
    axios.get('http://localhost:3000/categories')
    .then(res=>{
              setLoading(false)
              setPost(res.data)
              setError('')
            }      
    )
    .catch(error =>{
      setLoading(false)
      setPost({})
      setError({error: error.message})
    }
                          
    )
  }, [])
const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleChange =(e )=>{
    const {id, value} = e.target
    console.log(id)
    console.log(value)
    setProduct({...product,
      id: uuidv1,
      [e.target.id] : e.target.value,
    }) 
   
  }

  const handleFileUpload = async (e)=>{
    const {id, value} = e.target
    console.log(id)
    console.log(value)
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setProduct({...product,
      id: uuidv1,
      [e.target.id] : base64
    })
  }
  

  

  const addProduct = (e)=>{
    e.preventDefault();
    axios.post('http://localhost:3000/products',{
                                Product: product.productName,
                                Category: product.category,
                                Price : product.price,
                                Description :product.description,
                                Photo : product.productImg
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
            <form onSubmit={addProduct}>
              {/* Product Name input type text*/}
              <div className="form-group">
                <div className="d-flex justify-content-between mb-2">
                <label htmlFor="productName" className="font-weight-bold">Product</label>
                <Link to="/dashboard" className=" font-weight-bold text-dark "><i className="fa-solid fa-list-check me-3"></i>List of products</Link>
                </div>
                <input type="text" className="form-control" id="productName" onChange={handleChange} placeholder="Product Name"/>
              </div>
              {/* Product Price input type number */}
              <div className="form-group my-3">
                <label htmlFor="price" className="font-weight-bold">Price</label>
                <input type="number" className="form-control" id="price" onChange={handleChange}/>
              </div>
              {/* Product Description input textarea */}
              <div className="form-group my-3">
                <label htmlFor="description" className="font-weight-bold">Description</label>
                <textarea className="form-control" id="description" onChange={handleChange} rows="3"></textarea>
              </div>
              <div className='my-4'>
                <label htmlFor="category" className="font-weight-bold">Category</label>
                <select name="Categories" id="category" onChange={handleChange}>
                  {
                    loading ? 'loading' : post.map((item)=>
                    <option key={item.categoryName} >{item.categoryName}</option>
                    )
                  }
                  {error ? error : null}
                </select>
              </div>
            
              {/* Product photo input type file */}
              <div className="form-group my-4">
                <label htmlFor="productImg" className="font-weight-bold">Add Photo</label>
                <input type="file" className="form-control-file" id="productImg" onChange={handleFileUpload}/>
              </div>
              {/*Click button  to add product*/}
              <button  type="submit"  className="btn btn-dark   font-weight-bold">Add product</button>
            </form>
        </div>
        
    </div>   
</div>
 
    </div>
  )
}

export default CreateProduct