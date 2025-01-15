# enterprise Database Schema

## テーブル一覧

- users
- enterprises
- projects
- policies
- devices
- events
- operations
- memory_events
- power_management_events
- application_reports
- devices_histories
- enterprises_histories
- pubsub_messages

## 記号の意味

- PK: Primary Key
- FK: Foreign Key
- ||--o{ : 1 対多の関係
- ||--|| : 1 対 1 の関係
- }o--o{ : 多対多の関係
- ex) enterprises ||--o{ projects : "has" は「エンタープライズは複数のプロジェクトを持つ」という意味

## Entity Relationship Diagram

```mermaid
erDiagram
    %% ユーザー管理
    users ||--o{ enterprises : "owns"
    users ||--o{ project_members : "participates"
    %% プロジェクト管理
    enterprises ||--o{ projects : "has"
    projects ||--o{ project_members : "has users"
    %% ポリシー管理
    enterprises ||--o{ policies : "has"
    policies ||--o{ policies_histories : "has"
    policies ||--o{ devices : "has"
    %% デバイス管理
    enterprises ||--o{ devices : "has"
    devices ||--o{ application_reports : "has"
    devices ||--o{ memory_events : "has"
    devices ||--o{ power_management_events : "has"
    devices ||--o{ devices_histories : "has"
    devices ||--o{ operations : "has"
    devices ||--o{ events : "has"
    %% アプリ管理
    enterprises ||--o{ apps : "has"
    %% PubSub管理
    pubsub_messages ||--o{ devices_histories : "records"
    pubsub_messages ||--o{ operations : "records"
    pubsub_messages ||--o{ events  : "records"
    %% エンタープライズ管理
    enterprises ||--o{ enterprises_histories : "has"

    enterprises {
        text enterprise_id PK
        jsonb enterprise_data "最新のresponse_data"
        uuid owner_id "users.id"
        timestamp created_at
        timestamp updated_at
    }
    enterprises_histories {
        uuid enterprises_history_id PK
        text enterprise_id FK
        jsonb request_data
        jsonb response_data
        timestamp created_at
    }
```
