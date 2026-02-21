import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const API_BASE =
  import.meta.env.VITE_API_BASE ??
  'https://server-production-d633.up.railway.app';

const CODE_LENGTH = 6;

export function useVerifyForm() {
  const { t } = useTranslation();
  const location = useLocation();
  const [digits, setDigits] = useState<string[]>(Array(CODE_LENGTH).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const setInputRef = useCallback(
    (index: number) => (el: HTMLInputElement | null) => {
      inputsRef.current[index] = el;
    },
    [],
  );

  const handleChange = useCallback(
    (index: number, value: string) => {
      // Allow only single digit
      const digit = value.replace(/\D/g, '').slice(-1);

      setDigits((prev) => {
        const next = [...prev];
        next[index] = digit;
        return next;
      });
      setCodeError(null);
      setSubmitError(null);

      // Move focus to next input
      if (digit && index < CODE_LENGTH - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    },
    [],
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !digits[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    },
    [digits],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, CODE_LENGTH);
      if (!pasted) return;

      const newDigits = Array(CODE_LENGTH).fill('');
      for (let i = 0; i < pasted.length; i++) {
        newDigits[i] = pasted[i];
      }
      setDigits(newDigits);
      setCodeError(null);
      setSubmitError(null);

      // Focus the next empty input or the last one
      const focusIndex = Math.min(pasted.length, CODE_LENGTH - 1);
      inputsRef.current[focusIndex]?.focus();
    },
    [],
  );

  const onSubmit = useCallback(async () => {
    const code = digits.join('');
    if (code.length < CODE_LENGTH) {
      setCodeError(t('verify.errors.codeRequired'));
      return;
    }

    // Router state is the primary source, localStorage is fallback
    const email =
      (location.state as { email?: string } | null)?.email ??
      localStorage.getItem('email') ??
      '';

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const { data } = await axios.post(`${API_BASE}/auth/verify-user`, {
        email,
        code,
      });

      localStorage.setItem('token', data.token);
      setIsSuccess(true);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setSubmitError(err.response.data.message);
      } else {
        setSubmitError(t('verify.errors.submitFailed'));
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [digits, t, location.state]);

  return {
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
  };
}
