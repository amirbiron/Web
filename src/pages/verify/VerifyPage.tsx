import { CheckCircle } from 'lucide-react';
import { useVerifyForm } from './useVerifyForm';

export default function VerifyPage() {
  const {
    t,
    digits,
    setInputRef,
    handleChange,
    handleKeyDown,
    handlePaste,
    onSubmit,
    isSubmitting,
    submitError,
    codeError,
    isSuccess,
  } = useVerifyForm();

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
            {t('verify.title')}
          </h1>
        </div>

        {isSuccess ? (
          <div className="bg-[#aaaaaa]/30 rounded-2xl p-8 flex flex-col items-center gap-4 text-center">
            <CheckCircle size={48} className="text-[#00bf63]" />
            <h2 className="text-xl font-semibold text-gray-800">
              {t('verify.successTitle')}
            </h2>
            <p className="text-gray-700">{t('verify.successMessage')}</p>
          </div>
        ) : (
          <div className="bg-[#aaaaaa]/30 rounded-2xl p-6 flex flex-col items-center gap-6">
            <p className="text-gray-700 text-center">{t('verify.subtitle')}</p>

            {/* 6-digit OTP inputs */}
            <div className="flex gap-3" dir="ltr">
              {digits.map((digit, index) => (
                <input
                  key={index}
                  ref={setInputRef(index)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300
                    rounded-lg bg-white outline-none transition-colors duration-200
                    focus:border-[#008545] focus:ring-1 focus:ring-[#008545]"
                />
              ))}
            </div>

            {/* Code error */}
            {codeError && (
              <p className="text-red-500 text-sm text-center">{codeError}</p>
            )}

            {/* Submit error */}
            {submitError && (
              <p className="text-red-500 text-sm text-center">{submitError}</p>
            )}

            {/* Submit button */}
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting}
              className="w-[200px] py-2.5 bg-[#00bf63] text-white font-medium rounded-lg
                transition-all duration-300 ease-in-out
                hover:bg-[#00d970] hover:shadow-lg
                active:scale-[0.98] cursor-pointer
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('verify.submitting') : t('verify.submit')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
