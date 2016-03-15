Package.describe({
  name: 'lookback:meta',
  version: '0.0.1',
  summary: 'Get and set meta tags and title for a web page',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.2');
  api.use([
    'ecmascript',
    'jquery',
    'underscore'
  ], 'client');
  api.addFiles('meta.js', 'client');
  api.export('Meta', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('lookback:meta');
  api.addFiles('meta-tests.js');
});
