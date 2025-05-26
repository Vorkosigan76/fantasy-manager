import { RoleGate } from "@/components/authentication/RoleGate";
import { UserRole } from "@/data/data-enums";

export default async function Admin() {
  return (
    <div className="flex flex-col w-full text-center h-full">
      <RoleGate allowedRole={UserRole.ADMIN}>
        <div className="container mx-auto py-4 align-top h-full "></div>
      </RoleGate>
    </div>
  );
}
