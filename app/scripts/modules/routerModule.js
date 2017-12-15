var routerModule = angular.module('RouterModule', ['ui.router']);

routerModule.config(function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');

  $stateProvider
      .state('home', {
        url: '/home',
        controller: 'HomeController',
        templateUrl: 'app/views/home.html'
      })
      .state('app', {
        abstract: true,
        controller: 'AppController',
        templateUrl: 'app/views/layout/main.html'
      })
      .state('message', {
        parent: 'app',
        url: '/message/:name',
        controller: 'MessageController',
        templateUrl: 'app/views/message.html'
      })
			.state('list', {
				parent: 'app',
				url: '/message',
				controller: 'MessageController.index',
				templateUrl: 'app/views/list.html'
			})
			.state('call', {
				parent: 'app',
				url: '/call',
				controller: 'CallController',
				templateUrl: 'app/views/call.html'
			})
			.state('contact', {
				parent: 'app',
				url: '/contact',
				controller: 'ContactController',
				templateUrl: 'app/views/contact.html'
			})
});
