import { z } from 'zod';

// サインアップ
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

// ログイン
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('正しいメールアドレスを入力してください'),

  password: z.string().min(1, 'パスワードを入力してください'),
});

// パスワードリセット
export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email('正しいメールアドレスを入力してください'),
});

// 新しいパスワード
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

export type SingupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type NewPasswordInput = z.infer<typeof newPasswordSchema>;
