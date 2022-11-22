import React,{useReducer, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const initialState ={
  loading : true,
  error : '',
  products : {}
}
const reducer = (state, action)=>{
  switch (action.type) {
    case 'FETCH_SUCESS':
      return{...state,
        loading : false,
        products : action.payload,
        error:''
      }
    
    case 'FETCH_ERROR':
      return{
        loading: false,
        products:{},
        error: 'error.message'
      }
  
    default:
      return state   
  }
}
export const setData = (data) => {
    console.log(data)
  let {Product,Category, Price, Description, Photo ,id } = data;
        localStorage.setItem('ID', id);
        localStorage.setItem('Product Name', Product);
        localStorage.setItem('Product Category', Category);
        localStorage.setItem('Price', Price);
        localStorage.setItem('Description', Description);
        localStorage.setItem('Product Photo', Photo);
}

function Dashboard() {
  
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios.get('http://localhost:3000/products')
    .then(res=>
              dispatch({type:'FETCH_SUCESS', payload: res.data})
              
      )
    .catch(error =>
                  dispatch({type:'FETCH_ERROR', error : error.message})
                 
      )
  }, [])
  
  const removeProduct = async (id)=> {
    if (window.confirm('Do you want to remove?')) {
       await axios.delete(`http://localhost:3000/products/${id}`)  
      .then((res) => {
           
            window.location.reload();
        }).catch((err) => {
            console.log(err.message)
        })
    }
}

  return (
    
    <section>
    { /*Main product section Start*/}
     <div className="container-md py-5">
       <div className="row d-flex justify-content-center align-items-center  mt-5">
         <div className="col-md-12 col-xl-10">
           <div className="card">
             <div className="card-header p-3 bg-secondary d-flex justify-content-between stiky-top">
               <h5 className="mb-0 mt-2 text-white"><i className="fa-solid fa-list-check me-2"></i>List of Products</h5>
               <div className="d-flex">
               <Link to="/addProduct" className="btn btn-success fw-bold d-flex mx-2"><i className="material-icons me-2">&#xE147;</i> Add Product</Link>
               <Link to="/addCategory" className="btn btn-success fw-bold d-flex"><i className="material-icons me-2">&#xE147;</i> Add Category</Link>
               </div>
              
             </div>
             <div className="card-body" data-mdb-perfect-scrollbar="true" style={{position: "relative"}}>
                <table className="table mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Product Name</th>
                      <th scope="col">Category</th>
                      <th scope="col">Price</th>
                      <th scope="col">Description</th>
                      <th scope="col">Photo</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {  /*  Create a Product List  */ 
                        state.loading ? 'loading' :   state.products.map((item)=>
                            <tr key={item.id}> 
                                <td>{item.Product}</td>
                                <td>{item.Category}</td>
                                <td>{item.Price}</td>
                                <td>{item.Description}</td>
                                <td><img src={item.Photo} width ="50px" alt='ProductImage'/></td>
                                <td className="align-middle">
                                  
                                  <Link  to={"/updateProduct/" +item.id} onClick={() => setData(item.id)} data-toggle='modal' className='btn btn-success mx-2' data-target='#edit'  data-mdb-toggle="tooltip" title="Done">
                                        <i className="fas fa-pencil-alt text-white"></i>
                                  </Link>                           
                                  <button title="Remove" className='btn btn-danger' onClick={()=> removeProduct(item.id)}>
                                        <i className="fas fa-trash-alt text-white"></i>
                                  </button>
                                </td>
                            </tr>
                            ) 
                    }
                    {state.error ? state.error : null}    
                  </tbody>
                </table>
             </div>
           </div>
         </div>
       </div>
     </div>
       {/*  Main Product section End */}
   </section>
  )
}

export default Dashboard