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
import ProtectedRoute from './Components/Routes/ProtectedRoute';
import LayoutRoutes from './Components/Routes/LayoutRoutes';
import NotFound from './Components/NotFound/NotFound';
import { Offline } from 'react-detect-offline';

const routers = createBrowserRouter([
  {index: true, element:<LayoutRoutes><Login /></LayoutRoutes>},
  {path: '/register', element: <Register />},
    {path:'/layout' , element:<ProtectedRoute><Layout /> </ProtectedRoute> , children:[
      {path:'admin', element:<ProtectedRoute><Admin /> </ProtectedRoute> },
      {path:'dashboard', element:<ProtectedRoute><Dashboard /> </ProtectedRoute> },
      {path:'add-product', element: <ProtectedRoute><AddProduct /> </ProtectedRoute>},
      {path:'update-product/:id', element: <ProtectedRoute><UpdateProduct /> </ProtectedRoute>},
      {path:'all-products', element:<ProtectedRoute><AllProducts /> </ProtectedRoute> },
      {path:'all-products/:category', element:<ProtectedRoute><AllProducts /> </ProtectedRoute> },
    ]},
  {path: '*', element: <NotFound />},
])
export default function App() {
  return (
    <>
      <Offline>
        <div className="offline">
          You are offline
        </div>
      </Offline>
      <RouterProvider router={routers} />

    </>
  )
}
