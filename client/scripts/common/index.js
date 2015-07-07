'use strict';
require('angular-ui-router');
require('angular-ionic');

var modulename = 'common';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var app = angular.module(fullname, ['ui.router', 'ionic']);
    // inject:folders start
    require('./controllers')(app);
    // inject:folders end

    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/tab/ionContent');

            $stateProvider.state('tabs', {
                url: '/tab',
                abstract: true,
                template: require('./views/tabs.html')
            });
            $stateProvider.state('tabs.ionContent', {
                url: '/ionContent',
                views: {
                    'ion-content-tab': {
                        template: require('./views/ion-content.html'),
                        controller: fullname + '.list as vm'
                    }
                }
            });
            $stateProvider.state('tabs.ionContent2', {
                url: '/ionContent2',
                views: {
                    'ion-content2-tab': {
                        template: require('./views/ion-content.html'),
                        controller: fullname + '.list as vm'
                    }
                }
            });
            $stateProvider.state('tabs.ionList', {
                url: '/ionList',
                views: {
                    'ion-list-tab': {
                        template: require('./views/ion-list.html'),
                        controller: fullname + '.list as vm'
                    }
                }
            });
        }
    ]);

    return app;
};
