module.exports = function (api) {
  api.cache(true);
  const presets = ['babel-preset-expo'];
  const plugins = [];

  plugins.push('expo-router/babel');

  return {
    presets,
    plugins,
  };
};
