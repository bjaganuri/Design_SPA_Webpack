function restDataService($http,$log) {
	this.get = function (url,data) {
		return $http.get(url,{params: data});
	};

	this.post = function (url,data,config) {
		return $http.post(url,data,config);
	};
	
	this.getData = function (url,data,callback) {
		this.get(url,data).then(function (response) {
			callback(response);
		},function (Error) {
			$log.error(Error);
		});
	};

	this.postData = function (url,data,callback) {
		this.post(url,data).then(function (response) {
			callback(response);
		},function (Error) {
			$log.error(Error);
		});
	};
}

module.exports = restDataService;