// provider設定テンプレート（Crush形式）

const { getModelChoices } = require('./models');

const providerTemplates = {
  // ===============================
  // ローカル / オンプレミス型
  // ===============================
  llama_server_glm: {
    key: 'llama_glm',
    name: 'ローカル llama-server (GLM)',
    category: 'local',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'baseURL',
        message: 'llama-serverのアドレスを入力してください（例: http://192.168.1.21:8080/v1）:',
        default: 'http://localhost:8080/v1'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('llama_glm', []),
        default: 'GLM-4.7-Flash'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: GLM-4.7-Flash）:',
        default: 'GLM-4.7-Flash',
        when: (answers) => answers.modelNameChoice === 'custom'
      },
      {
        type: 'input',
        name: 'contextWindow',
        message: 'コンテキストウィンドウサイズを入力してください（デフォルト: 128000）:',
        default: '128000',
        when: (answers) => answers.modelNameChoice === 'custom'
      },
      {
        type: 'input',
        name: 'defaultMaxTokens',
        message: 'デフォルト最大トークン数を入力してください（デフォルト: 8000）:',
        default: '8000',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      const contextWindow = parseInt(answers.contextWindow || '128000');
      const defaultMaxTokens = parseInt(answers.defaultMaxTokens || '8000');
      return {
        type: 'openai-compat',
        name: '(local)',
        base_url: answers.baseURL,
        models: [
          {
            id: 'glm',
            name: modelName,
            context_window: contextWindow,
            default_max_tokens: defaultMaxTokens
          }
        ]
      };
    }
  },

  llama_server_qwen: {
    key: 'llama_qwen',
    name: 'ローカル llama-server (Qwen)',
    category: 'local',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'baseURL',
        message: 'Qwen llama-serverのアドレスを入力してください（例: http://192.168.1.21:8083/v1）:',
        default: 'http://localhost:8083/v1'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('llama_qwen', []),
        default: 'Qwen2.5-Coder-14B'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: Qwen2.5-Coder-14B）:',
        default: 'Qwen2.5-Coder-14B',
        when: (answers) => answers.modelNameChoice === 'custom'
      },
      {
        type: 'input',
        name: 'contextWindow',
        message: 'コンテキストウィンドウサイズを入力してください（デフォルト: 128000）:',
        default: '128000',
        when: (answers) => answers.modelNameChoice === 'custom'
      },
      {
        type: 'input',
        name: 'defaultMaxTokens',
        message: 'デフォルト最大トークン数を入力してください（デフォルト: 8000）:',
        default: '8000',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      const contextWindow = parseInt(answers.contextWindow || '128000');
      const defaultMaxTokens = parseInt(answers.defaultMaxTokens || '8000');
      return {
        type: 'openai-compat',
        name: '(local)',
        base_url: answers.baseURL,
        models: [
          {
            id: 'qwen',
            name: modelName,
            context_window: contextWindow,
            default_max_tokens: defaultMaxTokens
          }
        ]
      };
    }
  },

  lm_studio: {
    key: 'lm_studio',
    name: 'LM Studio',
    category: 'local',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'baseURL',
        message: 'LM Studioのアドレスを入力してください（例: http://localhost:1234/v1）:',
        default: 'http://localhost:1234/v1'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('lm_studio', []),
        default: 'llama-3.3-70b'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: llama-3.3-70b）:',
        default: 'llama-3.3-70b',
        when: (answers) => answers.modelNameChoice === 'custom'
      },
      {
        type: 'input',
        name: 'contextWindow',
        message: 'コンテキストウィンドウサイズを入力してください（デフォルト: 128000）:',
        default: '128000',
        when: (answers) => answers.modelNameChoice === 'custom'
      },
      {
        type: 'input',
        name: 'defaultMaxTokens',
        message: 'デフォルト最大トークン数を入力してください（デフォルト: 8000）:',
        default: '8000',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      const contextWindow = parseInt(answers.contextWindow || '128000');
      const defaultMaxTokens = parseInt(answers.defaultMaxTokens || '8000');
      return {
        type: 'openai-compat',
        name: 'LM Studio',
        base_url: answers.baseURL,
        models: [
          {
            id: 'model',
            name: modelName,
            context_window: contextWindow,
            default_max_tokens: defaultMaxTokens
          }
        ]
      };
    }
  },

  ollama: {
    key: 'ollama',
    name: 'Ollama',
    category: 'local',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'baseURL',
        message: 'Ollamaのアドレスを入力してください（例: http://localhost:11434/v1）:',
        default: 'http://localhost:11434/v1'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('ollama', []),
        default: 'llama3.3'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: llama3.3）:',
        default: 'llama3.3',
        when: (answers) => answers.modelNameChoice === 'custom'
      },
      {
        type: 'input',
        name: 'contextWindow',
        message: 'コンテキストウィンドウサイズを入力してください（デフォルト: 128000）:',
        default: '128000',
        when: (answers) => answers.modelNameChoice === 'custom'
      },
      {
        type: 'input',
        name: 'defaultMaxTokens',
        message: 'デフォルト最大トークン数を入力してください（デフォルト: 8000）:',
        default: '8000',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      const contextWindow = parseInt(answers.contextWindow || '128000');
      const defaultMaxTokens = parseInt(answers.defaultMaxTokens || '8000');
      return {
        type: 'openai-compat',
        name: 'Ollama',
        base_url: answers.baseURL,
        models: [
          {
            id: 'model',
            name: modelName,
            context_window: contextWindow,
            default_max_tokens: defaultMaxTokens
          }
        ]
      };
    }
  },

  // ===============================
  // 主要ホスト型API（Direct / Official Hosted APIs）
  // ===============================
  anthropic: {
    key: 'anthropic',
    name: 'Anthropic (Claude)',
    category: 'hosted',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'apiKey',
        message: 'Anthropic API Keyを入力してください（環境変数を使う場合は $ANTHROPIC_API_KEY と入力）:',
        default: '$ANTHROPIC_API_KEY'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('anthropic', []),
        default: 'claude-sonnet-4-20250514'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: claude-sonnet-4-20250514）:',
        default: 'claude-sonnet-4-20250514',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        type: 'anthropic',
        name: 'Anthropic',
        api_key: answers.apiKey,
        models: [
          {
            id: 'claude',
            name: modelName,
            cost_per_1m_in: 3,
            cost_per_1m_out: 15,
            cost_per_1m_in_cached: 3.75,
            cost_per_1m_out_cached: 0.3,
            context_window: 200000,
            default_max_tokens: 8192,
            can_reason: true,
            supports_attachments: true
          }
        ]
      };
    }
  },

  openai: {
    key: 'openai',
    name: 'OpenAI',
    category: 'hosted',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'apiKey',
        message: 'OpenAI API Keyを入力してください（環境変数を使う場合は $OPENAI_API_KEY と入力）:',
        default: '$OPENAI_API_KEY'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('openai', []),
        default: 'gpt-4o'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: gpt-4o）:',
        default: 'gpt-4o',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        type: 'openai',
        name: 'OpenAI',
        api_key: answers.apiKey,
        models: [
          {
            id: 'gpt',
            name: modelName,
            cost_per_1m_in: 2.5,
            cost_per_1m_out: 10,
            context_window: 128000,
            default_max_tokens: 4096,
            supports_attachments: true
          }
        ]
      };
    }
  },

  google: {
    key: 'google',
    name: 'Google Gemini',
    category: 'hosted',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'apiKey',
        message: 'Google API Keyを入力してください（環境変数を使う場合は $GOOGLE_API_KEY と入力）:',
        default: '$GOOGLE_API_KEY'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('google', []),
        default: 'gemini-2.0-flash-exp'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: gemini-2.0-flash-exp）:',
        default: 'gemini-2.0-flash-exp',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        type: 'google',
        name: 'Google',
        api_key: answers.apiKey,
        models: [
          {
            id: 'gemini',
            name: modelName,
            context_window: 1000000,
            default_max_tokens: 8192
          }
        ]
      };
    }
  },

  groq: {
    key: 'groq',
    name: 'Groq（高速推論）',
    category: 'hosted',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'apiKey',
        message: 'Groq API Keyを入力してください（環境変数を使う場合は $GROQ_API_KEY と入力）:',
        default: '$GROQ_API_KEY'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('groq', []),
        default: 'llama-3.3-70b-versatile'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: llama-3.3-70b-versatile）:',
        default: 'llama-3.3-70b-versatile',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        type: 'openai-compat',
        name: 'Groq',
        base_url: 'https://api.groq.com/openai/v1',
        api_key: answers.apiKey,
        models: [
          {
            id: 'groq',
            name: modelName,
            cost_per_1m_in: 0.59,
            cost_per_1m_out: 0.59,
            context_window: 128000,
            default_max_tokens: 8192
          }
        ]
      };
    }
  },

  deepseek: {
    key: 'deepseek',
    name: 'DeepSeek',
    category: 'hosted',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'apiKey',
        message: 'DeepSeek API Keyを入力してください（環境変数を使う場合は $DEEPSEEK_API_KEY と入力）:',
        default: '$DEEPSEEK_API_KEY'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('deepseek', []),
        default: 'deepseek-chat'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: deepseek-chat）:',
        default: 'deepseek-chat',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        type: 'openai-compat',
        name: 'DeepSeek',
        base_url: 'https://api.deepseek.com/v1',
        api_key: answers.apiKey,
        models: [
          {
            id: 'deepseek',
            name: modelName,
            cost_per_1m_in: 0.27,
            cost_per_1m_out: 1.1,
            cost_per_1m_in_cached: 0.07,
            cost_per_1m_out_cached: 1.1,
            context_window: 64000,
            default_max_tokens: 5000
          }
        ]
      };
    }
  },

  // ===============================
  // クラウドプラットフォーム統合型
  // ===============================
  aws_bedrock: {
    key: 'aws_bedrock',
    name: 'Amazon Bedrock',
    category: 'cloud',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'region',
        message: 'AWSリージョンを入力してください（例: us-east-1）:',
        default: 'us-east-1'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('aws_bedrock', []),
        default: 'anthropic.claude-sonnet-4-20250514-v2:0'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: anthropic.claude-sonnet-4-20250514-v2:0）:',
        default: 'anthropic.claude-sonnet-4-20250514-v2:0',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        type: 'aws',
        name: 'Amazon Bedrock',
        models: [
          {
            id: 'bedrock',
            name: modelName,
            context_window: 200000,
            default_max_tokens: 4096
          }
        ]
      };
    }
  },

  azure_openai: {
    key: 'azure_openai',
    name: 'Azure OpenAI',
    category: 'cloud',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'apiKey',
        message: 'Azure OpenAI API Keyを入力してください（環境変数を使う場合は $AZURE_OPENAI_API_KEY と入力）:',
        default: '$AZURE_OPENAI_API_KEY'
      },
      {
        type: 'input',
        name: 'endpoint',
        message: 'Azure OpenAI Endpointを入力してください（例: https://your-resource.openai.azure.com）:',
        default: 'https://your-resource.openai.azure.com'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('azure_openai', []),
        default: 'gpt-4o'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: gpt-4o）:',
        default: 'gpt-4o',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        type: 'azure',
        name: 'Azure OpenAI',
        api_key: answers.apiKey,
        endpoint: answers.endpoint,
        models: [
          {
            id: 'azure',
            name: modelName,
            context_window: 128000,
            default_max_tokens: 4096
          }
        ]
      };
    }
  },

  // ===============================
  // ルーター / ゲートウェイ型
  // ===============================
  openrouter: {
    key: 'openrouter',
    name: 'OpenRouter',
    category: 'router',
    questions: (existingConfig) => [
      {
        type: 'input',
        name: 'apiKey',
        message: 'OpenRouter API Keyを入力してください（環境変数を使う場合は $OPENROUTER_API_KEY と入力）:',
        default: '$OPENROUTER_API_KEY'
      },
      {
        type: 'list',
        name: 'modelNameChoice',
        message: 'モデル名を選択してください:',
        choices: getModelChoices('openrouter', []),
        default: 'anthropic/claude-sonnet-4'
      },
      {
        type: 'input',
        name: 'modelName',
        message: 'モデル名を入力してください（例: anthropic/claude-sonnet-4）:',
        default: 'anthropic/claude-sonnet-4',
        when: (answers) => answers.modelNameChoice === 'custom'
      }
    ],
    generate: (answers) => {
      const modelName = answers.modelNameChoice === 'custom' ? answers.modelName : answers.modelNameChoice;
      return {
        type: 'openai-compat',
        name: 'OpenRouter',
        base_url: 'https://openrouter.ai/api/v1',
        api_key: answers.apiKey,
        models: [
          {
            id: 'openrouter',
            name: modelName,
            cost_per_1m_in: 3,
            cost_per_1m_out: 15,
            context_window: 200000,
            default_max_tokens: 8192
          }
        ]
      };
    }
  }
};

// カテゴリ別にグループ化したプロバイダーを返すヘルパー関数
function getProvidersByCategory(category) {
  return Object.entries(providerTemplates)
    .filter(([_, tpl]) => tpl.category === category)
    .map(([key, tpl]) => ({ key, name: tpl.name }));
}

// すべてのカテゴリを取得
function getCategories() {
  return [...new Set(Object.values(providerTemplates).map(tpl => tpl.category))];
}

module.exports = {
  providerTemplates,
  getProvidersByCategory,
  getCategories
};
