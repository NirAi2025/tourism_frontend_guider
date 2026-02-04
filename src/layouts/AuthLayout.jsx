import React from 'react'
import { Outlet } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import AppSidebar from '../components/AppSidebar'
import AuthHeader from '../components/AuthHeader'



const AuthLayout = () => {
  return (
     <div className="main-layout">
      <AuthHeader /> 
      <div className="auth-body">
        <AppSidebar />
        <div className="auth-content">
           <Outlet />       
        </div>
      </div>
    </div>
  )
}

export default AuthLayout