function viewUserLastSearchParams() {
	var lastSearchParams = {
		globalSerach:{
			searchParam: ""
		},
		tableSearch: {
		
		},
		pageNo:1,
		pageSize:10
	};
	
	var originalCopy = {};
	angular.copy(lastSearchParams,originalCopy);

	this.setLastFilterParam = function(searchData){
		lastSearchParams.globalSerach = {
			searchParam: searchData.globalSerach.searchParam
		};
		lastSearchParams.tableSearch = searchData.tableSearch;
		lastSearchParams.pageNo = searchData.pageNo;
		lastSearchParams.pageSize = searchData.pageSize;
	};

	this.getLastSearchParam = function(){
		return lastSearchParams;
	};

	this.resetLastFilterParam = function(){
		angular.copy(originalCopy,lastSearchParams);
	};
}

viewUserLastSearchParams.$inject = [];
module.exports = viewUserLastSearchParams;