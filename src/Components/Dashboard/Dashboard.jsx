import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import OrderBlock from '../Shared/OrderBlock';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Button from '../Shared/Button';
import './Dashboard.css';

export default function Dashboard() {

  const data = [
    { name: 'JUL', sales: 100 },
    { name: 'AUG', sales: 200 },
    { name: 'SEP', sales: 300 },
    { name: 'OCT', sales: 250 },
    { name: 'NOV', sales: 320 },
    { name: 'DEC', sales: 400 },
  ];

  const orders = [
    { product: 'Adidas Ultra boost', orderId: '#25426', date: 'Jan 8th, 2022', customer: 'Leo Gouse', status: 'Delivered', amount: '$200.00' },
    { product: 'Adidas Ultra boost', orderId: '#25425', date: 'Jan 7th, 2022', customer: 'Jaxson Korsgaard', status: 'Canceled', amount: '$200.00' },
  ];

  const columns = useMemo(
    () => [
      { Header: 'Product', accessor: 'product' },
      { Header: 'Order ID', accessor: 'orderId' },
      { Header: 'Date', accessor: 'date' },
      { Header: 'Customer', accessor: 'customer' },
      { Header: 'Status', accessor: 'status' },
      { Header: 'Amount', accessor: 'amount' },
    ],
    []
  );

  const tableInstance = useTable({ columns, data: orders });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className='ms-4 mt-4'>
            <h4 className='fw-bold'>Dashboard</h4>
            <p className='fw-bold'>Home &gt; Dashboard</p>
          </div>
          <div className='d-flex align-items-start'>
            <img src="/Images/calendar.png" className='me-2' alt="Calendar" />
            <p className='fw-bold'>Feb 16,2022 - Feb 20,2022</p>
          </div>
        </div>
        <div className='row'>
          <div className="col-md-4 ps-0">
            <OrderBlock order={'Total Orders'} />
          </div>
          <div className="col-md-4">
            <OrderBlock order={'Active Orders'} />
          </div>
          <div className="col-md-4">
            <OrderBlock order={'Shipped Orders'} />
          </div>
        </div>
        <div className="row mt-4">
          <div className='col-md-8 p-3'>
            <div className="layout-color p-3 rounded-4">
              <div className='d-flex justify-content-between mb-2'>
                <h6 className='fw-bold'>Sale Graph</h6>
                <div className='d-flex'>
                  <div className='border border-dark rounded me-2'>
                    <Button btn='WEEKLY' />
                  </div>
                  <div className='chart-btn me-2'>
                    <Button btn='MONTHLY' />
                  </div>
                  <div className='border border-dark rounded'>
                    <Button btn='YEARLY' />
                  </div>
                </div>
              </div>
              <hr />
              <LineChart width={700} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </div>
          </div>
          <div className='col-md-4 p-3'>
            <div className="layout-color p-3 rounded-4">
              <div className='d-flex justify-content-between align-items-center mb-2'>
                <h6 className='fw-bold'>Best Sellers</h6>
                <img src="/Images/vertical-dots.png" alt="dots" />
              </div>
              <hr />

              <div className='d-flex align-items-center justify-content-between'>
                <div className='d-flex align-items-center'>
                  <div className='me-3'>
                    <img src="/Images/test.png" className='best-seller-imgs' alt="Best Seller" />
                  </div>
                  <div>
                    <p className='fw-bold'>Adidas Ultra boost</p>
                    <p className='text-muted'>$25425</p>
                  </div>
                </div>
                <div>
                  <p className="fw-bold">$25425</p>
                  <p className="text-muted">999 sales</p>
                </div>
              </div>


              <div className='col-md-4 mt-3 mb-3 chart'>
                <Button btn='REPORT' />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <div className="layout-color p-3 rounded-4">
              <h6 className="fw-bold">Recent Orders</h6>
              <hr />
              <table {...getTableProps()} className="table table-hover">
                <thead>
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {rows.map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => (
                          <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
