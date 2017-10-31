function userProfileController($scope,restDataService) {
	$scope.updateUser = {};
	$scope.submitted = false;
	$scope.updateSuccess = false;
	$scope.updateError = "Unknown Error Please try again";
	$scope.showUpdateError = false;
	
	$scope.$on('$stateChangeSuccess', function() {
		$scope.getProfileData();
	});
	
	$scope.getProfileData = function () {
		restDataService.getData("/getUserProfile",'',function (response) {
			response.data.hasOwnProperty("__v") ? delete response.data['__v'] : null;
			response.data.altMobile = parseInt(response.data.altMobile,10);
			response.data.mobile = parseInt(response.data.mobile,10);
			//response.data.dob = (new Date(response.data.dob)).toLocaleDateString();
			$scope.updateUser = response.data;
		});
	};
	
	$scope.updateProfile = function ($event) {
		$scope.submitted = true;
		if($scope.updateProfileForm.$valid){
			$scope.updateUser.dob = (new Date($scope.updateUser.dob)).toDateString();
			restDataService.postData("/updateUserProfile",$scope.updateUser,function(response){
				if(response.data.status == "Success"){
					$event.target.reset();
					$scope.updateUser = {};
					$scope.updateProfileForm.$setPristine();
					$scope.updateProfileForm.$setUntouched();
					$scope.submitted = false;
					$scope.updateSuccess = true;
					$scope.showUpdateError = false;
				}
				else{
					$scope.updateError = response.data ? response.data : $scope.updateError;
					$scope.showUpdateError = true;
				}
			});
		}
	};
	
	$scope.updateProfileAgain = function () {
		$scope.updateSuccess = false;
		$scope.getProfileData();
	};
}

module.exports = userProfileController;