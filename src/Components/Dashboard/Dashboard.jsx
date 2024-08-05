import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import OrderBlock from '../Shared/OrderBlock';
import Button from '../Shared/Button';
import './Dashboard.css';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';


export default function Dashboard() {

  const bestSellers = [
    { name: 'Adidas Ultra boost', price: '$2425', sales: '999 sales', img: '/Images/test.png' },
    { name: 'Nike Air Max', price: '$2400', sales: '1200 sales', img: '/Images/test.png' },
    { name: 'Puma Running Shoes', price: '$2000', sales: '850 sales', img: '/Images/test.png' }
  ];

  const orders = [
    { product: 'Adidas Ultra boost', orderId: '#25426', date: 'Jan 8th, 2022',customerImg: '/Images/test.png', customer: 'Leo Gouse', status: 'Delivered', amount: '$200.00' },
    { product: 'Adidas Ultra boost', orderId: '#25425', date: 'Jan 7th, 2022',customerImg: '/Images/test.png', customer: 'Jaxson Korsgaard', status: 'Canceled', amount: '$200.00' },
    { product: 'Adidas Ultra boost', orderId: '#25426', date: 'Jan 8th, 2022',customerImg: '/Images/test.png', customer: 'Leo Gouse', status: 'Delivered', amount: '$200.00' },
    { product: 'Adidas Ultra boost', orderId: '#25425', date: 'Jan 7th, 2022',customerImg: '/Images/test.png', customer: 'Jaxson Korsgaard', status: 'Canceled', amount: '$200.00' },
    { product: 'Adidas Ultra boost', orderId: '#25426', date: 'Jan 8th, 2022',customerImg: '/Images/test.png', customer: 'Leo Gouse', status: 'Delivered', amount: '$200.00' },
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


  const data = {
    labels: ['JUL', 'AUG', 'SEP', 'OCT', 'DEC'],
    datasets: [
      {
        label: 'Sales',
        data: [100, 200, 300, 250,  400],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className='ms-4 mt-4'>
            <h4 className='fw-bold'>Dashboard</h4>
            <p className='fw-semibold'>Home &gt; Dashboard</p>
          </div>
          <div className='d-flex align-items-start'>
            <img src="/Images/calendar.png" className='me-2' alt="Calendar" />
            <p className='fw-bold'>Feb 16,2022 - Feb 20,2022</p>
          </div>
        </div>
        <div className='row'>
          <div className="col-md-4 ps-0 space-div">
            <OrderBlock order={'Total Orders'} />
          </div>
          <div className="col-md-4 space-div">
            <OrderBlock order={'Active Orders'} />
          </div>
          <div className="col-md-4 space-div">
            <OrderBlock order={'Shipped Orders'} />
          </div>
        </div>
        <div className="row mt-4">
          <div className='col-md-8 p-3'>
            <div className="layout-color p-3 rounded-4 dashboard-section">
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
              
              {/* visualized data */}
              <div className='content'>
                 <Line data={data} options={options} className='sales-graph'/>
              </div>
            </div>
          </div>

          <div className='col-md-4 p-3'>
            <div className="layout-color p-3 rounded-4 dashboard-section">
              <div className='d-flex justify-content-between align-items-center mb-2'>
                <h6 className='fw-bold'>Best Sellers</h6>
                <img src="/Images/vertical-dots.png" alt="dots" />
              </div>
              <hr />
              {bestSellers.map((bestSeller, index) => (
                 <div key={index} className='d-flex align-items-center justify-content-between'>
                 <div className='d-flex align-items-center'>
                   <div className='me-3'>
                     <img src={bestSeller.img} className='best-seller-imgs' alt="Best Seller" />
                   </div>
                   <div>
                     <p className='fw-bold'>{bestSeller.name}</p>
                     <p className='text-muted'>{bestSeller.price}</p>
                   </div>
                 </div>
                 <div>
                   <p className="fw-bold">{bestSeller.price}</p>
                   <p className="text-muted">{bestSeller.sales}</p>
                 </div>
               </div>
 
              ))}

              <div className='col-md-4 mt-3 mb-3 chart'>
                <Button btn='REPORT' />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <div className="layout-color p-3 rounded-4">
              <div className='d-flex justify-content-between align-items-center'>
                  <h5 className="fw-bold">Recent Orders</h5>
                  <img src="/Images/vertical-dots.png" alt="dots" />
              </div>
              <hr />
              <table {...getTableProps()} className="table table-hover">
                  <thead >
                    {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => {
                          const { key, ...restProps } = column.getHeaderProps();
                          return (
                            <th className='text-muted pb-3' key={key} {...restProps}>
                              {column.render('Header')}
                            </th>
                          );
                        })}
                      </tr>
                    ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                      prepareRow(row);
                      return (
                        <tr key={row.id} {...row.getRowProps()}>
                          {row.cells.map(cell => {
                              const { key, ...restProps } = cell.getCellProps();

                              if (cell.column.id === 'customer') {
                                return (
                                  
                                  <td key={key} {...restProps} className='pb-3'>
                                    <div className='d-flex align-items-center'>
                                      <img src={row.original.customerImg} alt="Customer" className='customer-img me-2' />
                                      {cell.render('Cell')}
                                    </div>
                                  </td>
                                );
                              }
                              else if (cell.column.id === 'status' && cell.value === 'Delivered') {
                                return (
                                  <td key={key} {...restProps}>
                                    <div className='d-flex align-items-center'>
                                      <div className='bg-active-color rounded-circle me-2 circle'></div>
                                      {cell.render('Cell')}
                                    </div>
                                  </td>
                                );

                              }
                              else if (cell.column.id === 'status' && cell.value === 'Canceled') {
                                return (
                                  <td key={key} {...restProps}>
                                    <div className='d-flex align-items-center'>
                                      <div className='icon-color-bg  rounded-circle me-2 circle'></div>
                                      {cell.render('Cell')}
                                    </div>
                                  </td>
                                );
                              }

                            return (
                              <td key={key} {...restProps}>
                                {cell.render('Cell')}
                              </td>
                            );
                          })}
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
