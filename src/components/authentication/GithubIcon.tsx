import { FaGithub } from "react-icons/fa";

interface GithubIconProps {
  color?: string;
  size: number;
  className?: string;
}

export default function GithubIcon({
  color = "#171515",
  size,
  className = "",
}: GithubIconProps) {
  return <FaGithub color={color} size={size} className={className} />;
}
