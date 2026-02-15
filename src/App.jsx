import React, { Suspense, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PublicRoute from './routes/PublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import AuthLayout from './layouts/AuthLayout'
import DefaultLayout from './layouts/DefaultLayout'
import CreateProduct from './pages/product/CreateProduct'
import ProductList from './pages/product/ProductList'
import ViewProduct from './pages/product/ViewProduct'
const Home = React.lazy(() => import('./pages/home'))
const Register = React.lazy(() => import('./pages/register/Register'))
const Dashboard = React.lazy(() => import('./pages/profile/Dashboard'))


function App() {

  return (
      <BrowserRouter>
        <Routes>
        <Route element={<PublicRoute />}>
            <Route element={<DefaultLayout />}>                
              <Route path="/sign-up" name="sign-up" element={<Register />} />            
            </Route>       
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<AuthLayout />}>             
                   <Route path="/dashboard" name="Dashboard" element={<Dashboard />} />
                     <Route path="/product" name="Product" element={<ProductList />} />
                  <Route path="/product/create" name="Create Product" element={<CreateProduct />} />
                  <Route path="/product/:id" name="View Product" element={<ViewProduct />} />
          </Route>
        </Route>
         <Route element={<DefaultLayout />}>                
           <Route path="/" name="Home" element={<Home />} />         
      </Route>  
          
      </Routes>
     
    </BrowserRouter>
  )
}

export default App
