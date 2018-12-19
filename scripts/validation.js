(function (window) {
    'use strict';
    var App = window.App || {};

    var Validation = {
        isCompanyEmail: function (email) {
            return /.+@enormocorp\.com$/.test(email);
        },
        isDecaf: function (strIn, intIn) {
            if (strIn === 'decaf' && intIn > 20) {
                return false;
            } else {
                return true;
            }
        }
    };

    App.Validation = Validation;
    window.App = App;
})(window);