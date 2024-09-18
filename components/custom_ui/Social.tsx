'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";
import { BeatLoader } from "react-spinners";


export const Social = () => {

  let [isPending, setIsPending] = useState(false);

  let onClickHandler = async (provider: "google" | "github") => {
    setIsPending(true);
    await signIn(provider, {
      callbackUrl: DEFAULT_SIGNIN_REDIRECT
    })
  };
  

  return (
    <div className='w-full flex flex-col items-center space-y-4'>
      {isPending && (
        <div className='mb-2 flex justify-center'>
          <BeatLoader />
        </div>
      )}
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
    </div>
  )
}
