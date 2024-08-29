'use client';

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { AuthFormSchema } from "@/schemas";
import type { AuthFormType } from "@/schemas";


import {
  Form, 
  FormControl, 
  FormField,
  FormItem,
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from "@/components/ui/input"

import { CardWrapper } from "@/components/custom_ui/CardWrapper";
import { Button } from "../ui/button";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";

import { signin } from "@/actions/signin";


export const SignInForm = () => {

  let [success, setSuccess] = useState<string | undefined>('');
  let [error, setError] = useState<string | undefined>('');
  let [isPending, startTransition] = useTransition();


  let form = useForm<AuthFormType>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  let formSubmitHandler = (data: AuthFormType) => {
    form.reset();
    startTransition(() => {
      signin(data)
        .then(data => {
          setError(data.error);
          setSuccess(data.success)
        })
    });
    // console.log(data);
  };

  let handleChangeCapture = () => {
    setSuccess('');
    setError('');
  };


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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email" 
                      placeholder="youremail@example.com"
                      disabled={isPending}
                      onChangeCapture={handleChangeCapture} 
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
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password" 
                      placeholder="*******"
                      disabled={isPending}
                      onChangeCapture={handleChangeCapture} 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button 
            type="submit" 
            className="w-full"
            disabled={isPending}
          >
            SignIn
          </Button>
        </form>
      </Form>
    </CardWrapper>
  ) 
}
