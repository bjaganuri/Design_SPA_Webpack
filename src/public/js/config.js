function config($stateProvider, $urlRouterProvider,$locationProvider,$urlMatcherFactoryProvider,$httpProvider,idleObserverServiceProvider,T,MIN,IdleProvider,KeepaliveProvider){
	idleObserverServiceProvider.setTimeout(MIN);
	IdleProvider.idle(T*MIN);
	IdleProvider.timeout(T*MIN);
	KeepaliveProvider.interval(2*T*MIN);
	
	$urlMatcherFactoryProvider.caseInsensitive(true);
	$urlMatcherFactoryProvider.strictMode(false);
	$httpProvider.interceptors.push('restDataInterceptor');
	$urlRouterProvider.when("/" , '/authenticateUser/login');
	$urlRouterProvider.when("" , '/authenticateUser/login');
	$stateProvider
	.state("authenticateUser",{
		abstract:true,
		url:'/authenticateUser',
		views:{
			"authenticationViews@":{
				template:"<div ui-view></div>"	
			}
		}
	})
	.state('authenticateUser.login',{
		url:'/login',
		templateUrl:"/login",
		controller:"loginController"
	})
	.state('authenticateUser.signUp',{
		url:"/signUp",
		templateUrl:"/signUp",
		controller:"signupController"
	})
	.state('authenticateUser.recoverCredentials',{
		url:"/recoverCredentials",
		templateUrl:"/forgotCredentials",
		controller:"recoverUserController"
	})
	.state('authenticateUser.logout',{
		url:"/logout",
		templateUrl:"/logout",
		controller:["$scope" , "$window","viewUserLastSearchParams", function($scope,$window,viewUserLastSearchParams){
			//$window.sessionStorage.clear();
			viewUserLastSearchParams.resetLastFilterParam();
		}]
	})
	.state("common",{
		abstract:true,
		url:'/common',
		views:{
			"header":{
				templateUrl:"/header"
			},
			"hContentPanel":{
				template:"<div ui-view='content'></div>"
			},
			"footer":{
				templateUrl:"/footer"
			}
		}
	})
	.state("common.home" , {
		url:'/home',
		views:{
			"content@common":{
				templateUrl:"/home"
			}
		}
	})
	.state("common.about" , {
		url:'/about',
		views:{
			"content@common":{
				templateUrl:"/about"
			}
		}
	})
	.state("common.query" , {
		url:'/query',
		views:{
			"content@common":{
				templateUrl:"/query"
			}
		}
	})
	.state("learn" , {
		abstract:true,
		url:'/learn',
		views:{
			"header":{
				templateUrl:"/header"
			},
			"hContentPanel":{
				template:"<div ui-view='content'></div>"
			},
			"footer":{
				templateUrl:"/footer"
			}
		}
	})
	.state("learn.html" , {
		url:'/html',
		views:{
			"content@learn":{
				templateUrl:"/HTML",
				controller:"learnController"
			}
		},
		resolve:{
			getIndexData:function (restDataService) {
				return restDataService.get('/getIndexJson' , {pageName:'html'});
			}
		}
	})
	.state("learn.css" , {
		url:'/css',
		views:{
			"content@learn":{
				templateUrl:"/CSS",
				controller:"learnController"
			}
		},
		resolve:{
			getIndexData:function (restDataService) {
				return restDataService.get('/getIndexJson' , {pageName:'css'});
			}
		}
	})
	.state("learn.js" , {
		url:'/js',
		views:{
			"content@learn":{
				templateUrl:"/JS",
				controller:"learnController"
			}
		},
		resolve:{
			getIndexData:function (restDataService) {
				return restDataService.get('/getIndexJson' , {pageName:'js'});
			}
		}
	})
	.state("design" , {
		abstract:true,
		url:'/design',
		views:{
			"header":{
				templateUrl:"/brand"	
			},
			"verticalMenu":{
				templateUrl:"/VerticalMenu"
			},
			"vContentPanel":{
				template:"<div ui-view='content'></div>"
			},
			"footer":{
				templateUrl:"/footer"
			}
		}
	})
	.state("design.designElement" , {
		url:'/designElement',
		views:{
			"content@design":{
				templateUrl:"/designElement",
				controller:"designElementController"
			}
		}
	})
	.state("design.designComponent" , {
		url:'/designComponent',
		views:{
			"content@design":{
				templateUrl:"/designComponent"
			}
		}
	})
	.state("design.designLayout" , {
		url:'/designLayout',
		views:{
			"content@design":{
				templateUrl:"/designLayout",
				controller:"designLayoutController"
			}
		}
	})
	.state("userProfile",{
		url:"/myProfile",
		views:{
			"header":{
				templateUrl:"/brand"	
			},
			"verticalMenu":{
				templateUrl:"/VerticalMenu"
			},
			"vContentPanel":{
				templateUrl:'/userProfile',
				controller:"userProfileController"
			},
			"footer":{
				templateUrl:"/footer"
			}
		}
	})
	.state("adminOPs",{
		abstract:true,
		url:"/adminOp",
		resolve : {
			userToView:function(){
				return {};
			},
			lastViewedUserActList:function(){
				return {};
			}
		},
		views:{
			"header":{
				templateUrl:"/brand"	
			},
			"verticalMenu":{
				templateUrl:"/VerticalMenu"
			},
			"vContentPanel":{
				template:"<div ui-view='content'></div>"
			},
			"footer":{
				templateUrl:"/footer"
			}
		}
	})
	.state("adminOPs.viewUser" , {
		url:"/viewUser",
		resolve : {
			lastViewedUserActList:function(restDataService,viewUserLastSearchParams){
				var lastSearchDataObj = viewUserLastSearchParams.getLastSearchParam();
				if(lastSearchDataObj.searchParam !== ""){
					return restDataService.get('/getUserAccountsList' , lastSearchDataObj);
				}
				else{
					return {};
				}
			}
		},
		views:{
			"content@adminOPs":{
				templateUrl:'/viewUser',
				controller:"manageUserAccounts"
			}
		}
	})
	.state("adminOPs.viewUserDetail" , {
		url:"/viewUserDetails/:userID",
		resolve : {
			userToView:function(restDataService,$stateParams){
				return restDataService.get("/getUserProfile" , {username:$stateParams.userID});
			}
		},
		views:{
			"content@adminOPs":{
				templateUrl:function($stateParams){
					return '/viewUserDetails/'+$stateParams.userID;
				},
				controller:"manageUserAccounts"
			}
		}
	})
	.state("adminOPs.addNewUser" , {
		url:"/addNewUser",
		views:{
			"content@adminOPs":{
				templateUrl:'/addNewUser',
				controller:"manageUserAccounts"
			}
		}
	})
	.state('otherwise',{
		url:'*path',
		templateUrl:'/resourceNotFound'
	});
	
	$locationProvider.html5Mode(true);
}

module.exports = config;