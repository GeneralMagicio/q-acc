"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

interface HeaderItemProps {
  label: string;
  route: string;
}

export const HeaderItem: FC<HeaderItemProps> = ({ label, route }) => {
  const pathname = usePathname(); // Get the current pathname

  return (
    <Link href={route}>
      <div
        className={`py-2 px-6 rounded-full ${
          pathname === route ? "bg-giv-50" : "bg-transparent"
        }`}
      >
        {label}
      </div>
    </Link>
  );
};
