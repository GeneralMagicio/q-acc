'use client';
import { CreateProvider } from '@/components/Create/CreateContext';

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
