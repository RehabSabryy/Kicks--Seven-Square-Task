import React from 'react'
import { Navigate } from 'react-router-dom'
export default function LayoutRoutes({children}) {
    if (!!localStorage.getItem('token')) 
        {
            return  <Navigate to="/layout/dashboard" /> 
        }
         else 
        {
        return children
        }
}
