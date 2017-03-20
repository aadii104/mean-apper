angular.module('userApp', ['appRoute', 'userController', 'userServices', 'ngAnimate', 'mainController'. 'authService'])


.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptors');
});