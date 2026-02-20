import { useCallback, useMemo, useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import { createRegisterSchema, type RegisterFormData } from './registerSchema';

const API_BASE = 'https://server-production-d633.up.railway.app';

export function useRegisterForm() {
  const { t } = useTranslation();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const schema = useMemo(() => createRegisterSchema(t), [t]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    mode: 'onSubmit',
  });

  const onProfilePictureChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null;
      setProfilePicture(file);

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      if (file) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
    },
    [previewUrl]
  );

  const toggleTerms = useCallback(() => {
    setAgreedToTerms((prev) => {
      if (!prev) setTermsError(false);
      return !prev;
    });
  }, []);

  const onSubmit = useMemo(
    () =>
      handleSubmit(async (data) => {
        if (!agreedToTerms) {
          setTermsError(true);
          return;
        }

        setIsSubmitting(true);
        setSubmitError(null);

        try {
          let profilePictureUrl = '';

          if (profilePicture) {
            const formData = new FormData();
            formData.append('file', profilePicture);
            const uploadRes = await axios.post(`${API_BASE}/upload`, formData);
            if (uploadRes.status === 200) {
              profilePictureUrl = uploadRes.data.url;
            }
          }

          await axios.post(`${API_BASE}/auth/register`, {
            username: data.username,
            email: data.email,
            phoneNumber: data.phone || '',
            password: data.password,
            profilePicture: profilePictureUrl,
          });

          localStorage.setItem('email', data.email);
        } catch (err) {
          if (axios.isAxiosError(err) && err.response?.data?.message) {
            setSubmitError(err.response.data.message);
          } else {
            setSubmitError(t('register.errors.submitFailed'));
          }
        } finally {
          setIsSubmitting(false);
        }
      }),
    [handleSubmit, profilePicture, agreedToTerms, t]
  );

  return {
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
  };
}
