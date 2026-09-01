// CRA can supply an undefined allowed host when no private LAN address exists.
// Keep host validation enabled and permit loopback access in that case.
const configPath = require.resolve('react-scripts/config/webpackDevServer.config');
const createConfig = require(configPath);

require.cache[configPath].exports = (...args) => {
  const config = createConfig(...args);
  if (Array.isArray(config.allowedHosts)) {
    config.allowedHosts = config.allowedHosts.filter(
      host => typeof host === 'string' && host.length > 0,
    );
    if (config.allowedHosts.length === 0) {
      config.allowedHosts = ['localhost', '127.0.0.1'];
    }
  }
  return config;
};

require('react-scripts/scripts/start');
