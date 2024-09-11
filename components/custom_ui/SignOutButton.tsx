'use client';

import { ReactNode } from "react";
import { signout } from "@/actions/signout";
import { useRouter } from "next/navigation";

interface SignOutButtonProps {
  children?: ReactNode;
};

export default function SignInButton({children}: SignOutButtonProps) {

  let router = useRouter();

  let onClickHandler = () => {
    signout();
  };



  return (
    <span className='cursor-pointer' onClick={onClickHandler}>
      {children}
    </span>
  );
}
