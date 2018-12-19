(function (window) {
    'use strict';
    var App = window.App || {};

    function Muie(sugi) {
        this.sugi = sugi;
    }

    Muie.prototype.print = function () {
        console.log(this.sugi);
    };



    App.Muie = Muie;
    window.App = App;
})(window);
