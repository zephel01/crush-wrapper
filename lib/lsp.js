// LSP設定テンプレート（Language Server Protocol）

const lspTemplates = {
  go: {
    key: 'go',
    name: 'Go (gopls)',
    description: 'Go言語のLSP',
    questions: [
      {
        type: 'confirm',
        name: 'enabled',
        message: 'Go LSPを有効にしますか？',
        default: true
      }
    ],
    generate: (answers) => {
      return {
        command: 'gopls',
        enabled: answers.enabled
      };
    }
  },

  typescript: {
    key: 'typescript',
    name: 'TypeScript (typescript-language-server)',
    description: 'TypeScript/JavaScriptのLSP',
    questions: [
      {
        type: 'confirm',
        name: 'enabled',
        message: 'TypeScript LSPを有効にしますか？',
        default: true
      }
    ],
    generate: (answers) => {
      return {
        command: 'typescript-language-server',
        args: ['--stdio'],
        enabled: answers.enabled
      };
    }
  },

  python: {
    key: 'python',
    name: 'Python (python-language-server)',
    description: 'PythonのLSP',
    questions: [
      {
        type: 'confirm',
        name: 'enabled',
        message: 'Python LSPを有効にしますか？',
        default: true
      }
    ],
    generate: (answers) => {
      return {
        command: 'python-language-server',
        args: ['--stdio'],
        enabled: answers.enabled
      };
    }
  },

  rust: {
    key: 'rust',
    name: 'Rust (rust-analyzer)',
    description: 'RustのLSP',
    questions: [
      {
        type: 'confirm',
        name: 'enabled',
        message: 'Rust LSPを有効にしますか？',
        default: true
      }
    ],
    generate: (answers) => {
      return {
        command: 'rust-analyzer',
        enabled: answers.enabled
      };
    }
  },

  lua: {
    key: 'lua',
    name: 'Lua (lua-language-server)',
    description: 'LuaのLSP',
    questions: [
      {
        type: 'confirm',
        name: 'enabled',
        message: 'Lua LSPを有効にしますか？',
        default: false
      }
    ],
    generate: (answers) => {
      return {
        command: 'lua-language-server',
        enabled: answers.enabled
      };
    }
  },

  yaml: {
    key: 'yaml',
    name: 'YAML (yaml-language-server)',
    description: 'YAMLのLSP',
    questions: [
      {
        type: 'confirm',
        name: 'enabled',
        message: 'YAML LSPを有効にしますか？',
        default: false
      }
    ],
    generate: (answers) => {
      return {
        command: 'yaml-language-server',
        enabled: answers.enabled
      };
    }
  },

  json: {
    key: 'json',
    name: 'JSON (vscode-json-language-server)',
    description: 'JSONのLSP',
    questions: [
      {
        type: 'confirm',
        name: 'enabled',
        message: 'JSON LSPを有効にしますか？',
        default: false
      }
    ],
    generate: (answers) => {
      return {
        command: 'vscode-json-language-server',
        args: ['--stdio'],
        enabled: answers.enabled
      };
    }
  },

  markdown: {
    key: 'markdown',
    name: 'Markdown (marksman)',
    description: 'MarkdownのLSP',
    questions: [
      {
        type: 'confirm',
        name: 'enabled',
        message: 'Markdown LSPを有効にしますか？',
        default: false
      }
    ],
    generate: (answers) => {
      return {
        command: 'marksman',
        enabled: answers.enabled
      };
    }
  },

  dockerfile: {
    key: 'dockerfile',
    name: 'Dockerfile (dockerfile-language-server)',
    description: 'DockerfileのLSP',
    questions: [
      {
        type: 'confirm',
        name: 'enabled',
        message: 'Dockerfile LSPを有効にしますか？',
        default: false
      }
    ],
    generate: (answers) => {
      return {
        command: 'dockerfile-language-server',
        args: ['--stdio'],
        enabled: answers.enabled
      };
    }
  },

  html: {
    key: 'html',
    name: 'HTML (html-language-server)',
    description: 'HTMLのLSP',
    questions: [
      {
        type: 'confirm',
        name: 'enabled',
        message: 'HTML LSPを有効にしますか？',
        default: false
      }
    ],
    generate: (answers) => {
      return {
        command: 'html-language-server',
        args: ['--stdio'],
        enabled: answers.enabled
      };
    }
  },

  css: {
    key: 'css',
    name: 'CSS (css-language-server)',
    description: 'CSSのLSP',
    questions: [
      {
        type: 'confirm',
        name: 'enabled',
        message: 'CSS LSPを有効にしますか？',
        default: false
      }
    ],
    generate: (answers) => {
      return {
        command: 'css-language-server',
        args: ['--stdio'],
        enabled: answers.enabled
      };
    }
  },

  bash: {
    key: 'bash',
    name: 'Bash (bash-language-server)',
    description: 'BashのLSP',
    questions: [
      {
        type: 'confirm',
        name: 'enabled',
        message: 'Bash LSPを有効にしますか？',
        default: false
      }
    ],
    generate: (answers) => {
      return {
        command: 'bash-language-server',
        args: ['start'],
        enabled: answers.enabled
      };
    }
  }
};

// カテゴリ別にグループ化したLSPを返すヘルパー関数
function getAllLSPs() {
  return Object.entries(lspTemplates).map(([key, tpl]) => ({
    key,
    name: tpl.name,
    description: tpl.description
  }));
}

// すべてのLSPを取得
function getLSPKeys() {
  return Object.keys(lspTemplates);
}

module.exports = {
  lspTemplates,
  getAllLSPs,
  getLSPKeys
};
