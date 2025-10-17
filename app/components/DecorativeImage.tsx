'use client';

import { usePathname } from 'next/navigation';

export default function DecorativeImage() {
  const pathname = usePathname();

  // Example: hide the image on /login and /signup, show elsewhere
  if (
    pathname === '/anime' ||
    pathname === '/manga' ||
    pathname === '/mylist' ||
    pathname === 'characters'
  )
    return null;

  return (
    <>
      <div className="hidden sm:block absolute -top-[3%] sm:-top-[6.5%] md:-top-[12%] -right-[17%] md:-right-[10%] pointer-events-none z-0 w-72 sm:w-96 lg:w-[540px]">
        <img
          src="https://framerusercontent.com/images/dwxExDkm76wbBZfsBvtV3qnpVs.png?scale-down-to=1024"
          alt="decorative"
          className="w-full h-auto floating-vertical"
        />
      </div>
      <div
        className={` sm:hidden absolute -top-[2.5%] sm:-top-[6.5%] md:-top-[12%] -right-[17%] md:-right-[10%] pointer-events-none z-0 w-72 sm:w-96 lg:w-[540px] ${pathname === '/' ? 'block' : 'hidden'}`}
      >
        <img
          src="https://framerusercontent.com/images/dwxExDkm76wbBZfsBvtV3qnpVs.png?scale-down-to=1024"
          alt="decorative"
          className="w-full h-auto floating-vertical"
        />
      </div>
    </>
  );
}
