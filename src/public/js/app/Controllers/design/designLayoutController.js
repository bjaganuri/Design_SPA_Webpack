function designLayoutController($scope,fileUpload,restDataService){
	$scope.psdTotemplate = true;
	$scope.fileName = 'Choose a file...';
	$scope.overwrite = false;
	$scope.saveFileForFutureUse = false;
	
	$scope.uploadFile = function(){
		var file = $scope.myFile;
		var filename = file.name;
		var fileExt = filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;
		var fileType = "application/octet-stream";
		if(fileExt === ""){
			alert("Import Valid file");
		}
		else{
			if(fileExt === "psd"){
				fileType = "application/octet-stream";
			}
			else{
				fileType = file.type;
			}

			var uploadUrl = "/uploadPSDFile/psd";
			file.type = fileType;
			var fd = new FormData();
			fd.append('file', file);
			fd.append('comments', "No comment");	
			fd.append('fileName', filename);
			fd.append('type', fileType);
			fd.append('saveFileToDB', $scope.saveFileForFutureUse);
			if(!$scope.saveFileForFutureUse){
				$scope.executeFileparse(fd , uploadUrl);
			}
			else{
				restDataService.getData('/fileExists' ,{fileName:filename , type:fileType} ,function (response) {
					if(response.data.status === true || response.data.status === "true" || response.data.status){
						if (confirm("File Already exists do you want to overwrite") == true){
							$scope.overwrite = true;
						}
						else{
							$scope.overwrite = false;
						}
					}
					else{
						$scope.overwrite = false;
					}				
					fd.append('overwrite', $scope.overwrite);
					$scope.executeFileparse(fd , uploadUrl);
				});
			}
		}
	};

	$scope.executeFileparse = function(fd , uploadUrl){
		fileUpload.uploadFileToUrl(fd, uploadUrl,function(res){
			console.log(res.data);
		});
	};
}

designLayoutController.$inject = ["$scope","fileUpload","restDataService"];
module.exports = designLayoutController;