#!/usr/bin/env node

const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const { providerTemplates, getProvidersByCategory, getCategories } = require('./providers');
const lspTemplates = require('./lsp');
const mcpTemplates = require('./mcp');
const config = require('./config');
const { getModelChoices, addBackOption } = require('./models');

// コマンドラインオプションを解析
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {
    local: false,  // カレントディレクトリに保存
    global: false  // グローバル設定に保存
  };

  args.forEach(arg => {
    switch(arg) {
      case '--local':
      case '-l':
        options.local = true;
        break;
      case '--global':
      case '-g':
        options.global = true;
        break;
    }
  });

  return options;
}

// ヘルプメッセージを表示
function showHelp() {
  console.log(`
🚀 Crush 設定作成ツール

使い方:
  crush-wrapper              グローバル設定に保存 (~/.config/crush/crush.json)
  crush-wrapper --local      カレントディレクトリに保存 (./crush.json)
  crush-wrapper --global     グローバル設定に保存 (~/.config/crush/crush.json)

オプション:
  -l, --local    カレントディレクトリに保存
  -g, --global   グローバル設定に保存（デフォルト）
  -h, --help     このヘルプを表示

例:
  # カレントディレクトリに設定を作成
  crush-wrapper --local

  # グローバル設定を作成（デフォルト）
  crush-wrapper
`);
}

// 既存設定から利用可能なモデルを抽出
function getExistingModels(currentConfig) {
  const models = [];
  if (currentConfig.providers) {
    Object.entries(currentConfig.providers).forEach(([providerKey, provider]) => {
      if (provider.models && Array.isArray(provider.models)) {
        provider.models.forEach(model => {
          models.push(model.id);
        });
      }
    });
  }
  return models;
}

// メイン処理
async function main() {
  // ヘルプオプションのチェック
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    process.exit(0);
  }

  console.log('\n🚀 Crush 設定作成ツールへようこそ！\n');

  // オプションを解析
  const options = parseArgs();

  // 設定ファイルのパスを決定
  let configPath;
  if (options.local) {
    // カレントディレクトリに保存
    configPath = config.getLocalConfigPath();
    console.log('💾 設定ファイル: カレントディレクトリ (./crush.json)\n');
  } else {
    // グローバル設定に保存
    config.ensureConfigDir();
    configPath = config.getConfigPath();
    console.log('💾 設定ファイル: グローバル設定 (~/.config/crush/crush.json)\n');
  }

  console.log(`設定ファイルパス: ${configPath}\n`);

  // 既存の設定を読み込むかどうか
  let currentConfig = config.loadConfig(configPath);

  const { mode } = await inquirer.prompt([
    {
      type: 'list',
      name: 'mode',
      message: 'どのモードで操作しますか？',
      choices: [
        { name: '新規作成（設定をゼロから作成）', value: 'new' },
        { name: '編集（既存の設定に追加・変更）', value: 'edit' },
        { name: '表示（現在の設定を確認）', value: 'view' },
        { name: '終了', value: 'exit' }
      ]
    }
  ]);

  if (mode === 'exit') {
    console.log('さようなら！');
    process.exit(0);
  }

  if (mode === 'view') {
    config.displayConfig(currentConfig);
    process.exit(0);
  }

  if (mode === 'new') {
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: '新規作成すると既存の設定は上書きされます。よろしいですか？',
        default: false
      }
    ]);

    if (!confirm) {
      console.log('キャンセルしました。');
      process.exit(0);
    }

    config.backupConfig(configPath);
    currentConfig = config.DEFAULT_CONFIG;
  }

  // メインループ
  while (true) {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: '何をしますか？',
        choices: [
          { name: 'プロバイダーを追加', value: 'add_provider' },
          { name: 'LSPを追加', value: 'add_lsp' },
          { name: 'MCPを追加', value: 'add_mcp' },
          { name: 'オプションを設定', value: 'set_options' },
          { name: '現在の設定を表示', value: 'view' },
          { name: '保存して終了', value: 'save' },
          { name: '保存せず終了', value: 'exit' }
        ]
      }
    ]);

    if (action === 'exit') {
      console.log('キャンセルしました。');
      process.exit(0);
    }

    if (action === 'view') {
      config.displayConfig(currentConfig);
      continue;
    }

    if (action === 'set_options') {
      const { debug, disableMetrics, disableAutoUpdate } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'debug',
          message: 'デバッグモードを有効にしますか？',
          default: currentConfig.options.debug || false
        },
        {
          type: 'confirm',
          name: 'disableMetrics',
          message: 'メトリクス収集を無効にしますか？',
          default: currentConfig.options.disable_metrics || false
        },
        {
          type: 'confirm',
          name: 'disableAutoUpdate',
          message: 'プロバイダーの自動更新を無効にしますか？',
          default: currentConfig.options.disable_provider_auto_update || false
        }
      ]);

      currentConfig.options.debug = debug;
      currentConfig.options.disable_metrics = disableMetrics;
      currentConfig.options.disable_provider_auto_update = disableAutoUpdate;
      console.log('✓ オプションを設定しました\n');
      continue;
    }

    if (action === 'add_provider') {
      // カテゴリ名のマッピング
      const categoryNames = {
        'local': 'ローカル / オンプレミス',
        'hosted': '主要ホスト型API（Anthropic, OpenAIなど）',
        'cloud': 'クラウドプラットフォーム（AWS Bedrock, Azureなど）',
        'router': 'ルーター / ゲートウェイ（OpenRouterなど）'
      };

      const categoryChoices = getCategories().map(cat => ({
        name: categoryNames[cat] || cat,
        value: cat
      }));

      const { category } = await inquirer.prompt([
        {
          type: 'list',
          name: 'category',
          message: 'プロバイダーのカテゴリを選択してください:',
          choices: [...categoryChoices, { name: '戻る', value: 'back' }]
        }
      ]);

      if (category === 'back') continue;

      const providers = getProvidersByCategory(category);
      const providerChoices = providers.map(p => ({
        name: p.name,
        value: p.key
      }));

      const { providerType } = await inquirer.prompt([
        {
          type: 'list',
          name: 'providerType',
          message: '追加するプロバイダーを選択してください:',
          choices: [...providerChoices, { name: '戻る', value: 'back' }]
        }
      ]);

      if (providerType === 'back') continue;

      const tpl = providerTemplates[providerType];
      // questions を関数として呼び出し、現在の設定を渡す
      let questions = typeof tpl.questions === 'function' ? tpl.questions(currentConfig) : tpl.questions;
      // 「戻る」オプションを追加
      questions = addBackOption(questions);
      const answers = await inquirer.prompt(questions);

      // 「戻る」が選択された場合はメインメニューに戻る
      if (Object.values(answers).includes('__BACK__')) {
        continue;
      }

      const providerConfig = tpl.generate(answers);
      currentConfig.providers[tpl.key] = providerConfig;
      console.log(`✓ プロバイダー "${tpl.name}" を追加しました\n`);
    }

    if (action === 'add_lsp') {
      const allLSPs = lspTemplates.getAllLSPs();
      const lspChoices = allLSPs.map(lsp => ({
        name: `${lsp.name}: ${lsp.description}`,
        value: lsp.key
      }));

      const { lspType } = await inquirer.prompt([
        {
          type: 'list',
          name: 'lspType',
          message: '追加するLSPを選択してください:',
          choices: [...lspChoices, { name: '戻る', value: 'back' }]
        }
      ]);

      if (lspType === 'back') continue;

      const tpl = lspTemplates.lspTemplates[lspType];
      const questions = tpl.questions;
      const answers = await inquirer.prompt(questions);

      const lspConfig = tpl.generate(answers);
      currentConfig.lsp[lspType] = lspConfig;
      console.log(`✓ LSP "${tpl.name}" を追加しました\n`);
    }

    if (action === 'add_mcp') {
      const allMCPs = mcpTemplates.getAllMCPs();
      const mcpChoices = allMCPs.map(mcp => ({
        name: `${mcp.name}: ${mcp.description}`,
        value: mcp.key
      }));

      const { mcpType } = await inquirer.prompt([
        {
          type: 'list',
          name: 'mcpType',
          message: '追加するMCPを選択してください:',
          choices: [...mcpChoices, { name: '戻る', value: 'back' }]
        }
      ]);

      if (mcpType === 'back') continue;

      const tpl = mcpTemplates.mcpTemplates[mcpType];
      let questions = tpl.questions;
      questions = addBackOption(questions);
      const answers = await inquirer.prompt(questions);

      // 「戻る」が選択された場合はメインメニューに戻る
      if (Object.values(answers).includes('__BACK__')) {
        continue;
      }

      const mcpConfig = tpl.generate(answers);
      currentConfig.mcp[mcpType] = mcpConfig;
      console.log(`✓ MCP "${tpl.name}" を追加しました\n`);
    }

    if (action === 'save') {
      // バリデーション
      const errors = config.validateConfig(currentConfig);
      if (errors.length > 0) {
        console.log('\n⚠ 設定に問題があります:');
        errors.forEach(err => console.log(`  - ${err}`));
        const { forceSave } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'forceSave',
            message: '問題がありますが保存しますか？',
            default: false
          }
        ]);
        if (!forceSave) continue;
      }

      config.displayConfig(currentConfig);
      const { confirmSave } = await inquirer.prompt([
        {
          type: 'confirm',
          name: 'confirmSave',
          message: 'この内容で保存しますか？',
          default: true
        }
      ]);

      if (confirmSave) {
        if (mode === 'new' && fs.existsSync(configPath)) {
          config.backupConfig(configPath);
        }
        config.saveConfig(configPath, currentConfig);
        console.log('\n✨ 設定の作成が完了しました！\n');
        console.log('Crushを起動するには以下を実行してください:');
        console.log('  crush\n');
        process.exit(0);
      }
    }
  }
}

// エラーハンドリング
main().catch(error => {
  console.error('エラーが発生しました:', error.message);
  process.exit(1);
});
