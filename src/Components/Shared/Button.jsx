import React from 'react'
import Loading from 'react-loading';
export default function Button({btn}) {
  return (
    <>
        <button className='btn py-2 px-3 w-100'>
           {btn} 
        </button>
    </>
  )
}
