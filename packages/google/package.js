Package.describe({
  name: 'emmerge:google',
  summary: "Google OAuth flow",
  version: "1.1.5_2"
});

Package.onUse(function(api) {
  api.use('oauth2@1.1.3', ['client', 'server']);
  api.use('oauth@1.1.4', ['client', 'server']);
  api.use('http@1.1.0', ['server']);
  api.use(['underscore@1.0.3', 'service-configuration@1.0.4'], ['client', 'server']);
  api.use(['random@1.0.3', 'templating@1.1.1'], 'client');

  api.export('Google');

  api.addFiles(
    ['google_configure.html', 'google_configure.js'],
    'client');

  api.addFiles('google_server.js', 'server');
  api.addFiles('google_client.js', 'client');
});