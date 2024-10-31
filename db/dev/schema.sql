-- プロジェクトテーブル：プロジェクトと組織の基本情報を管理するテーブル
CREATE TABLE projects (
    -- プロジェクトの一意識別子
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'プロジェクトID。システムで自動採番される一意の識別子',
    
    -- プロジェクト名（100文字まで）
    project_name VARCHAR(100) NOT NULL COMMENT 'プロジェクト名。ユーザーが設定する識別名。変更可能',
    
    -- 組織名（100文字まで）
    organization_name VARCHAR(100) NOT NULL COMMENT '組織名。ユーザーが設定する組織の名称。重複可能、変更可能',
    
    -- レコードの作成日時
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'レコード作成日時。システムで自動設定',
    
    -- レコードの最終更新日時
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'レコード更新日時。更新時に自動更新'
);

-- エンタープライズテーブル：Android Management APIとの連携情報を管理するテーブル
CREATE TABLE enterprises (
    -- エンタープライズの一意識別子
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'エンタープライズID。システムで自動採番される一意の識別子',
    
    -- 紐づくプロジェクトのID
    project_id BIGINT NOT NULL COMMENT 'プロジェクトテーブルの外部キー。どのプロジェクトに属しているかを示す',
    
    -- Android Management APIのサインアップURL名
    signup_url_name VARCHAR(255) NOT NULL COMMENT 'Android Management APIのsignupUrls.createで生成されるURL名',
    
    -- エンタープライズトークン
    enterprise_token VARCHAR(255) COMMENT 'Android Management APIのコールバックで返却されるトークン',
    
    -- エンタープライズID
    enterprise_id VARCHAR(255) COMMENT 'Android Management APIのenterprises.createで生成されるID',
    
    -- 進行状況を管理するステータス
    status VARCHAR(50) CHECK (status IN ('SIGNUP_URL_CREATED', 'TOKEN_RECEIVED', 'ENTERPRISE_CREATED', 'COMPLETED')) 
    COMMENT 'API連携の進行状況を示すステータス',
    
    -- enterprises.createのレスポンスデータ
    settings JSON COMMENT 'enterprises.createのレスポンスデータ。JSONとして保存',

    -- レコードの作成日時
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'レコード作成日時。システムで自動設定',
    
    -- レコードの最終更新日時
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'レコード更新日時。更新時に自動更新',
    
    -- 外部キー制約
    FOREIGN KEY (project_id) REFERENCES projects(id) COMMENT 'プロジェクトテーブルとの関連付け'
);

-- ユーザーテーブル：ユーザーの基本情報を管理するテーブル
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'ユーザーID。システムで自動採番される一意の識別子',
    email VARCHAR(255) NOT NULL UNIQUE COMMENT 'ユーザーのメールアドレス。ログインIDとしても使用',
    name VARCHAR(100) NOT NULL COMMENT 'ユーザー名',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'レコード作成日時。システムで自動設定',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'レコード更新日時。更新時に自動更新'
);

-- プロジェクトロールテーブル：プロジェクト内での役割を定義するマスターテーブル
CREATE TABLE project_roles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'ロールID',
    role_name VARCHAR(50) NOT NULL UNIQUE COMMENT 'ロール名（例：OWNER, ADMIN, MEMBER）',
    description TEXT COMMENT 'ロールの説明',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'レコード作成日時'
);

-- プロジェクトメンバーテーブル：ユーザーとプロジェクトの関連付けを管理するテーブル
CREATE TABLE project_user_management (
    id BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'プロジェクトメンバーID',
    project_id BIGINT NOT NULL COMMENT 'プロジェクトID',
    user_id BIGINT NOT NULL COMMENT 'ユーザーID',
    role_id BIGINT NOT NULL COMMENT 'ロールID',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'レコード作成日時',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'レコード更新日時',
    FOREIGN KEY (project_id) REFERENCES projects(id) COMMENT 'プロジェクトテーブルとの関連付け',
    FOREIGN KEY (user_id) REFERENCES users(id) COMMENT 'ユーザーテーブルとの関連付け',
    FOREIGN KEY (role_id) REFERENCES project_roles(id) COMMENT 'プロジェクトロールテーブルとの関連付け',
    UNIQUE KEY uk_project_user (project_id, user_id) COMMENT 'プロジェクトとユーザーの組み合わせの一意制約'
);

-- project_rolesテーブルの初期データ
INSERT INTO project_roles (role_name, description) VALUES
('OWNER', 'プロジェクトのオーナー。全ての権限を持つ'),
('ADMIN', '管理者。ユーザー管理などの権限を持つ'),
('MEMBER', '一般メンバー。基本的な操作のみ可能');