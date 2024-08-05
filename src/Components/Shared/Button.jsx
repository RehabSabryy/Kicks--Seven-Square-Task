import React from 'react'
export default function Button({btn,loading}) {
  return (
    <>
        <button className='btn py-2 px-3 w-100'>
          {loading ? (
                  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ): (
            <>
            {btn}
            </> 
          )      
          }
        </button>
    </>
  )
}
