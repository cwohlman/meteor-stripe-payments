Package.describe({
  name: 'cwohlman:stripe-payments',
  summary: 'Stripe payments for meteor',
  version: '0.1.0',
  git: 'https://github.com/cwohlman/meteor-stripe-payments.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');
  api.use('cwohlman:payments@0.1.0');
  api.imply('cwohlman:payments');
  api.use('templating');

  Npm.depends({
    'stripe': '3.0.2'
  });

  // Stripe OAuth
  // XXX implement this stuff.
  // api.use('accounts-base', ['client', 'server']);
  // api.use('accounts-oauth', ['client', 'server']);

  // api.use('oauth', ['client', 'server']);
  // api.use('oauth2', ['client', 'server']);
  // api.use('http', ['server']);
  // api.use('underscore', 'server');
  // api.use('templating', 'client');
  // api.use('random', 'client');
  // api.use('service-configuration', ['client', 'server']);
  
  // api.add_files(
  //   ['oauth/stripe_configure.html'
  //   , 'oauth/stripe_configure.js'
  //   , 'oauth/stripe_login_button.css'],
  // 'client');

  // api.add_files("oauth/accounts_stripe.js");
  // api.add_files('oauth/stripe_client.js', 'client');
  // api.add_files('oauth/stripe_server.js', 'server');

  // Server
  api.addFiles('server/config.js', ['server']);
  api.addFiles('server/createCredit.js', ['server']);
  api.addFiles('server/createDebit.js', ['server']);
  api.addFiles('server/createCustomer.js', ['server']);
  api.addFiles('server/createPaymentMethod.js', ['server']);

  // Client
  api.addFiles('client/config.html', ['client']);
  api.addFiles('client/config.js', ['client']);
  api.addFiles('client/createBankToken.js', ['client']);
  api.addFiles('client/createCardToken.js', ['client']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('cwohlman:stripe-payments');

  api.addFiles('tests/config.js');
  api.addFiles('tests/createCardToken.js');
  api.addFiles('tests/createCustomer.js');
});
