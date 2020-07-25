const { override, addBundleVisualizer } = require('customize-cra')

module.exports = override(
  process.env.BUNDLE_VISUALIZE === '1' &&
    addBundleVisualizer({
      analyzerMode: 'static',
      reportFilename: 'report.html',
    }),
)
