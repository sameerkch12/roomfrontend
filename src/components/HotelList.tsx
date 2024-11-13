import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaWifi } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosCall } from "react-icons/io";
import { MdMeetingRoom } from "react-icons/md";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { RiSofaLine } from "react-icons/ri";
import axios from "axios";

// Define the Hotel interface for type safety
interface Hotel {
  _id: string;
  images: { url: string }[];
  price: string;
  name: string;
  room: string;
  wifi: boolean;
  furnished: boolean;
  address: string;
  phone: string;
  location: { timestamp: string };
}

// HotelList component
const HotelList: React.FC = () => {
  // State for storing the list of hotels and the current image index for each hotel
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [currentIndexes, setCurrentIndexes] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/hoteladmin/hotels");
        setHotels(response.data);

        // Initialize currentIndexes for each hotel with an index of 0
        const initialIndexes = response.data.reduce((acc: { [key: string]: number }, hotel: Hotel) => {
          acc[hotel._id] = 0;
          return acc;
        }, {});
        setCurrentIndexes(initialIndexes);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };
    fetchHotels();
  }, []);

  const handleNext = (hotelId: string, imagesLength: number) => {
    setCurrentIndexes((prevIndexes) => ({
      ...prevIndexes,
      [hotelId]: (prevIndexes[hotelId] + 1) % imagesLength,
    }));
  };

  const handlePrev = (hotelId: string, imagesLength: number) => {
    setCurrentIndexes((prevIndexes) => ({
      ...prevIndexes,
      [hotelId]: (prevIndexes[hotelId] - 1 + imagesLength) % imagesLength,
    }));
  };

  return (
    <div className="mt-2 flex flex-wrap w-full lg:justify-center px-4">
      {/* Results Summary */}
      <div className="w-full mb-4 text-lg font-semibold text-gray-700">
        Showing 1 - {Math.min(30, hotels.length)} of {hotels.length} properties
        <div className="text-xl font-bold">Flats for Rent in Bilaspur</div>
      </div>

      <ul className="flex flex-col w-full">
        {hotels.map((hotel) => (
          <li
            key={hotel._id}
            className="bg-white mb-8 p-4 h- flex flex-col sm:flex-row justify-start border items-center rounded shadow"
          >
            {hotel.images && hotel.images.length > 0 ? (
              <div className="overflow-hidden relative bg-black content-center rounded-3xl w-full sm:w-44 h-44 mb-4 sm:mb-0">
                <div
                  className="flex transition-transform duration-500"
                  style={{
                    transform: `translateX(-${currentIndexes[hotel._id] * 100}%)`,
                  }}
                >
                  {hotel.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      alt={`Hotel ${index + 1}`}
                      className="w-full sm:w-64 h-68 object-cover flex-shrink-0"
                    />
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-between p-2">
                  <button
                    className="p-1 rounded-full shadow bg-white opacity-80 text-gray-800 hover:bg-white"
                    onClick={() => handlePrev(hotel._id, hotel.images.length)}
                  >
                    <FaChevronLeft size={20} />
                  </button>
                  <button
                    className="p-1 rounded-full shadow bg-white opacity-80 text-gray-800 hover:bg-white"
                    onClick={() => handleNext(hotel._id, hotel.images.length)}
                  >
                    <FaChevronRight size={20} />
                  </button>
                </div>
                <div className="absolute bottom-4 right-0 left-0">
                  <div className="flex items-center justify-center gap-1">
                    {hotel.images.map((_, i) => (
                      <div
                        key={i}
                        className={`transition-all w-3 h-3 rounded-full ${
                          currentIndexes[hotel._id] === i
                            ? "bg-white p-1"
                            : "bg-white bg-opacity-50"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p>No images available</p>
            )}
            <div className="sm:ml-10 flex flex-col w-full sm:w-auto">
              <div className="flex flex-col gap-1">
                <div className="flex items-center font-bold text-2xl">
                  <FaIndianRupeeSign />
                  <p>{hotel.price}</p>
                </div>
                <h3 className="mb-2 font-semibold text-2xl">{hotel.name}</h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 bg-slate-100 border p-4 sm:p-9 rounded">
                <div className="flex items-center gap-1">
                  <MdMeetingRoom className="text-3xl sm:text-5xl" />
                  <div className="flex flex-col">
                    <p className="text-gray-500">Room</p>
                    <p className="text-slate-950 font-bold">{hotel.room}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FaWifi className="text-3xl sm:text-5xl" />
                  <div className="flex flex-col">
                    <p className="text-gray-500">Wifi</p>
                    <p className="text-slate-950 font-bold">
                      {hotel.wifi ? "Available" : "Not Available"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <RiSofaLine className="text-3xl sm:text-5xl" />
                  <div className="flex flex-col">
                    <p className="text-gray-500">Furnished</p>
                    <p className="text-slate-950 font-bold">
                      {hotel.furnished ? "Yes" : "No"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center mt-3">
                <FaLocationDot />
                <p className="font-semibold"> {hotel.address}</p>
              </div>
              <div className="mt-2 flex flex-col sm:flex-row gap-4 sm:gap-10">
                <button className="flex items-center gap-1 p-3 border border-green-500 bg-green-100 rounded">
                  <IoIosCall /> {hotel.phone}
                </button>
              </div>
            </div>
            <div className="relative bottom-36 text-slate-400 text-xs sm:text-base sm:mt-0">
              <p className="text-xs">
                Added on: {new Date(hotel.location.timestamp).toLocaleDateString()}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HotelList;
