'use client';

import { useRouter } from "next/navigation";

interface SignInButtonProps {
  children: React.ReactNode;
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
