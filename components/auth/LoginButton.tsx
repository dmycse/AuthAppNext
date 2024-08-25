'use client';

import { useRouter } from "next/navigation";

interface LoginBtnProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
};

export default function LoginButton({children, mode='redirect', asChild}: LoginBtnProps) {

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
