 Package.describe({
+  name: 'emmerge:accounts-google',
   summary: "Login service for Google accounts",
   version: "1.0.4"
 });
 
 Package.onUse(function(api) {
-  api.use(['underscore', 'random']);
-  api.use('accounts-base', ['client', 'server']);
+  api.use(['underscore@1.0.3', 'random@1.0.3']);
+  api.use('accounts-base@1.2.0', ['client', 'server']);
   // Export Accounts (etc) to packages using this one.
   api.imply('accounts-base', ['client', 'server']);
-  api.use('accounts-oauth', ['client', 'server']);
-  api.use('google', ['client', 'server']);
+  api.use('accounts-oauth@1.1.5', ['client', 'server']);
+  api.use('emmerge:google@1.1.5', ['client', 'server']);
 
   api.addFiles('google_login_button.css', 'client');
