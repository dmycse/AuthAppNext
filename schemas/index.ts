import * as z from 'zod';

export const SignInFormSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(4, {
    message: "Password requires 4 characters min"
  })
});

export type SignInFormType = z.infer<typeof SignInFormSchema>;