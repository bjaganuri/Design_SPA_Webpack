function learnController($scope,getIndexData,$anchorScroll,$location,$state){
	$scope.indexTreeViewObject = getIndexData.data;	
	$scope.$watch( 'indexTree.currentNode', function( newObj, oldObj ) {
		if( $scope.indexTree && angular.isObject($scope.indexTree.currentNode) ) {
			var newHash = $scope.indexTree.currentNode.id;
			if ($location.hash() !== newHash) {
				$location.hash($scope.indexTree.currentNode.id);
			}
			else{
				$anchorScroll($scope.indexTree.currentNode.id);
			}
		}
	}, true);
}

learnController.$inject = ['$scope','getIndexData','$anchorScroll','$location','$state'];
module.exports = learnController;
