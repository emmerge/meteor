Package.describe({
  name: 'emmerge:accounts-google',
  summary: "Login service for Google accounts",
  version: "1.0.4"
});

Package.onUse(function(api) {
  api.use(['underscore', 'random']);
  api.use('accounts-base', ['client', 'server']);
  // Export Accounts (etc) to packages using this one.
  api.imply('accounts-base', ['client', 'server']);
  api.use('accounts-oauth', ['client', 'server']);
  api.use('emmerge:google@1.1.5', ['client', 'server']);

  api.addFiles('google_login_button.css', 'client');

  api.addFiles("google.js");
});
