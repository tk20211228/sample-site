# Supabase 環境構築手順

## 1. ローカル環境の準備(pnpm コマンドの場合)

### 1.1. 初期化コマンド

```bash
pnpm dlx supabase init
```

### 1.2. ローカル環境の準備

```bash
pnpm dlx supabase start
```

### 1.3. ローカル環境の確認

```bash
pnpm dlx supabase status
```

### 1.4. ローカル環境の停止

```bash
pnpm dlx supabase stop
```

## 2. ローカル環境のリンク

[Supabase](https://supabase.com/) より新しいプロジェクトを作成し、以下のコマンドでローカル Supabase とリンクします。

```bash
pnpm dlx supabase link
```

## デプロイ

1. [本番環境](https://supabase.com/)でプロジェクト作成する
2. プロジェクト作成したときのパスワードはメモしておく
3. リージョンは、国内向けだったら、日本を作成する
4. マイグレーションの確認
5. ローカル環境のデプロイ
6. 外部サービスでの認証（Github など）は本番用の認証 APP、認証設定を更新する
7. Vercel の環境構築
8.

以下のコマンドで本番環境にデプロイします。  
※ 事前にマイグレーションを忘れないすること。

### マイグレーションの更新とローカル環境のデプロイ

```bash
pnpm dlx supabase:generate-migration <マイグレーションタイトル> # マイグレーションしてない場合
pnpm dlx supabase db push
```

### ストレージの設定

上記コマンドではストレージの情報は反映されないので、
ローカルの環境を参考にし  
本番環境の管理コンソールからストレージの設定を行います。

### 認証の設定

本番環境の管理コンソールから GitHub 認証の設定を行います。  
また、本番用 GitHub 認証アプリの作成も行います。  
次に、認証設定画面の URL Configuration で本番サイトの URL を設定します。

### Vercel 環境変数の更新

本番環境の管理コンソールから各種 API キーをコピーし、Vercel 本番環境の環境変数に Supabase の「Project URL」「API_key_anon」「API_key_Service」を設定します。

### Vercel の環境構築
