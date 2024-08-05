import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './Footer.module.css'
export default function Footer() {
  return (
    <>
        <hr />
        <div className='d-flex justify-content-between'>
            <div>
                <p className={Styles.size}>© 2023 - kicks Dashboard</p>
            </div>
            <div>
                <Link className={Styles.linkStyle}>About</Link>
                <Link className={Styles.linkStyle}>Careers</Link>
                <Link className={Styles.linkStyle}>Policy</Link>
                <Link className={Styles.linkStyle}>Contact</Link>
            </div>
        </div>
    </>
  )
}
