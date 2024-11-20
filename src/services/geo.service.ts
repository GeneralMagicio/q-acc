import { GeoLocationData } from '@/types/geo.type';

export async function fetchGeoData(): Promise<GeoLocationData> {
  const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
  if (!response.ok) throw new Error('Failed to fetch geolocation data');
  return response.json();
}
