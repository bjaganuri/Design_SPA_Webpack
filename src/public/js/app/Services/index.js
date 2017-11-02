var app = angular.module('app');
app.constant("MIN" , 15);
app.constant("T" , 60);
app.service('fileUpload',require('./common/fileUpload'));
app.provider('idleObserverService',require('./common/idleObserverService'));
app.service('restDataService',require('./common/restDataService'));
app.service('restDataInterceptor',require('./common/restDataInterceptor'));
app.service('viewUserLastSearchParams',require('./admin/viewUserLastSearchParams'));