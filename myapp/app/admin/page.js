'use client'
import React, { useEffect, useState } from 'react';
import { RingLoader } from 'react-spinners';
import { css } from '@emotion/react';
import Link from 'next/link';

const Admin = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/hotel');
      if (response.ok) {
        const data = await response.json();
        setHotels(data);
      } else {
        console.error('Error fetching hotels');
      }
    } catch (error) {
      console.error('Error fetching hotels', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (property) => {
    const sortedHotels = [...hotels].sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
    setHotels(sortedHotels);
  };

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  return (
    <section className='px-6 py-12'>
      <h2 className='text-2xl font-bold mb-4'>Hotel Management</h2>

      {loading ? (
        <div className='flex items-center justify-center'>
          <RingLoader color='#f97316' loading={loading} css={override} size={50} />
        </div>
      ) : (
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th
                onClick={() => handleSort('name')}
                className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Name
              </th>
              <th
                onClick={() => handleSort('type')}
                className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Type
              </th>
              <th
                onClick={() => handleSort('city')}
                className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                City
              </th>
              <th
                onClick={() => handleSort('address')}
                className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Address
              </th>
              <th
                onClick={() => handleSort('distance')}
                className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Distance
              </th>
              <th
                onClick={() => handleSort('title')}
                className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Title
              </th>
              <th
                onClick={() => handleSort('rating')}
                className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Rating
              </th>
              <th
                className='cursor-pointer px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
              >
                Details
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {hotels.map((hotel) => (
              <tr key={hotel._id}>
                <td className='px-6 py-4 whitespace-nowrap'>{hotel.name}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{hotel.type}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{hotel.city}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{hotel.address}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{hotel.distance}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{hotel.title}</td>
                <td className='px-6 py-4 whitespace-nowrap'>{hotel.rating}</td>
                <td className='px-6 py-4 whitespace-nowrap'><Link href={`/admin/hotel/${hotel._id}`}>Details</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default Admin;
