function ModalCtrl($scope, $uibModal, $log) {

  //$scope.items = ['item1', 'item2', 'item3'];
  $scope.modalActions = {
		'addfile': {'path':'/themes/adminLTE/unl_data/pages/modals/addfile.html', 'controller':'AddElModalCtrl'},
		'editfile': {'path':'/themes/adminLTE/unl_data/pages/modals/editfile.html', 'controller':'EditElModalCtrl'},
		'editLab': {'path':'/themes/adminLTE/unl_data/pages/modals/editLab.html', 'controller':'EditElModalCtrl'},
		'adduser': {'path':'/themes/adminLTE/unl_data/pages/modals/adduser.html', 'controller':'AddUserModalCtrl'},
	  	'addsat': {'path':'/themes/adminLTE/unl_data/pages/modals/addsat.html', 'controller':'AddSatModalCtrl'},
		'about': {'path':'/themes/adminLTE/unl_data/pages/modals/about.html', 'controller':'AboutModalCtrl'},
		'licreq': {'path':'/themes/adminLTE/unl_data/pages/modals/licreq.html', 'controller':'LicReqModalCtrl'},
		'licreqwarn': {'path':'/themes/adminLTE/unl_data/pages/modals/licreqwarn.html', 'controller':'LicReqModalWarnCtrl'},
		'licupload': {'path':'/themes/adminLTE/unl_data/pages/modals/licupload.html', 'controller':'LicUploadModalCtrl'},
		'edituser': {'path':'/themes/adminLTE/unl_data/pages/modals/edituser.html', 'controller':'EditUserModalCtrl'},
		'moveto': {'path':'/themes/adminLTE/unl_data/pages/modals/moveto.html', 'controller':'MoveToModalCtrl'},
		'systemsettings': {'path':'/themes/adminLTE/unl_data/pages/modals/systemsettings.html', 'controller':'SystemSettingsModalCtrl'},
		'default': {'path':'/themes/adminLTE/unl_data/pages/modals/wtf.html', 'controller':'ModalInstanceCtrl'}
  };

  $scope.animationsEnabled = true;

  $scope.openModal = function (action , edituser, size) {
	$log.info('Modal action: ' + action);
	$scope.edituser = (edituser === undefined) ? '' :  edituser;
	var pathToModal = (action === undefined) ? 'default' :  action;
	// console.log(size + 'aaaaaaaaaa');
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: $scope.modalActions[pathToModal]['path'],
      controller: $scope.modalActions[pathToModal]['controller'],
      windowTopClass: "fade in out", 
      size: size,
      scope: $scope,
      backdrop: (size == 'megalg') ? false : true,
      resolve: {
        data: function () {
			switch(action) {
				case 'addfile':
						return {'name': $scope.newElementName, 'path': $scope.path};
						break;
				case 'editfile':
                                                $scope.labInfo.fullPathToFile = $scope.fullPathToFile;
						return {'info': $scope.labInfo, 'path': $scope.path};
						break;
				case 'editLab':
                                                $scope.labInfo.fullPathToFile = $scope.fullPathToFile;
						return {'info': $scope.labInfo, 'path': $scope.path};
						break;
				case 'adduser':
						return {'currentUserData': $scope.userdata};
						break;
				case 'addsat':
						return {'info': $scope.addsat};
						break;
				case 'edituser':
						return {'username': $scope.edituser};
						break;
				case 'moveto':
						return {'foldersArray': $scope.folderArrayToMove, 'filesArray': $scope.fileArrayToMove, 'path': $scope.path};
						break;
				default:
						return {'wtf': $scope.newElementName, 'path': $scope.path};
			}
        }
      }
    });
	switch(action) {
    case 'addfile':
		modalInstance.result.then(function (result) {
			if (result){
				$scope.newElementName='';
				$scope.newElementToggle=false;
				$scope.fileMngDraw($scope.path);
			} else {
				toastr["error"]("Server has error", "Error");
			}
		}, function () {
		//function if user just close modal
		//$log.info('Modal dismissed at: ' + new Date());
		});
		break;
	case 'editfile':
		modalInstance.result.then(function (result) {
			if (result.result){
				$scope.newElementName='';
				$scope.newElementToggle=false;
				$scope.getLabInfo(result.name)
				$scope.fileMngDraw($scope.path);
			} else {
				toastr["error"]("Server has error", "Error");
			}
		}, function () {
		//function if user just close modal
		//$log.info('Modal dismissed at: ' + new Date());
		});
		break;
        case 'editLab':
                modalInstance.result.then(function (result) {
                        if (result.result){
                                $scope.newElementName='';
                                $scope.newElementToggle=false;
                                $scope.getLabInfo(result.name)
                                $scope.fileMngDraw($scope.path);
                        } else {
                                toastr["error"]("Server has error", "Error");
                        }
                }, function () {
                //function if user just close modal
                //$log.info('Modal dismissed at: ' + new Date());
                });
                break;
	case 'adduser':
		modalInstance.result.then(function (result) {
			if (result){
				$scope.getUsersInfo()
			} else {
				toastr["error"]("Server has error", "Error");
			}
		}, function () {
		//function if user just close modal
		//$log.info('Modal dismissed at: ' + new Date());
		});
		break;
	case 'edituser':
		modalInstance.result.then(function (result) {
			if (result){
				$scope.getUsersInfo()
			} else {
				toastr["error"]("Server has error", "Error");
			}
		}, function () {
		//function if user just close modal
		//$log.info('Modal dismissed at: ' + new Date());
		});
		break;
        case 'addsat':
                modalInstance.result.then(function (result) {
                        if (result){
                                $scope.getClusterInfo()
                        } else {
                                toastr["error"]("Server has error", "Error");
                        }
                }, function () {
                //function if user just close modal
                //$log.info('Modal dismissed at: ' + new Date());
                });
                break;
	case 'moveto':
		modalInstance.result.then(function (result) {
			if (result){
				$scope.fileMngDraw($scope.pathBeforeMove);
			} else {
				$scope.fileMngDraw($scope.pathBeforeMove);
			}
		}, function () {
		//function if user just close modal
		//$log.info('Modal dismissed at: ' + new Date());
		//$scope.selectAll();
		$scope.allCheckedFlag=false;
		$scope.fileMngDraw($scope.pathBeforeMove);
		});
		break;
	default:
        modalInstance.result.then(function () {
		return true
		}, function () {
		$log.info('Modal dismissed at: ' + new Date());
		return false
		});
	}
  };
};

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.
function ModalInstanceCtrl($scope, $uibModalInstance) {

  $scope.closeModal = function () {
    $uibModalInstance.dismiss('cancel');
  };
};
function AddElModalCtrl($scope, $uibModalInstance, data, $http) {

	$scope.blockButtons=false;
	$scope.blockButtonsClass='';
	$scope.result=false;
	$scope.author='';
	$scope.description='';
	$scope.version=1;
	$scope.body='';
	$scope.scripttimeout=300;
	$scope.countdown=0;
	$scope.labName=data.name;
	$scope.labPath=data.path;
	$scope.errorClass='';
	$scope.errorMessage='';
	$scope.restrictTest = '\\d+';
	$scope.restrictNumber = '^[a-zA-Z0-9-_ ]+$';
	$scope.satArray = Array();
	$scope.satArrayRev = Array();
	$scope.sat = '-1';
	$scope.sats = '';
	$scope.selectSat = '-1';
	$http({
                        method: 'GET',
        url: '/api/clusterfull'})
                        .then(
                        function successCallback(response) {
                                //console.log(response.data.data)
                                $scope.sats=response.data.data;
                                //$scope.roleArray =
                                $.map($scope.sats, function(value) {
                                        $scope.satArray[value['name']]=value['id'];
                                        $scope.satArrayRev[value['id']]=value['name'];
                                });
                                //console.log($scope.roleArray)
                        },
                        function errorCallback(response) {
                                console.log(response)
                                console.log("Unknown Error. Why did API doesn't respond?")
                                $uibModalInstance.close($scope.result);
                        }
        );
	
	$scope.addNewLab = function () {
		
		$scope.path = ($scope.labPath === '/') ? $scope.labPath :  $scope.labPath+'/';
		
		$scope.labName = $scope.labName.replace(/[\',#,$,\",\\,/,%,\*,\,,\.,!]/g, '')
		//$scope.labName = $scope.labName.replace(/[\s]+/g, '_');
		
		$scope.newdata = {
		'author': $scope.author,
		'description': $scope.description,
		'scripttimeout': $scope.scripttimeout,
		'sat': $scope.selectSat,
		'countdown': $scope.countdown,
		'version': $scope.version,
		'name': $scope.labName,
		'body': $scope.body,
		'path': $scope.path}
		
		if ($scope.labName == ''){ 
			$scope.errorMessage="Name can't be empty!";
			$scope.errorClass='has-error';
			return;
			}
			
		$scope.blockButtons=true;
		$scope.blockButtonsClass='m-progress';
		
		$http({
			method: 'POST',
			url: 'api/labs',
			data: $scope.newdata})
			.then(
			function successCallback(response) {
				$scope.blockButtons=false;
				$scope.blockButtonsClass='';
				$scope.result=true;
				var lab_name = $scope.newdata.name+'.unl'
				console.log( $scope.newdata.path+lab_name)
				$scope.$parent.legacylabopen($scope.newdata.path+lab_name)
				$uibModalInstance.close($scope.result);
			}, 
			function errorCallback(response) {
				$scope.blockButtons=false;
				$scope.blockButtonsClass='';
				$scope.result=false;
				if (response.status == 400 && response.data.status == 'fail') {
					$scope.errorMessage="Lab with the same name found";
					$scope.errorClass='has-error';
					return;
				}
				if (response.status == 412 && response.data.status == "unauthorized"){
					console.log("Unauthorized user.")
					$uibModalInstance.dismiss('cancel');
					toastr["error"]("Unauthorized user", "Error");
				}
				console.log(response)
				console.log("Unknown Error. Why did API doesn't respond?")
				//$uibModalInstance.close($scope.result);
				toastr["error"](response.data.message, "Error");
			}
		);
	}

	$scope.opacity = function(){
		$(".modal-content").toggleClass("modal-content_opacity");
	};

	$scope.closeModal = function () {
		$uibModalInstance.dismiss('cancel');
	};
};
function EditElModalCtrl($scope, $uibModalInstance, data, $http) {
	
	
	$scope.blockButtons=false;
	$scope.blockButtonsClass='';
	$scope.result=false;
	$scope.author=data.info.author;
	$scope.description=data.info.description;
	$scope.version=data.info.version;
	$scope.body=data.info.body;
	$scope.scripttimeout=data.info.scripttimeout;
	$scope.countdown=data.info.countdown;
	$scope.labName=data.info.name;
	$scope.oldName=data.info.name;
	$scope.labPath=data.path;
	$scope.errorClass='';
	$scope.podError=false;
	$scope.errorMessage='';
	$scope.satArray = Array();
	$scope.satArrayRev = Array();
	$scope.sat = data.info.sat;
	$scope.sats = '';
	$scope.selectSat = data.info.sat;
	//$scope.selectMode = data.info.mode;
	$scope.shared = Array();
	$scope.shared.selected = data.info.shared;
	$scope.path = ($scope.labPath === '/') ? $scope.labPath :  $scope.labPath+'/';
	//console.log(data.info)
	$http({
                        method: 'GET',
        url: '/api/clusterfull'})
                        .then(
                        function successCallback(response) {
                                //console.log(response.data.data)
                                $scope.sats=response.data.data;
                                //$scope.roleArray =
                                $.map($scope.sats, function(value) {
                                        $scope.satArray[value['name']]=value['id'];
                                        $scope.satArrayRev[value['id']]=value['name'];
                                });
                                //console.log($scope.roleArray)
                        },
                        function errorCallback(response) {
                                console.log(response)
                                console.log("Unknown Error. Why did API doesn't respond?")
                                $uibModalInstance.close($scope.result);
                        }
        );
	$http({
                        method: 'GET',
	url: '/api/usernames'})
                        .then(
                        function successCallback(response) {
                                //console.log(response.data.data)
                                $scope.usernames=response.data.data;
                                //console.log($scope.roleArray)
                        },
                        function errorCallback(response) {
                                console.log(response)
                                console.log("Unknown Error. Why did API doesn't respond?")
                                $uibModalInstance.close($scope.result);
                        }
        );

	
	$scope.editLab = function() {
		if ( $scope.shared.selected == null || $scope.shared.selected.length == 0  ) { $scope.shared.selected = "private" } ;
		$scope.labName = $scope.labName.replace(/[\',#,$,\",\\,/,%,\*,\,,\.,!]/g, '')
		//$scope.labName = $scope.labName.replace(/[\s]+/g, '_');
		$scope.newdata = {
		'author': $scope.author,
		'description': $scope.description,
		'sat' : $scope.selectSat,
		//'mode' : $scope.selectMode,
		'shared' : $scope.shared.selected,
		'body': $scope.body,
		'scripttimeout': $scope.scripttimeout,
		'countdown': $scope.countdown,
		'version': $scope.version,
		'name': $scope.labName}
		
		if ($scope.labName == ''){ 
			$scope.errorMessage="Name can't be empty!";
			$scope.errorClass='has-error';
			return;
		}
		
		$http({
			method: 'PUT',
			url: 'api/labs'+$scope.path+$scope.oldName+'.unl',
			data: $scope.newdata})
			.then(
			function successCallback(response) {
				$scope.blockButtons=false;
				$scope.blockButtonsClass='';
				$scope.result= {
					'result' : true,
					'name' : $scope.path+$scope.labName+'.unl'
				}
				$uibModalInstance.close($scope.result);
			}, 
			function errorCallback(response) {
				$scope.blockButtons=false;
				$scope.blockButtonsClass='';
				$scope.result=false;
				if (response.status == 400 && response.data.status == 'fail') {
					$scope.errorMessage="Lab with the same name found";
					$scope.errorClass='has-error';
					return;
				}
				if (response.status == 412 && response.data.status == "unauthorized"){
					console.log("Unauthorized user.")
					$uibModalInstance.dismiss('cancel');
					toastr["error"]("Unauthorized user", "Error");
				}
				console.log(response)
				console.log("Unknown Error. Why did API doesn't respond?")
				//$uibModalInstance.close($scope.result);
				toastr["error"](response.data.message, "Error");
			}
		);
	}
	
	$scope.closeModal = function () {
		$uibModalInstance.dismiss('cancel');
	};
}

function AddSatModalCtrl($scope, $uibModalInstance, $http, data) {
	$scope.ip = '';
	$scope.name = '';
	$scope.password = '';
	$scope.addSat = function () {
		$scope.newdata = {
		'name': $scope.name,
                'ip': $scope.ip,
                'password': $scope.password
		}

                        $http({
                                method: 'POST',
                                url: '/api/cluster',
                                data: $scope.newdata})
                                                .then(
                                                function successCallback(response) {
                                                        //console.log(response)
                                                        $scope.result=true;
                                                        $uibModalInstance.close($scope.result);
                                                },
                                                function errorCallback(response) {
                                                        console.log(response)
                                                        console.log("Unknown Error. Why did API doesn't respond?")
                                                        if (response.status == 412 && response.data.status == "unauthorized"){
                                                                console.log("Unauthorized user.")
                                                                $uibModalInstance.dismiss('cancel');
                                                                toastr["error"]("Unauthorized user", "Error");
                                                        }
                                                        //$uibModalInstance.close($scope.result);
                                                        toastr["error"](response.data.message, "Error");
                                                });

	}
        $scope.closeModal = function () {
                $uibModalInstance.dismiss('cancel');
        };
}


function AddUserModalCtrl($scope, $uibModalInstance, $http, data) {
	$scope.roles='';
	$scope.selectRole='';
	$scope.roleArray=[];
	$scope.username='';
	$scope.radius='' ;
	$scope.selectAuth='' ;
	$scope.name='';
	$scope.email='';
	$scope.passwd='';
	$scope.passwdConfirm='';
	$scope.role='';
	$scope.selectSat='';
	$scope.satArray=[];
	$scope.satArrayRev=[];
	$scope.sat = 'any';
	$scope.sats = '';
	$scope.podArray=[];
	$scope.expiration='-1';
	$scope.datestart='-1';
	$scope.datestop='-1';
	$scope.timestart='0';
	$scope.timestop='0';
        $scope.lab='';
        $scope.labs=[];
        $scope.sticky=0;
	$scope.selectLab = { selected: "0" }
	$scope.html5 = "0";
	$scope.ram=-1;
	$scope.cpu=-1;
	$scope.onlyNumber = '^[0-9]+$';
	$scope.restrictNumber = '^[a-zA-Z0-9-@_\. ]+$';
	$scope.patternEmail = '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
	$scope.auths = [ 'internal','radius','active directory' ]
	//Generate unique POD //START
	var podArrayIndex=0;
	for (var key in data.currentUserData){
		$scope.podArray[podArrayIndex]=parseInt(data.currentUserData[key].pod)
		podArrayIndex++
	}
	$scope.pod=0;
	for (i = 0; i < $scope.podArray.length+10; i++) {
		$scope.pod++;
		if ($scope.podArray.indexOf($scope.pod) == -1){
			break;
		}
	}
	//Generate unique POD //END
	$scope.pexpiration='-1';
	$scope.errorClass='';
	$scope.errorMessage='';
	$scope.result=false;

	$scope.reportauth = function () {
		if ( $scope.selectAuth != 'internal' ) {
			$scope.passwd='whereismypassword?';
			$scope.passwdConfirm='whereismypassword?';
		} else { 
			$scope.passwd='';
			$scope.passwdConfirm='';
		}
	};

	$scope.closeModal = function () {
		$uibModalInstance.dismiss('cancel');
	};
	$http({
			method: 'GET',
	url: '/api/list/roles'})
			.then(
			function successCallback(response) {
				//console.log(response.data.data)
				$scope.roles=response.data.data;
				//$scope.roleArray = 
				$.map($scope.roles, function(value, index) {
					$scope.roleArray[value]=index;
				});
				//console.log($scope.roleArray)
			}, 
			function errorCallback(response) {
				console.log(response)
				console.log("Unknown Error. Why did API doesn't respond?")
				$uibModalInstance.close($scope.result);
			}
	);
	$http({
                        method: 'GET',
        url: '/api/clusterfullnd'})
                        .then(
                        function successCallback(response) {
                                //console.log(response.data.data)
                                $scope.sats=response.data.data;
                                //$scope.roleArray =
                                $.map($scope.sats, function(value) {
					$scope.satArray[value['name']]=value['id'];
					$scope.satArrayRev[value['id']]=value['name'];
                                });
                                //console.log($scope.roleArray)
                        },
                        function errorCallback(response) {
                                console.log(response)
                                console.log("Unknown Error. Why did API doesn't respond?")
                                $uibModalInstance.close($scope.result);
                        }
        );
        $http({
                        method: 'GET',
                        url: '/api/sharedlabs/'})
         .then(
                        function successCallback(response) {
                                $scope.labs = response.data.data.labs
                        },
                        function errorCallback(response) {
                                console.log(response)
                                console.log("Unknown Error. Why did API doesn't respond?")
                        }
        );
	$scope.console = { 0: "any" , 100: "native", 101: "html5", 102: "Desktop"};
	
	$scope.addNewUser = function(){
		$scope.errorClass=''; 
		$scope.errorMessage="";
		$scope.podError = false;
		//$scope.username = $scope.username.replace(/[\',#,$,@,\",\\,/,%,\*,\,,(,),:,;,^,&,\[,\],|]/g, '')
		$scope.username = $scope.username.replace(/[\',#,$,\",\\,/,%,\*,\,,(,),:,;,^,&,\[,\],|]/g, '')
		if ($scope.passwdConfirm!=$scope.passwd) {$scope.errorClass='has-error passwdConfirm'; $scope.errorMessage="Password doesn't match";}
		if ($scope.passwdConfirm=='') {$scope.errorClass='has-error passwdConfirm'; $scope.errorMessage="Password can't be empty!";}
		if ($scope.passwd=='') {$scope.errorClass='has-error passwd'; $scope.errorMessage="Password can't be empty!";}
		if ($scope.username=='') {$scope.errorClass='has-error username'; $scope.errorMessage="Username can't be empty!";}
		if ($scope.passwd=='whereismypassword?') { $scope.passwd='' ;}
		if ($scope.errorClass!=''){return;}
		//if ($scope.expiration != '-1' ) { $scope.expiration = new Date($scope.expiration).getTime()/1000   }
                if ($scope.datestart != '-1' ) { $scope.datestart = new Date($scope.datestart+'T'+$scope.timestart.replace('/','-')+':00Z').getTime()/1000   }
                if ($scope.datestop != '-1' ) { $scope.expiration = new Date($scope.datestop+'T'+$scope.timestop.replace('/','-')+':00Z').getTime()/1000   }
		//if ($scope.radius == true ) { $scope.extAuth = 'radius' }
		if( $scope.selectLab.selected != '0' ) { $scope.sticky = 1}
		
		$http.get('/api/users/').then(function(response){
			
			//console.log(response.data.data)
			//Compare unique POD //START
			for (var key in response.data.data){
				//console.log("pod", response.data.data[key].pod);
				if (parseInt(response.data.data[key].pod) == parseInt($scope.pod) && response.data.data[key].username != $scope.username) {
					$scope.podError=true; 
					break;
				}
			}
			//Compare unique POD //END
		
		}).then(function(response){
			
			if ($scope.podError){
				toastr["error"]("Please set unique POD value", "Error"); return;
			}
			
			$scope.newdata = {
				"username": $scope.username,
				"name": $scope.name,
				"email": $scope.email,
				"password": $scope.passwd,
				"role": $scope.roleArray[$scope.selectRole],
				"html5": $scope.html5,
				"sat": $scope.selectSat,
				"expiration": $scope.expiration,
				"datestart": $scope.datestart,
				"extauth": $scope.selectAuth,
				"pod": $scope.pod,
				"pexpiration": $scope.pexpiration,
				"cpu": $scope.cpu,
				"ram": $scope.ram,
				"lab": $scope.selectLab.selected,
				"sticky": $scope.sticky
			}
			
			$http({
				method: 'POST',
				url: '/api/users',
				data: $scope.newdata})
						.then(
						function successCallback(response) {
							//console.log(response)
							$scope.result=true;
							$uibModalInstance.close($scope.result);
						}, 
						function errorCallback(response) {
							console.log(response)
							console.log("Unknown Error. Why did API doesn't respond?")
							if (response.status == 412 && response.data.status == "unauthorized"){
								console.log("Unauthorized user.")
								$uibModalInstance.dismiss('cancel');
								toastr["error"]("Unauthorized user", "Error");
							}
							//$uibModalInstance.close($scope.result);
							toastr["error"](response.data.message, "Error");
						});
		});
	}
	
}

function AboutModalCtrl($scope, $uibModalInstance, data, $http) {

	$scope.expire = '';
	$scope.admins = '';
	$scope.editors = '';
	$scope.users = '';
	$http({
		method: 'GET',
		url: '/api/licrequest'})
	.then(
		function successCallback(response) {
			$scope.expire = response.data.data.expire;
			$scope.admins = response.data.data.admins;
			$scope.editors = response.data.data.editors;
			$scope.users = response.data.data.users;
			}
	);
}

function LicReqModalWarnCtrl($scope, $uibModalInstance, data, $http) {
	$scope.closeModal = function () {
		$('.modal').modal('toggle') // closes all active pop ups.
		$('.modal').modal('toggle') // closes all active pop ups.
		$('.modal-backdrop').remove() // removes the grey overlay.
        };
	$scope.Continue = function () {
		$uibModalInstance.close('ok');
	};
}

function LicReqModalCtrl($scope, $uibModalInstance, data, $http) {
        /*$scope.closeLicModal = function () {
                $uibModalInstance.dismiss('cancel');
        };
	*/
	$warn=$scope.openModal('licreqwarn','','megalg');
        $scope.licrequest = '';
        $http({
                method: 'GET',
                url: '/api/licrequest'})
        .then(
                function successCallback(response) {
                        $scope.licrequest = response.data.data.licrequest;
                        }
        );
        $scope.copyRequest = function () {
                $('.licrequest').select();
                document.execCommand("copy");
                //alert('toto');
        }
}

function SystemSettingsModalCtrl($scope, $uibModalInstance, data, $http) {
	        $http({
                method: 'GET',
                url: '/api/system/settings'})
        .then(
                function successCallback(response) {
			//alert ( response.data.data.radius_server_ip ) ;
			$scope.font_list = []
                        $scope.radius_server_ip = response.data.data.radius_server_ip ;
                        $scope.radius_server_ip_2 = response.data.data.radius_server_ip_2 ;
                        $scope.radius_server_port = response.data.data.radius_server_port ;
                        $scope.radius_server_port_2 = response.data.data.radius_server_port_2 ;
                        $scope.radius_server_secret = response.data.data.radius_server_secret ;
                        $scope.radius_server_secret_2 = response.data.data.radius_server_secret_2 ;
                        $scope.ad_server_ip = response.data.data.ad_server_ip ;
                        $scope.ad_server_port = response.data.data.ad_server_port ;
                        $scope.ad_server_tls = ( response.data.data.ad_server_tls == 0)?false:true ;
                        $scope.ad_server_dn = response.data.data.ad_server_dn ;
                        $scope.ad_server_group = response.data.data.ad_server_group ;
                        $scope.proxy_server = response.data.data.proxy_server ;
			$scope.proxy_port = response.data.data.proxy_port ;
			$scope.proxy_user = response.data.data.proxy_user ;
			$scope.proxy_password = response.data.data.proxy_password ;
			$scope.template_disabled = response.data.data.template_disabled;
			$scope.lic_check = response.data.data.lic_check;
			$scope.mindisk = response.data.data.mindisk;
			$scope.color_scheme = response.data.data.color_scheme;
			$scope.font_size = response.data.data.font_size;
			$scope.font_list =  response.data.data.font_list.split(";");
			$scope.font_name = response.data.data.font_name;
			$scope.ipv6 = ( response.data.data.ipv6 == 0 )?false:true ;
			}
        );
	$scope.closeModal = function () {
                $('.modal').modal('toggle') // closes all active pop ups.
                $('.modal').modal('toggle') // closes all active pop ups.
                $('.modal-backdrop').remove() // removes the grey overlay.
        };
	$scope.saveSystemSettings = function () {
        	$scope.newdata = {
                                 'radius_server_ip'  : $scope.radius_server_ip.replace(/_/g,''), 
                                 'radius_server_ip_2': $scope.radius_server_ip_2.replace(/_/g,''),
                                 'radius_server_port': $scope.radius_server_port,
                                 'radius_server_port_2': $scope.radius_server_port_2,
                                 'radius_server_secret': $scope.radius_server_secret,
                                 'radius_server_secret_2': $scope.radius_server_secret_2,
				 'ad_server_ip': $scope.ad_server_ip.replace(/_/g,''),
				 'ad_server_port': $scope.ad_server_port,
				 'ad_server_tls': ( $scope.ad_server_tls == true )?1:0,
				 'ad_server_dn': $scope.ad_server_dn,
				 'ad_server_group': $scope.ad_server_group,
                                 'proxy_server': $scope.proxy_server.replace(/_/g,''),
                                 'proxy_port': $scope.proxy_port,
                                 'proxy_user': $scope.proxy_user,
                                 'proxy_password': $scope.proxy_password,
                                 'template_disabled': $scope.template_disabled,
                                 'lic_check': $scope.lic_check,
                                 'mindisk': $scope.mindisk,
                                 'color_scheme': $scope.color_scheme,
				 'font_size': $scope.font_size,
				 'font_name': $scope.font_name,
				 'ipv6': ( $scope.ipv6 == true )?1:0
                                 }



                 $http({
                       method: 'POST',
                       url: '/api/system/settings',
                       data: $scope.newdata
                       }).then(
                             function successCallback(response) {
                                 //console.log(response)
                                  $scope.result=true;
                                  $uibModalInstance.close($scope.result);
                                  },
                                  function errorCallback(response) {
                                      console.log(response)
                                      console.log("Unknown Error. Why did API doesn't respond?")
                                      if (response.status == 412 && response.data.status == "unauthorized"){
                                           console.log("Unauthorized user.")
                                           $uibModalInstance.dismiss('cancel');
                                           toastr["error"]("Unauthorized user", "Error");
                                      }
                                                        //$uibModalInstance.close($scope.result);
                                      toastr["error"](response.data.message, "Error");
                       });
	}	
}



function LicUploadModalCtrl($scope, $uibModalInstance, data, $http) {
        $scope.closeModal = function () {
                $uibModalInstance.dismiss('cancel');
        };
        $scope.uploadLic = function () {
		$scope.newlic ; 
		$scope.newdata = {
                'newlic': $scope.newlic
		}
		console.log ( $scope.newlic);
	        $http({
                       method: 'POST',
                       url: '/api/uploadlic',
                       data: $scope.newdata})
                      .then(
                            function successCallback(response) {
                            //console.log(response)
                                 $scope.result=true;
                                 $uibModalInstance.close($scope.result);
				 toastr["success"](response.data.message, "Success");
                            },
                            function errorCallback(response) {
                                 console.log(response)
                                 console.log("Unknown Error. Why did API doesn't respond?")
                                 if (response.status == 412 && response.data.status == "unauthorized"){
                                           console.log("Unauthorized user.")
                                           $uibModalInstance.dismiss('cancel');
                                           toastr["error"]("Licence upload Failed</br>Unauthorized user", "Error");
                                 }
                                 //$uibModalInstance.close($scope.result);
                                 toastr["error"](response.data.message, "Error");
                             });
        }
}


function EditUserModalCtrl($scope, $uibModalInstance, data, $http) {
	
	$scope.roles='';
	$scope.selectRole='';
	$scope.roleArray=[];
	$scope.sats=''
	$scope.sat=''
	$scope.selectSat='';
        $scope.satArray=[];
        $scope.satArrayRev=[];
	$scope.username='';
	$scope.radius=false;
	$scope.extAuth='';
	$scope.name='';
	$scope.email='';
	$scope.passwd='';
	$scope.passwdConfirm='';
	$scope.role='';
	$scope.expiration='-1';
	$scope.datestart='-1';
	$scope.timestart='0';
	$scope.datestop='-1';
	$scope.timestop='0';
	$scope.pod='1';
	$scope.ram=-1;
	$scope.cpu=-1;
	$scope.sat=0;
	$scope.lab='';
	$scope.labs=[];
	$scope.sticky=0;
	$scope.pexpiration='-1';
	$scope.errorClass='';
	$scope.errorMessage='';
	$scope.podError=false;
	$scope.result=false;
	$scope.onlyNumber = '^[0-9]+$';
	$scope.restrictNumber = '^[a-zA-Z0-9-_ ]+$';
	$scope.patternEmail = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[\.][a-zA-Z]{2,3}$';
	$scope.selectLab = {selected: "0"};
	$scope.auths = [ 'internal','radius','active directory' ];
	$scope.selectAuth = '';
	
	console.log('Start edit user '+data.username)
	$http({
			method: 'GET',
			url: '/api/list/roles'})
	.then(
			function successCallback(response) {
				//console.log(response.data.data['admin'])
				$scope.roles=response.data.data;
				//$scope.roleArray = 
				$.map($scope.roles, function(value, index) {
					$scope.roleArray[value]=index;
				});
				//$scope.getuserInfo();
			}, 
			function errorCallback(response) {
				console.log(response)
				console.log("Unknown Error. Why did API doesn't respond?")
			}
	);
	$http({
                        method: 'GET',
                        url: '/api/clusterfullnd'})
        .then(
                        function successCallback(response) {
                                //console.log(response.data.data['admin'])
                                $scope.sats=response.data.data;
                                //$scope.roleArray =
                                $.map($scope.sats, function(value) {
                                        $scope.satArray[value['name']]=value['id'];
					$scope.satArrayRev[value['id']]=value['name'];
                                });
                                //$scope.getuserInfo();
                        },
                        function errorCallback(response) {
                                console.log(response)
                                console.log("Unknown Error. Why did API doesn't respond?")
                        }
        );
	$http({
                        method: 'GET',
                        url: '/api/sharedlabs/'+$scope.podId})
	 .then(
		 	function successCallback(response) {
				$scope.labs = response.data.data.labs
				console.log(JSON.stringify($scope.labs));
				$scope.getuserInfo();
			},
                        function errorCallback(response) {
                                console.log(response)
                                console.log("Unknown Error. Why did API doesn't respond?")
                        }
        );
	
	$scope.getuserInfo = function(){
		$http({
		method: 'GET',
		url: '/api/users/'+data.username})
		.then(
			function successCallback(response) {
				//console.log(response.data.data)
				$scope.userinfo=response.data.data;
				$scope.username=data.username;
				$scope.name=$scope.userinfo.name;
				$scope.email=$scope.userinfo.email;
				$scope.selectAuth = $scope.userinfo.extauth;
				console.log( $scope.extaut + " " + $scope.selectAuth )
				$scope.passwd='whereismypassword?';
				$scope.passwdConfirm='whereismypassword?';
				$scope.role=$scope.userinfo.role;
				$scope.html5=$scope.userinfo.html5;
				$scope.sat=$scope.userinfo.sat;
				//$scope.expiration='-1';
				if ( $scope.userinfo.expiration != '-1' ) {
					$scope.datestop=new Date($scope.userinfo.expiration*1000).toISOString().replace(/T.*/,'');
					$scope.timestop=new Date($scope.userinfo.expiration*1000).toISOString().replace(/.*T(.....).*/,'$1');
				}
                                if ( $scope.userinfo.datestart != '-1' ) {
                                        $scope.datestart=new Date($scope.userinfo.datestart*1000).toISOString().replace(/T.*/,'');
                                        $scope.timestart=new Date($scope.userinfo.datestart*1000).toISOString().replace(/.*T(.....).*/,'$1');
                                }
				$scope.pod=$scope.userinfo.pod;
				$scope.pexpiration='-1';
				$scope.cpu = parseInt($scope.userinfo.cpu,10);
				$scope.ram = parseInt($scope.userinfo.ram,10);
				$scope.selectRole = $scope.roles[$scope.role]
				$scope.lab = '0'
				angular.forEach( $scope.labs , function(sharedlab,index){
				//$scope.labs.each( function(index , sharedlab ){
					console.log( sharedlab['lab'] + " " +  sharedlab['spy'] )
					if ( sharedlab['lab'] == $scope.userinfo.lab ) { 
						if ( $scope.userinfo.spy == sharedlab['spy'] ) {
							$scope.lab = index + ''
						}
					}
				});
				if ( $scope.lab == '0' && $scope.userinfo.lab != '' ) {
					console.log ( 'lab missing !!!')
					$scope.labs.push( { "lab":  $scope.userinfo.lab + " (not available)", "spy": "-1", "owner": "self" } )
					$scope.lab = $scope.labs.length - 1 ;
				}
				$scope.selectLab.selected = $scope.lab + '';
				console.log($scope.selectLab.selected)
			}, 
			function errorCallback(response) {
				console.log(response)
				console.log("Unknown Error. Why did API doesn't respond?")
			}
		).finally( function() {$scope.selectRole = $scope.roles[$scope.role]; $scope.selectSat = $scope.sat  });
	}
	$scope.console = { 0: "any" , 100: "native", 101: "html5", 102: "Desktop"};

        $scope.reportauth = function () {
		console.log($scope.selectAuth)
                if ( $scope.selectAuth != 'internal' ) {
                        $scope.passwd='whereismypassword?';
                        $scope.passwdConfirm='whereismypassword?';
                } else {
                        $scope.passwd='';
                        $scope.passwdConfirm='';
                }
        };

	$scope.reportLab = function() {
		console.log($scope.selectLab.selected)
	};
	
	$scope.editUser = function(){
		
		$scope.errorClass=''; 
		$scope.errorMessage="";
		console.log('date start:'+$scope.datestart);
		console.log('time start:'+$scope.timestart);
		console.log('date stop:'+$scope.datestop);
		console.log('time stop:'+$scope.timestop);
		console.log('date stop format:'+$scope.datestop.replace(/\//g,'-')+'T'+$scope.timestop+':00Z')
		if ($scope.passwdConfirm!=$scope.passwd) {$scope.errorClass='has-error passwdConfirm'; $scope.errorMessage="Password doesn't match";}
		if ($scope.passwdConfirm=='') {$scope.errorClass='has-error passwdConfirm'; $scope.errorMessage="Password can't be empty!";}
		if ($scope.passwd=='') {$scope.errorClass='has-error passwd'; $scope.errorMessage="Password can't be empty!";}
		if ($scope.passwd=='whereismypassword?') { $scope.passwd='' ;}
		if ($scope.errorClass!=''){return;}
		if ($scope.datestart != '-1' ) { $scope.datestart = new Date($scope.datestart+'T'+$scope.timestart.replace('/','-')+':00Z').getTime()/1000   }
		if ($scope.datestop != '-1' ) { $scope.expiration = new Date($scope.datestop+'T'+$scope.timestop.replace('/','-')+':00Z').getTime()/1000   }
		//if ($scope.radius==true) { $scope.extAuth = 'radius' } else { $scope.extAuth = 'internal' } 
		if( $scope.selectLab.selected != '0' ) { $scope.sticky = 1}
		console.log('date start:'+$scope.datestart);
		console.log('date stop:'+$scope.datestop);
		
		$http.get('/api/users/').then(function(response){
			
			console.log(response.data.data)
			//Compare unique POD //START
			for (var key in response.data.data){
				console.log(parseInt(response.data.data[key].pod))
				if (parseInt(response.data.data[key].pod) == parseInt($scope.pod) && response.data.data[key].username != $scope.username) {
					$scope.podError=true; break;
				}
			}
			//Compare unique POD //END
			console.log($scope.podError)
		}).then(function(response){
		if ($scope.podError){toastr["error"]("Please set unique POD value", "Error"); return;}
		
		$scope.newdata = {
			"username": $scope.username,
			"name": $scope.name,
			"email": $scope.email,
			"password": $scope.passwd,
			"role": $scope.roleArray[$scope.selectRole],
			"html5": $scope.html5,
			"sat": $scope.selectSat,
			"expiration": $scope.expiration,
			"datestart": $scope.datestart,
			"pod": $scope.pod,
			"pexpiration": $scope.pexpiration,
			"extauth": $scope.selectAuth,
			"ram": $scope.ram,
			"cpu": $scope.cpu,
			"lab": $scope.labs[$scope.selectLab.selected]['lab'],
			"spy": $scope.labs[$scope.selectLab.selected]['spy'],
			"sticky": $scope.sticky
		}
		
		$http({
		method: 'PUT',
		url: '/api/users/'+data.username,
		data: $scope.newdata})
		.then(
			function successCallback(response) {
				//console.log(response)
				console.log('End edit user '+data.username)
				$scope.result=true;
				$uibModalInstance.close($scope.result);
			}, 
			function errorCallback(response) {
				console.log(response)
				console.log("Unknown Error. Why did API doesn't respond?")
				if (response.status == 412 && response.data.status == "unauthorized"){
							console.log("Unauthorized user.")
							$uibModalInstance.dismiss('cancel');
							toastr["error"]("Unauthorized user", "Error");
				}
				$uibModalInstance.close($scope.result);
				toastr["error"](response.data.message, "Error");
			});
		});
	}
	
	
	$scope.closeModal = function () {
		$uibModalInstance.dismiss('cancel');
	};
	
}

function MoveToModalCtrl($scope, $uibModalInstance, data, $http, $location,$interval) {
	
	$scope.filedata=data.filesArray
	$scope.folderdata=data.foldersArray
	$scope.path=data.path
	$scope.pathForTest=($scope.path === '/') ? $scope.path :  $scope.path+'/';
	$scope.errorMessage="";
	$scope.folderSearchList=[];
	$scope.currentSearchPath='';
	$scope.newpath="";
	$scope.openDropdown="";
	$scope.pathDeeper=0;
	$scope.pathDeeperCheck=0;
	$scope.apiSearch=false;
	$scope.localSearch="";
	$scope.blockButtons=false;
	$scope.blockButtonsClass='';
	// $scope.inputSlash=$('#newPathInput');
	//$("#newPathInput").dropdown();
	console.log($scope.filedata)
	console.log($scope.folderdata)
	
	// $scope.inputSlash = function(){
	// 	$('#newPathInput').focus();
	// 	var inputSlash = $('#newPathInput').val();
	// 	inputSlash.val('/');
	// 	inputSlash.val(inputSlash);
	// }

	$scope.fastSearch = function(pathInput){
		$scope.errorMessage="";
		var re = /^\//;
		//console.log($scope.newpath.search(re))
		if (pathInput == "" || pathInput.search(re) == -1) {$scope.openDropdown=""; return;}
		var fullPathSplit=$scope.newpath.split('/')
		var pathSearch='';
		console.log(fullPathSplit)
		$scope.localSearch=fullPathSplit[fullPathSplit.length-1];
		console.log(fullPathSplit.length)
		if ($scope.pathDeeperCheck > fullPathSplit.length-1) $scope.pathDeeper=fullPathSplit.length-2
		$scope.pathDeeperCheck = fullPathSplit.length-1
		for (z = 0; z < (fullPathSplit.length-1); z++) {
			pathSearch+=fullPathSplit[z]+'/'
		}
			console.log(pathSearch)
		if ($scope.pathDeeper < fullPathSplit.length-1){
			$scope.localSearch='';
			$scope.apiSearch=true;
			$scope.openDropdown="open";
			$scope.pathDeeper=fullPathSplit.length-1
			console.log('API search')
			$scope.currentSearchPath=pathSearch;
			if (pathSearch != '/') pathSearch=pathSearch.replace(/\/$/, '');
			$http.get('/api/folders'+pathSearch).then(
				function successCallback(response) {
					$scope.folderSearchList=response.data.data.folders
					if  ($scope.folderSearchList.length ==  1) $scope.openDropdown="";
					console.log(response)
					$scope.apiSearch=false;
				}, 
				function errorCallback(response) {
				console.log(response)
				$scope.apiSearch=false;
				if (response.status == 412 && response.data.status == "unauthorized"){
							console.log("Unauthorized user.")
							$uibModalInstance.dismiss('cancel');
							toastr["error"]("Unauthorized user", "Error");
				}
				//console.log("Unknown Error. Why did API doesn't respond?"); $location.path("/login");
				}	
			);
		} else {
			if ($scope.localSearch == '') {$scope.openDropdown=""; return;}
			$scope.openDropdown="open";
			console.log('Local Search');
			console.log($scope.localSearch)
			
		}
	}
	$scope.fastSearchFast = function(foldername){
		var fastPath=$scope.currentSearchPath+foldername+'/';
		$scope.newpath=fastPath;
		$scope.fastSearch(fastPath);
		$("#newPathInput").focus();

	}
	
	$scope.deselect = function(){
	
	}
	
	$scope.move = function(){
		$scope.openDropdown="";
		$scope.folderfound=true;
		var re = /^\/.*\/$/;
		$scope.newpath = "/" + $scope.newpath
		console.log($scope.newpath.search(re))
		$scope.errorMessage="";
		if ($scope.newpath == "") {$scope.errorMessage="New path can't be empty"; return;}
		if ($scope.newpath.search(re) == -1 && $scope.newpath != "/") {$scope.errorMessage="Unknown path format, be sure that you added '/' to the end"; return;}
		if ($scope.pathForTest == $scope.newpath) {$scope.errorMessage="Path can't be the same"; return;}
		
		for (i = 0; i < $scope.folderdata.length; i++) {
			if ($scope.pathForTest+$scope.folderdata[i]+'/' == $scope.newpath) {$scope.errorMessage="You can't select this directory"; return;}
			//console.log($scope.pathForTest+$scope.folderdata[i][0]+'/')
		}
		$http.get('/api/folders'+$scope.newpath.replace(/\/$/, '')).then(
				function successCallback(response) {
					console.log(response)
				}, 
				function errorCallback(response) {
				console.log(response)
				console.log(response.status)
				console.log(response.statusText)
				if (response.status==404 && response.statusText=='Not Found') {$scope.errorMessage="You set incorrect path. Folder no found!"; $scope.folderfound=false; return;}
				//console.log("Unknown Error. Why did API doesn't respond?"); $location.path("/login");
				}	
		).finally( function(){
			if ($scope.folderfound){
				$scope.blockButtons=true;
				$scope.blockButtonsClass='m-progress';
				var folderTester=$scope.folderdata.length
				var fileTester=$scope.filedata.length
				var stopTester=5;
				if ($scope.folderdata.length > 0)
					for (fo = 0; fo < $scope.folderdata.length; fo++) {
				///Move Folders///START
						$http({
						method: 'PUT',
						url: '/api/folders'+$scope.pathForTest+$scope.folderdata[fo],
						data: {"path":$scope.newpath+$scope.folderdata[fo]}})
							.then(
							function successCallback(response) {
								console.log(response)
								folderTester--
							}, 
							function errorCallback(response) {
								console.log(response)
								if (response.status == 412 && response.data.status == "unauthorized"){
											console.log("Unauthorized user.")
											$uibModalInstance.dismiss('cancel');
											toastr["error"]("Unauthorized user", "Error");
								}
								if (response.data.message=="Destination folder already exists (60046).") {folderTester--; toastr["error"]("Destination folder already exists", "Error");}
								console.log("Unknown Error. Why did API doesn't respond?");
                                                                toastr.options.timeOut = 5000;
                                                                toastr["error"](response.data.message, "Error")	
								//$location.path("/login");
							}
						); 
					} 
				///Move Folders///END
				/////////////////////
				//Edit APPLY for File //START
				if ($scope.filedata.length > 0)
					for (fi = 0; fi < $scope.filedata.length; fi++) {
						var tempPathNew = ($scope.newpath  == '/') ? $scope.newpath  : $scope.newpath.replace(/\/$/, '');
						$http({
						method: 'PUT',
						url: '/api/labs'+$scope.pathForTest+$scope.filedata[fi]+ '/move',
						data: {"path": tempPathNew}})
							.then(
							function successCallback(response) {
								console.log(response)
								fileTester--
							}, 
							function errorCallback(response) {
								console.log(response)
								if (response.data.message=="Lab already exists (60016).") {fileTester--; toastr["error"]("Lab already exists", "Error");}
								if (response.status == 412 && response.data.status == "unauthorized"){
											console.log("Unauthorized user.")
											$uibModalInstance.dismiss('cancel');
											toastr["error"]("Unauthorized user", "Error");
								}
								toastr["error"](response.data.message, "Error");
								console.log("Unknown Error. Why did API doesn't respond?");
								$uibModalInstance.dismiss('cancel');
							}
						);
				//Edit APPLY for File //END
					}
				$interval(function () {
					console.log
					if ( (folderTester<=0 && fileTester<=0) || stopTester==0 ) {
						$scope.result=true;$uibModalInstance.close($scope.result); 
						$scope.blockButtons=false;
						$scope.blockButtonsClass='';
						return;}
					else stopTester--
				}, 1000);
			}
		})
		
		console.log($scope.errorMessage)
	}

	$scope.closeModal = function () {
		$uibModalInstance.dismiss('cancel');
	};
	
}

