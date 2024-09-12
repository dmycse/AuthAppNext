'use client';

import { ReactNode } from "react";
import { signout } from "@/actions/signout";


interface SignOutButtonProps {
  children?: ReactNode;
};

export default function SignInButton({children}: SignOutButtonProps) {

  let onClickHandler = () => {
    signout();
  };

  return (
    <span className='cursor-pointer' onClick={onClickHandler}>
      {children}
    </span>
  );
}
