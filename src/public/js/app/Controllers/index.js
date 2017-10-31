angular.module('app').controller('mainController',require('./common/mainController'));
angular.module('app').controller('loginController',require('./user/loginController'));
angular.module('app').controller('signupController',require('./user/signupController'));
angular.module('app').controller('recoverUserController',require('./user/recoverUserController'));
angular.module('app').controller('userProfileController',require('./user/userProfileController'));
angular.module('app').controller('designElementController',require('./design/designElementController'));
angular.module('app').controller('designLayoutController',require('./design/designLayoutController'));
angular.module('app').controller('manageUserAccounts',require('./admin/manageUserAccounts'));
angular.module('app').controller('learnController',require('./learn/learnController'));