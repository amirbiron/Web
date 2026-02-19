import { useState, forwardRef, type InputHTMLAttributes } from 'react';

interface FloatingInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

const FloatingInput = forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ label, error, required, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const isFloating = isFocused || hasValue;

    return (
      <div className="relative w-full pt-6">
        <div className="relative">
          <label
            className={`absolute transition-all duration-300 ease-out pointer-events-none
              ${
                isFloating
                  ? 'top-[-20px] text-[13px] text-[#00bf63]'
                  : 'top-[8px] text-[16px] text-gray-400'
              }
              ${document.documentElement.dir === 'rtl' ? 'right-0' : 'left-0'}
            `}
          >
            <span>
              {label}
              {required && (
                <span className="text-red-500">{' *'}</span>
              )}
            </span>
          </label>
          <input
            ref={ref}
            {...props}
            aria-required={required || undefined}
            required={required}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              setHasValue(e.target.value.length > 0);
              props.onBlur?.(e);
            }}
            onChange={(e) => {
              setHasValue(e.target.value.length > 0);
              props.onChange?.(e);
            }}
            className={`w-full py-2 bg-transparent border-b-2 outline-none text-gray-800 text-[16px] transition-colors duration-300
              ${isFocused ? 'border-[#00bf63]' : 'border-gray-300'}
            `}
          />
          <span
            className={`absolute bottom-0 h-[2px] bg-[#00bf63] transition-all duration-300 ease-out
              ${isFocused ? 'w-full' : 'w-0'}
              ${document.documentElement.dir === 'rtl' ? 'right-1/2 translate-x-1/2' : 'left-1/2 -translate-x-1/2'}
            `}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

FloatingInput.displayName = 'FloatingInput';

export default FloatingInput;
