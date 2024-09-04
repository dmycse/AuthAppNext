'use client';

import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";


export const Social = () => {

  let onClickHandler = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_SIGNIN_REDIRECT
    })
  };
  

  return (
    <div className='w-full flex items-center space-x-2'>
      <Button 
        size="lg" 
        variant="outline" 
        className="w-full"
        onClick={() => onClickHandler("google")}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button 
        size="lg" 
        variant="outline" 
        className="w-full"
        onClick={() => onClickHandler("github")}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  )
}
