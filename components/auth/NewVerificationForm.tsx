"use client";

import { useState, useEffect, useCallback} from 'react';
import { useSearchParams } from 'next/navigation';
import { BeatLoader } from 'react-spinners';

import { verificationToken } from '@/actions/verification-token';

import { SuspenseBoundary } from "@/components/auth/SuspenseBoundary";
import { CardWrapper } from "@/components/custom_ui/CardWrapper";
import { FormSuccess } from '@/components/auth/FormSuccess';
import { FormError } from '@/components/auth/FormError';


export const NewVerificationForm = () => {

  let [error, setError] = useState<string | undefined>();
  let [success, setSuccess] = useState<string | undefined>();

  let searchParams = useSearchParams();
  let token = searchParams.get('token');

  let confirmEmailHandler = useCallback(() => {
      if (!token) {
        setError('Missing token!');
        return;
      }

      verificationToken(token)
        .then(data => {
          setSuccess(data.success);
          setError(data.error);
          }
        )
        .catch(() => setError('Something went wrong!'))
    },
    [token],
  );

  useEffect(() => {
    confirmEmailHandler();
  }, [confirmEmailHandler])
  
  
  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Go to SignIn"
      backButtonHref="/auth/signin"
    >
      <div className="w-full flex justify-center items-center">
        {!success && !error && <BeatLoader />}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  )
}
