Stripe = {};

Stripe.requestCredential = function (options, credentialRequestCompleteCallback) {

    if (!credentialRequestCompleteCallback && typeof options === 'function') {
        credentialRequestCompleteCallback = options;
        options = {};
    }

    var config = ServiceConfiguration.configurations.findOne({service: 'stripe'});
    if (!config) {
        credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
        return;
    }

    var credentialToken = Random.id();
    var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var display = mobile ? 'touch' : 'popup';
    var scope = 'read_write';
    var dimensions = {width: 600, height: 600};

    if (options && options.requestPermissions) {
        scope = options.requestPermissions.join(',');
    }

    var loginUrl =
        'https://connect.stripe.com/oauth/authorize' +
        		'?response_type=code' +
            '&scope=' + scope +
            '&client_id=' + config.appId +
            '&redirect_uri=' + Meteor.absoluteUrl('_oauth/stripe?close=close') +
            '&state=' + credentialToken;

    Oauth.initiateLogin(credentialToken, loginUrl, credentialRequestCompleteCallback, dimensions);
};
