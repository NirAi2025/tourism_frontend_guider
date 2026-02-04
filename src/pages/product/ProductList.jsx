import React from 'react'
import { BiPlus } from 'react-icons/bi'
import { IoIosStar } from 'react-icons/io'
import { NavLink } from 'react-router-dom'

const ProductList = () => {
  return (
      <div className='comon-lauout'>
      <h5>Products</h5>
      <div className='split-card'>
        <div className='split-card-header'>
          <h5>All Products</h5>
          <NavLink to="/product/create" className="btn btn-sm btn-outline-primary">Create New <BiPlus /></NavLink>
        </div>
        <div className='split-card-body'> 
             <div className='table-responsive'>
                        <table className='table custom-table'>
                          <thead>
                            <tr>  
                              <th>Product</th>
                              <th>Product ID</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <div className='table-tour-img-wrap'>
                                    <img src="https://placehold.co/200" alt="tour" className='table-tour-img' width="50" height="50" />
                                    <div className='table-tour-info'>
                                      <h6>Exploring the Mountains</h6>
                                      <span>4.9 <IoIosStar /></span>
                                    </div>
                                  </div>
                                  </td>                                
                                <td>#BKG12345</td>
                                <td>Active</td>
                                <td><button className="btn btn-sm btn-outline-primary">Edit Details</button></td>                  
                              
                              </tr> 
                              <tr>
                                <td>
                                  <div className='table-tour-img-wrap'>
                                    <img src="https://placehold.co/200" alt="tour" className='table-tour-img' width="50" height="50" />
                                    <div className='table-tour-info'>
                                      <h6>Exploring the Mountains</h6>
                                      <span>4.9 <IoIosStar /></span>
                                    </div>
                                  </div>
                                  </td>                                
                                <td>#BKG12345</td>
                                <td>Active</td>
                                <td><button className="btn btn-sm btn-outline-primary">Edit Details</button></td>                  
                              
                              </tr> 
                              </tbody>
                              </table>
                      </div>
      
        </div>
      </div>
    </div>
  )
}

export default ProductList