module.exports = {
  "extends": "airbnb-base",
  "env": {
    "node": true
  },
  "parserOptions": {
    "impliedStrict": false,
    "sourceType": "script",
  },
  "globals": {
    "test": false,
    "afterAll": false,
    "beforeAll": false,
    "describe": false,
    "expect": false,
    "it": false,
    "context": false,
    "beforeEach": false,
    "xdescribe": false
  },
  rules: {
    // project airbnb rules customization
    "camelcase": ["off"],
    "max-len": ["off"],
    "no-underscore-dangle": ["off"],
    "prefer-destructuring": ["off"],
    "no-shadow": ["off"],
    "no-unused-vars": ["error", {
      "vars": "all",
      "argsIgnorePattern": "[(^_)|Sequelize]",
      "args": "after-used",
      "ignoreRestSiblings": true
    }],
    "arrow-parens": ["error", "as-needed", { requireForBlockBody: true }],
    "arrow-body-style": ["off"],
    "no-await-in-loop": ["off"],
    "no-plusplus": ["off"],
    "func-names": ["off"],

    // more strict airbnb rules
    "curly": ["error", "all"],
    "array-bracket-newline": ["error", "consistent"],
    "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
      { blankLine: "always", prev: ["const", "let", "var"], next: "*"},
      { blankLine: "any",    prev: ["const", "let", "var"], next: ["const", "let", "var"]}
    ],
    "object-curly-newline": ["error", {
      ObjectExpression: { minProperties: 5, multiline: true, consistent: true },
      ObjectPattern: { minProperties: 5, multiline: true, consistent: true },
      ImportDeclaration: { minProperties: 5, multiline: true, consistent: true },
      ExportDeclaration: { minProperties: 5, multiline: true, consistent: true },
    }],
    "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
    "func-name-matching": ["error", { "includeCommonJSModuleExports": true }],
    "object-property-newline": ["error", { "allowAllPropertiesOnSameLine": false }],
  },
  overrides: [{
    "files": [
      "migrations/**/*.js",
      "seeders/**/*.js",
    ],
    "rules": {
      "import/newline-after-import": ["off"]
    }
  }, {
    "files": [
      "test/**/*.js",
    ],
    "rules": {
      "no-unused-expressions": ["off"],
      "prefer-arrow-callback": ["off"]
    }
  }]
};
