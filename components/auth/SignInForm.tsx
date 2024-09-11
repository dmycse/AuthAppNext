'use client';

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
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

import { CardWrapper } from "@/components/custom_ui/CardWrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";

import { signin } from "@/actions/signin";


export const SignInForm = () => {

  let searchParams = useSearchParams();
  let errorUrlWarning = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email is already in use! Use another one."
    : "";

  let [success, setSuccess] = useState<string | undefined>('');
  let [error, setError] = useState<string | undefined>('');
  let [twoFactor, setTwoFactor] = useState<boolean | undefined>(false);

  let [isPending, startTransition] = useTransition();


  let form = useForm<SignInFormType>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  let formSubmitHandler = (data: SignInFormType) => {
    console.log('SIGNIN Form Input data: ', data);
    startTransition(async () => {
      let response = await signin(data);
      console.log('SIGNIN Form Action response: ', response);

      if (!response) {
        setError('Something went wrong!');
        return; 
      }
      
      if (response.error) {
        form.reset();
        setError(response.error);
      }

      if (response.success) {
        form.reset();
        setSuccess(response.success);
      }
        
      if (response.twoFactor) {
        setTwoFactor(true);
      }
    });
  };

  let { errors } = form.formState;

  let handleChangeCapture = () => {
    setSuccess('');
    setError('');
  };

  console.log('SIGNIN Form state: ' , {error, success, twoFactor})
  console.log('SIGNIN Form errors: ', form.formState.errors )


  return (
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
                      onChangeCapture={handleChangeCapture}
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
                      onChangeCapture={handleChangeCapture} 
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
                        placeholder="- - - - - -"
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
            disabled={isPending}
          >
            SignIn
          </Button>
        </form>
      </Form>
    </CardWrapper>
  ) 
}
