import React from 'react'
import { BiPlus } from 'react-icons/bi'
import { IoIosStar } from 'react-icons/io'
import { NavLink, useNavigate } from 'react-router-dom'
import { getTours, ToursUpdate } from '../../api/userService'
import { setTourResponse } from '../../redux/ReducerDataHandle'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import { nav } from 'motion/react-client'

const ProductList = () => {

const [products, setProducts] = React.useState([])
const [isLoading, setIsLoading] = React.useState(false)
const [status, setStatus] = React.useState("Active")

let navigate = useNavigate();
let dispatch = useDispatch();

const fetchProducts = async () => {
  setIsLoading(true);
  try {
    const res = await getTours(); 
    if (res?.data?.success) {
      setProducts(res?.data?.data?.tours || []);
    } else {
      console.error("Failed to fetch products:", res?.data?.message);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    setIsLoading(false);
  }
};

React.useEffect(() => {
  fetchProducts();
}, []);


const UpdateStatusHandler = async (tourId) => {
  try {
    const res = await ToursUpdate(tourId);
    if (res?.data?.success) {
      fetchProducts();
    } else {
      console.error("Failed to update tour status:", res?.data?.message);
    } 
  } catch (error) {
    console.error("Error updating tour status:", error);
  }

}





  return (
      <div className='comon-lauout'>
      <h5>Products</h5>
      <div className='split-card'>
        <div className='split-card-header'>
          <h5>All Products</h5>
          <button className="btn btn-sm btn-outline-primary" onClick={()=>{
            dispatch(setTourResponse(""))
            navigate('/product/create')
          }}>
            Create Product <BiPlus />
          </button>
        </div>
        <div className='split-card-body'> 
          {isLoading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>No products found.</p>
          ) : (
                <div className='table-responsive'>
                        <table className='table custom-table'>
                          <thead>
                            <tr>  
                              <th>Product</th>
                              <th>Category</th>
                              <th>Date</th>
                              <th>Product Creation</th>
                              <th>Approval Status</th>
                              <th>Change Status</th>
                              <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>

                              {
                                products?.map((product) => (
                                  <tr key={product.id}>
                                  <td>
                                  <div className='table-tour-img-wrap'>
                                    {product?.cover_image == null ?
                                    <img src="https://placehold.co/200" alt="tour" className='table-tour-img' width="50" height="50" />
                                    :
                                    <img src={product?.cover_image?.url} alt="tour" className='table-tour-img' width="50" height="50" />
                                  }
                                    <div className='table-tour-info'>
                                      <h6>{product?.title}</h6>
                                      {/* <span>4.9 <IoIosStar /></span> */}
                                    </div>
                                  </div>
                                  </td>                                
                                <td>{product?.tour_category?.name}</td>
                                <td>{moment(product?.created_at).format("DD/MM/YYYY")}</td>
                                <td>{product?.completed_steps == 10 ? "Completed" : `${product?.completed_steps} / 10`}</td>
                                <td>{product?.status == 0 ? <span className='text-danger'>Pending</span> 
                                : product?.status == 1 ? <span className='text-success'>Approved</span>

                                : <span className='text-warning'>Rejected</span>

                                }
                                
                                </td>
                                  
                                  <td>
                                    {product?.is_active ? 
                                      <button className="btn btn-sm btn-outline-success" onClick={()=>{
                                       UpdateStatusHandler(product?.id)
                                      }}>Change Inactive</button>
                                      :
                                      <button className="btn btn-sm btn-outline-danger" onClick={()=>{
                                        UpdateStatusHandler(product?.id)
                                      }}>Change Active</button>

                                    }

                                  </td>
                                  
                                <td>
                                  {product?.completed_steps == 10 ?
                                  <button className="btn btn-sm btn-outline-primary" 
                                  onClick={()=>{
                                     navigate(`/product/${product?.id}`) 
                                  }}                                
                                >View Product</button>

                                  :
                                   <button className="btn btn-sm btn-outline-primary" 
                                  onClick={()=>{
                                   
                                     navigate('/product/create')
                                     dispatch(setTourResponse({
                                      tour_id: product?.id,
                                      completed_steps: product?.completed_steps
                                     }))
                                  }}
                                
                                >Edit Product</button>
                                }
                                 </td>   
                              </tr> 
                                 ))}
                           
                              </tbody>
                              </table>
                      </div>
          )}
           
      
        </div>
      </div>
    </div>
  )
}

export default ProductList