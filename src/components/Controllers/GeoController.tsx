import { useEffect, useState } from 'react';
import { fetchGeoData } from '@/services/geo.service';
import { RestrictModal } from '../Modals/RestrictModal';
import { restrictedCountries } from '@/lib/constants/countries';
import { isCountryRestrictionEnabled } from '@/config/configuration';

export const GeoController = () => {
  const [showRestrictModal, setShowRestrictModal] = useState(false);
  useEffect(() => {
    async function fetchUserLocation() {
      try {
        const locationInfo = await fetchGeoData();
        if (locationInfo) {
          if (restrictedCountries.includes(locationInfo.country)) {
            setShowRestrictModal(true);
          }
        }
      } catch (error: any) {
        console.error('error on fetchUserLocation', error.message);
      }
    }

    isCountryRestrictionEnabled && fetchUserLocation();
  }, []);
  return showRestrictModal ? (
    <RestrictModal
      isOpen={showRestrictModal}
      onClose={() => setShowRestrictModal(false)}
    />
  ) : null;
};
