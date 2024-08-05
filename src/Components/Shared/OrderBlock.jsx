import React from 'react'

export default function OrderBlock({order}) {
  return (
    <>
        <div className="rounded-4 layout-color p-3">
            <div className="d-flex justify-content-between align-items-center">
                <p className='fw-bold'>{order}</p>
                <img src="/Images/vertical-dots.png" alt="dots" />
            </div>
            <div>
                <div className='d-flex justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <img src="/Images/order.png" alt="Order" />
                        <p className="fw-bold ps-2">$126.500</p>
                    </div>
                    <div className="d-flex align-items-baseline">
                        <i className="fa-solid fa-arrow-up  pe-2" ></i>
                        <p>34.7%</p>
                    </div>
                </div>
                <div className='d-flex justify-content-end w-100 pt-2'>
                    <p className="text-muted">Compared to Jan 2022</p>
                </div>
            </div>
        </div>
    </>
  )
}
