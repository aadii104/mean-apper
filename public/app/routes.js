var app = angular.module('appRoutes', ['ngRoute']); 

.config(function($routeProvider, $locationProvider) {
	.when('/',{
		templateUrl: 'app/views/pages/home.html'
	})

	.when('/about',{
		templateUrl: 'app/views/pages/about.html'
	})

	.when('/register',{
		templateUrl: 'app/views/pages/users/register.html'
		contrller: 'regCtrl',
		contrllerAs: 'register',
		authenticated: false
	})
	.when('/login',{
		templateUrl: 'app/views/pages/users/login.html'
		authenticated: false
	})
	.when('/logout',{
		templateUrl: 'app/views/pages/users/logout.html'
		authenticated: true
	})
	.when('/profile',{
		templateUrl: 'app/views/pages/users/profile.html'
		authenticated: true
	})
	.when('/facebook/:token',{
		templateUrl: 'app/views/pages/users/social/social.html',
		controller: 'facebookCtrl',
		controllerAs: 'facebook'
		authenticated: false
	})
	.when('/facebookerror',{
		templateUrl: 'app/views/pages/users/login.html',
		controller: 'facebookCtrl',
		controllerAs: 'facebook'
		authenticated: false
	})
	.when('/activate/:token',{
		templateUrl: 'app/views/pages/users/activation/activate.html',
		controller: 'emailCtrl',
		controllerAs: 'email'
	})


	.otherwise({ redirectTo: '/'});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});
app.run(['$routescope','Auth', '$location', function($routescope, Auth) {
		$routescope.$on('$routeChangeStart', function(event, next, current) {

			if (!next.$$route.authenticated == true){
				if(!Auth.isLoggedIn(){
					event.preventDefault();
					$location.path('/');
				})

			}else if(next.$$route.authenticated ==false){
				if(Auth.isLoggedIn()){
					event.preventDefault();
					$location.path('/profile')
				}
			} else{

			}
		})

	}]);