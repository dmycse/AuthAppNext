'use client';

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";

import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsFormSchema } from "@/schemas";
import type { SettingsFormType } from "@/schemas";
import { UserRole } from "@prisma/client";

import { settings } from "@/actions/settings";

import {
  Form, 
  FormField,
  FormControl, 
  FormItem,
  FormLabel, 
  FormMessage, 
  FormDescription
} from '@/components/ui/form';
import { Input } from "@/components/ui/input"

import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/FormError";
import { FormSuccess } from "@/components/auth/FormSuccess";
import { RESPONSE_MSG_LIFETIME } from "@/constants";


export const SettingsForm = () => {
  let {data} = useSession();
  console.log('SetttingsForm Session: ', data?.user);


  let [success, setSuccess] = useState<string | undefined>('');
  let [error, setError] = useState<string | undefined>('');

  let [isPending, startTransition] = useTransition();
  let { update } = useSession();

  let form = useForm<SettingsFormType>({
    resolver: zodResolver(SettingsFormSchema),
    defaultValues: {
      name: data?.user.name || undefined,
      email: data?.user.email || undefined,
      password: '',
      newPassword: '' || undefined,
      role: data?.user.role || undefined,
      isTwoFactorEnabled: data?.user.isTwoFactorEnabled || undefined,
      isOAuth: data?.user.isOAuth,
    }
  });

  let { reset, getValues } = form;
  let { errors, isDirty } = form.formState;

  let formSubmitHandler = (data: SettingsFormType) => {
    console.log('SettingsForm formSubmitHandler data: ', data);
    startTransition( async () => {
      let response = await settings(data);
      console.log('Settings Action response: ', response);
      if (response?.error) {
        setError(response.error);
      }
      if (response?.success) {
        update();
        setSuccess(response.success);
      }
      reset(getValues(), {keepValues: true, keepDirty: false, keepDefaultValues: false});
    });
  };


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

  console.log('SettingsForm state: ' , {error, success})
  console.log('SettingsForm formState.errors: ', errors )
  console.log('SettingsForm formState.dirtyFields: ', form.formState.dirtyFields)

  return (
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
                      placeholder="Edit your name"
                      disabled={isPending}
                      className={errors.name && "border-red-500"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}  
            />
          </div>
          {!data?.user?.isOAuth && (
            <>
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
                      <FormLabel className="text-black">Password</FormLabel>
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
              <div className="space-y-4">
                <FormField 
                  control={form.control}
                  name="newPassword"
                  render={({field}) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-black">New Password</FormLabel>
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
            </>
          )}
          <div className="space-y-4">
            <FormField 
              control={form.control}
              name="role"
              render={({field}) => (
                <FormItem className="mb-6">
                  <FormLabel className="text-black">Role</FormLabel>
                  <Select
                    disabled={isPending}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={UserRole.Admin}>Admin</SelectItem>
                      <SelectItem value={UserRole.User}>User</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {!data?.user?.isOAuth && (
            <div className="space-y-4">
              <FormField 
                control={form.control}
                name="isTwoFactorEnabled"
                render={({field}) => (
                  <FormItem 
                    className="p-3 flex flex-row justify-between items-center border rounded-md shadow-sm"
                  >
                    <div className="space-y-0.5">
                      <FormLabel className="text-black">Two Factor Enabled</FormLabel>
                      <FormDescription className="text-black">Enable Two Factor authentication for your account</FormDescription> 
                    </div>
                    <Switch
                      disabled={isPending}
                      onCheckedChange={field.onChange}
                      checked={field.value}
                      className="data-[state=checked]:bg-sky-500"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button 
            type="submit" 
            className="w-full disabled:opacity-40"
            disabled={isPending || !isDirty}
          >
            Save
          </Button>
        </form>
      </Form>
  ) 
}
