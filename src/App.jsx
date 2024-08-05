import React from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Login from './Components/Authentication/Login/Login';
import Register from './Components/Authentication/Register/Register';
import Layout from './Components/Layout/Layout';
import Admin from './Components/Admin/Admin';
import Dashboard from './Components/Dashboard/Dashboard';
import AddProduct from './Components/AddProduct/AddProduct';
import UpdateProduct from './Components/UpdateProduct/UpdateProduct';
import AllProducts from './Components/AllProducts/AllProducts';
import NotFound from './Components/NotFound/NotFound';
const routers = createBrowserRouter([
  {index: true, element: <Login />},
  {path: '/register', element: <Register />},
    {path:'/layout' , element: <Layout /> , children:[
      {path:'admin', element: <Admin />},
      {path:'dashboard', element: <Dashboard />},
      {path:'add-product', element: <AddProduct />},
      {path:'update-product', element: <UpdateProduct />},
      {path:'all-products', element: <AllProducts />},
    ]},
  {path: '*', element: <NotFound />},
])
export default function App() {
  return (
    <>
      <RouterProvider router={routers} />

    </>
  )
}
