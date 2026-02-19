import { z } from 'zod';

export const createRegisterSchema = (t: (key: string) => string) =>
  z
    .object({
      username: z
        .string()
        .min(1, t('register.errors.usernameRequired'))
        .min(3, t('register.errors.usernameMin'))
        .max(40, t('register.errors.usernameMax')),
      email: z
        .string()
        .min(1, t('register.errors.emailRequired'))
        .email(t('register.errors.emailInvalid')),
      phone: z
        .string()
        .optional()
        .refine((val) => !val || val.replace(/\D/g, '').length >= 8, {
          message: t('register.errors.phoneMin'),
        }),
      password: z
        .string()
        .min(1, t('register.errors.passwordRequired'))
        .min(6, t('register.errors.passwordMin'))
        .max(40, t('register.errors.passwordMax')),
      confirmPassword: z
        .string()
        .min(1, t('register.errors.confirmPasswordRequired')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('register.errors.passwordsMustMatch'),
      path: ['confirmPassword'],
    });

export type RegisterFormData = z.infer<
  ReturnType<typeof createRegisterSchema>
>;
