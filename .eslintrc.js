module.exports = {
  root: true, // 指定了root为true，eslint只检查当前项目目录
  env: {
    // 提供预设的全局变量，避免eslint检查报错，例如window
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    // 共享推荐的配置风格
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 'latest', // 指定ECMAScript 语法为最新
    sourceType: 'module', // 指定代码为 ECMAScript 模块
    ecmaFeatures: {
      jsx: true, // 启用jsx
    },
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    "@typescript-eslint/no-explicit-any": "off",
    "import/extensions": "off",
    "react/function-component-definition": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "react-hooks/exhaustive-deps": 'off',
    "react/jsx-props-no-spreading": 'off',
    "react/require-default-props": 'off',
    "react/destructuring-assignment": 'off',
    "react/no-array-index-key": 'off',
    "import/prefer-default-export": 'off',
    "no-unused-expressions": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "no-param-reassign": "off",
    "class-methods-use-this": "off",
    "@typescript-eslint/naming-convention": "off",
    "react/no-unused-prop-types": "off",
    "@typescript-eslint/ban-types": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "no-underscore-dangle": "off",
    "no-plusplus": "off",
    // "import/no-extraneous-dependencies": {
    //   "devDependencies": true,
    //   "peerDependencies": true,
    // },
    'prettier/prettier': [
      'error',
      {
        singleAttributePerLine: false,
      },
    ],
  },
};
