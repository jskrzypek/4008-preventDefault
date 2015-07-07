'use strict';
var controllername = 'list';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = ['$timeout', '$scope', '$state'];

    function controller($timeout, $scope, $state) {
        var vm = this;
        vm.controllername = fullname;

        if($state.is('tabs.ionContent')) {
            vm.title = 'weird otherwise route fix';
        }

        if($state.is('tabs.ionContent2')) {
            vm.title = 'div w/ ng-repeat';
        }

        if($state.is('tabs.ionList')) {
            vm.title = 'ion-list & ion-item';
        }

        vm.items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8', 'Item 9', 'Item 10', 'Item 11', 'Item 12'];

        vm.getToggleDragIcon = function() {
            return window.ionic.dragFixed ? 'button-positive ion-heart' : 'button-assertive ion-heart-broken';
        };
        vm.toggleDragFix = function() {
            require('../../drag-handler')({
                fix: !window.ionic.dragFixed
            });
        };
    }

    controller.$inject = deps;
    app.controller(fullname, controller);
};
