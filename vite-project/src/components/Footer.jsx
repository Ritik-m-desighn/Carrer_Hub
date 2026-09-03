import React from 'react'
import { useState } from 'react'
const Footer = ({count,sum}) => {
    
  return (
    <div className='mt-3 flex gap-2'>
    <button className='bg-green-400 rounded-2xl p-1 '>Cart Items {count} </button>
        <button className='bg-green-400 rounded-2xl p-1 '>Total {sum} </button>

    </div>
  )
}

export default Footer