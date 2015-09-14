 Package.describe({
   name: 'emmerge:accounts-google',
   summary: "Login service for Google accounts",
   version: "1.0.5-plugins.0"
 });
 
 Package.onUse(function(api) {
   api.use(['underscore@1.0.4-plugins.0', 'random@1.0.4-plugins.0']);
   api.use('accounts-base@1.2.1-plugins.0', ['client', 'server']);
   // Export Accounts (etc) to packages using this one.
   api.imply('accounts-base@1.2.1-plugins.0', ['client', 'server']);
   api.use('accounts-oauth@1.1.4-plugins.0', ['client', 'server']);
   api.use('emmerge:google@11.1.6-plugins.0', ['client', 'server']);
 
   api.addFiles('google_login_button.css', 'client');
   api.addFiles("google.js");
});