import React from 'react'
import { Outlet } from 'react-router-dom'
import AppHeader from '../components/AppHeader'

const DefaultLayout = () => {
  return (
    <div className="main-layout">
      <AppHeader /> 

      <div className="main-body">
          <Outlet />
      </div>
    </div>
  )
}

export default DefaultLayout