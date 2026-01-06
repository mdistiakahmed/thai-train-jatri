// app/routes/page.js
import Image from 'next/image';
import Link from 'next/link';

// Mock data - replace this with your actual data
const routes = [
  { from: 'Krung Thep Aphiwat', to: 'Surat Thani', slug: 'krung-thep-aphiwat-to-surat-thani' },
  { from: 'Bangkok', to: 'Chiang Mai', slug: 'bangkok-to-chiang-mai' },
  { from: 'Hua Hin', to: 'Pattaya', slug: 'hua-hin-to-pattaya' },
  { from: 'Ayutthaya', to: 'Phuket', slug: 'ayutthaya-to-phuket' },
];

export default function RoutesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Train Routes</h1>
          <p className="text-gray-600">Select a route to view schedules and book tickets</p>
        </div>

        <Image
          src="/thai-train.jpg"
          alt="Thailand Railway Train Journey"
          width={400}
          height={200}
          className="mx-auto my-8"
        />
        
        <div className="space-y-4">
          {routes.map((route, index) => (
            <Link 
              key={index} 
              href={`/routes/${route.slug}`}
              className="block group"
            >
              <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 hover:border-blue-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {route.from} → {route.to}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">View schedule and book tickets</p>
                  </div>
                  <div className="text-gray-400 group-hover:text-blue-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}