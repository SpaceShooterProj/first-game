require(__dirname + '/../app/js/entry');
require('angular-mocks');

//Controllers
require(__dirname + '/controllers/auth/signin_controller_test');
require(__dirname + '/controllers/auth/signup_controller_test');
require(__dirname + '/controllers/auth/auth_controller_test');

//Services
require(__dirname + '/services/auth/user_auth_service_test');
