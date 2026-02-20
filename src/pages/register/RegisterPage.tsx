import { Upload, CheckCircle } from 'lucide-react';
import FloatingInput from '../../components/base/FloatingInput';
import TermsOfService from './TermsOfService';
import { useRegisterForm } from './useRegisterForm';

export default function RegisterPage() {
  const {
    t,
    register,
    errors,
    onSubmit,
    profilePicture,
    previewUrl,
    onProfilePictureChange,
    agreedToTerms,
    toggleTerms,
    termsError,
    isSubmitting,
    submitError,
    isSuccess,
  } = useRegisterForm();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-44 object-contain mb-4"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <h1 className="text-2xl font-semibold text-gray-800 text-center">
            {t('register.title')}
          </h1>
        </div>

        {isSuccess ? (
          <div className="bg-[#aaa] rounded-2xl p-8 flex flex-col items-center gap-4 text-center">
            <CheckCircle size={48} className="text-[#00bf63]" />
            <h2 className="text-xl font-semibold text-gray-800">
              {t('register.successTitle')}
            </h2>
            <p className="text-gray-700">{t('register.successMessage')}</p>
          </div>
        ) : (
        <form
          onSubmit={onSubmit}
          noValidate
          className="space-y-8 bg-[#aaa] rounded-2xl p-6"
        >
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
            <label className="block text-sm text-gray-700 mb-2">
              {t('register.profilePicture')}
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-[#00bf63] transition-colors duration-200">
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
            {previewUrl && (
              <div className="mt-3">
                <img
                  src={previewUrl}
                  alt={t('register.profilePicture')}
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#00bf63]"
                />
              </div>
            )}
          </div>

          {/* Terms of Service */}
          <TermsOfService
            agreed={agreedToTerms}
            onToggle={toggleTerms}
            error={termsError}
          />

          {/* Submit Error */}
          {submitError && (
            <p className="text-red-500 text-sm text-center">{submitError}</p>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-[150px] py-2.5 bg-[#00bf63] text-white font-medium rounded-lg
                transition-all duration-300 ease-in-out
                hover:bg-[#00d970] hover:shadow-lg
                active:scale-[0.98] cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('register.submitting') : t('register.submit')}
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
