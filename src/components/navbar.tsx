"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { InteractiveButton } from "./ui/buttons/interactive-button";
import { motion,AnimatePresence } from "motion/react";


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Framer Motion variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const drawerVariants = {
    hidden: { x: "100%", opacity: 0.9, scale: 0.98 },
    visible: { 
      x: 0, 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        mass: 1
      } 
    }
  };

  const menuItemVariants = {
    hidden: { x: 20, opacity: 0 },
    visible: (i: number) => ({ 
      x: 0, 
      opacity: 1, 
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      } 
    })
  };

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

      {/* Desktop Navigation - hidden on mobile */}
      <div className="hidden md:flex items-center gap-20 justify-between">
        <div className="flex items-center gap-10 justify-start pr-10 border-r-2 border-foreground h-12 ">
            <Link href="/" className="font-baskerville font-semibold">Home</Link>
            <Link href="/about" className="font-baskerville font-semibold">About</Link>
            <Link href="/coaching" className="font-baskerville font-semibold">Coaching</Link>
            <Link href="/breathwork" className="font-baskerville font-semibold">Breathwork</Link>
            <Link href="/help" className="font-baskerville font-semibold">Help</Link>
        </div>
        <InteractiveButton 
          variant="transparent" 
          text="Book an event" 
          className="btn w-52 py-3"
          textClassName="hover:text-primary"
          href="/book-appointment"
        />
      </div>

      {/* Mobile menu button - visible only on mobile */}
      <button 
        className="md:hidden flex items-center"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          className="w-8 h-8"
          animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </motion.svg>
      </button>

      {/* Mobile menu drawer with Framer Motion animations */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 backdrop-blur-md bg-black/30 z-50 md:hidden"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={toggleMenu}
          >
            <motion.div 
              className="fixed top-0 right-0 w-[75%] max-w-sm h-screen bg-primary/95 shadow-xl z-50"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className="flex justify-between items-center p-6 border-b border-secondary">
                  <Image
                    src="/other-side-of-life-logo.svg"
                    alt="logo"
                    width={80}
                    height={80}
                  />
                  <motion.button 
                    onClick={toggleMenu} 
                    className="p-1 rounded-full hover:bg-secondary/10"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      className="w-7 h-7"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>
                
                <div className="flex flex-col py-8 px-6 gap-6 overflow-y-auto flex-grow">
                  {/* Menu links with staggered animations */}
                  {[
                    { name: "Home", href: "/" },
                    { name: "About", href: "/about" },
                    { name: "Coaching", href: "/coaching" },
                    { name: "Breathwork", href: "/breathwork" },
                    { name: "Help", href: "/help" }
                  ].map((item, index) => (
                    <motion.div
                      key={item.name}
                      custom={index}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Link 
                        href={item.href}
                        className="font-baskerville font-semibold text-lg py-3 border-b border-secondary/30 block w-full"
                        onClick={toggleMenu}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Book an event button - moved up to be with the navigation links */}
                  <motion.div 
                    className="mt-4"
                    custom={5} // Position it after the 5 navigation items
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <Link href="/book-appointment" onClick={toggleMenu}>
                      <InteractiveButton 
                        variant="filled" 
                        text="Book an event" 
                        className="btn w-full py-3 bg-accent-1 text-primary hover:text-secondary"
                        ballClassName="bg-accent-2"
                      />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
