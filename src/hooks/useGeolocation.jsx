import { useEffect, useState } from "react";

interface Position {
  latitude: number;
  longitude: number;
}

export default function useGeolocation() {
  const [position, setPosition] = useState<Position>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    const geo = navigator.geolocation;

    function onSuccess(position: GeolocationPosition) {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    function onError(error: GeolocationPositionError) {
      console.error("Error retrieving geolocation:", error);
    }

    const watcher = geo.watchPosition(onSuccess, onError);

    return () => geo.clearWatch(watcher);
  }, []);

  return position;
}
