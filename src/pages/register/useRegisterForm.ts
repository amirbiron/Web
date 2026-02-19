import { useCallback, useMemo, useState, type ChangeEvent } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';

import { createRegisterSchema, type RegisterFormData } from './registerSchema';

export function useRegisterForm() {
  const { t } = useTranslation();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);

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
    },
    []
  );

  const onSubmit = useMemo(
    () =>
      handleSubmit((data) => {
        console.log('Form data:', data);
        console.log('Profile picture:', profilePicture);
      }),
    [handleSubmit, profilePicture]
  );

  return {
    t,
    register,
    errors,
    onSubmit,
    profilePicture,
    onProfilePictureChange,
  };
}
