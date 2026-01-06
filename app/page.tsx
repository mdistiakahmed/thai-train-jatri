"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';



export default function Home() {
  return (
    <div className="min-h-screen">
      
      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Thailand Railway</span>
            <span className="block text-red-600">Schedule & Booking</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Find train schedules, book tickets, and explore Thailand's beautiful destinations by rail.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link 
                href="/book" 
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10"
              >
                Book Tickets Now
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link 
                href="/schedule" 
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                View Schedules
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Quick Search Section */}
      <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto p-6 -mt-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label htmlFor="from" className="block text-sm font-medium text-gray-700">From</label>
            <select
              id="from"
              name="from"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              defaultValue=""
            >
              <option value="">Select departure station</option>
              <option value="bangkok">Bangkok (Hua Lamphong)</option>
              <option value="chiang-mai">Chiang Mai</option>
              <option value="phitsanulok">Phitsanulok</option>
              <option value="surat-thani">Surat Thani</option>
              <option value="hat-yai">Hat Yai</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="to" className="block text-sm font-medium text-gray-700">To</label>
            <select
              id="to"
              name="to"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
              defaultValue=""
            >
              <option value="">Select arrival station</option>
              <option value="chiang-mai">Chiang Mai</option>
              <option value="bangkok">Bangkok (Hua Lamphong)</option>
              <option value="ayutthaya">Ayutthaya</option>
              <option value="phuket">Phuket</option>
              <option value="nong-khai">Nong Khai</option>
            </select>
          </div>
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 text-base focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
            />
          </div>
          <div className="flex items-end">
            <button
              type="button"
              className="w-full bg-red-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Trains
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
