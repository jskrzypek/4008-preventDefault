'use strict';

module.exports = function(app) {
    // inject:start
    require('./list')(app);
    // require('./tabs')(app);
    // inject:end
};