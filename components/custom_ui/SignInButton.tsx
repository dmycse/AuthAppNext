'use client';

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface SignInButtonProps {
  children: ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
};

export default function SignInButton({children, mode='redirect', asChild}: SignInButtonProps) {

  let router = useRouter();

  let onClickHandler = () => {
    router.push('/auth/signin');
  };

  if (mode === 'modal') {
    return (
      <span>TODO: Implement Modal</span>
    )
  }


  return (
    <span className='cursor-pointer' onClick={onClickHandler}>
      {children}
    </span>
  )
}
