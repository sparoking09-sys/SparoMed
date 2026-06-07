module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@': './',
            '@screens': './frontend/screens',
            '@services': './backend/services',
            '@config': './frontend/config',
            '@components': './frontend/components'
          }
        }
      ]
    ]
  };
};
