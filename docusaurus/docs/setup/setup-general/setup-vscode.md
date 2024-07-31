---
sidebar_position: 7
title: VSCode
---

## VSCode Extensions:

- Cucumber (Gherkin)
- Code Spell Checker
- ESLint?
- MDX
- Prettier
- shell-format

## VSCode Settings:

```json title=".vscode/settings.json"
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": "explicit",
    "source.fixAll.eslint": "explicit"
  },

  /** ---------- Prettier ---------- */
  "prettier.semi": false,
  "prettier.singleQuote": true,
  "prettier.tabWidth": 2,
  "prettier.trailingComma": "all",
  "prettier.useTabs": false,

  /** ---------- File specific ---------- */
  "[feature]": {
    "editor.defaultFormatter": "alexkrechik.cucumberautocomplete"
  },
  "[shellscript]": {
    "editor.defaultFormatter": "foxundermoon.shell-format"
  }
}
```
