'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { getAuthErrorMessage } from '@/lib/utils/error-message';
import { SingupInput } from '@/lib/validations/auth';
import { createClient } from '@/lib/supabase/client';

export function useAuth() {
  const router = useRouter();
  const supabase = createClient();
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (data: SingupInput) => {
    setIsLoading(true);
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
      setIsLoading(false);
    }
  };

  return {
    signup,
    isLoading,
  };
}
