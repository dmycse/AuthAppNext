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

import { CardWrapper } from "@/components/custom_ui/CardWrapper";
import { Button } from "../ui/button";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";

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

  let { errors } = form.formState;

  let formSubmitHandler = (data: SignUpFormType) => {
    console.log('SIGNUp Form Input: ', data);
    form.reset();
    startTransition( async () => {
      let response = await signup(data);
      console.log('SIGNUp Action response: ', response)
      setError(response.error);
      setSuccess(response.success);
    });
  };

  let handleChangeCapture = () => {
    setSuccess('');
    setError('');
  };

  console.log('SIGNUp Form state: ' , {error, success})
  console.log('SIGNUp Form form errors: ', form.formState.errors )

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
                  <FormLabel className="text-black">Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text" 
                      placeholder="your name"
                      disabled={isPending}
                      onChangeCapture={handleChangeCapture} 
                      className={errors.name && "border-red-500"} 
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
                      pass
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
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button 
            type="submit" 
            className="w-full disabled:opacity-40"
            disabled={isPending}
          >
            Sign Up
          </Button>
        </form>
      </Form>
    </CardWrapper>
  ) 
}
