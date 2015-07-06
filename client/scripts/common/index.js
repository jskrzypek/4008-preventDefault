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

    // set up console.log on preventDefault with event Data
    // if(window.Event) {
    //     console.log('set up console.log on preventDefault with event Data');
    //     var _preventDefault = window.Event.prototype.preventDefault;
    //     window.Event.prototype.preventDefault = function() {
    //         console.log(this, arguments);
    //         _preventDefault.call(this, arguments);
    //     };
    // }

    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/tab/div');

            $stateProvider.state('tabs', {
                url: '/tab',
                abstract: true,
                template: require('./views/tabs.html'),
                onEnter: require('../drag-unfix')
                // controller: fullname + '.tabs as vm'
            });
            // $stateProvider.state('tabs.divFix', {
            //     url: '/divfix',
            //     views: {
            //         'div-fix-tab': {
            //             template: require('./views/div.html'),
            //             controller: fullname + '.list as vm'
            //         }
            //     },
            //     onEnter: require('../drag-fix'),
            //     onExit: require('../drag-unfix')
            // });
            $stateProvider.state('tabs.div', {
                url: '/div',
                views: {
                    'div-tab': {
                        template: require('./views/div.html'),
                        controller: fullname + '.list as vm'
                    }
                },
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
            $stateProvider.state('tabs.ionContent', {
                url: '/ionContent',
                views: {
                    'ion-content-tab': {
                        template: require('./views/ion-content.html'),
                        controller: fullname + '.list as vm'
                    }
                }
            });
        }
    ]);

    return app;
};
