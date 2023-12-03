'use client'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <header className='px-4 py-12'>
        <div className='flex justify-between mx-auto max-w-screen-xl'>
            <Link href={'/'}>Logo</Link>
            <div className='flex gap-6'>
                <Link href={`/profile`}>Profile</Link>
            </div>
        </div>
    </header>
  )
}

export default Navbar