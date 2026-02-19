# Crush 設定作成ツール

Crush の設定ファイル `crush.json` を簡単に作成・管理するための対話型ツールです。

## セットアップ

### 1. Node.js のインストール

まだインストールしていない場合は、以下から Node.js をダウンロードしてインストールしてください。

- [Node.js 公式サイト](https://nodejs.org/) (LTS版推奨)

### 2. ツールのインストール

このディレクトリで以下を実行してください。

```bash
npm install -g .
```

または、

```bash
npm link
```

### 3. 動作確認

```bash
crush-wrapper
```

以下が表示されれば成功です。

```
🚀 Crush 設定作成ツールへようこそ！
```

## 使い方

### 基本的な流れ

1. ツールを起動
```bash
crush-wrapper
```

2. モードを選択
   - **新規作成** - 設定をゼロから作成
   - **編集** - 既存の設定に追加・変更
   - **表示** - 現在の設定を確認

3. 設定を追加
   - プロバイダー（LLM接続先）を追加
   - LSP（Language Server Protocol）を追加
   - MCP（Model Context Protocol）を追加
   - オプションを設定

4. 保存して終了

### 設定ファイルの保存場所

デフォルトでは、コマンドを実行したディレクトリに `crush.json` が作成されます。

## サンプル設定フロー

### 例1: ローカルLLMを設定する場合

```
🚀 Crush 設定作成ツールへようこそ！

? どのモードで操作しますか？
  新規作成（設定をゼロから作成）
❯ 編集（既存の設定に追加・変更）
  表示（現在の設定を確認）
  終了

? 新規作成すると既存の設定は上書きされます。よろしいですか？ Yes

✓ バックアップを作成しました: crush.json.bak

? 何をしますか？
❯ プロバイダーを追加
  LSPを追加
  MCPを追加
  オプションを設定
  現在の設定を表示
  保存して終了
  保存せず終了

? プロバイダーのカテゴリを選択してください:
  ローカル / オンプレミス
❯ 主要ホスト型API（Anthropic, OpenAIなど）
  クラウドプラットフォーム（AWS Bedrock, Azureなど）
  ルーター / ゲートウェイ（OpenRouterなど）
  戻る

? 追加するプロバイダーを選択してください:
  ローカル llama-server (GLM)
❯ LM Studio
  Ollama
  戻る

? LM Studioのアドレスを入力してください（例: http://localhost:1234/v1）: http://localhost:1234/v1

? モデル名を選択してください:
❯ GLM-4.7-Flash-Uncen-Hrt-NEO-CODE-MAX-imat-D_AU-Q4_K_M
  Qwen3-Coder-Next-Q3_K_M
  llama-3.3-70b
  ━━━━━━━━━
  カスタム入力
  戻る

✓ プロバイダー "LM Studio" を追加しました

... (LSPも同様に追加) ...

? この内容で保存しますか？ Yes

✓ 設定の保存に成功しました: crush.json

✨ 設定の作成が完了しました！

Crushを起動するには以下を実行してください:
  crush
```

## 対応しているプロバイダー

### ローカル / オンプレミス

| プロバイダー | 説明 |
|--------------|------|
| ローカル llama-server (GLM) | 自分のPCで動くGLM系LLM |
| ローカル llama-server (Qwen) | 自分のPCで動くQwen系LLM |
| LM Studio | LM Studioで動作するLLM |
| Ollama | Ollamaで動作するLLM |

### 主要ホスト型API

| プロバイダー | 説明 |
|--------------|------|
| Anthropic (Claude) | Claudeシリーズ |
| OpenAI | GPTシリーズ |
| Google Gemini | Geminiシリーズ |
| Groq | 高速推論サービス |
| DeepSeek | DeepSeekモデル |

### クラウドプラットフォーム

| プロバイダー | 説明 |
|--------------|------|
| Amazon Bedrock | AWSのマネージドLLM |
| Azure OpenAI | Microsoft Azure経由 |

### ルーター / ゲートウェイ

| プロバイダー | 説明 |
|--------------|------|
| OpenRouter | 複数プロバイダーを一括管理 |

## LSP（Language Server Protocol）

| LSP | 説明 |
|-----|------|
| Go (gopls) | Go言語のLSP |
| TypeScript | TypeScript/JavaScriptのLSP |
| Python | PythonのLSP |
| Rust | RustのLSP |
| Lua | LuaのLSP |
| YAML | YAMLのLSP |
| JSON | JSONのLSP |
| Markdown | MarkdownのLSP |
| Dockerfile | DockerfileのLSP |
| HTML | HTMLのLSP |
| CSS | CSSのLSP |
| Bash | BashのLSP |

## MCP（Model Context Protocol）

| MCP | 説明 |
|-----|------|
| Filesystem MCP | ファイルシステムへのアクセス |
| GitHub MCP | GitHub APIへのアクセス |
| カスタム stdio MCP | カスタムstdioサーバー |
| カスタム HTTP MCP | カスタムHTTPサーバー |
| カスタム SSE MCP | カスタムSSEサーバー |

## 出力される crush.json の例

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
          "id": "glm47",
          "name": "GLM-4.7-Flash-Uncen-Hrt-NEO-CODE-MAX-imat-D_AU-Q4_K_M",
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
    }
  }
}
```

## よくある質問

### Q: 既に crush.json がある場合？
A: 新規作成モードを選ぶと、自動的にバックアップ（`.bak`）が作成されます。

### Q: 環境変数を使いたい
A: API Keyなどを入力する際、`$OPENAI_API_KEY` のように入力すると環境変数が参照されます。

### Q: 設定をリセットしたい
A: crush.json を削除してから再度 `crush-wrapper` を実行してください。

## トラブルシューティング

### 「エラーが発生しました」と出る
- Node.js が正しくインストールされているか確認してください
- `node --version` でバージョンが表示されることを確認してください

### 設定が保存されない
- ディレクトリの書き込み権限を確認してください
- ディスク容量に余裕があるか確認してください

## 製作者

- 作成: Crush 設定作成ツール

## ライセンス

MIT
