import Image from "next/image";
import { ConnectButton } from "../ConnectButton/ConnectButton";
import { IconX } from "../Icons/IconX";
import Routes from "@/lib/constants/Routes";
import { HeaderItem } from "./HeaderItem";

const HEADER_ITEMS = [
  {
    label: "For Donors",
    route: Routes.Home,
  },
  {
    label: "For Creators",
    route: Routes.Creator,
  },
  {
    label: "All Projects",
    route: Routes.Projects,
  },
];

export const Header = () => {
  return (
    <nav className="bg-white flex items-center p-6 gap-4 z-50 relative">
      <div className="flex gap-4 items-center">
        <Image
          src="/images/icons/logomark-dark.svg"
          alt="logo"
          width={87}
          height={40}
        />
        <IconX size={14} />
        <Image
          src="/images/icons/giveth.svg"
          alt="giveth-logo"
          height={48}
          width={48}
        />
      </div>
      <div className="flex">
        {HEADER_ITEMS.map((item, index) => (
          <HeaderItem key={index} label={item.label} route={item.route} />
        ))}
      </div>
      <div className="flex-1"></div>
      <ConnectButton />
    </nav>
  );
};
