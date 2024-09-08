'use client';

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { ResetFormSchema } from "@/schemas";
import type { ResetFormType } from "@/schemas";

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


import { reset } from "@/actions/reset";


export const ResetForm = () => {

  let [success, setSuccess] = useState<string | undefined>('');
  let [error, setError] = useState<string | undefined>('');
  let [isPending, startTransition] = useTransition();


  let form = useForm<ResetFormType>({
    resolver: zodResolver(ResetFormSchema),
    defaultValues: {
      email: ""
    }
  });

  let formSubmitHandler = (data: ResetFormType) => {
    console.log('RESET Form Input data: ', data);
    form.reset();
    startTransition(async () => {
      let response = await reset(data);
      console.log('RESET Form Action response: ', response);
      if (response) {
        setError(response.error);
        setSuccess(response.success);
      }
    });
  };

  let { errors } = form.formState;

  let handleChangeCapture = () => {
    setSuccess('');
    setError('');
  };

  console.log('RESET Form state: ' , {error, success})
  console.log('RESET Form errors: ', form.formState.errors )


  return (
    <CardWrapper
      headerLabel="Forgot password?"
      backButtonLabel="Back to sign in"
      backButtonHref="/auth/signin"
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
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button 
            type="submit" 
            className="w-full disabled:opacity-40"
            disabled={isPending}
          >
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  ) 
}
