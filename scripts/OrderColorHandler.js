(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    function ColorFlavor(flavorOption, flavorWindow) {
        this.flavorO = document.querySelectorAll(flavorOption);
        this.flavorW = document.querySelector(flavorWindow);

        // console.log(`--ColorFlavor-- flavorW value: ${this.flavorW.textContent[0]}`);

    }
    ColorFlavor.prototype.addChangeListener = function () {
        this.flavorO[2].addEventListener('click', function (event) {
            switch (this.flavorW.textContent[0]) {
                case 'caramel':
                    this.flavorW.classList.add('caramel');
                    break;
                case 'almond':
                    this.flavorW.classList.add('almond');
                    break;
                case 'mocha':
                    this.flavorW.classList.add('mocha');
                    break;
                default:
                    break;
            }
        }.bind(this));
    };

    App.ColorFlavor = ColorFlavor;
    window.App = App;
})(window);