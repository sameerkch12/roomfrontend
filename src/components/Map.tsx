import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import axios from 'axios';
import { FaIndianRupeeSign } from 'react-icons/fa6';

// Define the types for the hotel and image objects
interface Image {
  _id: string;
  url: string;
}

interface Location {
  coordinates: [number, number]; // [longitude, latitude]
}

interface Hotel {
  _id: string;
  name: string;
  address: string;
  price: string;
  images: Image[];
  location: Location;
}

const Map: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]); // State to store the fetched hotels
  const [loading, setLoading] = useState<boolean>(true); // State for loading state

  // Fetch hotel data from backend
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get<Hotel[]>("http://localhost:3000/api/hoteladmin/hotels");
        console.log(response.data); // Log the response to debug
        if (response.data && Array.isArray(response.data)) {
          setHotels(response.data);
        } else {
          console.error("Expected hotels data not found in response.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading message while data is being fetched
  }

  if (!hotels.length) {
    return <div>No hotels available</div>; // Show a message if there are no hotels
  }

  // Set a default center for the map, you can adjust this based on your data
  const defaultCenter: [number, number] = hotels.length ? [hotels[0].location.coordinates[1], hotels[0].location.coordinates[0]] : [51.505, -0.09];

  return (
    <div>
      <MapContainer center={defaultCenter} zoom={15} scrollWheelZoom={false} style={{ height: "60vh" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {hotels.map((hotel) => (
          <Marker key={hotel._id} position={[hotel.location.coordinates[1], hotel.location.coordinates[0]]}>
            <Popup>
              <div className="flex gap-2">
                <div className="w-[64px] h-[64px] overflow-hidden rounded-lg">
                  {hotel.images.map((image) => (
                    <img key={image._id} src={image.url} alt={hotel.name} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                  ))}
                </div>
                <div className="flex flex-col justify-between">
                  <b>{hotel.name}</b>
                  <b>{hotel.address}</b>
                  <b className="flex flex-row items-center"><FaIndianRupeeSign /> {hotel.price}</b>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
