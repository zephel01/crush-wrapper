const fs = require('fs');
const path = require('path');
const os = require('os');

const DEFAULT_CONFIG = {
  "$schema": "https://charm.land/crush.json",
  "providers": {},
  "lsp": {},
  "mcp": {},
  "options": {
    "debug": false,
    "debug_lsp": false,
    "disable_provider_auto_update": false,
    "disable_metrics": false,
    "disabled_tools": [],
    "allowed_tools": [],
    "skills_paths": [
      "~/.config/crush/skills"
    ],
    "initialize_as": "AGENTS.md",
    "attribution": {
      "trailer_style": "assisted-by",
      "generated_with": true
    }
  },
  "permissions": {
    "allowed_tools": []
  }
};

// Crushの設定ファイルは ~/.config/crush/crush.json に固定
function getConfigPath() {
  const configDir = path.join(os.homedir(), '.config', 'crush');
  return path.join(configDir, 'crush.json');
}

// カレントディレクトリの設定ファイルパスを取得
function getLocalConfigPath() {
  return path.join(process.cwd(), 'crush.json');
}

// 設定ディレクトリを作成（存在しない場合）
function ensureConfigDir() {
  const configPath = getConfigPath();
  const configDir = path.dirname(configPath);

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  return configDir;
}

function backupConfig(configPath) {
  if (fs.existsSync(configPath)) {
    const now = new Date();
    const timestamp = now.toISOString()
      .replace(/[:.]/g, '-')
      .replace('T', '_')
      .split('.')[0];
    const backupPath = `${configPath}.${timestamp}.bak`;
    const content = fs.readFileSync(configPath, 'utf8');
    fs.writeFileSync(backupPath, content, 'utf8');
    console.log(`✓ バックアップを作成しました: ${backupPath}`);
    return backupPath;
  }
  return null;
}

function loadConfig(configPath) {
  if (fs.existsSync(configPath)) {
    try {
      const content = fs.readFileSync(configPath, 'utf8');
      // JSONファイル内のコメントを除去してパース（URL内の//を保護）
      let cleanContent = content;

      // JSON文字列内の // を一時的に保護
      let protected = cleanContent.replace(/"[^"]*"|'[^']*'/g, (match) => {
        return match.replace(/\/\//g, '___DOUBLE_SLASH_PROTECTED___');
      });

      // コメントを削除
      protected = protected.replace(/\/\/.*$/gm, '');

      // 保護された // を復元
      cleanContent = protected.replace(/___DOUBLE_SLASH_PROTECTED___/g, '//');

      return JSON.parse(cleanContent);
    } catch (error) {
      console.log(`⚠ 既存の設定ファイルの読み込みに失敗しました: ${error.message}`);
      console.log(`⚠ デフォルト設定を使用します。新しく設定を作成してください。`);
      return DEFAULT_CONFIG;
    }
  }
  return DEFAULT_CONFIG;
}

function saveConfig(configPath, config) {
  const content = JSON.stringify(config, null, 2) + '\n';
  fs.writeFileSync(configPath, content, 'utf8');
  console.log(`✓ 設定を保存しました: ${configPath}`);
}

function validateConfig(config) {
  const errors = [];

  if (!config.$schema) {
    errors.push('$schema が設定されていません');
  }

  if (!config.providers || Object.keys(config.providers).length === 0) {
    errors.push('プロバイダー（providers）が設定されていません');
  }

  return errors;
}

function displayConfig(config) {
  console.log('\n=== 現在の設定 ===');
  console.log(`$schema: ${config.$schema || '未設定'}`);
  console.log(`\nプロバイダー (${Object.keys(config.providers || {}).length}個):`);
  Object.entries(config.providers || {}).forEach(([key, provider]) => {
    console.log(`  - ${key}: ${provider.name || '名称未設定'} (${provider.type || 'タイプ未設定'})`);
    if (provider.models && Array.isArray(provider.models)) {
      provider.models.forEach(model => {
        console.log(`    - ${model.id}: ${model.name || 'モデル名未設定'}`);
      });
    }
  });
  console.log(`\nLSP (${Object.keys(config.lsp || {}).length}個):`);
  Object.entries(config.lsp || {}).forEach(([key, lsp]) => {
    console.log(`  - ${key}: ${lsp.command || 'コマンド未設定'} ${lsp.args ? lsp.args.join(' ') : ''}`);
  });
  console.log(`\nMCP (${Object.keys(config.mcp || {}).length}個):`);
  Object.entries(config.mcp || {}).forEach(([key, mcp]) => {
    console.log(`  - ${key}: ${mcp.type || 'タイプ未設定'} (${mcp.command || mcp.url || '未設定'})`);
  });
  console.log('===================\n');
}

module.exports = {
  DEFAULT_CONFIG,
  getConfigPath,
  getLocalConfigPath,
  ensureConfigDir,
  backupConfig,
  loadConfig,
  saveConfig,
  validateConfig,
  displayConfig
};
