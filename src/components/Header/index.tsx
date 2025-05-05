import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '../ConnectButton/ConnectButton';
import { IconX } from '../Icons/IconX';
import Routes from '@/lib/constants/Routes';
import { HeaderItem } from './HeaderItem';
import { isProductReleased } from '@/config/configuration';
import { VerificationBanner } from './VerificationBanner';
import { PointsButton } from './PointsButton';

const HEADER_ITEMS = [
  {
    label: 'Home',
    route: Routes.Home,
  },
  {
    label: 'Projects',
    route: Routes.Projects,
  },
  {
    label: 'Leaderboard',
    route: Routes.LeaderBoard,
  },
];

const Hide_Header_Items_Routes = [Routes.KycLanding];

export const Header = () => {
  const pathName = usePathname();
  const shouldHideHeaderItems = Hide_Header_Items_Routes.includes(pathName);

  return (
    <>
      <nav className='bg-white flex items-center px-6 py-4 z-40 relative flex-wrap justify-between md:flex-nowrap gap-4 shadow-md'>
        <Link href={Routes.Home} className='flex gap-4 items-center order-1'>
          <Image
            src='/images/icons/logomark-dark.svg'
            alt='logo'
            width={87}
            height={40}
          />
          <IconX size={14} />
          <Image
            src='/images/icons/giveth.svg'
            alt='giveth-logo'
            height={48}
            width={48}
          />
        </Link>
        <div className='flex order-3 flex-1 px-5 gap-1 md:gap-5 sm:justify-between md:order-2 md:flex-grow-0 font-semibold font-redHatText'>
          {isProductReleased &&
            HEADER_ITEMS.map((item, index) => (
              <HeaderItem key={index} label={item.label} route={item.route} />
            ))}
        </div>
        <div className='flex-1 order-2 md:order-3'></div>
        <PointsButton className='order-2 md:order-3' />
        <ConnectButton className='order-2 md:order-3' />
      </nav>
      {/* <PrivadoBanner /> */}
      <VerificationBanner />
    </>
  );
};
