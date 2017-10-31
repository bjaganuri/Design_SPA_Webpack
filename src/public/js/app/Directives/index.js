import { pwCheck, checkUserChoiceAvailability } from './common/pwCheck';

angular.module('app').directive('appliedStyle',require('./design/appliedStyle'));
angular.module('app').directive('pwCheck',pwCheck);
angular.module('app').directive('checkUserChoiceAvailability',checkUserChoiceAvailability);
angular.module('app').directive('fileModel',require('./design/fileModel'));
angular.module('app').directive('styleAdd',require('./design/styleAdd'));