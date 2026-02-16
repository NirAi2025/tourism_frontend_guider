import { tr } from 'motion/react-client'
import React, { useEffect } from 'react'
import { getProfile } from '../../api/userService';
import { Container, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { IoIosStar } from 'react-icons/io';
import { IoWallet } from 'react-icons/io5';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

const Dashboard = () => {

const getProfiledata = async () => {
    try {

        const res = await getProfile();
        if(res?.data?.success){
          console.log("profile data", res?.data?.data);
        }
       
    } catch (error) {  }finally { }  
}

// useEffect(() => {
//    getProfiledata();
// }, []);



  return (
    <div className='comon-lauout'>
      <h5>Dashboard</h5>
      <div className='pauout'>
          <div className='d-flex gap-3 wallet-info'>
            <div className='walet-icon'>
              <IoWallet />
            </div>
            <div>
              <h5>Expected payout</h5>
              <h6>Expected by 10/2/2026 </h6>
            </div>
          </div>
          <div className='d-flex gap-3 justify-content-between align-items-center'>
            <strong>$ 28,891.138</strong>
            <MdOutlineKeyboardArrowRight />
            </div>
      </div>
       <div className='split-card'>
        <div className='split-card-header'>
          <h5>Transaction</h5>
        </div>
        <div className='split-card-body'> 
            <div className='table-responsive'>
            <table className='table custom-table'>
              <thead>
                <tr>  
                  <th>ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>#5089</td>
                    <td>2024-06-15</td> 
                    <td>$ 28,891.138</td>
                    <td>Credit Card</td>
                    <td><span className='text-success'>Completed</span></td>                   
                    <td><button className='btn btn-sm btn-outline-primary'>View Details</button></td>
                  </tr> 
                   <tr>
                    <td>#5089</td>
                    <td>2024-06-15</td> 
                    <td>$ 28,891.138</td>
                    <td>Credit Card</td>
                    <td><span className='text-danger'>Pending</span></td>                   
                    <td><button className='btn btn-sm btn-outline-primary'>View Details</button></td>
                  </tr> 
                  </tbody>
                  </table>
          </div>
        </div>
      </div>
      <div className='split-card'>
        <div className='split-card-header'>
          <h5>Recent bookings</h5>
          <NavLink to="/bookings" className="btn btn-sm btn-outline-primary">View all</NavLink>
        </div>
        <div className='split-card-body'> 
            <div className='table-responsive'>
            <table className='table custom-table'>
              <thead>
                <tr>  
                  <th>Tour</th>
                  <th>Date</th>
                  <th>Booking ID</th>
                  <th>Customer Name</th>
                  <th>Passengers</th>
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
                       <td>2024-06-15 05:00 PM</td> 
                    <td>#BKG12345</td>
                    <td>John Doe</td>
                    <td>2 Adults, 1 Child</td>                   
                  
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
                       <td>2024-06-15 05:00 PM</td> 
                    <td>#BKG12345</td>
                    <td>John Doe</td>
                    <td>2 Adults, 1 Child</td>                  
                  
                  </tr>
                  </tbody>
                  </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard