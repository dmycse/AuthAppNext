import * as z from 'zod';

export const SignUpFormSchema = z.object({
  name: z.string()
          .min(2, "Name is required"),

  email: z.string()
            .min(1, 'Email is required')
            .email("Invalid email"),

  password: z.string()
              .min(1, "Password is required")
              .min(6, "Password must be at least 6 characters")
});

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;

export const SignInFormSchema = SignUpFormSchema.omit({name: true});
export type SignInFormType = z.infer<typeof SignInFormSchema>;



