'use client'

import { usePathname } from 'next/navigation'

export default function DecorativeImage() {
  const pathname = usePathname()

  // Example: hide the image on /login and /signup, show elsewhere
  if (pathname === '/anime' || pathname === '/manga' || pathname === '/mylist') return null

  return (
    <div className="absolute -top-[3%] sm:-top-[6.5%] md:-top-[12%] -right-[17%] md:-right-[10%] pointer-events-none z-0 w-72 sm:w-96 lg:w-[540px]">
      <img
        src="https://framerusercontent.com/images/dwxExDkm76wbBZfsBvtV3qnpVs.png?scale-down-to=1024"
        alt="decorative"
        className="w-full h-auto floating-vertical"
      />
    </div>
  )
}