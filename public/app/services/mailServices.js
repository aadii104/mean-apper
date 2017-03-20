angular.module('mailServices', [])


.factory('Email',function ($http) {
		emailFactory = {};

		// Email.create(a_email);
		emailFactory.create = function (a_email) {
			 return $http.post('/api/emails', a_email);
		}


		return emailFactory;
})
