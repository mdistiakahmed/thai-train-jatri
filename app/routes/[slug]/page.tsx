import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { FaTrain, FaClock, FaArrowRight } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";

// Helper function to parse the slug into readable station names
function parseSlug(slug: string) {
  console.log(slug);
  const parts = slug.split("-to-");
  if (parts.length !== 2) return null;

  const formatStationName = (str: string) =>
    str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return {
    from: formatStationName(parts[0]),
    to: formatStationName(parts[1]),
  };
}

// Function to fetch route data
async function getRouteData(slug: string) {
  try {
    const filePath = path.join(process.cwd(), "data", "routes", `${slug}.json`);
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const stations = parseSlug(slug);
  if (!stations) return { title: "Route Not Found" };

  return {
    title: `${stations.from} to ${stations.to} - Train Schedule`,
    description: `View train schedules from ${stations.from} to ${stations.to} and vice versa.`,
    openGraph: {
      title: `${stations.from} to ${stations.to} - Train Schedule`,
      description: `Check train schedules and book tickets from ${stations.from} to ${stations.to}.`,
      url: `https://yourdomain.com/routes/${slug}`,
      siteName: "Thai Rail",
      type: "website",
    },
  };
}

export default async function RoutePage({ params }: any) {
  const { slug } = await params;
  const stations = parseSlug(slug);
  if (!stations) notFound();

  const data = await getRouteData(slug);
  if (!data) notFound();

  // Format time to 12-hour format
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const headerSection = () => {
    return (
      <div className="text-center mb-8 max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {stations.from} to {stations.to} Train Schedule & Timetable
        </h1>
        <p className="text-lg mb-4">
          Complete Thailand Railway schedule for trains traveling from{" "}
          {stations.from} to {stations.to}. Find departure times, arrival times,
          train numbers, and service types for all available trains.
        </p>
      </div>
    );
  };

  const generateScheduleDescription = (
    trips: any[],
    from: string,
    to: string,
    direction: string
  ) => {
    if (!trips || trips.length === 0) return null;

    const getScheduleText = (trip: any) => {
      return `The ${trip.trainTypeNameEn} (Train #${
        trip.trainNo
      }) departs from ${from} at ${formatTime(
        trip.departureTime
      )} and arrives in ${to} at ${formatTime(trip.arrivalTime)}.`;
    };

    const descriptions = trips.map((trip) => getScheduleText(trip));

    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mt-24 mb-8 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          {direction} Schedule Overview
        </h2>
        <div className="space-y-4">
          {descriptions.map((desc, index) => (
            <p key={index} className="text-gray-700">
              {desc}
            </p>
          ))}
        </div>
      </div>
    );
  };

  const generateFAQSection = (
    trips: any[],
    from: string,
    to: string,
    direction: string
  ) => {
    if (!trips || trips.length === 0) return null;

    // Helper function to get operating days
    const getOperatingDays = (trip: any) => {
      // Assuming trip has a 'days' array, adjust according to your data structure
      return trip.days ? trip.days.join(", ") : "Daily";
    };

    // Helper function to get journey duration
    const getJourneyDuration = (departure: string, arrival: string) => {
      // You can implement duration calculation here if needed
      return "Approximately X hours Y minutes"; // Placeholder
    };

    const faqItems = trips.flatMap((trip, index) => {
      const baseFaqs = [
        {
          question: `What are the operating days of ${trip.trainTypeNameEn} #${trip.trainNo} from ${from} to ${to}?`,
          answer: `${trip.trainTypeNameEn} #${
            trip.trainNo
          } operates ${getOperatingDays(trip)} from ${from} to ${to}.`,
        },
        {
          question: `What is the departure time of ${trip.trainTypeNameEn} #${trip.trainNo} from ${from}?`,
          answer: `${trip.trainTypeNameEn} #${
            trip.trainNo
          } departs from ${from} at ${formatTime(trip.departureTime)}.`,
        },
        {
          question: `What is the arrival time of ${trip.trainTypeNameEn} #${trip.trainNo} at ${to}?`,
          answer: `${trip.trainTypeNameEn} #${
            trip.trainNo
          } arrives at ${to} at ${formatTime(trip.arrivalTime)}.`,
        },
        {
          question: `How long is the journey on ${trip.trainTypeNameEn} #${trip.trainNo} from ${from} to ${to}?`,
          answer: `The journey on ${trip.trainTypeNameEn} #${
            trip.trainNo
          } takes approximately ${getJourneyDuration(
            trip.departureTime,
            trip.arrivalTime
          )}.`,
        },
      ];

      // Add more specific questions for the first trip
      if (index === 0) {
        baseFaqs.push({
          question: `What type of train is ${trip.trainTypeNameEn} #${trip.trainNo}?`,
          answer: `${trip.trainTypeNameEn} is a ${
            trip.trainCategory || "standard"
          } class train service operated by Thailand Railways.`,
        });
      }

      return baseFaqs;
    });

    return (
      <div className="mt-12">
        <h2 className="text-xl font-semibold text-center">
          {direction === "outbound"
            ? `Frequently Asked Questions: ${from} to ${to}`
            : `Frequently Asked Questions: ${to} to ${from}`}
        </h2>
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqItems.map((faq, index) => (
            <div
              key={`${direction}-${index}`}
              className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-medium text-indigo-700 mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Add this function to format the operating days
  function formatOperatingDays(daysString: string): string {
    if (!daysString) return 'N/A';
    const days = daysString.split(',').map(day => day.trim());
    return days.length === 7 ? 'All 7 days in the week' : daysString;
  }

  return (
    <div className="min-h-screen w-screen md:w-full py-8 md:px-4 ">
      <div className="w-full px-4 sm:px-6 lg:px-8 overflow-x-auto">
        {/* Header */}
        {headerSection()}

        <Image
            src="/thai-train.jpg"
            alt="Thailand Railway Train Journey"
            width={400}
            height={200}
            className="mx-auto my-8"
        />

        <div className="overflow-x-auto flex flex-col gap-24">
          {/* Forward Schedule Table */}
          <div className="flex flex-col overflow-x-auto">
            <div>
              <div className="bg-red-600 text-white px-6 py-3">
                <h2 className="text-xl font-semibold">
                  {stations.from} to {stations.to} Schedule
                </h2>
              </div>
              <div className="w-full overflow-x-auto">
                {data.forward && data.forward.length > 0 ? (
                  <table className="min-w-max w-full bg-white rounded-lg shadow-sm border border-gray-100">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 border-b text-center text-xs sm:text-sm font-medium  uppercase tracking-wider">
                          Departure
                        </th>
                        <th className="py-3 px-4 border-b text-center text-xs sm:text-sm font-medium uppercase tracking-wider">
                          Arrival
                        </th>
                        <th className="py-3 px-4 border-b text-center text-xs sm:text-sm font-medium  uppercase tracking-wider">
                          Operating Days
                        </th>
                        <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-medium  uppercase tracking-wider">
                          Train Type
                        </th>
                        <th className="py-3 px-4 border-b text-center text-xs sm:text-sm font-medium  uppercase tracking-wider">
                          Train No.
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.forward.map((trip: any, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-center ">
                            {formatTime(trip.departureTime)}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-center ">
                            {formatTime(trip.arrivalTime)}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-center ">
                            {formatOperatingDays(trip.operatingDays)}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm font-medium ">
                            <div className="flex items-center">
                              <FaTrain className="text-indigo-600 mr-2" />
                              {trip.trainTypeNameEn}
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-center font-mono ">
                            {trip.trainNo}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No scheduled trains found for this route.
                  </p>
                )}
              </div>
            </div>
          </div>
          {/* Backward Schedule Table */}
          <div className="flex flex-col overflow-x-auto">
            <div>
              <div className="bg-red-600 text-white px-6 py-3">
                <h2 className="text-xl font-semibold">
                  {stations.to} to {stations.from} Schedule
                </h2>
              </div>
              <div className="w-full overflow-x-auto">
                {data.backward && data.backward.length > 0 ? (
                  <table className="min-w-max w-full bg-white rounded-lg shadow-sm border border-gray-100">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-3 px-4 border-b text-center text-xs sm:text-sm font-medium  uppercase tracking-wider">
                          Departure
                        </th>
                        <th className="py-3 px-4 border-b text-center text-xs sm:text-sm font-medium uppercase tracking-wider">
                          Arrival
                        </th>
                        <th className="py-3 px-4 border-b  text-xs sm:text-sm font-medium text-center  uppercase tracking-wider">
                          Operating Days
                        </th>
                        <th className="py-3 px-4 border-b text-left text-xs sm:text-sm font-medium  uppercase tracking-wider">
                          Train Type
                        </th>
                        <th className="py-3 px-4 border-b text-center text-xs sm:text-sm font-medium  uppercase tracking-wider">
                          Train No.
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {data.backward.map((trip: any, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-center ">
                            {formatTime(trip.departureTime)}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-center ">
                            {formatTime(trip.arrivalTime)}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-center ">
                            {formatOperatingDays(trip.operatingDays)}
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm font-medium ">
                            <div className="flex items-center">
                              <FaTrain className="text-indigo-600 mr-2" />
                              {trip.trainTypeNameEn}
                            </div>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap text-sm text-center font-mono ">
                            {trip.trainNo}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-gray-500 text-center py-4">
                    No scheduled trains found for this route.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* After the header section */}
        {generateScheduleDescription(
          data.forward || [],
          stations.from,
          stations.to,
          `${stations.from} to ${stations.to}`
        )}

        {generateScheduleDescription(
          data.backward || [],
          stations.to,
          stations.from,
          `${stations.to} to ${stations.from}`
        )}

        {/* After the schedule description sections */}
        {generateFAQSection(
          data.forward || [],
          stations.from,
          stations.to,
          "outbound"
        )}
        {generateFAQSection(
          data.backward || [],
          stations.to,
          stations.from,
          "return"
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  // This would be replaced with actual route slugs from your data
  // For now, we'll return an empty array and rely on dynamic rendering
  return [];
}
