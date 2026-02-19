import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Upload } from 'lucide-react';
import FloatingInput from '../components/FloatingInput';

const createSchema = (t: (key: string) => string) =>
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
        .refine(
          (val) => !val || val.replace(/\D/g, '').length >= 8,
          { message: t('register.errors.phoneMin') }
        ),
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

type RegisterFormData = z.infer<ReturnType<typeof createSchema>>;

export default function RegisterPage() {
  const { t } = useTranslation();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

  const schema = createSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log('Form data:', data);
    console.log('Profile picture:', profilePicture);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="https://raw.githubusercontent.com/amirbiron/Web/refs/heads/main/logo.png"
            alt="Logo"
            className="h-24 object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
          {/* Username */}
          <FloatingInput
            label={t('register.username')}
            type="text"
            {...register('username')}
            error={errors.username?.message}
          />

          {/* Email */}
          <FloatingInput
            label={t('register.email')}
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />

          {/* Phone */}
          <FloatingInput
            label={t('register.phone')}
            type="tel"
            {...register('phone')}
            error={errors.phone?.message}
          />

          {/* Password */}
          <FloatingInput
            label={t('register.password')}
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />

          {/* Confirm Password */}
          <FloatingInput
            label={t('register.confirmPassword')}
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />

          {/* Profile Picture Upload */}
          <div className="pt-2">
            <label className="block text-sm text-gray-500 mb-2">
              {t('register.profilePicture')}
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-[#00bf63] transition-colors duration-200">
              <Upload size={20} />
              <span className="text-sm">
                {profilePicture ? profilePicture.name : t('register.chooseFile')}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setProfilePicture(file);
                }}
              />
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="w-[150px] py-2.5 bg-[#00bf63] text-white font-medium rounded-lg
                transition-all duration-300 ease-in-out
                hover:bg-[#00d970] hover:shadow-lg
                active:scale-[0.98] cursor-pointer"
            >
              {t('register.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
