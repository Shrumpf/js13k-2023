module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-non-null-assertion": [
            "off"
        ],
        "@typescript-eslint/no-non-null-assertion": ["off"],
        "object-curly-newline": ["error", {
            "multiline": true
        }],
        "object-property-newline": ["error",
            {
                "allowAllPropertiesOnSameLine": false
            }],
        "max-len": [
            "error",
            {
                "code": 120,
                "ignoreStrings": true,
                "ignoreComments": true
            }
        ],
        "function-call-argument-newline": ["error", "consistent"],
    }
}
