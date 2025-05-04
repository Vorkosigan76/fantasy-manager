import DiscordButton from "./DiscordButton";
import GithubButton from "./GithubButton";
import GoogleButton from "./GoogleButton";

export const SocialButtons = () => {
  return (
    <div className="mt-6 grid grid-cols-3 gap-2">
      <DiscordButton />
      <GoogleButton />
      <GithubButton />
    </div>
  );
};
