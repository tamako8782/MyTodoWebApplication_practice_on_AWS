## 1. 概要

### 1.1 目的
- 学習目的
  - Kubernetesを用いたコンテナオーケストレーションの理解を深め更にTerraformCloudを用いたインフラストラクチャの管理を自動化するワークフローを作成、アプリケーションに置いてはGolangでの標準パッケージのみを用いたCRUDの基本理解とAPIサーバーの構築の実施、Reactを用いたSPAでのWebUIの構築の実施を実施する。

- 業務目的
  - タスク管理の手法を提供し業務パフォーマンスの向上に寄与するためのSPA(Single Page Application)型TodoWebアプリケーションを構築することを目的としています。

### 1.2 背景
- よくある各コンポーネントのハンズオンに置いてはベーシックなCRUD機能を用いたアプリケーションの構築、ビルドデプロイのみの実施であり、それは実用性に乏しいため"実際に試してみたけど現場で活きない!すぐ忘れる!"ことがよくあった
また本来企業から求められるいくつものコンポーネントを組み合わせた複合的なアプリケーショの構築は情報も少なく、かつ相応の難易度と学習コストが求められるものであった。
しかし裏を返せば、コンポーネントを複合し、自身が使いたいと思えるようなアプリ制作をする過程で、自身のより深いWebアプリへの理解とエンジニアとしての技術力向上につながるのではと思いこの度のプロジェクトを起案した。
もちろん、このプロジェクトにて作成したアプリは実際に作者が使用していく予定である。

### 1.3 Todoアプリケーションの特徴
- 実施タスクと未実施タスクを一覧表示化
- 実施タスク数の登録枠を6枠までとする人間の集中力を考慮した実装とした
  ※ 参考(https://studyhacker.net/ivy-lee-method)
- タスクのタイトル、内容を自由に記入できる
- ワンボタンでタスクの実施状態を変更できる

### 1.4 アプリケーション動作サンプル
- メイン画面
![image](https://github.com/user-attachments/assets/287dbf03-4c6f-4e78-b07c-87ba990fb67d)

- タスク作成画面
![image](https://github.com/user-attachments/assets/3ac96e01-2c2b-480b-b26f-ce2a6c36b5bc)
![image](https://github.com/user-attachments/assets/5d13496d-4d93-4bb7-99b1-093a5cd117d4)
![image](https://github.com/user-attachments/assets/79036687-1cf7-4cd1-a806-cd336f1a8167)

- タスク詳細画面
![image](https://github.com/user-attachments/assets/e44c3dc4-7e44-4241-a94c-a7f490aaab00)

- タスク編集画面
![image](https://github.com/user-attachments/assets/a4c8b55f-c0e7-4cca-bd0e-4d90e06acf71)
![image](https://github.com/user-attachments/assets/599c4c3d-9aa5-423f-9ab4-f2b180ef7626)

- タスク削除確認画面
![image](https://github.com/user-attachments/assets/8fb17323-bd4f-4f31-a5aa-8fa75b75b6ac)
![image](https://github.com/user-attachments/assets/0e0c4f08-11d7-48de-82aa-a9200ff5326f)
![image](https://github.com/user-attachments/assets/d9924716-d8d7-4609-a3a6-bb67ce5326d4)

- 動作検証動画



https://github.com/user-attachments/assets/d06ab1a0-c318-4308-9881-40a2bc57369a





## 2. アーキテクチャ概要

### 2.1 全体構成図
(構成図を挿入)

### 2.2 主要コンポーネント一覧
- **Webサーバ**: Nginx 1.27.2
- **プログラミング言語**: Go 1.23
- **フロントエンド**: React 18.3.1
- **データベース**: MySQL 8.2.0
- **マイグレーションツール**: migrate/migrate 4.11.0
- **コンテナ**: Docker 24.0.7
- **コンテナオーケストレーション(開発環境)**: Docker Compose 2.23.3
- **コンテナオーケストレーション(クラスター)**: Kubernetes cluster 1.30.0
- **コンテナオーケストレーション(クライアント)**: Kubernetes Kubectl 1.30.2
- **コンテナオーケストレーション(kubernetesマニフェスト管理)**: kustomize 5.4.3
- **クラウドプロバイダー**: Azure (将来的に検討)

## 3. 詳細設計

### 3.1 アプリケーション層

#### 3.1.1 Webアプリケーション
- **概要**: Goを使用して開発されたタスク管理アプリケーションと、Reactを使用したフロントエンド。
- **主要機能**:
  - **タスク管理**: タスクの登録、編集、削除、完了、未完了の状態管理
  - **タスク表示**: 当日実施予定タスクと実施しないタスクを一覧表示
  - **ユーザー認証**: JWTを使用した認証機能 (予定)
  - **通知機能**: タスクの締切前に通知を送信 (予定)
- **バックエンド**:
  - **フレームワーク**: Goの標準ライブラリを使用
  - **データベース接続**: MySQLを使、Goの標準SQLドライバを利用
  - **APIエンドポイント**:
    - `GET /task`: タスクの一覧を取得
    - `POST /task/create`: 新しいタスクを作成
    - `GET /task/{id}`: 特定のタスクの詳細を取得
    - `PATCH /task/{id}/update`: タスクを更新
    - `DELETE /task/{id}/delete`: タスクを削除
    - `PATCH /task/{id}/change`: タスクの状態を変更
  - **エラーハンドリング**: カスタムミドルウェアを使用してエラーレスポンスを統一
- **フロントエンド**:
  - **フレームワーク**: Reactを使用
  - **状態管理**: 現在は`useState`を使用してアプリケーションの状態を管理、将来的にReduxに置き換える予定
  - **UIライブラリ**: Material-UIを使用してスタイリング(予定)
  - **ルーティング**: React Routerを使用してページ遷移を管理(予定)
  - **API通信**: Fetch APIを使用してバックエンドと通信

#### 3.1.2 APIゲートウェイ
- **概要**: Nginxを使用して、APIリクエストを各マイクロサービスにルーティング。
- **設定**:
  - **リバースプロキシ**: 各サービスへのリクエストを適切にルーティング
    - `/api/`へのリクエストはバックエンドサービスにプロキシされる
    - 必要なヘッダー情報をバックエンドに転送
  - **静的ファイルの提供**: Reactの静的ファイルを`/usr/share/nginx/html`から提供し、`try_files`ディレクティブを使用してSPAのルーティングをサポート
  - **ロードバランシング**: 複数のバックエンドインスタンス間で負荷を分散（将来的に設定予定）
  - **SSL/TLS**: セキュアな通信を確保するためのSSL設定（将来的に設定予定）
  - **キャッシュ**: 静的コンテンツのキャッシュ設定（将来的に設定予定）

### 3.2 データ層

#### 3.2.1 データベース
- **使用DB**: MySQL 8.2.0
- **データベース構造**: タスク管理用のテーブルを設計。
  - **テーブル名**: task
    - **カラム一覧**:
      - `task_id`: INT, プライマリキー, 自動インクリメント
      - `title`: VARCHAR(255), タスクのタイトル, 必須項目
      - `contents`: TEXT, タスクの詳細内容
      - `task_state`: ENUM('InComplete', 'Finished', 'NotDoTask'), タスクの状態, デフォルトは'NotDoTask'
      - `updated_at`: DATETIME, 更新日時, デフォルトはCURRENT_TIMESTAMP, 更新時に自動更新
      - `created_at`: DATETIME, 作成日時, デフォルトはCURRENT_TIMESTAMP
  - **インデックス**:
    - `PRIMARY KEY (task_id)`

### 3.3 インフラ層

#### 3.3.1 クラウドインフラ
- **クラウドプロバイダー**: Azure（予定）
- **主要サービス**: 
  - Azure Kubernetes Service (AKS) (予定)
  - Azure Database for MySQL（予定）
  - Azure DNS
  - Azure Application Gateway
  - Azure Front Door
  - Azure Virtual Network (VNet)
  - Azure Key Vault
  - Azure Blob Storage

#### 3.3.2 ネットワーク設計
- **VNet設計**: 未定。

### 3.4 CI/CDパイプライン

#### 3.4.1 GitHub Actions
- **概要**: コードのビルド、テスト、デプロイを自動化するGitHub Actionsのワークフローが設定済み。
- **ワークフロー(現在)**: `go-test.yml`, `kubernetes-test.yml`, `react-test.yml`。
- **今後の追加予定**:
  - **Terraform Apply**: インフラストラクチャの管理を自動化するためのTerraformCloudを用いたワークフローを追加予定。
    - **ワークフロー名**: `Terraform Apply`
    - **トリガー**: `master`ブランチへのプッシュ
    - **ジョブ**: 
      - **名前**: "Terraform Apply"
      - **実行環境**: `ubuntu-latest`
      - **ステップ**:
        - コードのチェックアウト
        - Terraform設定のアップロード
        - Apply Runの作成
        - Applyの実行
  - **Terraform Plan**: プルリクエスト時にTerraformのプランを実行し、結果をPRにコメントするワークフローを追加予定。
    - **ワークフロー名**: `Terraform Plan`
    - **トリガー**: プルリクエスト
    - **ジョブ**:
      - **名前**: "Terraform Plan"
      - **実行環境**: `ubuntu-latest`
      - **ステップ**:
        - コードのチェックアウト
        - Terraform設定のアップロード（スペキュレーティブモード）
        - Plan Runの作成
        - Planの出力を取得
        - PRにPlanの結果をコメント

### 3.5 ロギングとモニタリング
- **設定**: Azure Log AnalyticsやAzure Monitorを使用する予定（将来的に追加）。

## 4. セキュリティ設計

### 4.1 認証・認可
- **概要**: OAuth 2.0を使用したユーザ認証の実装（将来的に検討）。

### 4.2 データ保護
- **データ暗号化**: 暗号化に関する設定は未定。

## 5. デプロイメントガイド

### 5.1 開発環境セットアップ
- **必要ツール**: Docker、Docker Compose、kubectlを使用。
- **開発環境**:
  - **MyPC**: 
    - OS: 14.6.1（23G93）
    - アーキテクチャ: ARM64
    - カーネルバージョン: Darwin Kernel Version 23.6.0
  - **Docker Desktop**: 
    - バージョン: 4.26.1
  - **Kind**: 
    - バージョン: kind v0.23.0
    - Goバージョン: go1.22.3
    - プラットフォーム: darwin/arm64

### 5.2 本番環境デプロイ
- **CI/CDパイプライン**: GitHub Actionsによる自動化デプロイを設定予定。

## 6. テスト計画

### 6.1 ユニットテスト
- **概要**: GoおよびReactのコンポーネント対するユニットテスト、 Kubernetesの構文チェックが含まれています。

### 6.2 インテグレーションテスト
- **概要**: APIを含む各サービス間のテストを予定。

