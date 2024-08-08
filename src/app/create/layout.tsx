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
      <nav>
        Create Section Navigation
        <Link href="/create/project">Project</Link>
      </nav>
      <section>{children}</section>
    </CreateProvider>
  );
}
