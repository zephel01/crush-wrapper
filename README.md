# Crush 設定作成ツール

Crush の設定ファイル `crush.json` を簡単に作成・管理するための対話型CLIツールです。

## 特徴

- 🔧 対話的な設定作成
- 📋 モデル名をドロップダウンから選択可能
- 💾 自動バックアップ（日時付き）
- 🤖 複数のプロバイダーに対応
- ✨ 既存設定からモデル候補を動的に抽出
- ↩️ 各設定画面に「戻る」オプションを追加
- 🔌 LSP（Language Server Protocol）設定
- 🔌 MCP（Model Context Protocol）設定

## 設定ファイルの配置場所

コマンドのオプションに応じて設定ファイルの保存場所が変わります。

### カレントディレクトリ（`--local` オプション）

```bash
# 実行するディレクトリ
cd /path/to/your/project

# カレントディレクトリに設定を作成
crush-wrapper --local

# 設定ファイルの保存先
./crush.json
```

### グローバル設定（デフォルト）

```bash
# グローバル設定を作成
crush-wrapper

# 設定ファイルの保存先
~/.config/crush/crush.json
```

## インストール

依存関係をインストールします：

```bash
npm install
```

## 使い方

### インストール

グローバルインストール（推奨）：

```bash
npm link
```

または

```bash
npm install -g .
```

### コマンド

```bash
# グローバル設定に保存（デフォルト）: ~/.config/crush/crush.json
crush-wrapper

# カレントディレクトリに保存: ./crush.json
crush-wrapper --local
# または
crush-wrapper -l

# ヘルプを表示
crush-wrapper --help
# または
crush-wrapper -h
```

### オプション

| オプション | 短縮形 | 説明 |
|----------|--------|------|
| `--local` | `-l` | カレントディレクトリに設定を保存 |
| `--global` | `-g` | グローバル設定に保存 |
| `--help` | `-h` | ヘルプを表示 |

## 作業フロー

### 1. 新規作成

新しい設定をゼロから作成する場合：

```bash
# カレントディレクトリに設定を作成
crush-wrapper --local

# グローバル設定を作成
crush-wrapper
```

1. ツールを起動
2. `新規作成（設定をゼロから作成）` を選択
3. 既存の設定がある場合、バックアップを作成するか確認されます
4. プロバイダー、LSP、MCP を追加
5. `保存して終了` を選択

#### 自動バックアップ

新規作成時、既存の設定ファイルがある場合は自動的にバックアップが作成されます。

```bash
# カレントディレクトリに保存の場合
crush.json.2026-02-06_12-34-56.bak

# グローバル設定に保存の場合
~/.config/crush/crush.json.2026-02-06_12-34-56.bak
```

### 2. 編集

既存の設定に追加・変更する場合：

1. ツールを起動
2. `編集（既存の設定に追加・変更）` を選択
3. メニューから操作を選択：
   - `プロバイダーを追加` - 新しいLLMプロバイダーを追加
   - `LSPを追加` - 新しいLSP設定を追加
   - `MCPを追加` - 新しいMCP設定を追加
   - `オプションを設定` - デバッグ設定などを変更
   - `現在の設定を表示` - 設定内容を確認
   - `保存して終了` - 変更を保存して終了

### 3. 表示

現在の設定を確認する場合：

1. ツールを起動
2. `表示（現在の設定を確認）` を選択
3. 設定内容が表示されます

## 機能

- **新規作成** - 質問に答えてcrush.jsonをゼロから作成
- **編集** - 既存の設定にprovider、LSP、MCPを追加・変更
- **バックアップ** - 日時付きで設定ファイルのバックアップを作成
- **バリデーション** - 必須項目を自動チェック
- **カテゴリ別プロバイダー選択** - 目的別にプロバイダーを選べる
- **ドロップダウンでモデル選択** - 手動入力ではなく候補からモデルを選択可能
- **カスタム入力** - 候補にないモデルも手動入力可能
- **戻るオプション** - どの設定画面からもメインメニューに戻れる

## 対応しているプロバイダー

### ローカル / オンプレミス
- **ローカル llama-server (GLM)** - LM Studio / llama-server 経由で GLM を使用
- **ローカル llama-server (Qwen)** - LM Studio / llama-server 経由で Qwen を使用
- **LM Studio** - LM Studio と連携
- **Ollama** - Ollama と連携

### 主要ホスト型API
- **Anthropic (Claude)** - Claude API
- **OpenAI** - GPT モデル
- **Google Gemini** - Gemini API
- **Groq** - 高速推論
- **DeepSeek** - DeepSeek API

### クラウドプラットフォーム統合型
- **Amazon Bedrock** - AWS Bedrock
- **Azure OpenAI** - Azure OpenAI

### ルーター / ゲートウェイ型
- **OpenRouter** - OpenRouter 経由で各種モデルを使用

## LSP（Language Server Protocol）

対応しているLSP:
- **Go (gopls)** - Go言語
- **TypeScript (typescript-language-server)** - TypeScript/JavaScript
- **Python (python-language-server)** - Python
- **Rust (rust-analyzer)** - Rust
- **Lua (lua-language-server)** - Lua
- **YAML (yaml-language-server)** - YAML
- **JSON (vscode-json-language-server)** - JSON
- **Markdown (marksman)** - Markdown
- **Dockerfile (dockerfile-language-server)** - Dockerfile
- **HTML (html-language-server)** - HTML
- **CSS (css-language-server)** - CSS
- **Bash (bash-language-server)** - Bash

## MCP（Model Context Protocol）

対応しているMCP:
- **Filesystem MCP** - ファイルシステムへのアクセス
- **GitHub MCP** - GitHub APIへのアクセス
- **カスタム stdio MCP** - カスタムstdioサーバー
- **カスタム HTTP MCP** - カスタムHTTPサーバー
- **カスタム SSE MCP** - カスタムSSEサーバー

## 推奨設定例

ローカル環境での推奨設定:

```json
{
  "$schema": "https://charm.land/crush.json",
  "providers": {
    "lmstudio": {
      "type": "openai-compat",
      "name": "LM Studio",
      "base_url": "http://localhost:1234/v1/",
      "models": [
        {
          "id": "lmstudio",
          "name": "llama-3.3-70b",
          "context_window": 128000,
          "default_max_tokens": 8000
        }
      ]
    }
  },
  "lsp": {
    "go": {
      "command": "gopls",
      "enabled": true
    },
    "typescript": {
      "command": "typescript-language-server",
      "args": ["--stdio"],
      "enabled": true
    }
  }
}
```

## Crush の起動

設定作成後、以下のコマンドで Crush を起動できます：

```bash
crush
```

## トラブルシューティング

### バックアップファイルの確認

バックアップは以下の形式で保存されます：

```bash
# カレントディレクトリに保存の場合
crush.json.YYYY-MM-DD_HH-MM-SS.bak

# グローバル設定に保存の場合
~/.config/crush/crush.json.YYYY-MM-DD_HH-MM-SS.bak
```

例：

```bash
# カレントディレクトリ
crush.json.2026-02-06_12-34-56.bak

# グローバル設定
~/.config/crush/crush.json.2026-02-06_12-34-56.bak
```

バックアップから復元する場合：

```bash
# カレントディレクトリ
cp crush.json.2026-02-06_12-34-56.bak crush.json

# グローバル設定
cp ~/.config/crush/crush.json.2026-02-06_12-34-56.bak ~/.config/crush/crush.json
```

### ローカルLLMとの接続確認

LM Studio / Ollama との接続を確認する：

```bash
# LM Studio
curl http://localhost:1234/v1/models

# Ollama
curl http://localhost:11434/v1/models
```

## 設定例

サンプル設定ファイルは `examples/crush.json.example` にあります。

```bash
# サンプルをコピーして編集（グローバル設定）
cp examples/crush.json.example ~/.config/crush/crush.json

# サンプルをコピーして編集（カレントディレクトリ）
cp examples/crush.json.example ./crush.json

# エディタで編集
nano ~/.config/crush/crush.json
# または
nano ./crush.json
```

または、このツールを使用して対話的に作成することもできます：

```bash
crush-wrapper --local
```

## セキュリティ注意点

- APIキーを誤って共有しないように注意してください
- `.bak` ファイルにもAPIキーが含まれるため、適切に管理してください
- グローバル設定にする場合、`.config/crush/` ディレクトリの権限を適切に設定してください
- サンプル設定ファイル（`examples/crush.json.example`）は個人情報を含まない形式になっています

## 詳細

より詳細な使用方法は [USAGE.md](./USAGE.md) を参照してください。

## ライセンス

MIT
