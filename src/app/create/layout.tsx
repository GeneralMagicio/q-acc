"use client";

import { CreateProvider } from "@/components/Create/CreateContext";
import Link from "next/link";

export default function CreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CreateProvider>
      <section>{children}</section>
    </CreateProvider>
  );
}
