import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 text-sm">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2">
              <img src="/images/logo.png" alt="Bridal Dreams" className="h-8 w-8" />
              <span className="font-semibold text-gray-900">Bridal Dreams</span>
            </div>
            <p className="mt-3 text-gray-500 max-w-sm">Your perfect wedding dress awaits. We specialize in elegant bridal gowns and accessories for your special day.</p>
            <div className="mt-4 flex items-center gap-4 text-gray-500">
              <a href="#" aria-label="Facebook" className="hover:text-gray-700"><FaFacebook /></a>
              <a href="#" aria-label="Instagram" className="hover:text-gray-700"><FaInstagram /></a>
              <a href="#" aria-label="Twitter" className="hover:text-gray-700"><FaTwitter /></a>
              <a href="#" aria-label="YouTube" className="hover:text-gray-700"><FaYoutube /></a>
            </div>
          </div>
          <div>
            <p className="font-medium text-gray-900">Bridal</p>
            <ul className="mt-3 space-y-2 text-gray-500">
              <li><a href="#" className="hover:text-gray-700">Wedding Dresses</a></li>
              <li><a href="#" className="hover:text-gray-700">Bridal Accessories</a></li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-900">Services</p>
            <ul className="mt-3 space-y-2 text-gray-500">
              <li><a href="#" className="hover:text-gray-700">Alterations</a></li>
              <li><a href="#" className="hover:text-gray-700">Consultation</a></li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-gray-900">Company</p>
            <ul className="mt-3 space-y-2 text-gray-500">
              <li><a href="#" className="hover:text-gray-700">About</a></li>
              <li><a href="#" className="hover:text-gray-700">Contact</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-500 flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <p>© {new Date().getFullYear()} Bridal Dreams. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-700">Privacy</a>
            <a href="#" className="hover:text-gray-700">Terms</a>
            <a href="#" className="hover:text-gray-700">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


