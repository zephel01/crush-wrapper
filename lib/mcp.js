// MCP設定テンプレート（Model Context Protocol）

const { addBackOption } = require('./models');

const mcpTemplates = {
  filesystem: {
    key: 'filesystem',
    name: 'Filesystem MCP',
    description: 'ファイルシステムへのアクセスを許可するMCPサーバー',
    category: 'filesystem',
    questions: [
      {
        type: 'input',
        name: 'allowedPath',
        message: '許可するファイルパスを入力してください（例: /path/to/project）:',
        default: process.cwd()
      },
      {
        type: 'number',
        name: 'timeout',
        message: 'タイムアウト（秒）を入力してください（デフォルト: 120）:',
        default: 120
      },
      {
        type: 'confirm',
        name: 'disabled',
        message: 'このMCPを無効にしますか？',
        default: false
      }
    ],
    generate: (answers) => {
      return {
        type: 'stdio',
        command: 'npx',
        args: ['-y', '@modelcontextprotocol/server-filesystem', answers.allowedPath],
        timeout: answers.timeout,
        disabled: answers.disabled
      };
    }
  },

  github: {
    key: 'github',
    name: 'GitHub MCP',
    description: 'GitHub APIへのアクセスを提供するMCPサーバー',
    category: 'api',
    questions: [
      {
        type: 'input',
        name: 'url',
        message: 'GitHub MCP URLを入力してください（デフォルト: https://api.githubcopilot.com/mcp/）:',
        default: 'https://api.githubcopilot.com/mcp/'
      },
      {
        type: 'input',
        name: 'token',
        message: 'GitHub Personal Access Tokenを入力してください（環境変数を使う場合は $GH_PAT と入力）:',
        default: '$GH_PAT'
      },
      {
        type: 'number',
        name: 'timeout',
        message: 'タイムアウト（秒）を入力してください（デフォルト: 120）:',
        default: 120
      },
      {
        type: 'confirm',
        name: 'disabled',
        message: 'このMCPを無効にしますか？',
        default: false
      }
    ],
    generate: (answers) => {
      return {
        type: 'http',
        url: answers.url,
        timeout: answers.timeout,
        disabled: answers.disabled,
        headers: {
          'Authorization': `Bearer ${answers.token}`
        }
      };
    }
  },

  custom_stdio: {
    key: 'custom_stdio',
    name: 'カスタム stdio MCP',
    description: 'カスタムのstdio MCPサーバーを追加',
    category: 'custom',
    questions: [
      {
        type: 'input',
        name: 'command',
        message: 'コマンドを入力してください（例: node, python3）:',
        default: 'node'
      },
      {
        type: 'input',
        name: 'args',
        message: '引数を入力してください（例: /path/to/server.js）:',
        default: ''
      },
      {
        type: 'input',
        name: 'envVars',
        message: '環境変数を入力してください（例: NODE_ENV=production）:',
        default: ''
      },
      {
        type: 'number',
        name: 'timeout',
        message: 'タイムアウト（秒）を入力してください（デフォルト: 120）:',
        default: 120
      },
      {
        type: 'confirm',
        name: 'disabled',
        message: 'このMCPを無効にしますか？',
        default: false
      }
    ],
    generate: (answers) => {
      const config = {
        type: 'stdio',
        command: answers.command,
        timeout: answers.timeout,
        disabled: answers.disabled
      };

      if (answers.args) {
        config.args = answers.args.split(' ').filter(arg => arg.trim() !== '');
      }

      if (answers.envVars) {
        config.env = {};
        answers.envVars.split(' ').forEach(envVar => {
          const [key, value] = envVar.split('=');
          if (key && value) {
            config.env[key] = value;
          }
        });
      }

      return config;
    }
  },

  custom_http: {
    key: 'custom_http',
    name: 'カスタム HTTP MCP',
    description: 'カスタムのHTTP MCPサーバーを追加',
    category: 'custom',
    questions: [
      {
        type: 'input',
        name: 'url',
        message: 'URLを入力してください（例: https://example.com/mcp）:',
        default: ''
      },
      {
        type: 'input',
        name: 'headers',
        message: 'ヘッダーを入力してください（例: Authorization: Bearer token）:',
        default: ''
      },
      {
        type: 'number',
        name: 'timeout',
        message: 'タイムアウト（秒）を入力してください（デフォルト: 120）:',
        default: 120
      },
      {
        type: 'confirm',
        name: 'disabled',
        message: 'このMCPを無効にしますか？',
        default: false
      }
    ],
    generate: (answers) => {
      const config = {
        type: 'http',
        url: answers.url,
        timeout: answers.timeout,
        disabled: answers.disabled
      };

      if (answers.headers) {
        config.headers = {};
        answers.headers.split(',').forEach(header => {
          const [key, value] = header.split(':');
          if (key && value) {
            config.headers[key.trim()] = value.trim();
          }
        });
      }

      return config;
    }
  },

  custom_sse: {
    key: 'custom_sse',
    name: 'カスタム SSE MCP',
    description: 'カスタムのServer-Sent Events MCPサーバーを追加',
    category: 'custom',
    questions: [
      {
        type: 'input',
        name: 'url',
        message: 'URLを入力してください（例: https://example.com/mcp/sse）:',
        default: ''
      },
      {
        type: 'input',
        name: 'headers',
        message: 'ヘッダーを入力してください（例: Authorization: Bearer token）:',
        default: ''
      },
      {
        type: 'number',
        name: 'timeout',
        message: 'タイムアウト（秒）を入力してください（デフォルト: 120）:',
        default: 120
      },
      {
        type: 'confirm',
        name: 'disabled',
        message: 'このMCPを無効にしますか？',
        default: false
      }
    ],
    generate: (answers) => {
      const config = {
        type: 'sse',
        url: answers.url,
        timeout: answers.timeout,
        disabled: answers.disabled
      };

      if (answers.headers) {
        config.headers = {};
        answers.headers.split(',').forEach(header => {
          const [key, value] = header.split(':');
          if (key && value) {
            config.headers[key.trim()] = value.trim();
          }
        });
      }

      return config;
    }
  }
};

// カテゴリ別にグループ化したMCPを返すヘルパー関数
function getMCPsByCategory(category) {
  return Object.entries(mcpTemplates)
    .filter(([_, tpl]) => tpl.category === category)
    .map(([key, tpl]) => ({ key, name: tpl.name, description: tpl.description }));
}

// すべてのカテゴリを取得
function getMCPCategories() {
  return [...new Set(Object.values(mcpTemplates).map(tpl => tpl.category))];
}

// すべてのMCPを取得
function getAllMCPs() {
  return Object.entries(mcpTemplates).map(([key, tpl]) => ({
    key,
    name: tpl.name,
    description: tpl.description,
    category: tpl.category
  }));
}

module.exports = {
  mcpTemplates,
  getMCPsByCategory,
  getMCPCategories,
  getAllMCPs
};
