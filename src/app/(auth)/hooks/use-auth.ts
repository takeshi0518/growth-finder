'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { getAuthErrorMessage } from '@/lib/utils/error-message';
import {
  LoginInput,
  NewPasswordInput,
  ResendConfirmationInput,
  ResetPasswordEmailInput,
  SignupInput,
} from '@/lib/validations/auth';
import { createClient } from '@/lib/supabase/client';

export function useAuth() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState({
    signUp: false,
    signIn: false,
    google: false,
    logout: false,
    resetPasswordEmail: false,
    resetPassword: false,
    resentdConfirmation: false,
  });

  const signUp = async (data: SignupInput) => {
    setIsLoading((prev) => ({ ...prev, signUp: true }));
    try {
      const organizationId = crypto.randomUUID();

      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            store_name: data.storeName,
            role: 'admin',
            organization_id: organizationId,
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        throw error;
      }

      router.push('/confirm-email');
    } catch (error) {
      toast.error('アカウント作成に失敗しました', {
        description: getAuthErrorMessage(error),
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, signUp: false }));
    }
  };

  const signInAdminOrStaff = async (
    data: LoginInput,
    role: 'admin' | 'staff'
  ) => {
    setIsLoading((prev) => ({ ...prev, signIn: true }));

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('ユーザー情報の取得に失敗しました');

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (profile?.role !== role) {
        await supabase.auth.signOut();
        throw new Error(
          role === 'admin'
            ? '管理者アカウントでログインしてください'
            : 'スタッフアカウントでログインしてください'
        );
      }

      if (role === 'admin') {
        localStorage.setItem('lastLoginMethod', 'email');
      }

      router.refresh();
    } catch (error) {
      toast.error('ログインに失敗しました', {
        description: getAuthErrorMessage(error),
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, signIn: false }));
    }
  };

  const signInAsAdmin = async (data: LoginInput) => {
    await signInAdminOrStaff(data, 'admin');
  };

  const signInAsStaff = async (data: LoginInput) => {
    await signInAdminOrStaff(data, 'staff');
  };

  const signUpWithGoogle = async () => {
    setIsLoading((prev) => ({ ...prev, google: true }));
    try {
      localStorage.setItem('lastLoginMethod', 'google');

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?intent=signup`,
          queryParams: {
            prompt: 'select_account',
          },
        },
      });

      if (error) {
        localStorage.removeItem('lastLoginMethod')
        throw error;
      }
    } catch (error) {
      toast.error('アカウント作成に失敗しました', {
        description: getAuthErrorMessage(error),
      });
      setIsLoading((prev) => ({ ...prev, google: false }));
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading((prev) => ({ ...prev, google: true }));
    try {
      localStorage.setItem('lastLoginMethod', 'google');

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?intent=login`,
          queryParams: {
            prompt: 'select_account',
          },
        },
      });

      if (error) {
        localStorage.removeItem('lastLoginMethod');
        throw error;
      }
    } catch (error) {
      toast.error('アカウント作成に失敗しました', {
        description: getAuthErrorMessage(error),
      });
      setIsLoading((prev) => ({ ...prev, google: false }));
    }
  };

  const logout = async () => {
    setIsLoading((prev) => ({ ...prev, logout: true }));

    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      toast.success('ログアウトしました');
      router.push('/login');
    } catch (error) {
      toast.error('ログアウトに失敗しました', {
        description: getAuthErrorMessage(error),
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, logout: false }));
    }
  };

  const resetPasswordEmail = async (data: ResetPasswordEmailInput) => {
    setIsLoading((prev) => ({ ...prev, resetPasswordEmail: true }));

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/reset-password/new`,
      });

      if (error) throw error;

      toast.success('リセットメールを送信しました', {
        description: 'メールをご確認ください',
      });

      router.push('/reset-password/sent');
    } catch (error) {
      toast.error('リセットメールの送信に失敗しました', {
        description: getAuthErrorMessage(error),
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, resetPasswordEmail: false }));
    }
  };

  const resetPassword = async (data: NewPasswordInput) => {
    setIsLoading((prev) => ({ ...prev, resetPassword: true }));

    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) throw error;

      await supabase.auth.signOut();

      toast.success('パスワードを更新しました');
      router.push('/reset-password/complete');
    } catch (error) {
      toast.error('パスワードの更新に失敗しました', {
        description: getAuthErrorMessage(error),
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, resetPassword: false }));
    }
  };

  const resendConfirmation = async (data: ResendConfirmationInput) => {
    setIsLoading((prev) => ({ ...prev, resentdConfirmation: true }));

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: data.email,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) throw error;

      toast.success('確認メールを送信しました', {
        description: 'メールをご確認ください',
      });

      router.push('/confirm-email');
    } catch (error) {
      toast.error('確認メールの送信に失敗しました', {
        description: getAuthErrorMessage(error),
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, resentdConfirmation: false }));
    }
  };

  const resendResetPasswordEmail = async (data: ResendConfirmationInput) => {
    setIsLoading((prev) => ({ ...prev, resentdConfirmation: true }));

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/reset-password/new`,
      });

      if (error) throw error;

      toast.success('リセットメールを送信しました', {
        description: 'メールをご確認ください',
      });

      router.push('/reset-password/sent');
    } catch (error) {
      toast.error('リセットメールの送信に失敗しました', {
        description: getAuthErrorMessage(error),
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, resentdConfirmation: false }));
    }
  };

  return {
    signUp,
    signInWithGoogle,
    signInAsAdmin,
    signInAsStaff,
    signUpWithGoogle,
    resetPasswordEmail,
    resetPassword,
    logout,
    resendConfirmation,
    resendResetPasswordEmail,
    isLoading,
  };
}
