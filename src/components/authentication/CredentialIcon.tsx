import { FaKey } from "react-icons/fa";

interface CredentialIconProps {
  color?: string;
  size: number;
  className?: string;
}

export default function CredentialIcon({
  color = "#171515",
  size,
  className = "",
}: CredentialIconProps) {
  return <FaKey color={color} size={size} className={className} />;
}
