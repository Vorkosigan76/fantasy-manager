import { Link } from "@/i18n/routing";
import { UserButton } from "./UserButton";
//import AuthButtons from "@/components/auth-buttons";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-3 px-4 fixed top-0 left-0 right-0 z-50 bg-white">
      <Link href="/" className="text-xl font-bold">
        Boilerplate
      </Link>
      <UserButton />
    </nav>
  );
}
