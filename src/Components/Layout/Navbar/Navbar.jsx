import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [getCategories,setGetCategories] = useState([]);
  const [error,setError] = useState(null);
  const navigate = useNavigate();
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
  
  //logout
  const logout = () => {
    localStorage.clear();
    navigate('/');
  }
  return (
    <>
<nav className="navbar layout-color">
  <div className="container-fluid">
    <div className="icons w-100 d-flex justify-content-end align-items-center p-3">
        <i className="fa-solid fa-magnifying-glass pe-4"></i>
        <i className="fa-solid fa-bell pe-4"></i>
          <div className="btn-group me-5">
              <button type="button" className="btn btn-outline-dark px-3 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              {userName}
              </button>
              <ul className="dropdown-menu">
                <li><p className="dropdown-item cursor-pointer" onClick={logout}>Logout</p></li>
                <li><p className="dropdown-item cursor-pointer" >Another action</p></li>
              </ul>
            </div>
    </div>
  </div>
</nav>
    </>
  )
}
