"server-only";

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex flex-grow flex-col">
        <Navbar />
        <div className="flex flex-grow items-center">{children}</div>
        <Footer />
      </div>
    </>
  );
}
