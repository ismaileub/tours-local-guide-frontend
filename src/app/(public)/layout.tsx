import ClientOnly from "@/components/ClientOnly";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClientOnly>
        <Navbar />
      </ClientOnly>

      <main className="min-h-dvh mx-auto">{children}</main>
      <Footer />
    </>
  );
}
