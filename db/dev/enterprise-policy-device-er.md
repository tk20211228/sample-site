# Android Device Management Database Schema

## Entity Relationship Diagram

```mermaid
erDiagram
    enterprises ||--o{ projects : "has"
    enterprises ||--o{ policies : "has"
    enterprises ||--o{ devices : "has"
    policies ||--o{ devices : "has"
    enterprises ||--o{ enrollment_tokens : "has"
    devices ||--o{ application_reports : "has"
    devices ||--o{ memory_evennts : "has"
    devices ||--o{ power_manegement_events : "has"

    enterprises {
        uuid id PK
        text signup_url_name
        text enterprise_token
        text enterprise_name
        jsons settings
        timestamp created_at
        timestamp updated_at
    }

    policies {
        uuid id PK
        uuid enterprise_table_id FK
        text display_name
        text policy_name "APIで使用する値"
        json policy_settings
        timestamp created_at
        timestamp updated_at
    }

    devices {
        uuid id PK
        uuid enterprise_table_id FK
        uuid policy_table_id FK
        text device_name "APIで使用する値"
        text display_name
        jsonb data
        timestamp created_at
        timestamp updated_at
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

    power_manegement_events {
        uuid id PK
        uuid device_table_id FK
        jsonb data
        timestamptz created_at
    }


    %% enrollment_tokens {
    %%     bigint id PK
    %%     bigint enterprise_id FK
    %%     bigint initial_policy_id FK
    %%     varchar token_name
    %%     varchar token_value
    %%     varchar qr_code_url
    %%     timestamp expires_at
    %%     varchar status
    %%     timestamp created_at
    %%     timestamp updated_at
    %% }


```
