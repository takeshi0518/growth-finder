export function getAuthErrorMessage(error: unknown): string {
  //Errorインスタンス
  if (error instanceof Error) {
    return translateErrorMessage(error.message);
  }

  //SupabaseのAuthError
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return translateErrorMessage(error.message as string);
  }

  return '予期しないエラーが発生しました';
}

//エラーメッセージの分離
function translateErrorMessage(message: string): string {
  const customErrors = [
    '管理者アカウントでログインしてください',
    'スタッフアカウントでログインしてください',
    'ユーザー情報の取得に失敗しました',
  ];

  if (customErrors.includes(message)) {
    return message;
  }

  //Supabaseのエラーメッセージを日本語に変換
  const errorMap: Record<string, string> = {
    // ログイン関連
    'Invalid login credentials':
      'メールアドレスまたはパスワードが間違っています',
    'Email not confirmed': 'メールアドレスの確認が完了していません',

    // サインアップ関連
    'User already registered': 'このメールアドレスは既に登録されています',
    'Password should be at least 6 characters':
      'パスワードは6文字以上である必要があります',
    'Signup requires a valid password': 'パスワードを入力してください',

    // OAuth関連
    'Provider not enabled': 'この認証方法は現在利用できません',
  };

  return errorMap[message] || message;
}
