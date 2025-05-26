"server-only";

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";

import { getCurrentUser } from "@/lib/auth";
import { getTeamsByUserId } from "@/data/teams/team";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  const teams = user ? await getTeamsByUserId(user.id) : undefined;

  return (
    <>
      <Sidebar team={teams?.[0]} />
      <div className="flex flex-grow flex-col">
        <Navbar />
        <div className="flex flex-grow items-center">{children}</div>
        <Footer />
      </div>
    </>
  );
}
