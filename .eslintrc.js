module.exports = {
  extends: ['airbnb-typescript-prettier'],
  parserOptions: {
    project: [],
  },
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/label-has-associated-control': 0, // hate to disable this, but it's been buggy.
    'import/prefer-default-export': 0,
  },
};
