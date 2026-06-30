# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Growth Finder is a staff evaluation and growth visualization tool for cafe store managers (飲食店スタッフ育成支援ツール). It digitizes a paper-based "growth discovery checklist" based on a QHC (Quality / Hospitality / Cleanliness) evaluation framework.

Two roles exist: **admin** (store manager) and **staff**. Admins create staff accounts (staff do not self-register) and enter evaluations. Staff view their own results.

## Commands

```bash
# Development
npm run dev           # Start Next.js dev server only
npm run dev:all       # Start Supabase local + Next.js (full local stack)

# Quality checks
npm run lint          # ESLint
npm run typecheck     # TypeScript (tsc --noEmit)
npm run check         # lint + typecheck together

# Testing
npm run test          # Run Vitest once
npm run test:watch    # Vitest watch mode

# Database
npm run db:types      # Regenerate types/supabase.ts from local Supabase schema
npm run db:migrate    # Apply pending migrations + regenerate types
npm run db:reset      # Reset local DB + regenerate types
```

Run a single test file: `npx vitest run src/path/to/file.test.ts`

## Architecture

### Route groups

- `src/app/(auth)/` — Login, signup, password reset, email confirm flows
- `src/app/(landing)/` — Public landing page
- `src/app/(protected)/admin/` — Admin-only pages (staff list, evaluations, settings)
- `src/app/(protected)/staff/` — Staff-only pages (view own evaluation)
- `src/app/(protected)/(auth-layout)/setup/` — Post-OAuth profile setup for new admins
- `src/app/auth/callback/` — OAuth redirect handler

### Middleware and access control

`src/middleware.ts` handles all route protection:

- Redirects unauthenticated users to `/login`
- Enforces email confirmation before accessing protected routes
- Role-based redirects: admins hitting `/staff` → `/admin` and vice versa
- Prevents re-entering `/setup` after completing it

### Authentication flow (OAuth)

OAuth uses an `intent` query param (`login` vs `signup`) on the redirect URL. The callback at `src/app/auth/callback/route.ts` uses `intent` together with `profiles.is_setup_complete` to:

- Block non-admin accounts from using the admin signup OAuth button
- Route new admins to `/setup` to complete their profile
- Route existing admins directly to `/admin`

### Supabase client factories

Four separate clients in `src/lib/supabase/`:

- `client.ts` — Browser client (Client Components)
- `server.ts` — Async server client (Server Components, Route Handlers)
- `middleware.ts` — Middleware client + `updateSession`, `getUserRole`, `isEmailConfirmed` helpers
- `admin.ts` — Service-role client (bypasses RLS; used for admin-creating-staff operations)

### Evaluation data model

Evaluations are structured around three `SectionType` values: `basic | barista | cashier`, each scored across three `Category` values: `skill | hospitality | cleanliness`. Item scores are 1–4. Status is `draft | completed`.

The DB stores `evaluation_sections` as an array; the form layer uses an object keyed by `SectionType`. The boundary transform lives in `src/app/(protected)/admin/staff/[staffId]/evaluation/utils.ts` (`formatEvaluationData`). Never flatten this distinction — the two structures serve different purposes.

### Type system

- `types/supabase.ts` — **Auto-generated** by `npm run db:types`. Never edit manually.
- `types/evaluations.ts` — App-level types derived via `Pick<Tables<'...'>, ...>`. Supabase auto-generated types use `string` for enum-constrained columns; this file narrows them to union types like `SectionType = 'basic' | 'barista' | 'cashier'`.
- `src/lib/validations/schemas.ts` — All Zod schemas; also exports inferred types (e.g. `SectionData`, `EvaluationInput`). The `evaluationSchema` shape mirrors the form object structure, not the DB structure.

Use `Pick` / `Omit` over the generated `Tables<'...'>` types rather than duplicating column names. Do not use `as` casts to satisfy types — use generics or correct initial values.

### Evaluation constants

`src/lib/constants/evaluation-items.ts` defines all evaluation checklist items (`SECTION_ITEMS`). Rank thresholds: A ≥ 90%, B ≥ 70%, C ≥ 50%, D < 50% (see `src/lib/utils/evaluation-calc.ts`).

### Forms

react-hook-form + Zod throughout. Server Actions handle mutations (files named `actions.ts` co-located with their route). The evaluation form uses nested tabs (section → category) and retains state across tab switches.

### UI components

`src/components/ui/` contains shadcn/ui components (auto-managed via `components.json`). `src/components/shared/` holds app-specific shared components. `src/components/evaluation/` holds evaluation display components (charts, scores, etc.) shared between admin and staff views.

### 基本原則

- 必要な場合、コンポーネントの末端に Client Components を使用
- データ取得は Server Components で行い、必要なデータを Client Components に props で渡す
- コンポーネント、関数などはそれらが使用されるコンポーネントのできる限り近くに置き、コロケーションに従う

### 命名規則

- ファイル名: ケバブケース(`evaluation-section.tsx`)
- コンポーネント名: パスカルケース(`EvaluationSection`)
- 関数名: キャメルケース(`getEvaluation`)

### コンポーネント分割

- **Server Components**: デフォルト(async 可能、データ取得可能)
- **Client Components**: `"use client"`ディレクティブ付き(インタラクション、状態管理)