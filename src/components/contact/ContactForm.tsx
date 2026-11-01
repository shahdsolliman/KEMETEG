'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export default function ContactForm() {
  const t = useTranslations();
  const [submissionUnavailable, setSubmissionUnavailable] = useState(false);

  // Dynamic schema inside component to use translations
  const schema = z.object({
    name: z.string().min(2, { message: t('contact.validation.nameMin') }),
    email: z.string().email({ message: t('contact.validation.emailInvalid') }),
    phone: z.string().min(5, { message: t('contact.validation.phoneRequired') }),
    projectType: z.string().optional(),
    message: z.string().min(10, { message: t('contact.validation.messageMin') }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = () => {
    setSubmissionUnavailable(true);
  };

  const projectTypes = [
    { value: 'construction', label: t('contact.projectTypeOptions.construction') },
    { value: 'finishing', label: t('contact.projectTypeOptions.finishing') },
    { value: 'renovation', label: t('contact.projectTypeOptions.renovation') },
    { value: 'commercial', label: t('contact.projectTypeOptions.commercial') },
    { value: 'residential', label: t('contact.projectTypeOptions.residential') },
    { value: 'other', label: t('contact.projectTypeOptions.other') },
  ];

  const inputClasses = "w-full bg-charcoal border border-gold-dim text-warm-white px-4 py-3 rounded-none focus:outline-none focus:border-gold transition-colors placeholder:text-gray-medium";
  const errorClasses = "text-red-500 text-xs mt-1 block";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {submissionUnavailable && (
        <p role="alert" className="border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {t('contact.formUnavailable')}
        </p>
      )}
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-warm-white/80 mb-2">
          {t('contact.nameLabel')} <span className="text-gold">*</span>
        </label>
        <input
          id="name"
          type="text"
          className={inputClasses}
          placeholder={t('contact.namePlaceholder')}
          {...register('name')}
        />
        {errors.name && <span className={errorClasses}>{errors.name.message}</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-warm-white/80 mb-2">
            {t('contact.emailLabel')} <span className="text-gold">*</span>
          </label>
          <input
            id="email"
            type="email"
            className={inputClasses}
            placeholder={t('contact.emailPlaceholder')}
            {...register('email')}
          />
          {errors.email && <span className={errorClasses}>{errors.email.message}</span>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-warm-white/80 mb-2">
            {t('contact.phoneLabel')} <span className="text-gold">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            className={inputClasses}
            placeholder={t('contact.phonePlaceholder')}
            {...register('phone')}
            dir="ltr"
          />
          {errors.phone && <span className={errorClasses}>{errors.phone.message}</span>}
        </div>
      </div>

      {/* Project Type */}
      <div>
        <label htmlFor="projectType" className="block text-sm font-medium text-warm-white/80 mb-2">
          {t('contact.projectTypeLabel')}
        </label>
        <div className="relative">
          <select
            id="projectType"
            className={cn(inputClasses, "appearance-none cursor-pointer")}
            {...register('projectType')}
          >
            <option value="">{t('contact.projectTypePlaceholder')}</option>
            {projectTypes.map((pt) => (
              <option key={pt.value} value={pt.value}>
                {pt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center px-4 text-gold">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-warm-white/80 mb-2">
          {t('contact.messageLabel')} <span className="text-gold">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className={cn(inputClasses, "resize-none")}
          placeholder={t('contact.messagePlaceholder')}
          {...register('message')}
        />
        {errors.message && <span className={errorClasses}>{errors.message.message}</span>}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        variant="primary"
        className="w-full justify-center mt-4"
      >
        {t('contact.submitButton')}
      </Button>
    </form>
  );
}
