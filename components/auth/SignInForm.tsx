'use client';

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormSchema } from "@/schemas";
import type { SignInFormType } from "@/schemas";

import {
  Form, 
  FormControl, 
  FormField,
  FormItem,
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { BeatLoader } from "react-spinners";

import { SuspenseBoundary } from "@/components/auth/SuspenseBoundary";
import { CardWrapper } from "@/components/custom_ui/CardWrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";

import { signin } from "@/actions/signin";
import { RESPONSE_MSG_LIFETIME } from "@/constants";
import { DEFAULT_SIGNIN_REDIRECT } from "@/routes";


export const SignInForm = () => {

  let searchParams = useSearchParams();
  let callbackUrl = searchParams.get("callbackUrl");
  let errorUrlWarning = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email is already in use! Use another one."
    : "";
  
  let router = useRouter();
  
  let [isPending, startTransition] = useTransition();

  let [success, setSuccess] = useState<string | undefined>('');
  let [error, setError] = useState<string | undefined>('');
  let [twoFactor, setTwoFactor] = useState<boolean | undefined>(false);

  let form = useForm<SignInFormType>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  let formSubmitHandler = async (data: SignInFormType) => {
    console.log('SIGNIN Form Input data: ', data);
    startTransition(async () => {
      let response = await signin(data);
      console.log('SIGNIN Form Action response: ', response);

      if (!response) {
        setError('Something went wrong!');
        return; 
      }
      
      if (response?.error) {
        setError(response.error);
      }

      if (response?.success) {
        form.reset();
        router.push(callbackUrl ?? DEFAULT_SIGNIN_REDIRECT);
        setSuccess(response.success);
      }
        
      if (response?.twoFactor) {
        setTwoFactor(true);
      }
    });
  };

  let { errors } = form.formState;

  useEffect(() => {
    let timeOutId: NodeJS.Timeout;

    if (success) {
      timeOutId = setTimeout(() => setSuccess(''), RESPONSE_MSG_LIFETIME);
    } 
    if (error) {
      timeOutId = setTimeout(() => setError(''), RESPONSE_MSG_LIFETIME);
    }
    return () => clearTimeout(timeOutId);

  }, [success, error]);

  console.log('SIGNIN Form state: ' , {error, success, twoFactor})
  console.log('SIGNIN Form errors: ', form.formState.errors )


  return (
    <SuspenseBoundary>

      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Haven't got an account?"
        backButtonHref="/auth/signup"
        showSocial
      >
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(formSubmitHandler)}
            className="mb-6 space-y-4"
          >
            <div className="space-y-4">
              <FormField 
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="text-black">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email" 
                        placeholder="youremail@example.com"
                        disabled={isPending}
                        className={errors.email && "border-red-500"} 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-4">
              <FormField 
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem className="mb-6">
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-black">Password</FormLabel>
                      <Button
                        size="sm"
                        variant="link"
                        asChild
                        className="w-full px-0 font-normal justify-end text-gray-400"
                      >
                        <Link href="/auth/reset">Forgot password?</Link>
                      </Button>
                    </div>
                    <FormControl>
                      <Input
                        type="password" 
                        placeholder="*******"
                        pass={field.value}
                        disabled={isPending}
                        className={errors.password && "border-red-500"}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {twoFactor && (
              <div className="space-y-4">
                <FormField 
                  control={form.control}
                  name="code"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className="text-blue-500">Two Factor Code (check your email box)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text" 
                          placeholder="******"
                          disabled={isPending}
                          className={errors.code && "border-red-500"} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {isPending && (
              <div className='mt-5 flex justify-center'>
                <BeatLoader />
              </div>
            )}
            <FormError message={error || errorUrlWarning} />
            <FormSuccess message={success} />
            <Button 
              type="submit" 
              className="w-full disabled:opacity-40"
              disabled={isPending || !form.formState.isDirty}
            >
              SignIn
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </SuspenseBoundary>
  ) 
}
