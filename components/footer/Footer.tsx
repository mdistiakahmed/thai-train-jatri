import React from "react";
import Link from "next/link";
import { FaTrain, FaMapMarkerAlt, FaClock, FaInfoCircle, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <FaTrain className="text-red-600 text-2xl" />
              <span className="text-xl font-bold">ThaiRail</span>
              <span className="text-red-500 text-xs">.com</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your complete guide to Thailand Railway. Find accurate schedules, 
              live tracking, and travel information for all train routes across Thailand.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-red-500" />
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'Train Schedule', href: '/schedule' },
                { name: 'Popular Routes', href: '/routes' },
                { name: 'Ticket Prices', href: '/fares' },
                { name: 'Book Tickets', href: '/book' },
                { name: 'Station Guide', href: '/stations' },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Routes */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <FaTrain className="mr-2 text-red-500" />
              Popular Routes
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'Bangkok to Chiang Mai', href: '/routes/bangkok-to-chiang-mai' },
                { name: 'Bangkok to Surat Thani', href: '/routes/bangkok-to-surat-thani' },
                { name: 'Chiang Mai to Bangkok', href: '/routes/chiang-mai-to-bangkok' },
                { name: 'Surat Thani to Bangkok', href: '/routes/surat-thani-to-bangkok' },
              ].map((route) => (
                <li key={route.name}>
                  <Link 
                    href={route.href}
                    className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <FaInfoCircle className="mr-2 text-red-500" />
              Contact & Info
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start">
                <FaClock className="mt-1 mr-2 text-red-500 flex-shrink-0" />
                <span>24/7 Customer Support</span>
              </li>
              <li>
                <p>Email: info@thairail.com</p>
              </li>
              <li>
                <p>Phone: +66 2 123 4567</p>
              </li>
              <li>
                <p>Bangkok, Thailand</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} ThaiRail.com. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="text-sm text-gray-500 hover:text-white">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-sm text-gray-500 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/sitemap" className="text-sm text-gray-500 hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;