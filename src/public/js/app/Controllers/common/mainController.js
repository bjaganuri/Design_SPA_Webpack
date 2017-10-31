function mainController($scope,idleObserverService){    
	$scope.logout = function () {
		idleObserverService.logout();
	};
}

module.exports = mainController;