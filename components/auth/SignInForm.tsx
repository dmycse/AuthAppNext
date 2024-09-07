'use client';

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

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
    // form.reset();
    startTransition(async () => {
      let response = await signin(data);
      console.log('SIGNIN Form Action response: ', response);
      if (response) {
        setError(response.error);
        setSuccess(response.success);
      }
      return;
    });
  };

  let { errors } = form.formState;

  let handleChangeCapture = () => {
    setSuccess('');
    setError('');
  };

  console.log('SIGNIN Form state: ' , {error, success})
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
                  <FormLabel className="text-black">Password</FormLabel>
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
