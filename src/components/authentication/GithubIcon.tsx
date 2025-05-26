import { FaGithub } from "react-icons/fa";

interface GithubIconProps {
  color?: string;
  size: number;
  className?: string;
}

export default function GithubIcon({
  color = "#FFFFFF",
  size,
  className = "",
}: GithubIconProps) {
  return <FaGithub color={color} size={size} className={className} />;
}
