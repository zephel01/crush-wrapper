# AGENTS.md

This document provides essential information for AI agents working in this repository.

## Project Overview

**crush-wrapper** is an interactive Node.js CLI tool for creating and managing Crush configuration files (`crush.json`). It's designed for non-engineers to easily configure Crush (an AI agent CLI tool) with various LLM providers, LSPs, and MCPs.

- **Language**: JavaScript (Node.js)
- **Type**: CLI tool / Configuration generator
- **Entry point**: `lib/cli.js`
- **Executable**: `bin/crush-wrapper`

## Essential Commands

### Installation & Setup
```bash
# Install dependencies
npm install

# Global installation (to use as CLI)
npm link
# OR
npm install -g .

# Run the tool
npm start
# OR
node lib/cli.js
# OR (when globally installed)
crush-wrapper
```

### Testing
No test framework is configured. Tests would need to be added.

### Linting/Formatting
No linting or formatting tools are configured.

## Project Structure

```
crush-wrapper/
├── bin/
│   └── crush-wrapper          # Executable CLI wrapper
├── lib/
│   ├── cli.js                # Main CLI logic and user flow
│   ├── config.js             # Config loading, saving, backup, validation
│   ├── models.js             # Model candidate definitions and helpers
│   ├── providers.js          # LLM provider templates
│   ├── lsp.js                # LSP templates
│   └── mcp.js                # MCP templates
├── examples/
│   └── crush.json.example    # Sample configuration file
├── package.json              # Dependencies and scripts
├── README.md                 # User documentation (Japanese)
└── USAGE.md                  # Usage guide (Japanese)
```

## Code Patterns & Conventions

### Template Pattern (Providers, LSPs, MCPs)

The codebase uses a consistent template pattern for all configurable components:

```javascript
const templateName = {
  key: 'unique_identifier',           // Used as object key in config
  name: 'Display Name',               // Shown to user in UI
  category: 'category_name',          // For providers: local, hosted, cloud, router
  description: 'Description',         // For LSPs/MCPs
  questions: (existingConfig) => [    // Inquirer questions (can be function or array)
    {
      type: 'input|list|confirm',
      name: 'fieldName',
      message: 'Prompt text...',
      default: 'default_value',
      when: (answers) => boolean      // Conditional display
    }
  ],
  generate: (answers) => {            // Transform answers to config object
    return {
      // Crush configuration structure
    };
  }
};
```

**Key points:**
- `questions` can be a static array or a function that receives `existingConfig` for dynamic choices
- `generate` function receives the answers object and returns the configuration structure
- Provider templates are exported in `lib/providers.js`
- LSP/MCP templates are in their respective files

### Inquirer Question Types

The tool uses `inquirer` for interactive prompts. Common types:
- `input` - Free-form text input
- `list` - Single selection from dropdown
- `confirm` - Yes/no boolean

### "Back" Navigation Pattern

For templates that need multi-step input, use the `addBackOption()` helper:

```javascript
const { addBackOption } = require('./models');

let questions = template.questions;
questions = addBackOption(questions);
const answers = await inquirer.prompt(questions);

// Check if user wants to go back
if (Object.values(answers).includes('__BACK__')) {
  continue; // Return to main menu
}
```

### Config File Locations

The tool supports two configuration locations:

1. **Local** (default with `--local` flag): `./crush.json` in current directory
2. **Global** (default): `~/.config/crush/crush.json`

Helper functions in `lib/config.js`:
- `getConfigPath()` - Returns global config path
- `getLocalConfigPath()` - Returns current directory config path
- `ensureConfigDir()` - Creates global config directory if needed

### Backup Strategy

Backup files are automatically created with timestamp:
- Format: `crush.json.YYYY-MM-DD_HH-MM-SS.bak`
- Created before overwriting existing configs
- Function: `backupConfig(configPath)` in `lib/config.js`

### Environment Variables

The tool supports environment variable substitution with `$VAR_NAME` syntax:
```javascript
"api_key": "$OPENAI_API_KEY"
```

Users can input `$VARIABLE_NAME` and Crush will resolve the actual value.

## Naming Conventions

- **File names**: lowercase with hyphens (e.g., `crush-wrapper`)
- **Directory names**: lowercase (e.g., `lib`, `examples`)
- **Variable names**: camelCase (e.g., `baseURL`, `modelNameChoice`)
- **Configuration keys**: snake_case (e.g., `base_url`, `context_window`, `default_max_tokens`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `DEFAULT_CONFIG`)
- **Module exports**: Named exports (CommonJS)

## Data Structures

### Crush Configuration Structure

```javascript
{
  "$schema": "https://charm.land/crush.json",
  "providers": {
    "provider_key": {
      "type": "anthropic|openai|google|openai-compat",
      "name": "Provider Name",
      "base_url": "...",           // For openai-compat
      "api_key": "$ENV_VAR",        // Optional, can use env vars
      "models": [
        {
          "id": "model_id",
          "name": "Display Name",
          "context_window": 128000,
          "default_max_tokens": 8000,
          "cost_per_1m_in": 0.0,    // Optional pricing
          "cost_per_1m_out": 0.0,
          "can_reason": true,        // Optional capability flags
          "supports_attachments": true
        }
      ]
    }
  },
  "lsp": {
    "lsp_key": {
      "command": "lsp-command",
      "args": ["--stdio"],           // Optional
      "enabled": true
    }
  },
  "mcp": {
    "mcp_key": {
      "type": "stdio|http|sse",
      "command": "...",              // For stdio type
      "args": [...],                 // For stdio type
      "url": "...",                  // For http/sse type
      "headers": {},                 // For http type
      "timeout": 120,
      "disabled": false
    }
  },
  "options": {
    "debug": false,
    "debug_lsp": false,
    "disable_provider_auto_update": false,
    "disable_metrics": false,
    "disabled_tools": [],
    "allowed_tools": [],
    "skills_paths": ["~/.config/crush/skills"],
    "initialize_as": "AGENTS.md",
    "attribution": {
      "trailer_style": "assisted-by",
      "generated_with": true
    }
  },
  "permissions": {
    "allowed_tools": []
  }
}
```

## Adding New Features

### Adding a New Provider

1. Define provider template in `lib/providers.js` following the template pattern
2. Add model candidates to `lib/models.js`
3. Update category mapping in `lib/cli.js` if needed

Example:
```javascript
new_provider: {
  key: 'new_provider_key',
  name: 'Display Name',
  category: 'hosted',  // local, hosted, cloud, or router
  questions: (existingConfig) => [...],
  generate: (answers) => ({...})
}
```

### Adding a New LSP

1. Define LSP template in `lib/lsp.js`
2. Template should follow the same pattern

```javascript
new_lsp: {
  key: 'new_lsp',
  name: 'Display Name',
  description: 'Description',
  questions: [...],
  generate: (answers) => ({...})
}
```

### Adding a New MCP

1. Define MCP template in `lib/mcp.js`
2. Use `addBackOption()` for multi-step inputs

```javascript
new_mcp: {
  key: 'new_mcp',
  name: 'Display Name',
  description: 'Description',
  category: 'filesystem|api|custom',
  questions: [...],
  generate: (answers) => ({...})
}
```

## Important Gotchas

### Comment Handling in JSON

The config loader in `lib/config.js` strips comments from JSON files before parsing:
- Removes `//` comments (while preserving `//` in URLs and strings)
- Allows the example config to be more readable

### Japanese vs English

- **UI text**: Japanese (for end users)
- **Code and variables**: English
- **Comments**: Japanese (in some files)

When modifying code, keep the UI strings in Japanese for consistency.

### Custom Model Input

Users can input custom model names not in the predefined list. The UI shows:
- Predefined model choices
- Separator (`━━━━━━━━━`)
- "カスタム入力" (Custom input) option
- "戻る" (Back) option

The `when` condition handles showing/hiding custom input fields.

### Default Config Structure

The `DEFAULT_CONFIG` in `lib/config.js` defines the minimal structure. New features should update this default.

### No Testing Infrastructure

The project currently has no tests. When adding tests:
1. Add a test framework (Jest or Mocha)
2. Create `test/` directory
3. Update `package.json` test script
4. Test config loading/saving, template generation, and CLI flow

## Common Operations

### Reading the current config
```javascript
const config = require('./lib/config');
const currentConfig = config.loadConfig(configPath);
```

### Saving config
```javascript
const config = require('./lib/config');
config.saveConfig(configPath, currentConfig);
```

### Backing up config
```javascript
const config = require('./lib/config');
config.backupConfig(configPath);
```

### Getting model choices
```javascript
const { getModelChoices } = require('./lib/models');
const choices = getModelChoices('lm_studio', existingModels);
```

### Adding "Back" option to questions
```javascript
const { addBackOption } = require('./lib/models');
const questionsWithBack = addBackOption(questions);
```

## Provider Categories

Providers are organized into four categories (see `lib/providers.js`):

1. **local**: Local/on-premise LLMs (LM Studio, Ollama, llama-server)
2. **hosted**: Hosted APIs (Anthropic, OpenAI, Google, Groq, DeepSeek)
3. **cloud**: Cloud platforms (AWS Bedrock, Azure OpenAI)
4. **router**: Routers/gateways (OpenRouter)

## LSP Support

Currently supports 11 language servers (in `lib/lsp.js`):
- Go (gopls)
- TypeScript (typescript-language-server)
- Python (python-language-server)
- Rust (rust-analyzer)
- Lua (lua-language-server)
- YAML (yaml-language-server)
- JSON (vscode-json-language-server)
- Markdown (marksman)
- Dockerfile (dockerfile-language-server)
- HTML (html-language-server)
- CSS (css-language-server)
- Bash (bash-language-server)

## MCP Support

Currently supports 5 MCP types (in `lib/mcp.js`):
- Filesystem MCP (stdio)
- GitHub MCP (http)
- Custom stdio MCP
- Custom HTTP MCP
- Custom SSE MCP

## Error Handling

The CLI has a top-level error handler:
```javascript
main().catch(error => {
  console.error('エラーが発生しました:', error.message);
  process.exit(1);
});
```

Config loading failures show a warning and fall back to default config.

## Dependencies

Main dependencies from `package.json`:
- `inquirer`: ^8.2.0 - Interactive command-line prompts

The project uses CommonJS (`require()`), not ES modules (`import`).

## Git Ignore Patterns

- `node_modules/` - Node dependencies
- `*.log` - Log files
- `.DS_Store` - macOS files
- `*.bak` - Backup files
- `crush.json` - User config files (not committed)

## Version Control

The project uses Git. Current branch: `main`.
