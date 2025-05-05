"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { InteractiveButton } from "./ui/buttons/interactive-button";

const Navbar = () => {
  return (
    <nav className="w-full px-[2vw] flex justify-between items-center border-b-1 border-secondary h-24 bg-primary">
      <div className="-ml-[1.4vw] mt-4 flex items-center">
        <Image
          src="/other-side-of-life-logo.svg"
          alt="logo"
          width={120}
          height={120}
          
        />
      </div>

      <div className="flex items-center gap-20 justify-between">
        <div className="flex items-center gap-10 justify-start pr-10 border-r-2 border-foreground h-12 ">
            <Link href="/" className="font-baskerville font-semibold">Home</Link>
            <Link href="/" className="font-baskerville font-semibold">About</Link>
            <Link href="/" className="font-baskerville font-semibold">Live Better</Link>
            <Link href="/" className="font-baskerville font-semibold">Breathwork</Link>
            <Link href="/" className="font-baskerville font-semibold">Help</Link>
            
        </div>
        <InteractiveButton 
          variant="transparent" 
          text="Book an event" 
          className="btn w-52 py-3"
          textClassName="hover:text-primary"
        />
      </div>
    </nav>
  );
};

export default Navbar;
