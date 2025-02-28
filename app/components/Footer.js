"use client"
import React from 'react'
import { usePathname } from 'next/navigation'

const Footer = () => {
  const pathname = usePathname()
  if (pathname === '/dashboard' || pathname === '/resume-preview' || pathname === '/contact') return null
  return (
    <footer className='bg-blend-darken bg-blue-950 text-white text-center p-4 sticky bottom-0 z-10'>
        <p><b>Developed by Aisha</b> © 2025 Resume Builder</p>
    </footer>
  )
}

export default Footer
