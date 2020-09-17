module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": ["eslint:recommended", "prettier"],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "ecmaFeatures": {
            "globalReturn": true
        }
    },
    "plugins": [
        "prettier",
    ],
    "rules": {
      "no-console": [
        "error",
        {
          "allow": [
            "warn",
            "error",
            "info"
          ]
        }
      ]
    }
};
