"use client";

import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-accent-1 text-white py-10 lg:px-[2vw] md:px-[2.5vw] px-[3.5vw]">
      <div className="container mx-auto">
        {/* Row 1: Navigation columns and logo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Row 1: Info and Connect on mobile */}
          <div className="md:col-span-1 text-center md:text-left">
            <h3 className="text-[28px] font-fraunces mb-4 text-primary">
              Info
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="hover:text-[#B3DBEE] transition-colors  text-primary-light"
                >
                  • Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#B3DBEE] transition-colors text-primary-light"
                >
                  • About
                </Link>
              </li>
              <li>
                <Link
                  href="/breathwork"
                  className="hover:text-[#B3DBEE] transition-colors text-primary-light"
                >
                  • Breathwork
                </Link>
              </li>
              <li>
                <Link
                  href="/coaching"
                  className="hover:text-[#B3DBEE] transition-colors text-primary-light"
                >
                  • Live Better
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-1 text-center md:text-left">
            <h3 className="text-[28px] font-fraunces mb-4 text-primary">
              Connect
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#B3DBEE] transition-colors text-primary-light"
                >
                  • Contact me
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="hover:text-[#B3DBEE] transition-colors text-primary-light"
                >
                  • Help
                </Link>
              </li>
              <li>
                <Link
                  href="/book-appointment"
                  className="hover:text-[#B3DBEE] transition-colors text-primary-light"
                >
                  • Book an Event
                </Link>
              </li>
            </ul>
          </div>

          {/* Row 2: Legal and Logo on mobile */}
          <div className="md:col-span-1 text-center md:text-left">
            <h3 className="text-[28px] font-fraunces mb-4 text-primary">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-[#B3DBEE] transition-colors text-primary-light "
                >
                  • Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-[#B3DBEE] transition-colors text-primary-light "
                >
                  • Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo */}
          <div className="flex justify-center md:justify-center lg:justify-end items-start">
            <Image
              src="/image 1.svg"
              alt="The Other Side of Life - Conor Harris"
              width={240}
              height={240}
              className="mb-2"
            />
          </div>
        </div>

        {/* Row 2: Social media icons and copyright */}
        <div className="mt-10 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          {/* Social Media Icons */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <Link
              href="https://instagram.com"
              aria-label="Instagram"
              className="text-primary hover:text-[#8ECAE6] transition-colors"
            >
              <svg
                className="w-7 h-7"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </Link>
            <Link
              href="https://facebook.com"
              aria-label="Facebook"
              className="text-primary hover:text-[#8ECAE6] transition-colors"
            >
              <svg
                className="w-7 h-7"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
              </svg>
            </Link>
            <Link
              href="https://tiktok.com"
              aria-label="TikTok"
              className="text-primary hover:text-[#8ECAE6] transition-colors"
            >
              <svg
                className="w-7 h-7"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25v178.72A162.55 162.55 0 1 1 185 188.31v89.89a74.62 74.62 0 1 0 52.23 71.18V0h88a121.18 121.18 0 0 0 1.86 22.17A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z" />
              </svg>
            </Link>
          </div>

          {/* Copyright section */}
          <div className="text-sm text-center md:text-right flex flex-col gap-2">
            <p>© 2024 Conor Harris. All Rights Reserved.</p>
            <p className="md:text-right">Website by Allen Zhao</p>
          </div>
        </div>

        {/* Row 3: Disclaimer */}
        <div className="mt-8 pt-4 border-t border-white/20 text-xs text-white/70 text-center">
          <p>
            DISCLAIMER: The information provided on this website is for
            educational purposes only and is not intended as medical advice. If
            you or someone you know is struggling with addiction, please seek
            professional help.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
