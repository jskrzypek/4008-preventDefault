'use strict';
var controllername = 'list';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$timeout', '$scope', '$state'];

    function controller($timeout, $scope, $state) {
        var vm = this;
        vm.controllername = fullname;

        if($state.is('tabs.div')) {
            vm.title = 'div w/ ng-repeat';
        }

        if($state.is('tabs.ionList')) {
            vm.title = 'ion-list & ion-item';
        }

        vm.items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10', 'Item 11', 'Item 12'];

        vm.doRefresh = function() {
            console.log('Refreshing!');
            $timeout(function() {
                //simulate async response
                vm.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);

                //Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');

            }, 1000);
        };
        vm.toggleDragFix = function() {
            if(!vm.dragFixed) {
                require('../../drag-fix')();
            } else {
                require('../../drag-unfix')();
            }
            vm.dragFixed = !vm.dragFixed;
        };
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
