angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider,$locationProvider) {
	$routeProvider
	.when('/',{
		templateUrl:'app/views/pages/home.html'
	})

	.when('/about',{
		templateUrl: 'app/views/pages/about.html'
	})

	.when('/services',{
		templateUrl: 'app/views/pages/services.html'
	})

	.when('/team',{
		templateUrl: 'app/views/pages/team.html'
	})

	.when('/contact',{
		templateUrl: 'app/views/pages/contact.html',
		controller: 'contactCtrl',
		controllerAs: 'email'
	})

	.when('/careers',{
		templateUrl: 'app/views/pages/careers.html'
	})

	.when('/survey',{
		templateUrl: 'app/views/pages/survey.html'
	})

	.when('/thank',{
		templateUrl: 'app/views/pages/thank.html'
	})


	.otherwise({ redirectTo: '/'});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase:false
	});
});