# Growth Finder

> スタッフの成長を可視化し、店長とスタッフの関係性構築を支援する人材育成ツール

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)](https://supabase.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com/)

![ダッシュボード](./docs/screenshots/01-top.png)

https://github.com/user-attachments/assets/7048cab6-717d-4a6a-a735-e344a159e431

---

## デモを試す

デモアカウントの登録は不要です。ファーストビューの **「デモで今すぐ試す」** ボタンから、
ワンクリックでアプリを体験できます。

**デモサイト**: https://growth-finder-psi.vercel.app/

> デモ環境では、評価入力・履歴閲覧・ランク算出など主要機能をお試しいただけます。
> アカウント登録なしで、面接・カジュアル面談中にもすぐご確認いただけるよう設計しました。

---

## 目次

- [プロジェクト概要](#プロジェクト概要)
- [開発背景](#開発背景)
- [主な機能](#主な機能)
- [技術スタックと選定理由](#技術スタックと選定理由)
- [システム設計](#システム設計)
- [設計上の試行錯誤](#設計上の試行錯誤)

---

## プロジェクト概要

**Growth Finder** は、カフェなどの飲食店におけるスタッフ育成を支援する Web アプリケーションです。

カフェ店長として 13 年の現場経験から生まれた「伸びしろ発見チェックシート」をデジタル化し、スタッフの成長を可視化・共有することで、店舗全体のレベル向上と、店長・スタッフ間の信頼関係構築を目指します。

### なぜ「評価」ではなく「関係性構築」のツールなのか

カフェのスタッフの多くは学生アルバイトで、本業は学業です。働く動機も「お金のため」「社会勉強」「カフェへの憧れ」など様々で、仕事へのモチベーションは構造的に高くなりにくい環境にあります。

だからこそ、一方的に評価して点数をつけるだけでは現場は動きません。関係性を築き、本人の成長を認め、承認欲求に応えることが大事です。それが結果として QHC(Quality / Hospitality / Cleanliness)の向上につながる、というのが 13 年の現場で得た実感です。

Growth Finder は単なる評価システムではなく、**店長とスタッフの関係性を構築し、信頼の土台を作るためのツール**として設計しています。

---

## 開発背景

### 現場で感じた 3 つの課題

カフェ店長として日々スタッフと向き合う中で、以下の課題を強く感じていました。

1. **スタッフが思うように動いてくれない**
2. **スタッフ自身が「自分の何が成長したのか」を実感しにくい**
3. **1on1 の場で「何を話すか」のきっかけが作りにくい**

### アナログ運用時代

そこで、QHC(Quality / Hospitality / Cleanliness)の評価フレームワークを基に、自分で **「伸びしろ発見チェックシート」** を Excel で作成しました。

- [開発コンセプトスライド](./docs/concept-slides.pdf) ― なぜこのツールを作ったのか
- [伸びしろ発見チェックシート](./docs/growth-finder-sheet.pdf) ― 自作したツール(印刷用)

実際に現場で運用したところ、スタッフとの 1on1 の質は大きく向上しました。
そして何より大きかったのは、スタッフの成長を具体的に承認できるようになったことです。自分の成長を認められることで、スタッフ自身に「もっとがんばろう」という意識が芽生えました。評価そのものよりも、この変化こそが現場にとって本当の価値でした。

### アナログ運用の限界

しかし運用を続けるうちに、新たな課題が見えてきました。

| 課題                       | 具体例                                                           |
| -------------------------- | ---------------------------------------------------------------- |
| **データの一元管理が困難** | スタッフ毎の紙シートが店舗に散らばる                             |
| **集計・可視化に手間**     | スタッフ全体の傾向や本人の成長曲線を、手作業で集計する必要がある |
| **紙ゆえの物理的な脆さ**   | カフェの仕事場では、紙が破れたり水に濡れたりする                 |

便利だが手間のかかる運用を、もっと快適にしたい。そう考えて Excel で作ったツールを Web アプリケーションとして作り直しました。これが Growth Finder です。

---

## 主な機能

実際の画面とともに、コアとなる機能を紹介します。

### モバイルファーストの評価入力

カフェの仕事場に PC を持ち込むのは、場所の都合で現実的ではありません。そのため、店長がタブレットやスマートフォンで片手でも入力できることを最優先に設計しました。ネストタブ UI で 4 カテゴリ ×3 観点を切り替えながら評価でき、タブを切り替えても入力データは保持されます。

https://github.com/user-attachments/assets/9fb44b26-97fc-4050-8c9a-cf192c3c62ea

<img src="./docs/screenshots/06-mobile.png" alt="モバイル版" width="300">

![PC版](./docs/screenshots/05-evaluation-input.png)

### その場で残せるフィードバック

気づいたことを鮮度の良いうちに記録できるよう、画面に追随するボタンからモーダルを開き、「良かった点」「もっと良くなる点」を瞬時にコメントできます。

![コメント入力](./docs/screenshots/02-feedback-comment.png)

### 自動ランク算出と対話のためのサマリー

評価点から総合ランクを自動算出。アクションプランや「3 ヶ月後の未来」まで記録でき、評価で終わらせず**次の対話につなげるツール**として設計しています。

![サマリー画面](./docs/screenshots/04-summary.png)

### スタッフ管理

スタッフの追加・検索・評価状態の一覧確認ができます。

![スタッフ管理](./docs/screenshots/03-staff-list.png)

<details>
<summary>その他の実装機能（クリックで展開）</summary>

- **認証・権限管理**: Supabase Auth（メール+パスワード / Google OAuth / パスワードリセット）、ロールベースアクセス制御、Next.js Middleware によるルート保護
- **評価機能**: react-hook-form + Zod、下書き保存（draft/completed）、評価期間管理
- **集計・可視化**: カテゴリ別達成率の自動計算、Recharts によるレーダーチャート・ドーナツチャート
- **育成支援**: アクションプラン・総括コメント・3 ヶ月後の目標の記録
- **品質**: ESLint / Vitest / GitHub Actions（CI/CD）

</details>

---

## 技術スタックと選定理由

### なぜ SPA ではなく Next.js か

本アプリは業務ツールで SEO が不要なため、当初は SPA も検討しました。最終的に Next.js (App Router) を選んだのは、次の 2 点が決め手です。

1. **型の一貫性とサーバー処理を、一体で得られる**
   サーバー・クライアント間の型の一貫性も、サーバー側でのデータ処理も、バックエンド (Hono) + フロントエンド (Vite + React) を TypeScript で統一する構成で実現できます。ただしそれは、環境構築と 2 つのアプリを管理するコストを伴います。Next.js はそれを最初から一体で提供します。一人で開発し、フロントとバックを分けて運用する必要のない本アプリの規模では、分離によるコストよりも一体性のメリットが上回ると判断しました。

2. **ロール判定とルート保護を一箇所で管理できる**
   管理者とスタッフの 2 種類のロールがあり、遷移できる画面が異なります。App Router の middleware で、ロール判定とルート保護を一箇所に集約できます。認可のルールが一箇所にまとまっているため、仕様変更時にも修正漏れが起きにくい構成です。

### その他の技術選定

| 技術                                 | 選定理由（要点）                                                                                                   |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| **TypeScript**                       | `SectionType = 'basic' \| 'barista' \| 'cashier'` のようなユニオン型でドメインの状態を表現し、バグを未然に防ぐため |
| **React 19**                         | Server Components と `use()` API による非同期データ受け渡しなど、最新パターンを実践するため                        |
| **Tailwind CSS + shadcn/ui**         | デザインシステム構築の工数を抑えつつ、コンポーネントを自分のリポジトリで管理できる柔軟性のため                     |
| **react-hook-form + Zod**            | サーバー/クライアントで同一スキーマを共有できるバリデーション設計のため                                            |
| **Recharts**                         | 成長曲線の可視化に。React との統合がスムーズなため                                                                 |
| **Supabase / PostgreSQL**            | 認証・DB・Row Level Security が一体化。3 層構造の正規化を RDB で厳格に管理するため                                 |
| **Vercel**                           | Next.js との親和性が高いため                                                                                       |
| **Docker**                           | ローカル環境の再現性確保のため                                                                                     |
| **GitHub Actions / ESLint / Vitest** | PR 時に自動で Lint・テストを実行し、品質を担保するため                                                             |

---

## システム設計

### アーキテクチャ図

![アーキテクチャ図](./docs/architecture.jpg)

### データベース設計(ER 図)

![ER図](./docs/er-diagram.png)

### 画面遷移図

![画面遷移図](./docs/screen-transition.jpg)

---

## 設計上の試行錯誤

### 1. DB 層とフォーム層の境界での型整形

**背景:2 つの構造をもつデータ**
評価入力画面では、Supabase から既存の評価データを取得し、react-hook-form の `defaultValues` に渡します。ただし、DB の構造とフォームの構造は形が違う。

**DB の構造のコード(.select の３階層のネスト)**

```typescript
.select(
  `
    id,
    status,
    action_plan,
    total_comment,
    future_vision,
    evaluation_sections (
      id,
      section_type,
      good_points,
      improvement_points,
      skill_score,
      skill_max,
      hospitality_score,
      hospitality_max,
      cleanliness_score,
      cleanliness_max,
      evaluation_items (
        item_name,
        category,
        score
      )
    )
  `
)
```

**フォームの構造のコード(basic/barista/cashier をキーに持つオブジェクト)**

```typescript
{
    basic: {
      skill: {},
      hospitality: {},
      cleanliness: {},
      good_points: [],
      improvement_points: [],
    },
    barista: {
      skill: {},
      hospitality: {},
      cleanliness: {},
      good_points: [],
      improvement_points: [],
    },
    cashier: {
      skill: {},
      hospitality: {},
      cleanliness: {},
      good_points: [],
      improvement_points: [],
    },
    action_plan: '',
    total_comment: '',
    future_vision: '',
  }
```

**なぜ形を揃えなかったのか**
両者を一致させるためには DB 側の構造を変更するか、フォーム側を配列構造にするかの２択になります。  
しかしフォーム側を配列にすると、以下のデメリットがあります。

- 配列の 0 番目は basic、という暗黙のルールが生まれます。
- setValue 時のパスを`sections.0.skill.xxx`のようにインデックスで指定する必要があります。

特に２点目は、評価項目コンポーネント`EvaluationItem`で問題になります。このコンポーネントは複数のカテゴリ・複数の項目を共通ロジックで扱うため、`setValue`のパスをテンプレートリテラルで動的に組み立てます。

```typescript
setValue(`${sectionType}.${category}.${item_name}`, score);
```

オブジェクト構造であれば`sectionType = 'basic' | 'barista' | 'cashier'`をそのままパスに使えます。一方、配列構造だと「basic は 0 番目、barista は 1 番目...」というマッピングをコンポーネント側で持たないといけなくなり、コードが複雑になります。

DB の構造は DB の都合、フォームの構造は UI の都合です。
それぞれの都合に合わせた形を持ち、境界で整形するようにしました。

**最初の実装と違和感**
当初は reduce の初期値に空オブジェクト`{}`を渡し、それを`as FormattedEvaluation`で目的の型を主張する形で実装していました。動作はしていましたが、TypeScript の学習を進める中で、`as`キャストが型チェックを黙らせる手段でしかないことを理解しました。  
このコードでは初期値の`{}`を「`FormattedEvaluation`だ」と強引に主張しているだけで、実際に`basic`/`barista`/`cashier`のプロパティが揃っているかは保証されません。  
`reduce`の処理の中でプロパティが追加される前提に依存しており、もし処理に不備があっても型エラーで気が付けない状態でした。

```typescript
const result = existingEvaluation.evaluation_sections.reduce((acc, cur) => {
  acc[cur.section_type] = {
    ...formatCategoryScores(cur.evaluation_items),
    good_points: (cur.good_points ?? []) as string[],
    improvement_points: (cur.improvement_points ?? []) as string[],
  };
  return acc;
}, {} as FormattedEvaluation);
```

**書き直した実装**
reduce にジェネリクス型引数を渡し、返り値の型を宣言しました。  
初期値も EMPTY_SECTION_DATA で必須プロパティを揃え、型と実体を一致させました。

```typescript
const EMPTY_SECTION_DATA: SectionData = {
  skill: {},
  hospitality: {},
  cleanliness: {},
  good_points: [],
  improvement_points: [],
};

export const formatEvaluationData = (
  existingEvaluation: ExistingEvaluation
) => {
  const result =
    existingEvaluation.evaluation_sections.reduce<FormattedEvaluation>(
      (acc, cur) => {
        acc[cur.section_type] = {
          ...formatCategoryScores(cur.evaluation_items),
          good_points: cur.good_points ?? [],
          improvement_points: cur.improvement_points ?? [],
        };
        return acc;
      },
      {
        basic: {
          ...EMPTY_SECTION_DATA,
        },
        barista: {
          ...EMPTY_SECTION_DATA,
        },
        cashier: {
          ...EMPTY_SECTION_DATA,
        },
      }
    );

  return result;
};
```

**もう一つの型崩れ：Supabase の自動生成型の限界**
Supabase は select の結果から型を自動生成しますが、
DB の CHECK 制約までは型に反映されません。
例えば、`evaluation_sections.section_type` は DB 側で `CHECK('basic', 'cashier', 'barista')`制約はありますが、返却される型は `string`になります。アプリケーション側で `SectionType = 'basic' | 'cashier' | 'barista'`を定義し、整形時に型を絞る必要がありました。

**設計判断としての学び**

- DB の構造とアプリケーションのデータ構造は無理に一致させる必要はありません
- 両者の境界で整形することで、DB を変えずにアプリケーションの都合に合わせられます
- DB の自動生成型は万能ではない。CHECK 制約のような情報は失われるため、必要に応じてアプリケーション側で型を絞り直す判断が必要です

### 2. 認証フローの設計 - 1 つのログイン画面で 2 種類のロールを安全に扱う

**背景:管理者と一般スタッフが共存するアプリ**
本アプリのロールは`admin`と`staff`の 2 種類あります。
ログイン画面は 1 つで、管理者・スタッフのタブを切り替えることで表示されるフォームが切り替わる構成です。Google OAuth ボタンは管理者タブにのみ表示しています。

![ログイン画面](./docs/screenshots/login.png)

**最初の実装と気づき**

スタッフのルーティングをチェックしていたとき、スタッフが管理者になりすまして管理者アカウントを作成できる状態であることに気づきました。

管理者タブの「Google で続ける」ボタンは `signUpWithGoogle` を呼び出し、`role: 'admin'` を `user_metadata` に含める実装になっていました。そのため、スタッフが管理者タブで Google OAuth を実行すると、新規 admin として`profiles` レコードが作られ、`/admin` にアクセスできる状態でした。

**検討した選択肢**
問題の解決策として、2 つの方向性を検討しました。

### 選択肢 1: 管理者用ログインとスタッフ用ログインの 2 種類用意する

`/admin-login`・`/staff-login`のような URL を作り、物理的にスタッフが管理者の Google OAuth ボタンを押せなくすることを検討しました。しかしいくつか問題があり採用には至りませんでした。
採用しなかった理由は以下の通りです。

- 管理者がスタッフに案内する URL が複数存在するため、混乱を招きます
- 誤って管理者用ログイン URL をスタッフに伝えてしまうと URL 秘匿に依存していた防御線が崩れます

特に 2 番目は実際に起こりうるリスクです。URL の秘匿に頼る設計は運用ミス 1 回で致命傷になりかねません。

### 選択肢 2: 認証ロジックで OAuth フローの意図を判別する(採用)

ログイン画面は 1 つのままで、OAuth のリダイレクト URL に「ログイン目的なのかサインアップ目的なのか」を示すパラメータ(`intent`)を付与します。OAuth callback 側でその`intent`と`profiles`のデータを照合することで不正なフローを弾く設計です。

この方針を採用した理由は以下の通りです。

- 運用面:ログイン画面が 1 つでスタッフに URL を伝える際の混乱がありません
- セキュリティ面:URL 秘匿に依存しないため、伝え間違いなどの運用ミスに強くなります
- 実装面:管理者・スタッフのログイン画面を共有できるためコードの記述量が抑えられます

**採用した設計:intent パラメータによるフロー判別と既存フラグの活用**

本アプリには、もともと OAuth 認証時に２つの仕組みが存在していました。

1. **intent パラメータ**: OAuth callback で「ログインなのかサインアップなのか」を判定し、遷移先を分岐するために導入したクエリパラメータです(`intent=login` → `/admin`、`intent=signup` → `/setup`)。

2. **is_setup_complete フラグ**: OAuth でアカウントを作成した直後のセットアップ未完了を表現するフラグです。名前や店舗名などが未入力の状態で、管理者アカウントとして不完全な状態を示します。

これらは、いずれももともと UX 向上のために実装した機能です。OAuth 認証ではメールアドレスしか取得できないため、名前や店舗名を別途入力させる必要があります。intent と is_setup_complete を組み合わせることで、ログイン直後にセットアップ画面へ自動的に誘導し、ユーザーにプロフィール設定の手間を取らせない設計にしていました。

**今回の問題への適用**

スタッフが管理者になりすましてアカウントを作成できる脆弱性に対して、新しい仕組みを作るのではなく、既存の`intent`と`is_setup_complete`を組み合わせて検証する形で解決しました。

具体的には callback で`intent === 'login'`の分岐に、`profile.role === 'admin'`かつ`profile.is_setup_complete === true`の検証を追加し解決しました。

```typescript
// ...(profile 取得など)

if (intent === 'login') {
  const isValidAdmin =
    profile.role === 'admin' && profile.is_setup_complete === true;

  if (!profile.is_setup_complete) {
    return; // セットアップ未完了はブロック
  }

  if (!isValidAdmin) {
    return; // 管理者以外はブロック
  }

  return; // /admin へ
}

if (intent === 'signup') {
  if (profile.is_setup_complete) {
    return; // 既存ユーザーは /admin へ
  }
  return; // セットアップ未完了ユーザーは /setup へ
}

return; // intent が無い場合は /login へ
```

**intent ごとの動作**

- intent === 'login': 既存の admin かつセットアップ完了済みのときのみ /admin へ
- intent === 'signup': 新規は /setup へ、セットアップ完了済みなら /admin へ
- intent が無い場合: 想定外のフローなので /login へ

この分岐の検証により、スタッフが管理者タブから OAuth 認証しても、`intent === 'login'`分岐で弾かれます。既存の仕組みに検証ロジックを追加するだけで、URL 秘匿に依存しない防御を実装することができました。

**設計の限界としての判断:スタッフのアカウント発行**

セキュリティの観点からは、スタッフが自分でアカウントを作成する形が望ましいです。しかし現場には「アカウントを作成しておいてください」と案内をしても、やらない人が一定数います。評価したいときにスタッフのアカウントが無いとスケジュールが狂ったりして業務に支障をきたします。

そのため、スタッフのアカウントは管理者が代理で発行する設計にしました。セキュリティの理想を追求して扱いづらい設計より、現場で確実に運用される設計を選びました。

ただし、この運用には弱点があります。管理者がスタッフのパスワードを知っている状態であり、スタッフが自分でパスワードを変更しない限り、その状態が続きます。本来なら初回ログイン時にパスワード変更を促す仕組みが望ましいので、将来的には改善していきたいです。

**設計判断としての学び**

- URL の秘匿性に頼る設計は、1 回の運用ミスで致命傷になるので認証ロジックでの判別の方が運用に強い
- 新しい機能を実装するときは、既存の仕組みを再利用できないか考えることで、実装コストを下げることができる
- セキュリティの理想と現場での運用の現実を理解して、落としどころを決め設計すること

---

## リンク

- **GitHub**: [@takeshi0518](https://github.com/takeshi0518)
- **Zenn**: [技術記事一覧](https://zenn.dev/takeshi0518)
- **X (Twitter)**: [@y_takeshi0518](https://x.com/y_takeshi0518)

---

## ライセンス

このプロジェクトは個人のポートフォリオ用途として作成されています。
