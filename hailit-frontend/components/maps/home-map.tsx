"use client";

import { Map, Marker } from "pigeon-maps";
import { FaMapPin } from "react-icons/fa";

export default function HomeMap() {
  return (
    <div className="flex justify-center w-full h-full relative">
      <Map
        height={250}
        center={[6.69858, -1.62343]}
        mouseEvents={false}
        touchEvents={false}
        metaWheelZoom={false}
        zoom={16}
      >
        <Marker 
        anchor={[6.69858, -1.62343]} 
        width={36}
        color="red"
        >  
        </Marker>
      </Map>
    </div>
  );
}
