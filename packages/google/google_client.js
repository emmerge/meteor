Google = {};

// Request Google credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Google.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (!credentialRequestCompleteCallback && typeof options === 'function') {
    credentialRequestCompleteCallback = options;
    options = {};
  } else if (!options) {
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({service: 'google'});
  if (!config) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback(
      new ServiceConfiguration.ConfigError());
    return;
  }

  var credentialToken = Random.secret();

  // always need this to get user id from google.
  var requiredScope = ['profile'];
  var scope = ['email'];

  if (options.requestPermissions)
    scope = options.requestPermissions;
  scope = _.union(scope, requiredScope);
<<<<<<< HEAD
  var flatScope = _.map(scope, encodeURIComponent).join('+');
 
  // https://developers.google.com/accounts/docs/OAuth2WebServer#formingtheurl
  var accessType = options.requestOfflineToken ? 'offline' : 'online';

  var loginStyle = OAuth._loginStyle('google', config, options);

  var loginUrl =
        'https://accounts.google.com/o/oauth2/auth' +
        '?response_type=code' +
        '&client_id=' + config.clientId +
        '&scope=' + flatScope +
        '&redirect_uri=' + OAuth._redirectUri('google', config) +
        '&state=' + OAuth._stateParam(loginStyle, credentialToken) +
        '&access_type=' + accessType;
        
  if (typeof options.prompt === 'string') {
    loginUrl += '&prompt=' + options.prompt;
=======

  var loginUrlParameters = {};
  if (config.loginUrlParameters){
    _.extend(loginUrlParameters, config.loginUrlParameters)
  }
  if (options.loginUrlParameters){
    _.extend(loginUrlParameters, options.loginUrlParameters)
  }
  var ILLEGAL_PARAMETERS = ['response_type', 'client_id', 'scope', 'redirect_uri', 'state'];
    // validate options keys
  _.each(_.keys(loginUrlParameters), function (key) {
    if (_.contains(ILLEGAL_PARAMETERS, key))
      throw new Error("Google.requestCredential: Invalid loginUrlParameter: " + key);
  });

  // backwards compatible options
  if (options.requestOfflineToken != null){
    loginUrlParameters.access_type = options.requestOfflineToken ? 'offline' : 'online'
  }
  if (options.prompt != null) {
    loginUrlParameters.prompt = options.prompt;
>>>>>>> meteor/devel
  } else if (options.forceApprovalPrompt) {
    loginUrlParameters.prompt = 'consent'
  }
<<<<<<< HEAD
  
  // Use Google's domain-specific login page if we want to restrict creation to
  // a particular email domain. (Don't use it if restrictCreationByEmailDomain
  // is a function.) Note that all this does is change Google's UI ---
  // accounts-base/accounts_server.js still checks server-side that the server
  // has the proper email address after the OAuth conversation.
  if (typeof Accounts._options.restrictCreationByEmailDomain === 'string') {
    loginUrl += '&hd=' + encodeURIComponent(Accounts._options.restrictCreationByEmailDomain);
  }
=======

  var loginStyle = OAuth._loginStyle('google', config, options);
  // https://developers.google.com/accounts/docs/OAuth2WebServer#formingtheurl
  _.extend(loginUrlParameters, {
    "response_type": "code",
    "client_id":  config.clientId,
    "scope": scope.join(' '), // space delimited
    "redirect_uri": OAuth._redirectUri('google', config),
    "state": OAuth._stateParam(loginStyle, credentialToken, options.redirectUrl)
  });
  var loginUrl = 'https://accounts.google.com/o/oauth2/auth?' +
    _.map(loginUrlParameters, function(value, param){
      return encodeURIComponent(param) + '=' + encodeURIComponent(value);
    }).join("&");
>>>>>>> meteor/devel

  OAuth.launchLogin({
    loginService: "google",
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
    popupOptions: { height: 600 }
  });
};
