'use client';

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpFormSchema } from "@/schemas";
import type { SignUpFormType } from "@/schemas";


import {
  Form, 
  FormControl, 
  FormField,
  FormItem,
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from "@/components/ui/input"

import { CardWrapper } from "@/components/auth/CardWrapper";
import { Button } from "../ui/button";
import { FormError } from "@/components/custom_ui/FormError";
import { FormSuccess } from "@/components/custom_ui/FormSuccess";

import { signup } from "@/actions/signup";


export const SignUpForm = () => {

  let [success, setSuccess] = useState<string | undefined>('');
  let [error, setError] = useState<string | undefined>('');
  let [isPending, startTransition] = useTransition();


  let form = useForm<SignUpFormType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  });

  let formSubmitHandler = (data: SignUpFormType) => {
    form.reset();
    startTransition(() => {
      signup(data)
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
      headerLabel="Create an account"
      backButtonLabel="Have got an account already?"
      backButtonHref="/auth/signin"
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
              name="name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text" 
                      placeholder="your name"
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
            Sign Up
          </Button>
        </form>
      </Form>
    </CardWrapper>
  ) 
}
