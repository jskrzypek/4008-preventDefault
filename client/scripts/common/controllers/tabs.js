'use strict';
var controllername = 'tabs';

module.exports = function(app) {
    var fullname = app.name + '.' + controllername;
    /*jshint validthis: true */

    var deps = [];

    function controller() {
        var vm = this;
        vm.controllername = fullname;
        vm.dragFixed = false;
        vm.divIcon = function() {
            return vm.dragFixed ? 'ion-heart' : 'ion-heart-broken';
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
