import { redirect } from 'next/navigation';
import { CreateView } from '@/components/Create/CreateView';
import { isProductReleased } from '@/config/configuration';
import Routes from '@/lib/constants/Routes';

export default function CreatePage() {
  return isProductReleased ? <CreateView /> : redirect(Routes.KycLanding);
}
