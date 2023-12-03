'use client'
import React, { useState, useEffect } from 'react';
import { RingLoader } from 'react-spinners';
import { css } from '@emotion/react';
import Link from 'next/link';

const SingleHotel = (ctx) => {
  const [hotelDetails, setHotelDetails] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/hotel/${ctx.params.id}`, { cache: 'no-store' });

        if (res.ok) {
          const data = await res.json();
          setHotelDetails(data);
        } else {
          console.error('Error fetching hotel details');
        }
      } catch (error) {
        console.error('Error fetching hotel details', error);
      }
    };

    fetchHotel();
  }, [ctx.params.id]);

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/hotel/${ctx.params.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        // Redirect to another page or update the UI as needed
        console.log('Hotel deleted successfully');
      } else {
        console.error('Error deleting hotel');
      }
    } catch (error) {
      console.error('Error deleting hotel', error);
    }
  };

  return (
    <section className='px-4 py-8 max-w-screen-xl mx-auto'>
      {hotelDetails ? (
        <div>
          <h2 className='text-2xl font-bold mb-4'>{hotelDetails.name}</h2>
          {hotelDetails.image && (
            <img src={hotelDetails.image} alt={hotelDetails.name} className='mb-4 max-w-full h-auto' />
          )}
          <div className='grid grid-cols-2 gap-4'>
            {Object.entries(hotelDetails).map(([property, value]) => (
              <div key={property} className='mb-4'>
                <p className='text-sm font-medium text-gray-500 uppercase tracking-wider'>{property}</p>
                <p className='text-base font-normal'>{value}</p>
              </div>
            ))}
          </div>
          <div className='mt-8 flex items-center space-x-4'>
            <Link href={`/edit-hotel/${ctx.params.id}`}>
              <span className='px-4 py-2 bg-blue-500 text-white rounded-md'>Edit Hotel</span>
            </Link>
            <button
              onClick={handleDelete}
              className='px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer'
            >
              Delete Hotel
            </button>
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-center'>
          <RingLoader color='#f97316' css={override} size={50} />
        </div>
      )}
    </section>
  );
};

export default SingleHotel;
