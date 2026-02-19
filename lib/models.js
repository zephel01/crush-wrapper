// モデル候補の定義ファイル
// 各プロバイダーごとによく使われるモデル名を定義

const modelCandidates = {
  // ローカル / オンプレミス型
  llama_glm: [
    'GLM-4.7-Flash-Uncen-Hrt-NEO-CODE-MAX-imat-D_AU-Q4_K_M',
    'GLM-4.7-Flash',
    'GLM-4.7',
    'GLM-4-Air',
    'GLM-4-Flash',
    'glm-4.7',
    'glm-4-air',
    'glm-4-flash'
  ],
  llama_qwen: [
    'Qwen3-Coder-Next-Q3_K_M',
    'Qwen2.5-Coder-14B',
    'Qwen2.5-7B-Instruct',
    'Qwen2.5-14B-Instruct',
    'Qwen2.5-32B-Instruct',
    'Qwen2.5-72B-Instruct',
    'qwen2.5-coder-14b',
    'qwen2.5-7b-instruct',
    'qwen2.5-14b-instruct'
  ],
  lm_studio: [
    'GLM-4.7-Flash-Uncen-Hrt-NEO-CODE-MAX-imat-D_AU-Q4_K_M',
    'Qwen3-Coder-Next-Q3_K_M',
    'llama-3.3-70b',
    'llama-3.3-70b-instruct',
    'llama-3.1-8b',
    'qwen2.5-72b-instruct',
    'deepseek-r1',
    'DeepSeek-R1-Distill-Llama-8B-Q4_K_M',
    'Phi-4-Mini-Instruct-Q4_K_M',
    'Phi-4-14.7B-Instruct-Q4_K_M'
  ],
  ollama: [
    'llama3.3',                    // デフォルト値として使用
    'glm-4.7-flash-neo-code-max:q4_k_m',
    'qwen3-coder-next:q3_k_m',
    'llama3.3:70b',
    'qwen2.5:14b',
    'qwen2.5:72b',
    'deepseek-r1',
    'gemma2:27b',
    'Qwen3-Coder-Next',
    'Qwen3-14B',
    'Phi-4'
  ],

  // 主要ホスト型API（Direct / Official Hosted APIs）
  anthropic: [
    'claude-sonnet-4-20250514',     // デフォルト値として使用
    'claude-sonnet-4-5',           // バランス型、よく使われる
    'claude-haiku-4-5',            // 高速・低コスト
    'claude-opus-4-6',             // 最新の最上位モデル (2026年2月リリース)
    // 'claude-3-5-sonnet-20241022' → 古いので非推奨（Claude 4.5/4.6系へ移行）
    // 'claude-3-opus-20240229'    → 完全に古い
  ],

  groq: [
    'llama-3.3-70b-versatile',     // まだ残っているが最新ではない
    // 'llama-3.1-70b-versatile'   → 古い
    // 'mixtral-8x7b-32768'        → かなり古い
    // 'gemma2-9b-it'              → 古い
    // 2026年現在は以下のようなモデルが主流（公式ドキュメント参照）
    // 'gpt-oss-120b', 'gpt-oss-20b', 'qwen3-32b', 'kimi-k2' などが追加されている可能性が高い
    // → 最新リストは https://console.groq.com/docs/models で確認推奨
  ],

  deepseek: [
    'deepseek-chat',               // → DeepSeek-V3.2 (non-thinking)
    'deepseek-reasoner',           // → DeepSeek-V3.2 (thinking mode)
    // 'deepseek-coder'            → 古い名称（現在は統合されている可能性）
    // 'deepseek-r1'               → R1系は別モデルとして残っている場合あり
  ],

  google: [
    'gemini-2.0-flash-exp',        // デフォルト値として使用
    'gemini-3-pro-preview',        // 最新最上位（previewだが最強クラス）
    'gemini-3-flash-preview',      // 高速版
    'gemini-2.5-pro',              // 安定版の高性能モデル
    'gemini-2.5-flash',            // バランス型
    // 'gemini-1.5-pro' など → 完全に古い
  ],

  openai: [
    'gpt-4o',                      // デフォルト値として使用
    'gpt-5.2',                     // 最新フラッグシップ（2026年時点）
    'gpt-5.2-pro',                 // さらに高精度版
    'gpt-5.1',                     // 前世代だがまだ利用可
    // 'gpt-4o-mini', 'gpt-4-turbo' → 完全に旧世代（非推奨）
    // 'o1', 'o1-2024-12-17'       → o1系はGPT-5.xのreasoningモードに統合
  ],

  // クラウドプラットフォーム統合型
  aws_bedrock: [
    'anthropic.claude-sonnet-4-20250514-v2:0',  // デフォルト値として使用
    'anthropic.claude-opus-4-6-v1',           // Claude 4.6系
    'anthropic.claude-sonnet-4-5-20250929-v1:0',
    'anthropic.claude-haiku-4-5-20251001-v1:0',
    'meta.llama4-70b-instruct-v1:0',          // Llama 4系に移行（仮）
    'mistral.magistral-small-2509',           // Mistral最新
    'mistral.ministral-3-14b-instruct',
    // 'anthropic.claude-3-5-sonnet-20241022-v2:0' → 古い
  ],

  azure_openai: [
    // AzureはOpenAIモデルをラップしているので基本的にOpenAIと同じ
    'gpt-4o',                      // デフォルト値として使用
    'gpt-5.2',
    'gpt-5.2-pro',
    'gpt-5.1',
    // 'gpt-4-turbo', 'o1' → 旧世代、非推奨または段階的削除
  ],

  // ルーター / ゲートウェイ型
  openrouter: [
    'anthropic/claude-sonnet-4',      // デフォルト値として使用
    'anthropic/claude-sonnet-4-5',
    'openai/gpt-5.2',
    'google/gemini-2.5-flash',
    'deepseek/deepseek-r1',
    'xai/grok-4-0709'
  ]
};

// モデル候補を取得（既存設定から利用可能なモデルもマージ）
function getModelChoices(providerKey, existingModels = []) {
  const candidates = modelCandidates[providerKey] || [];

  // 既存の設定から利用可能なモデルを抽出
  const existingModelChoices = existingModels.map(m => ({
    name: m,
    value: m
  }));

  // 定義済みのモデル候補
  const definedChoices = candidates.map(m => ({
    name: m,
    value: m
  }));

  // 重複を排除してマージ
  const allChoices = new Map();
  existingModelChoices.forEach(c => allChoices.set(c.value, c));
  definedChoices.forEach(c => allChoices.set(c.value, c));

  const choices = Array.from(allChoices.values());

  // カスタム入力オプションを追加
  choices.push({ name: '━━━━━━━━━', value: 'separator' });
  choices.push({ name: 'カスタム入力', value: 'custom' });

  return choices;
}

// カスタム入力用の質問を生成
function getCustomModelQuestion(defaultValue = '') {
  return {
    type: 'input',
    name: 'customModel',
    message: 'モデル名を入力してください（例: llama_qwen/qwen）:',
    default: defaultValue
  };
}

// questions 配列に「戻る」選択肢を追加するヘルパー関数
function addBackOption(questions) {
  return questions.map(q => {
    if (q.type === 'list' && q.choices) {
      return {
        ...q,
        choices: [
          ...q.choices,
          { name: '━━━━━━━━━', value: 'separator' },
          { name: '戻る', value: '__BACK__' }
        ]
      };
    }
    return q;
  });
}

module.exports = {
  modelCandidates,
  getModelChoices,
  getCustomModelQuestion,
  addBackOption
};
