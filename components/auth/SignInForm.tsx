'use client';

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { SignInFormSchema, SignInFormType } from "@/schemas";

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


export const SignInForm = () => {

  let form = useForm<SignInFormType>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  let formSubmitHandler = (data: SignInFormType) => {
    console.log(data)
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
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message=""/>
          <FormSuccess message="" />
          <Button type="submit" className="w-full">
            SignIn
          </Button>
        </form>
      </Form>
    </CardWrapper>
  ) 
}
