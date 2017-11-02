import { pwCheck, checkUserChoiceAvailability } from './common/pwCheck';

var app = angular.module('app');
app.directive('appliedStyle',require('./design/appliedStyle'));
app.directive('pwCheck',pwCheck);
app.directive('checkUserChoiceAvailability',checkUserChoiceAvailability);
app.directive('fileModel',require('./design/fileModel'));
app.directive('styleAdd',require('./design/styleAdd'));