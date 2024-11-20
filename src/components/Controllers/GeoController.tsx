import { useEffect } from 'react';
import { fetchGeoData } from '@/services/geo.service';

export const GeoController = () => {
  useEffect(() => {
    async function fetchUserLocation() {
      const res = await fetchGeoData();
      console.log('res', res);
    }

    fetchUserLocation();
  }, []);
  return <div>GeoController</div>;
};
