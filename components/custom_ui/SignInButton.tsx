'use client';

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";  
import { SignInForm } from "../auth/SignInForm";

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
      <Dialog>
        <DialogTrigger asChild={asChild}>
          {children}
        </DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <SignInForm />
        </DialogContent>
      </Dialog>
    )
  }


  return (
    <span className='cursor-pointer' onClick={onClickHandler}>
      {children}
    </span>
  )
}
