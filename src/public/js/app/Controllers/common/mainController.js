function mainController($scope,idleObserverService){    
	$scope.logout = function () {
		idleObserverService.logout();
	};
}

mainController.$inject = ["$scope","idleObserverService"];
module.exports = mainController;