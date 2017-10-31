//css files import
import './css/index.css';
import './css/design/designstyles.css';
import './css/common/vmenu.css';

angular.module("app",['ui.router','ngAnimate','ngIdle','color.picker','angularModalService','rzModule','720kb.datepicker','angularTreeview']);

//js files import
require('./js');
require('./js/app/Controllers');
require('./js/app/Directives');
require('./js/app/Services');