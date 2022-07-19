function loginController($scope, $http, $location, $cookies, $rootScope) {
        $scope.eveversion = $rootScope.EVE_VERSION; //+" (Steph Edition)";
	$scope.html5 = '1' ;
	if ( $cookies.get('html5') == undefined ) {
           $scope.html5 = '1' ;
	} else { 
	   $scope.html5 = $cookies.get('html5');
	}
	$.when( $scope.testAUTH("/main")).then( function() {
		 $scope.loginMessageInfo=$rootScope.loginError;
		console.log($rootScope.loginError);
	});
	$scope.loginMessageInfo=$rootScope.loginError;
	$('body').removeClass().addClass('hold-transition login-page');
	$scope.tryLogin = function(){
		var now = new Date();
		var exp = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());
		$cookies.put('html5',$scope.html5, { 'expires': exp }); 
		$scope.loginMessageInfo="";
			$http({
			method: 'POST',
			url: '/api/auth/login',
			data: {"username":$scope.username,"password":$scope.password,"html5":$scope.html5}})
				.then(
				function successCallback(response) {
					if (response.status == '200'){
					blockUI();
					$scope.testAUTH("/main");}
				}, 
				function errorCallback(response) {
					if (response.status == '400'){
					$scope.loginMessageInfo='Wrong username and password! Your username is <EIN>@leedslab.uk your password is what is on AD. Please click Forgotten Password below to reset.'}
					else if ( response.status == '402' ) {
						$scope.loginMessageInfo='Insufficient Licenses'}
					else if ( response.status == '401' ) {
						$scope.loginMessageInfo=$rootScope.loginError;
					} else console.log("Unknown Error. Why did API doesn't respond?")
				}
			);
		}
}
