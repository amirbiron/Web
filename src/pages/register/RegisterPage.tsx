import { Upload } from 'lucide-react';
import FloatingInput from '../../components/base/FloatingInput';
import { useRegisterForm } from './useRegisterForm';

export default function RegisterPage() {
  const {
    t,
    register,
    errors,
    onSubmit,
    profilePicture,
    onProfilePictureChange,
  } = useRegisterForm();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-32 object-contain mb-4"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            {t('register.title')}
          </h1>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-6">
          {/* Username */}
          <FloatingInput
            label={t('register.username')}
            type="text"
            {...register('username')}
            required
            error={errors.username?.message}
          />

          {/* Email */}
          <FloatingInput
            label={t('register.email')}
            type="email"
            {...register('email')}
            required
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
            required
            error={errors.password?.message}
          />

          {/* Confirm Password */}
          <FloatingInput
            label={t('register.confirmPassword')}
            type="password"
            {...register('confirmPassword')}
            required
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
                onChange={onProfilePictureChange}
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
