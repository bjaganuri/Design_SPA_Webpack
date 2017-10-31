angular.module('app').constant("MIN" , 15);
angular.module('app').constant("T" , 60);
angular.module('app').service('fileUpload',require('./common/fileUpload'));
angular.module('app').provider('idleObserverService',require('./common/idleObserverService'));
angular.module('app').service('restDataService',require('./common/restDataService'));
angular.module('app').service('restDataInterceptor',require('./common/restDataInterceptor'));
angular.module('app').service('viewUserLastSearchParams',require('./admin/viewUserLastSearchParams'));