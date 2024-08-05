import React from 'react'

export default function AuthButton({buttonName,loading}) {
  return (
    <>
        <div className="btn w-100 p-0">
            <button type="submit" className="btn  w-100 p-3 text-start d-flex justify-content-between align-items-center" disabled={loading}>
              {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>

              ) : (
                  <>
                    <span>{buttonName}</span>
                    <i className="fa-solid fa-arrow-right"></i>
                  </>
              )}
                
            </button>
        </div>
    </>
  )
}
