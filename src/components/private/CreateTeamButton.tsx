"use client";

import { useState } from "react";
import NextButton from "../common/NextButton";
import { useRouter } from "next/navigation";

export default function CreateTeamButton() {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setPending(true);
    setTimeout(() => {
      setPending(false);
      router.push("/private/create-team-step1");
    }, 1000);
  };

  return <NextButton isPending={pending} handleClick={handleClick} />;
}
