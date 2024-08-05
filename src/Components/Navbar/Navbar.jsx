import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function Navbar() {
  const [getCategories,setGetCategories] = useState([])
  const [error,setError] = useState(null)

  // useEffect(() => {
  //   fetchCategories();
  // }, [])
  
  // // fetch categories
  // const fetchCategories = async (category_id) => {
  //   try {
  //     const token = localStorage.getItem('token')
  //     const {data} = await axios.get(`https://www.sevensquare.net/api/product/getProductsByCategory/${category_id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //     console.log(data.data)
  //     setGetCategories(data.data)
  //     }
  //     catch (error) {
  //       console.log(error)
  //       setError(error.response.data.message)
  //     }
  // }
  
  // get username
  const userName = localStorage.getItem('user');
 
  return (
    <>
<nav className="navbar layout-color">
  <div className="container-fluid">
    <div className="icons w-100 d-flex justify-content-end align-items-center p-3">
        <i className="fa-solid fa-magnifying-glass pe-3"></i>
        <i className="fa-solid fa-bell pe-4"></i>
        <button type="button" className="btn btn-outline-dark">{userName} <i className="fa-solid fa-angle-down ms-1"></i></button>
    </div>
  </div>
</nav>
    </>
  )
}
