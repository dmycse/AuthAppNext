'use client';

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordFormSchema } from "@/schemas";
import type { NewPasswordFormType } from "@/schemas";

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

import { newPassword } from "@/actions/new-password";


export const NewPasswordForm = () => {

  let [success, setSuccess] = useState<string | undefined>('');
  let [error, setError] = useState<string | undefined>('');
  let [isPending, startTransition] = useTransition();

  let searchParams = useSearchParams();
  let token = searchParams.get('token');

  let form = useForm<NewPasswordFormType>({
    resolver: zodResolver(NewPasswordFormSchema),
    defaultValues: {
      password: ""
    }
  });

  let formSubmitHandler = (data: NewPasswordFormType) => {
    console.log('NewPasswordForm Input data: ', data);
    form.reset();
    startTransition(async () => {
      let response = await newPassword(data, token!);
      console.log('NewPasswordForm Action response: ', response);
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

  console.log('NewPasswordForm state: ' , {error, success});
  console.log('NewPasswordForm errors: ', form.formState.errors);


  return (
    <CardWrapper
      headerLabel="Enter a new password"
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
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button 
            type="submit" 
            className="w-full disabled:opacity-40"
            disabled={isPending}
          >
            Reset password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  ) 
}
