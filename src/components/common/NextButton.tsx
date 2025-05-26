"use client";

import { FaAnglesRight } from "react-icons/fa6";
import { LoadingButton } from "./LoadingButton";

interface NextButtonProps {
  isPending: boolean;
  handleClick?: () => void;
}

export default function NextButton({
  isPending,
  handleClick,
}: NextButtonProps) {
  return (
    <LoadingButton
      pending={isPending}
      size="lg"
      className="w-auto bg-red-900 hover:bg-red-800"
      onClick={handleClick}
    >
      <FaAnglesRight className="mx-2 py-0.5 text-2xl " />
    </LoadingButton>
  );
}
