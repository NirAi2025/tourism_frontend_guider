import React, { useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { getProfile } from '../api/userService';
import Loader from './Loader';
import { VscBellDot } from 'react-icons/vsc';

const AuthHeader = () => {
     const [profiledata, setProfiledata] = useState(null);
 const [isloading, setIsloading] = useState(false);


   const getProfiledata = async () => {
    setIsloading(true);
       try {
   
           const res = await getProfile();
           setIsloading(false);
           if(res?.data?.success){
            setProfiledata(res?.data?.data);
             console.log("profile data", res?.data?.data);
           }
          
       } catch (error) { setIsloading(false); }finally {setIsloading(false); }  
   }
   
   useEffect(() => {
   getProfiledata();
   }, []);





  return (
        <>
         {isloading && <Loader />}
                   <div className='auth-header'>
                    <h4>{profiledata?.name}</h4>
                   <ul className='header-right'>
                                <li>
                                    <VscBellDot />
                                </li>
                                <li>
                                  <Dropdown className='header-profile'>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                            <div>
                                                <h5>{profiledata?.name}</h5>
                                                <span>Guide</span>
                                                </div>                                     
                                            <img src={profiledata?.guide_public_profile?.profile_photo} alt="user" className='profile-picture' />                                      
                                    </Dropdown.Toggle>    
                                    <Dropdown.Menu>
                                      <Dropdown.Item as={NavLink} to="/dashboard">Dashboard</Dropdown.Item>
                                      <Dropdown.Item as={NavLink} to="/profile">Profile</Dropdown.Item> 
                                      <Dropdown.Item as={NavLink} to="/logout">Logout</Dropdown.Item> 
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </li>
                            </ul>
            
        </div>
        </>
 
  )
}

export default AuthHeader