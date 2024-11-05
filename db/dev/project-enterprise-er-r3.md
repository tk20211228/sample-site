# Project and Enterprise Management Database Schema

## Entity Relationship Diagram

```mermaid
erDiagram
%% ユーザー関連の関係性
users ||--o{ projects : "owns"
users ||--o{ project_members : "belongs to"
users ||--o{ enterprise_settings_history : "creates"

%% プロジェクト関連の関係性
projects ||--o{ project_members : "has users"
enterprises ||--o{ projects : "has"
enterprises ||--o{ enterprise_settings_history : "has history"

     <!-- users {
        uuid id PK "auth.users.id"
        text email
        text name
        timestamptz created_at
        timestamptz updated_at
    } -->

    projects {
        uuid id PK
        uuid enterprise_id FK "NULL許容"
        text project_name
        text organization_name
        timestamptz created_at
        timestamptz updated_at
        uuid owner_id FK "auth.users.id：プロジェクト作成者"
    }
    enterprises {
        uuid id PK
        text signup_url_name
        text enterprise_token
        text enterprise_name
        text status
        timestamptz created_at
        timestamptz updated_at
    }
    enterprise_settings_history {
        bigint id PK
        uuid enterprise_id FK
        jsonb settings
        uuid created_by_user_id FK "auth.users.id：設定変更者"
        timestamptz created_at
    }
    project_user_management {
        bigint id PK
        uuid project_id FK
        uuid user_id FK"auth.users.id：プロジェクトメンバー"
        timestamptz created_at
        timestamptz updated_at
    }
```

## 注記

- ユーザー認証とユーザー ID は Supabase Auth (auth.users) で管理
- owner_id, created_by_user_id, user_id は全て auth.users.id を参照
- RLS ポリシーで auth.uid() を使用してアクセス制御を実装
