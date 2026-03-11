import { z } from 'zod';

export const signupSchema = z
  .object({
    email: z
      .string()
      .min(1, 'メールアドレスを入力してください')
      .email('正しいメールアドレスを入力してください'),

    name: z
      .string()
      .min(1, '名前を入力してください')
      .max(50, '名前は50文字以内で入力してください'),

    storeName: z
      .string()
      .min(1, '店舗名を入力してください')
      .max(100, '店舗名は100文字以内で入力してください'),

    password: z
      .string()
      .min(8, 'パスワードは8文字以上で入力してください')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/,
        'パスワードは英数字を含む必要があります'
      ),

    confirmPassword: z.string().min(1, 'パスワード(確認)を入力してください'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'],
  });

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, '名前を入力してください')
    .max(50, '名前は50文字以内で入力してください'),

  storeName: z
    .string()
    .min(1, '店舗名を入力してください')
    .max(100, '店舗名は100文字以内で入力してください'),

  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('正しいメールアドレスを入力してください'),
});

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, '現在のパスワードを入力してください'),
    password: z
      .string()
      .min(8, 'パスワードは8文字以上で入力してください')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/,
        'パスワードは英数字を含む必要があります'
      ),
    confirmPassword: z.string().min(1, 'パスワード(確認)を入力してください'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('正しいメールアドレスを入力してください'),

  password: z.string().min(1, 'パスワードを入力してください'),
});

export const resetPasswordEmailSchema = z.object({
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('正しいメールアドレスを入力してください'),
});

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('正しいメールアドレスを入力してください'),
});

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'パスワードは８文字以上で入力してください')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/,
        'パスワードは英数字を含む必要があります'
      ),

    confirmPassword: z.string().min(1, 'パスワード(確認)を入力してください'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'],
  });

export const setupSchema = z.object({
  name: z
    .string()
    .min(1, '名前を入力してください')
    .max(50, '名前は50文字以内で入力してください'),

  storeName: z
    .string()
    .min(1, '店舗名を入力してください')
    .max(100, '店舗名は100文字以内で入力してください'),
});

export const addStaffSchema = z.object({
  name: z
    .string()
    .min(1, '名前を入力してください')
    .max(50, '名前は50文字以内で入力してください'),
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('正しいメールアドレスを入力してください'),
  password: z
    .string()
    .min(8, 'パスワードは8文字以上で入力してください')
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/,
      'パスワードは英数字を含む必要があります'
    ),
});

export const editStaffSchema = z.object({
  name: z
    .string()
    .min(1, '名前を入力してください')
    .max(50, '名前は50文字以内で入力してください'),
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('正しいメールアドレスを入力してください'),
});

export const editStaffPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'パスワードは8文字以上で入力してください')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]/,
        'パスワードは英数字を含む必要があります'
      ),
    confirmPassword: z.string().min(1, 'パスワード(確認)を入力してください'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'],
  });

export const createEvaluationPeriodSchema = z.object({
  name: z
    .string()
    .min(1, '評価期間名を入力してください')
    .max(50, '評価期間名は50文字以内で入力してください'),
});

export const editEvaluationPeriodSchema = z.object({
  name: z
    .string()
    .min(1, '評価期間名を入力してください')
    .max(50, '評価期間名は50文字以内で入力してください'),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type NewPasswordInput = z.infer<typeof newPasswordSchema>;
export type SetupInput = z.infer<typeof setupSchema>;
export type ResetPasswordEmailInput = z.infer<typeof resetPasswordEmailSchema>;
export type ResendConfirmationInput = z.infer<typeof resetPasswordEmailSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
export type AddStaffInput = z.infer<typeof addStaffSchema>;
export type EditStaffInput = z.infer<typeof editStaffSchema>;
export type EditStaffPasswordInput = z.infer<typeof editStaffPasswordSchema>;
export type CreateEvaluationPeriodInput = z.infer<
  typeof createEvaluationPeriodSchema
>;
export type EditEvaluationPeriodInput = z.infer<
  typeof editEvaluationPeriodSchema
>;
