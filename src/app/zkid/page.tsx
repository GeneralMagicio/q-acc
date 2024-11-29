import { redirect } from 'next/navigation';
import ZkidLanding from '@/components/ZkidLanding';
import { isProductReleased } from '@/config/configuration';

export default function ZkidPage() {
  return isProductReleased ? redirect('/') : <ZkidLanding />;
}
