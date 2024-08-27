import * as z from 'zod';

export const SignInFormSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters"
  })
});

export type SignInFormType = z.infer<typeof SignInFormSchema>;


export const SignUpFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name is required"
  }),
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters"
  })
});

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;