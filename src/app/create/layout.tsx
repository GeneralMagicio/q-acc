"use client";

import { CreateProvider } from "@/components/Create/CreateContext";

export default function CreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CreateProvider>
      <nav>Create Section Navigation</nav>
      <section>{children}</section>
    </CreateProvider>
  );
}
