import React from 'react'
import { Link } from 'react-router-dom'
export default function KeepMeLogged() {
  return (
    <>
        <label className="form-group mb-4 custom-checkbox">
            <input type="checkbox" id="keepLoggedIn" />
            <span className="checkbox-custom"></span>
            <span className="checkmark fw-semibold">Keep me logged in - applies to all log in options below.</span>
            <Link className='text-black'>
                <p className='ps-4 fw-semibold'> More info</p>
            </Link>
        </label>
    </>
  )
}
