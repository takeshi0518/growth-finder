# Growth Finder

スタッフの成長を可視化し、関係性構築を支援する人材育成ツール

## 目次

- [Growth Finder](#growth-finder)
  - [目次](#目次)
  - [プロジェクト概要](#プロジェクト概要)
  - [開発背景](#開発背景)
  - [システムアーキテクチャ](#システムアーキテクチャ)
    - [アーキテクチャ図](#アーキテクチャ図)
    - [データベース設計(ER 図)](#データベース設計er-図)
    - [画面遷移図](#画面遷移図)
  - [主な機能](#主な機能)
    - [実装予定の機能](#実装予定の機能)
  - [技術スタック](#技術スタック)
    - [フロントエンド](#フロントエンド)
    - [バックエンド](#バックエンド)
    - [開発環境](#開発環境)
  - [セットアップ方法](#セットアップ方法)
    - [ローカル環境（Docker 使用）](#ローカル環境docker-使用)
    - [通常のローカル環境（Docker なし）](#通常のローカル環境docker-なし)

## プロジェクト概要

Growth Finder は、カフェなどの飲食店におけるスタッフ育成を支援する Web アプリケーションです。
アナログな評価シートをデジタル化し、スタッフの成長を可視化・共有することで、店舗全体のレベル向上を目指します。

## 開発背景

カフェ店長として、スタッフとの関係性構築に課題を感じ、「伸びしろ発見チェックシート」を Excel で自作しました。

**開発の経緯**

- [開発コンセプトスライド](./docs/compnay-presentation-slides.pdf) - なぜこのツールを作ったのか

- [伸びしろ発見チェックシート](./docs/compnay-presentation-slides2.pdf) -自作したツールの実物(印刷用)

**現場での運用**

- 店長は PC を持ち歩けないため、印刷して手書きで記入
- 定期的な 1on1 やフィードバックの場で活用
- スタッフの成長を可視化し、対話のツールとして機能

**アナログ運用の課題**

- データの一元管理が困難
- 過去の評価履歴の参照に時間がかかる
- 店長交代時の引き継ぎが煩雑

このアナログ運用の課題(データ管理、集計など)を解決するため、Web アプリケーション化を目指しています。

## システムアーキテクチャ

### アーキテクチャ図

![アーキテクチャ図](./docs/architecture.jpg)

### データベース設計(ER 図)

![ER図](./docs/er-diagram.png)

### 画面遷移図

![画面遷移図](./docs/screen-transition.jpg)

## 主な機能

### 実装予定の機能

- [ ] スタッフ管理
- [ ] 評価シートのデジタル入力
- [ ] 評価履歴の管理・閲覧
- [ ] 成長の可視化（グラフ・チャート）
- [ ] フィードバック記録
- [ ] アクションプランの設定・管理

## 技術スタック

### フロントエンド

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/UI
- **Icons**: Lucide Icons
- **Charts**: Recharts

### バックエンド

- **BaaS**: Supabase
  - Authentication
  - PostgreSQL Database

### 開発環境

- **Hosting**: Vercel
- **Container**: Docker（開発環境）
- **CI/CD**: GitHub Actions
- **Linter**: ESLint
- **Testing**:
  - Unit Test: Vitest
  - E2E Test: Playwright

## セットアップ方法

### ローカル環境（Docker 使用）

```bash
# リポジトリをクローン
git clone https://github.com/[your-username]/Growth-finder.git
cd Growth-finder

# 環境変数を設定
cp .env.example .env.local
# .env.localにSupabaseの認証情報を追加

# Dockerコンテナを起動
docker-compose up -d

# 依存関係をインストール
docker-compose exec app npm install

# 開発サーバーを起動
docker-compose exec app npm run dev
```

http://localhost:3000 でアプリケーションが起動します。

### 通常のローカル環境（Docker なし）

```bash
# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

---

**開発者**: 柳澤武志  
**目的**: フロントエンドエンジニア転職のポートフォリオ
