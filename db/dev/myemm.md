# Enterprise Management System Database Schema

erDiagram

    enterprises ||--o{ projects : "has"
    enterprises ||--o{ policies : "has"
    enterprises ||--o{ devices : "has"
    policies ||--o{ devices : "has"
    enterprises ||--o{ enrollment_tokens : "has"
    devices ||--o{ application_reports : "has"
    devices ||--o{ memory_evennts : "has"
    devices ||--o{ power_management_events : "has"

    %% ユーザー関連の関係性
    users ||--o{ projects : "owns"
    users ||--o{ project_members : "belongs to"
    users ||--o{ enterprise_settings_history : "creates"

    %% プロジェクト関連の関係性
    projects ||--o{ project_members : "has users"
    enterprises ||--o{ projects : "has"
    enterprises ||--o{ enterprise_settings_history : "has history"

    %% アプリ管理
    enterprises ||--o{ apps : "has"

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
        text enterprise_token "NULL許容"
        text enterprise_name  "NULL許容"
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
    project_members {
        bigint id PK
        uuid project_id FK
        uuid user_id FK"auth.users.id：プロジェクトメンバー"
        timestamptz created_at
        timestamptz updated_at
    }

    enterprises {
        uuid id PK
        text signup_url_name
        text enterprise_token
        text enterprise_name
        jsonb settings
        timestamptz created_at
        timestamptz updated_at
    }

    policies {
        uuid id PK
        uuid enterprise_table_id FK
        text display_name
        text policy_name "APIで使用する値"
        json policy_settings
        timestamptz created_at
        timestamptz updated_at
    }

    devices {
        uuid id PK
        uuid enterprise_table_id FK
        uuid policy_table_id FK
        text device_name "APIで使用する値"
        text display_name
        jsonb data
        timestamptz created_at
        timestamptz updated_at
    }
    application_reports {
        uuid id PK
        uuid device_table_id FK
        jsonb data
        timestamptz created_at
    }
    memory_evennts {
        uuid id PK
        uuid device_table_id FK
        jsonb data
        timestamptz created_at
    }
    power_management_events {
        uuid id PK
        uuid device_table_id FK
        jsonb data
        timestamptz created_at
    }
    apps {
        uuid id PK
        uuid enterprise_id FK
        text name
        jsonb app_details
        timestamptz created_at
        timestamptz updated_at
    }
