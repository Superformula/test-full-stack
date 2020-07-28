module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      issuePrefixes: ['#', 'TFS-', 'tfs-'],
    },
  },
  rules: {
    'scope-empty': [0, 'never'],
    'references-empty': [2, 'never'],
    'header-max-length': [0, 'never', 200],
  },
};
