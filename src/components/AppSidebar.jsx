import React from 'react'
import { AiFillProduct, AiOutlineDollar } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FaRegStar } from 'react-icons/fa'
import { FaRegMessage } from 'react-icons/fa6'
import { GoPlus } from 'react-icons/go'
import { IoBookmarksOutline, IoSettingsOutline } from 'react-icons/io5'
import { MdClose, MdDashboard, MdOutlineDashboard, MdOutlineDateRange } from 'react-icons/md'
import { TbLogout } from 'react-icons/tb'
import { VscGraph } from 'react-icons/vsc'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { sidebarAction } from '../redux/ReducerDataHandle'

const AppSidebar = () => {

 const {isSidebarshow} = useSelector((state) => state.ReducerDataHandle);
  let dispatch = useDispatch()


  return (
    <div className={isSidebarshow ? 'app-sidebar show' : 'app-sidebar'}>
        <div className='auth-logo'>
          <NavLink to="/">Your Guide</NavLink>
          <button className='close-btn' onClick={()=>dispatch(sidebarAction(!isSidebarshow))}><MdClose /></button>
        </div>
        <ul>
            <li onClick={()=>dispatch(sidebarAction(!isSidebarshow))}><NavLink to="/product/create" className="sidebar-bttn">New Product <GoPlus /></NavLink></li>
            <li onClick={()=>dispatch(sidebarAction(!isSidebarshow))}><NavLink to="/dashboard"><span><MdOutlineDashboard /></span>Dashboard</NavLink></li>
            <li onClick={()=>dispatch(sidebarAction(!isSidebarshow))}><NavLink to="/product"><span><IoBookmarksOutline /></span>All Products</NavLink></li>
            <li onClick={()=>dispatch(sidebarAction(!isSidebarshow))}><NavLink to="/bookings"><span><MdOutlineDateRange /></span>bookings</NavLink></li>
            <li onClick={()=>dispatch(sidebarAction(!isSidebarshow))}><NavLink to="/profile"><span><CgProfile /></span>My Profile</NavLink></li>
            <li onClick={()=>dispatch(sidebarAction(!isSidebarshow))}><NavLink to="/bookings"><span><FaRegMessage /></span>Messages</NavLink></li>
            <li onClick={()=>dispatch(sidebarAction(!isSidebarshow))}><NavLink to="/bookings"><span><VscGraph /></span>Analytics</NavLink></li>
            <li onClick={()=>dispatch(sidebarAction(!isSidebarshow))}><NavLink to="/bookings"><span><FaRegStar /></span>Ratings</NavLink></li>
            <li onClick={()=>dispatch(sidebarAction(!isSidebarshow))}><NavLink to="/bookings"><span><AiOutlineDollar /></span>Finance</NavLink></li>
            <li onClick={()=>dispatch(sidebarAction(!isSidebarshow))}><NavLink to="/bookings"><span><IoSettingsOutline /></span>Settings</NavLink></li>
            <li onClick={()=>dispatch(sidebarAction(!isSidebarshow))}><NavLink to="/dashboard"><span><TbLogout /></span>Log Out</NavLink></li>
        </ul>
    </div>
  )
}

export default AppSidebar