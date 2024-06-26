/* UNL App */
var app_main_unl = angular.module("unlMainApp", [
    "ui.router", 
    "ui.select", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize",
        "ngAnimate",
        "ui.knob",
        "ngCookies",
        "ui.grid",
        "ui.grid.resizeColumns",
]); 

app_main_unl.run(function($rootScope) {
    $rootScope.imgpath = '/themes/adminLTE/unl_data/img/';
    $rootScope.angularCtlrPath = '/themes/adminLTE/unl_data/angular/controllers';
    $rootScope.jspath = '/themes/adminLTE/unl_data/js/';
    $rootScope.csspath = '/themes/adminLTE/unl_data/css/';
    $rootScope.pagespath = '/themes/adminLTE/unl_data/pages/';
    $rootScope.bodyclass = 'sidebar-collapse';
    $rootScope.UIlegacy = 1 ;
    $rootScope.EVE_VERSION = "5.0.1-143-PRO";
    $rootScope.loginError = '';
    $rootScope.eve_uid = '';
});

app_main_unl.directive('focusOn', function() {
   return function(scope, elem, attr) {
      scope.$on('focusOn', function(e, name) {
        if(name === attr.focusOn) {
          elem[0].focus();
        }
      });
   };
});

app_main_unl.factory('focus', function ($rootScope, $timeout) {
  return function(name) {
          console.log(name)
    $timeout(function (){
      $rootScope.$broadcast('focusOn', name);
    });
  }
});

app_main_unl.directive('plumbItem', function() {
        return {
                controller: 'labController',
                link : function (scope, element, attrs) {
                        jsPlumb.makeTarget(element);
                }
        };
});

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
app_main_unl.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

app_main_unl.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  //$controllerProvider.allowGlobals();
}]);

app_main_unl.config(['$compileProvider', function($compileProvider) {
   $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|telnet|vnc|rdp):/);
}]);

app_main_unl.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    // disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    //.....here proceed with your routes
}]);


app_main_unl.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

/* Setup App Main Controller */
app_main_unl.controller('unlMainController', ['$scope', '$interval','$rootScope', '$http', '$location', '$cookies', function($scope, $interval, $rootScope, $http, $location, $cookies) {
                /*
                $.get('/VERSION?'+Date.now(), function(data) {
                    if ( data.trim()  != $rootScope.EVE_VERSION ) window.location.reload(true);
                });
                */
                $.ajax({ type: "GET",
                        url: '/VERSION?'+Date.now(),
                        async: false,
                        beforeSend: function (xhr) {
                                xhr.overrideMimeType('application/text');  // this line prevents XML parsing error with firefox
                        },
                        success :  function(data) {
                                if ( data.trim()  != $rootScope.EVE_VERSION ) window.location.reload(true);
                        }
                });
                $.ajax({ type: "GET",
                        url: '/online_version?'+Date.now(),
                        async: false,
                        beforeSend: function (xhr) {
                                       xhr.overrideMimeType('application/text');  // this line prevents XML parsing error with firefox
                                    },
                        success :  function(data) {
                                        $.ajax({ type: "GET",
                                                url: '/local_version?'+Date.now(),
                                                async: false,
                                                beforeSend: function (xhr) {
                                                        xhr.overrideMimeType('application/text');  // this line prevents XML parsing error with firefox
                                                },
                                                success :  function(data) {
                                                        $rootScope.local_version = data.trim();
                                                }
                                        });
                                        $rootScope.online_version = data.trim();
                                        if ( $rootScope.local_version  != $rootScope.online_version && $rootScope.online_version != "" ) {
                                                $rootScope.new_version = ' (New Release '+$rootScope.online_version+' )'
                                        }
                        }
                });

                $rootScope.openLaba=true;
                $scope.html5 = 1 ;
                console.log($cookies.get('privacy'));
                if ( $cookies.get('html5')  != null ) $scope.html5=$cookies.get('html5');
                // polling function def
        //$output['data']['diskavailable'] = apiGetDiskAvailable() ;
        //$output['data']['disk'] = apiGetDiskUsage();
        //$output['data']['mindisk'] = MINDISK;
                var sess_upd = function () {
                        $http.get('/api/poll').then(
                                function successCallback(response) {
                                        disk = response.data.data.disk
                                        diskavailable = response.data.data.diskavailable
                                        mindisk = response.data.data.mindisk
                                        if ( (diskavailable - disk ) < mindisk ) {
                                                // ALERT
                                                toastr["error"]("Disk Usage Alert</br>Only "+ Math.round((diskavailable - disk )) +"GB Available", "Error");
                                        }
                                },
                                function errorCallback(response) {
                                        $interval.cancel(timer_promise);
                                        if (response.status == '412'){
                                                $rootScope.loginError = response.data.data.reason ;
                                                console.log(response.data.data.reason)
                                                $location.path("/login");}
                                        else {console.log("Unknown Error. Why did API doesn't respond?")}
                                        deferred.resolve();
                                });
                }
                if ( timer_promise == undefined ) {
                        var timer_promise  ;
                }
                $scope.testAUTH = function (path) {
                var deferred = $.Deferred();
                $scope.userfolder='none';
                $http.get('/api/auth').then(
                        function successCallback(response) {
                                // here we need to create a polling to update session time
                                // polling fuction
                                $interval.cancel(timer_promise);
                                timer_promise = $interval( sess_upd, 5000 );
                                if (response.status == '200'){
                                $rootScope.username=response.data.data.username;
                                $rootScope.folder= (response.data.data.folder === null) ? '/' : response.data.data.folder;
                                //$rootScope.folder=$cookies.get('current_path');
                                $rootScope.email=response.data.data.email;
                                $rootScope.role=response.data.data.role;
                                $rootScope.name=response.data.data.name;
                                if (path != "/lab") $rootScope.lab=response.data.data.lab;
                                $rootScope.lang=response.data.data.lang;
                                $rootScope.tenant=response.data.data.tenant;
                                $scope.userfolder = response.data.folder;
                                $scope.html5 = response.data.data.html5;
                                $scope.eve_uid = response.data.eve_uid;
                                console.log($rootScope.lab);
                                console.log("html5: " + $scope.html5 );
                                // Preview need to get back to legacy UI
                                if ( $rootScope.UIlegacy == 1 && response.data.data.html5 != 2)  {
                                        if ($rootScope.lab === null ) {$location.path(path)} else {location.href ='/legacy/'};
                                        } else {
                                        if ($rootScope.lab === null ) {$location.path(path)} else {$location.path('/lab')};
                                        }
                                }
                                if ( $scope.html5 == 2 ) {
                                        blockUI();
                                        $location.path('/login');
                                        console.log("post creation docker");
                                        $http({
                                                method: 'POST',
                                                url: '/api/html5Desktop',
                                                data: {"cookie":"none"}})
                                                .then(
                                                        function successCallback(response) {
                                                                console.log("Docker Created");
                                                                console.log("URL = " + response.data.html5Desktop);
                                                                location.href = response.data.html5Desktop
                                                        },
                                                        function errorCallback(response) {
                                                                //console.log(response)
                                                                console.log("Docker creation error");
                                                        }
                                                );
                                }
                                deferred.resolve();


                        }, 
                        function errorCallback(response) {
                                $interval.cancel();
                                if (response.status == '401'){
                                //$rootScope.loginError = response.data.data.reason ;
                                //onsole.log(response.data.data.reason) 
                                $location.path("/login");}
                                else {console.log("Unknown Error. Why did API doesn't respond?")}
                                deferred.resolve();
                        });
                        return deferred.promise();
                }
                //return $scope.testAUTH('/main');
}]);

/* Setup Rounting For All Pages */
/* Setup Layout Part - Header */
app_main_unl.controller('HeaderController', ['$scope', '$http', '$location', '$rootScope', '$interval',function($scope, $http, $location, $rootScope, $interval) {
                // Clock header
                $scope.local_version = $rootScope.local_version
                $scope.clock = "00:00";
                $scope.tickInterval = 1000 ;
                var tick = function() {
                        $scope.clock = Date.now();
                        //$(tick, $scope.tickInterval);
                }
                $interval(tick, $scope.tickInterval);
                //console.log('here')
                $scope.activeClass='active';
                $scope.emptyClass='';
                $scope.currentPath=$location.path();
                $scope.logout = function() {
                        $http.get('/api/auth/logout').then(
                        function successCallback(response) {
                                if (response.status == '200'){
                                $location.path("/login");}
                        },
                        function errorCallback(response) {
                                console.log("Unknown Error. Why did API doesn't respond?")
                                $location.path("/login");
                        });
                }
                $scope.blockui = function(position){
                        //if ($location.path() != position) blockUI()
                }
                $scope.activeLinks = {
                        'main' : '/main',
                        'usermgmt' : '/usermgmt',
                        'processmgmt' : '/processmgmt',
                        'clustermgmt' : '/clustermgmt',
                        'labmgmt' : '/labmgmt',
                        'syslog' : '/syslog',
                        'sysstat' : '/sysstat',
                }
                console.log($location.path())
}]);
app_main_unl.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider, $scope ) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/main"); 

    //console.log($scope.userfolder)

    $stateProvider

        // LOGIN
        .state('login', {
            url: "/login",
            templateUrl: "/themes/adminLTE/unl_data/pages/login.html",            
            data: {pageTitle: 'Login'},
            controller: "loginController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'app_main_unl',
                        insertBefore: '#load_files_before',
                        files: [
                             '/themes/adminLTE/unl_data/js/angularjs/controllers/loginCtrl.js',
                             '/themes/adminLTE/unl_data/css/custom_unl.css',
                        ] 
                    });
                }]
            }
        })

        // MAIN_LAYOUT
        .state('main', {
            url: "/main",
            templateUrl: "/themes/adminLTE/unl_data/pages/main.html",
            data: {pageTitle: 'Main menu'},
            controller: "mainController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'app_main_unl',
                        insertBefore: '#load_files_before',
                        files: [
                             '/themes/adminLTE/unl_data/js/angularjs/controllers/mainCtrl.js',
                             '/themes/adminLTE/unl_data/js/angularjs/controllers/modalCtrl.js',
                             '/themes/adminLTE/unl_data/js/angularjs/controllers/labviewCtrl.js',
                             '/themes/adminLTE/plugins/angularJS/plugins/angular-file-upload/angular-file-upload.min.js',
                             '/themes/adminLTE/dist/css/skins/skin-blue.min.css',
                             //'/themes/adminLTE/dist/js/app.min.js',
                        ] 
                    });
                }]
            }
        })
                // USER MANAGEMENT
        .state('usermgmt', {
            url: "/usermgmt",
            templateUrl: "/themes/adminLTE/unl_data/pages/usermgmt.html",
            data: {pageTitle: 'User management'},
            controller: "usermgmtController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'app_main_unl',
                        insertBefore: '#load_files_before',
                        files: [
                             '/themes/adminLTE/unl_data/js/angularjs/controllers/usermgmtCtrl.js',
                             '/themes/adminLTE/unl_data/js/angularjs/controllers/modalCtrl.js',
                        ] 
                    });
                }]
            }
        })
                // Node management
        .state('processmgmt', {
            url: "/processmgmt",
            templateUrl: "/themes/adminLTE/unl_data/pages/processmgmt.html",
            data: {pageTitle: 'Running Nodes management'},
                        controller: "processmgmtController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'app_main_unl',
                        insertBefore: '#load_files_before',
                        files: [
                             '/themes/adminLTE/unl_data/js/angularjs/controllers/processmgmtCtrl.js',
                             '/themes/adminLTE/unl_data/js/angularjs/controllers/modalCtrl.js'
                        ]
                    });
                }]
            }
        })
                // Lab management 
        .state('labmgmt', {
            url: "/labmgmt",
            templateUrl: "/themes/adminLTE/unl_data/pages/labmgmt.html",
            data: {pageTitle: 'Running Lab(s) management'},
                        controller: "labmgmtController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'app_main_unl',
                        insertBefore: '#load_files_before',
                        files: [
                             '/themes/adminLTE/unl_data/js/angularjs/controllers/labmgmtCtrl.js',
                             '/themes/adminLTE/unl_data/js/angularjs/controllers/modalCtrl.js'
                        ]
                    });
                }]
            }
        })
                // SYSTEM LOG
        .state('syslog', {
            url: "/syslog",
            templateUrl: "/themes/adminLTE/unl_data/pages/syslog.html",
            data: {pageTitle: 'System logs'},
                        controller: "syslogController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'app_main_unl',
                        insertBefore: '#load_files_before',
                        files: [
                             '/themes/adminLTE/unl_data/js/angularjs/controllers/syslogCtrl.js',
                             '/themes/adminLTE/unl_data/js/angularjs/controllers/modalCtrl.js' 
                        ] 
                    });
                }]
            }
        })
                // SYSTEM STAT
        .state('sysstat', {
            url: "/sysstat",
            templateUrl: "/themes/adminLTE/unl_data/pages/sysstat.html",
            data: {pageTitle: 'System status'},
                        controller: "sysstatController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'app_main_unl',
                        insertBefore: '#load_files_before',
                        files: [
                             '/themes/adminLTE/unl_data/js/angularjs/controllers/sysstatCtrl.js',
                             '/themes/adminLTE/unl_data/js/angularjs/controllers/modalCtrl.js',
                                                         '/themes/adminLTE/plugins/ng-knob/d3.min.js'
                        ] 
                    });
                }]
            }
        })

                // Cluster
        .state('clustermgmt', {
            url: "/clustermgmt",
            templateUrl: "/themes/adminLTE/unl_data/pages/cluster.html",
            data: {pageTitle: 'Cluster management'},
                        controller: "clustermgmtController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'app_main_unl',
                        insertBefore: '#load_files_before',
                        files: [
                             '/themes/adminLTE/unl_data/js/angularjs/controllers/modalCtrl.js',
                             '/themes/adminLTE/unl_data/js/angularjs/controllers/clustermgmtCtrl.js',
                                                         '/themes/adminLTE/plugins/ng-knob/d3.min.js'
                        ]
                    });
                }]
            }
        })
                //LAB LAYOUT
        .state('labnew', {
            url: "/lab",
            templateUrl: "/themes/adminLTE/unl_data/pages/lab/lab.html",
            data: {pageTitle: 'Lab'},
                        controller: "labController",
            resolve: {
                deps: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'app_main_unl',
                        insertBefore: '#load_files_before',
                        files: [
                             '/themes/adminLTE/unl_data/js/angularjs/controllers/lab/labCtrl.js',
                             '/themes/adminLTE/unl_data/js/angularjs/controllers/lab/sidebarCtrl.js',
                             '/themes/adminLTE/dist/css/skins/skin-blue.min.css',
                             '/themes/adminLTE/plugins/ng-knob/d3.min.js',
                             '/themes/adminLTE/unl_data/js/angularjs/controllers/lab/modalCtrl.js',
                             '/themes/adminLTE/unl_data/js/angularjs/controllers/lab/contextMenu.js',
                                                         '/themes/adminLTE/plugins/bootstrap-select/css/bootstrap-select.css',
                                                         '/themes/adminLTE/plugins/bootstrap-select/js/bootstrap-select.js',
                        ] 
                    });
                }]
            }
        })
}]);

/* Init global settings and run the app */
app_main_unl.run(["$rootScope", "$state", function($rootScope, $state) {
    $rootScope.$state = $state; // state to be accessed from view
}]);