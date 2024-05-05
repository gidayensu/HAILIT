import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function fetchMapData(searchQuery: string): Promise<GeoData | null> {
  
  const url = `https://nominatim.openstreetmap.org/search.php?street=${searchQuery}&country=Ghana&format=jsonv2`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching map data: ${response.status}`);
    }

    const results = await response.json();
    const returnedResults = results.filter((result:any)=>result.display_name !== 'Ghana');

    
    // if (!Array.isArray(data) || data.length === 0) {
    //   console.warn(`No results found for search query: "${searchQuery}"`);
    //   return null;  
    // }

    
    
    return returnedResults;
  } catch (error) {
    console.error('Error fetching map data:', error);
    return null; 
  }
}




export async function reverseMapSearch(lat: string|number, lon:string|number): Promise<GeoData | null> {
  
  const url = `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lon}&zoom=18&format=jsonv2`
  
  try {
    const response = await fetch(url);
  
    if(!response.ok){
      throw Error;
    }

    const data = await response.json();
    
    
    return {
      latitude: data.lat,
      longitude: data.lon,
      displayName: data.display_name

    }
  } catch (err) {
      console.error(err)
      return null
  }
}

interface GeoData {
  latitude: number;
  longitude: number;
  displayName: string;
  // Add other properties as needed
}

