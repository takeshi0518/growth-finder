'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { getAuthErrorMessage } from '@/lib/utils/error-message';
import { LoginInput, SingupInput } from '@/lib/validations/auth';
import { createClient } from '@/lib/supabase/client';

export function useAuth() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState({
    singUp: false,
    signIn: false,
    google: false,
  });

  const singUp = async (data: SingupInput) => {
    setIsLoading((prev) => ({ ...prev, singUp: true }));
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
      setIsLoading((prev) => ({ ...prev, singUp: false }));
    }
  };

  const signIn = async (data: LoginInput) => {
    setIsLoading((prev) => ({ ...prev, signIn: true }));

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      router.refresh();
    } catch (error) {
      toast.error('ログインに失敗しました', {
        description: getAuthErrorMessage(error),
      });
    } finally {
      setIsLoading((prev) => ({ ...prev, signIn: false }));
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading((prev) => ({ ...prev, google: true }));
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: 'select_account',
          },
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      toast.error('アカウント作成に失敗しました', {
        description: getAuthErrorMessage(error),
      });
      setIsLoading((prev) => ({ ...prev, google: false }));
    }
  };

  return {
    singUp,
    signIn,
    signInWithGoogle,
    isLoading,
  };
}
