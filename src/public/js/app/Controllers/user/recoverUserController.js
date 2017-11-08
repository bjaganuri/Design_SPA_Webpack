function recoverUserController($scope,restDataService){
	$scope.checkUser = {};
	$scope.newPasswd = {};
	$scope.submitted = false;
	$scope.hidePasswdResetForm = true;
	$scope.validUserData = true;
	$scope.passwdResetSuccess = false;
	$scope.passwdResetFailed = false;
	$scope.errorMsg = "Invalid User Details";
	$scope.getCredentials = function($event){
		$event.preventDefault();
		$scope.submitted = true;
		var recoverUserData = angular.copy($scope.checkUser);
		recoverUserData.dob = (new Date($scope.checkUser.dob)).toDateString();
		if($scope.recoverUserForm.$valid){
			restDataService.getData("/recoverUser",recoverUserData,function(response){
				if(response.data.status == "Failed") {
					if(response.data.hasOwnProperty("info") && response.data.info.hasOwnProperty("message") && response.data.info.message !== ""){
						$scope.errorMsg = response.data.info.message;
					}
					else {
						$scope.errorMsg = "Unknown error occured while resetting password pls contact admin";
					}
					$scope.hidePasswdResetForm = true;
					$scope.passwdResetSuccess = false;
					$scope.passwdResetFailed = false;
					$scope.validUserData = false;
				}
				else {
					if(response.data.status == "Success" && Object.keys(response.data.user).length > 0){
						$scope.user = response.data.user;
						$scope.hidePasswdResetForm = false;
						$scope.passwdResetSuccess = false;
						$scope.passwdResetFailed = false;
						$scope.validUserData = true;
					}
					else{
						$scope.errorMsg = "Invalid User Details";
						$scope.hidePasswdResetForm = true;
						$scope.passwdResetSuccess = false;
						$scope.passwdResetFailed = false;
						$scope.validUserData = false;
					}
				}
				$event.target.reset();
				$scope.checkUser = {};
				$scope.recoverUserForm.$setPristine();
				$scope.recoverUserForm.$setUntouched();
				$scope.submitted = false;
			});
		}
	};

	$scope.setNewPassword = function($event){
		$event.preventDefault();
		if($scope.setNewPasswdForm.$valid){
			$scope.user.password = $scope.newPasswd.password;
			restDataService.postData("/setNewPassword",$scope.user,function(response){
				if(response.data.status == "Success"){
					$scope.hidePasswdResetForm = true;
					$scope.passwdResetSuccess = true;
					$scope.passwdResetFailed = false;
					$scope.validUserData = true;
				}
				else if(response.data.status === "VAL_ERROR"){
					$scope.passwdResetSuccess = false;
					$scope.passwdResetFailed = true;
					$scope.validUserData = true;
				}
				$event.target.reset();
				$scope.newPasswd = {};
				$scope.setNewPasswdForm.$setPristine();
				$scope.setNewPasswdForm.$setUntouched();
			});
		}
	};
}

recoverUserController.$inject = ['$scope','restDataService'];
module.exports = recoverUserController;