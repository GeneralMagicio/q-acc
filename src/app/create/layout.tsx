export default function CreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <nav>Create Section Navigation</nav>
      <section>{children}</section>
    </div>
  );
}
