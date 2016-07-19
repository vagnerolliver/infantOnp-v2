//the login display

angular.module('Login', [])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'authController',
			 controllerAs: 'Login'
		})
  }])
  .controller('authController', authController)
	 .run(function($http, $rootScope) {
		$rootScope.authenticated = false;
		$rootScope.current_user = 'Guest';

		$rootScope.signout = function(){
			$http.get('users/logout');
			$rootScope.authenticated = false;
			$rootScope.current_user = 'Guest';
		};
	}); 
  // .service('myServiceUser', myServiceUser)


	function authController($http, $rootScope, $location){
		var vm = this;
		vm.login = {email: '', password: ''};
		vm.error_message = '';

  	vm.submitForm = submitForm;
  	function submitForm(login) {
  		console.log(login)
			$http.post('/users/login', login).success(function(data){
				console.log(data)
				if(data.state == 'success'){
					$rootScope.authenticated = true;
					$rootScope.current_user = data.user.email;
					$location.path('/');
				}
				else{
					vm.error_message = data.message;
				}
			});
		}
	}