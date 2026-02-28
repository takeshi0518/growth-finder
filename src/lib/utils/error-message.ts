export function getErrorMessage(error: unknown): string {
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
    'プロフィールの更新に失敗しました',
    '入力内容を確認してください',
    '認証エラーが発生しました',
    '現在のパスワードが正しくありません',
    'パスワードの更新に失敗しました',
    'ファイルが選択されていません',
    'jpeg・png・webp形式の画像を選択してください',
    'ファイルサイズは2MB以下にしてください',
    '画像のアップロードに失敗しました',
    '組織情報の取得に失敗しました',
    'スタッフの登録に失敗しました',
    'スタッフの削除に失敗しました',
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
