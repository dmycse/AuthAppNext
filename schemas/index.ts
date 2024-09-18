import * as z from 'zod';

export const SignUpFormSchema = z.object({
  name: z.string()
          .min(2, "Name is required"),

  email: z.string()
            .min(1, 'Email is required')
            .email("Invalid email")
            .toLowerCase(),

  password: z.string()
              .min(1, "Password is required")
              .min(6, "Password must be at least 6 characters")
});

export type SignUpFormType = z.infer<typeof SignUpFormSchema>;

export const SignInFormSchema = SignUpFormSchema.omit({name: true}).extend({code: z.string().optional()});
export type SignInFormType = z.infer<typeof SignInFormSchema>;

export const ResetFormSchema = SignUpFormSchema.omit({name: true, password: true});
export type ResetFormType = z.infer<typeof ResetFormSchema>;

export const NewPasswordFormSchema = SignUpFormSchema.omit({name: true, email: true});
export type NewPasswordFormType = z.infer<typeof NewPasswordFormSchema>;

export const SettingsFormSchema = z.object({
  name: z.string().min(2, "Name is required").optional(),
  email: z.string().email("Invalid email").toLowerCase().optional(),
  password: z.optional(z.string().min(6, "Password must be at least 6 characters")).or(z.literal('')),
  newPassword: z.optional(z.string().min(6, "Password must be at least 6 characters")).or(z.literal('')),
  isTwoFactorEnabled: z.boolean().optional(),
  isOAuth: z.boolean().optional(),
  role: z.enum(["Admin", "User"]),
})
  // .refine(data => {
  //   if (!data.password) return false;
  //   return true;
  //   }, {
  //     message: "Password is required!",
  //     path: ["password"]
  //   }
  // )
  // .refine(data => {
  //   if (!data.newPassword) return false;
  //   return true;
  //  }, {
  //    message: "New Password is required!",
  //    path: ["newPassword"]
  //  }
  // )
  // .refine(data => {
  //   if (data.newPassword === data.password) return false;
  //   return true;
  //  }, {
  //    message: "New Password has not match the existing password",
  //    path: ["newPassword"]
  //  }
  // )

export type SettingsFormType = z.infer<typeof SettingsFormSchema>;



