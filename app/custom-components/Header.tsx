"use client"
import React from 'react'
import { menu } from '../data/Menu'
import Link from 'next/link'

export default function Header() {
  return (
    <div className='flex justify-between w-full h-24 bg-gray-100 flex items-center px-10'>
        <h1 className='text-4xl font-extrabold text-shadow-md'>pukhtunkhwa <span className='text-red-600'>.com</span></h1>
        <ul className='flex gap-2'>
          {menu.map((item, index) => (
            <p key={index}>
              <Link href={`${item.path}`}>
              {item.name}
              </Link>
              </p>
          ))}
        </ul>
    </div>
  )
}
