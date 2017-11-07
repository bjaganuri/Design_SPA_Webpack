import { pwCheck, checkUserChoiceAvailability, updateOnEnter } from './common/pwCheck';

var app = angular.module('app');
app.directive('appliedStyle',require('./design/appliedStyle'));
app.directive('pwCheck',pwCheck);
app.directive('updateOnEnter',updateOnEnter);
app.directive('checkUserChoiceAvailability',checkUserChoiceAvailability);
app.directive('fileModel',require('./design/fileModel'));
app.directive('styleAdd',require('./design/styleAdd'));