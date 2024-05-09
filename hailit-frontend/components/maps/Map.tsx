import Link from "next/link";
import { useState, useEffect } from "react";
import { Map, Marker } from "pigeon-maps";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaMapPin } from "react-icons/fa";
import { fetchMapData, reverseMapSearch } from "@/lib/utils";

import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

type UserLocation = [number, number] | null;
type UserLocationName = any;
type MapBoundaryChange = boolean;

export default function MyMap() {
  const [userLocation, setUserLocation] = useState<UserLocation>(null); // Initialize as null
  const [userLocationName, setUserLocationName] =
    useState<UserLocationName>(null);
  const [mapBoundaryChanged, setMapBoundaryChanged] =
    useState<MapBoundaryChange>(false);
  const [mapSearchData, setMapSearchData] = useState<UserLocationName>(null);
  const [mapSearchContainerOpen, setMapSearchContainerOpen] = useState(false);
  const [zoom, setZoom] = useState(18);

  const mapDataHandler = async (searchQuery: any) => {
    const data = await fetchMapData(searchQuery.target.value);
    setMapSearchData(data);
    setMapSearchContainerOpen(true);
  };
  const locationNameData = async (
    latitude: string | number,
    longitude: string | number
  ) => {
    const locationData = await reverseMapSearch(latitude, longitude);

    const locationName = locationData?.displayName;
    // const locationName = ''
    return locationName;
  };

  let windowHeight;
  if (typeof window !== "undefined") {
    windowHeight = window.innerHeight;
  } //determine the height of the screen/window

  //get the current location point of the user and determine the name of the user's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        setUserLocation([latitude, longitude]);

        setUserLocationName(locationNameData(latitude, longitude));
      },
      (error) => {
        console.error("Error getting location:", error.message);
      }
    );
  }, []);

  //set the user's location as the marker point
  useEffect(() => {
    if (userLocation) {
      setSelectedLocation(userLocation);
    }
  }, [userLocation]);

  const [selectedLocation, setSelectedLocation] = useState(userLocation);
  const [selectedLocationName, setSelectedLocationName] =
    useState(userLocationName);

  useEffect(() => {
    if (selectedLocation) {
      setSelectedLocationName(
        locationNameData(selectedLocation[0], selectedLocation[1])
      );
    }
    console.log("mapSearchData:::::", mapSearchData);
  }, [selectedLocation]);

  const selectedSearchItemHandler = (mapPoint: UserLocation) => {
    setSelectedLocation(mapPoint);
  };
  const selectedLocationHandler = (selectedLocation: UserLocation) => {
    //push this to store or state
  };

  return (
    <div className="flex justify-center relative">
      <div className="absolute flex justify-center flex-col gap-3">
        <Input
          className="flex items-center justify-center h-10 sm:h-12 w-60 md:w-96 text-center bg-white z-50 mt-5 shadow-lg rounded-full"
          placeholder="Search your location"
          onChange={() => mapDataHandler(event)}
        />
        {mapSearchData && mapSearchContainerOpen && (
          <div className="md:w-96 h-auto bg-white z-50 dark:bg-[#121212] text-black dark:text-slate-200 text-sm rounded-lg p-3">
            <span className="flex flex-col gap-2">
              {mapSearchData.map((data: any, index: number) => {
                console.log("data.lat:", data.lat);
                if (data && index <= 3) {
                  return (
                    <span
                      key={index}
                      className="flex flex-col text-[11px] gap-2"
                    >
                      {!data.display_name ? (
                        <Skeleton className="h-4 w-full" />
                      ) : (
                        <p
                          onClick={() => {
                            selectedSearchItemHandler([data.lat, data.lon]);
                            setMapSearchContainerOpen(false);
                          }}
                        >
                          {data.display_name}
                        </p>
                      )}

                      <Separator className="dark:bg-slate-300 bg-[#121212] opacity-60" />
                    </span>
                  );
                }
              })}
              {mapSearchData.length === 0 && (
                <p className="w-full"> No location matches your search </p>
              )}
              {mapSearchData && mapSearchData?.length > 3 && (
                <div>
                  <p className="text-red">See More</p>
                </div>
              )}
            </span>
          </div>
        )}
      </div>
      {/* // onClick={({ event, latLng, pixel }) => {
        //   // console.log("event:", event, "latLng:", latLng, "pixel:", pixel);
        //   setSelectedLocation(latLng);
        // }} */}

      <div className="relative w-full h-full">
        {userLocation && selectedLocation && (
          <>
            <Map
              height={800}
              center={selectedLocation}
              minZoom={1}
              maxZoom={18}
              zoom={zoom}
              animate={true}
              onAnimationStart={() => setMapBoundaryChanged(true)}
              onAnimationStop={() => setMapBoundaryChanged(false)}
              onBoundsChanged={({ center, zoom }) => {
                setSelectedLocation(center);
                setZoom(zoom);
              }}
            >
              {/* <Marker
          anchor={selectedLocation}
           >
          
            
              <FaMapPin className="text-3xl text-red-800 animate-bounce relative"/>
            
          
          
          
        </Marker>   */}
            </Map>
            <Marker
              anchor={selectedLocation}
              onMouseOver={() => setMapBoundaryChanged(true)}
              onMouseOut={() => setMapBoundaryChanged(true)}
            >
              <div className="flex flex-col items-center justify-center gap-2 fixed top-0 right-0 left-0 bottom-0">
                {!mapBoundaryChanged && (
                  <div className="absolute flex items-center justify-center h-auto w-44 bg-white shadow-md text-center text-[10px] mb-36 rounded-lg p-2">
                    <span className="flex flex-col gap-1 text-slate-800 text-[10px] font-bold ">
                      <p className="line-clamp-2">
                        {selectedLocationName || "Name could not be loaded"}
                      </p>
                      <Link href={"/"}>
                        <Button
                          variant="empty"
                          onClick={() =>
                            selectedLocationHandler(selectedLocation)
                          }
                          className="text-[10px] font-bold bg-blue-600 h-6 text-white"
                        >
                          Use this location
                        </Button>
                      </Link>
                    </span>
                  </div>
                )}
                <FaMapPin className="text-3xl text-slate-800 animate-bounce relative mb-8" />
              </div>
            </Marker>
          </>
        )}
      </div>
    </div>
  );
}
