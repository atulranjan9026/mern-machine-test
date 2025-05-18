// webpack.config.js
module.exports = {
    // ... other config
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxSize: 244 * 1024, // 244KB
      },
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    }
  };