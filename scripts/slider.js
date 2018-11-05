(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;


    function SliderHandler(sliderSelector, counterSelector) {
        this.sliderElement = document.querySelector(sliderSelector);
        this.counterElement = document.querySelector(counterSelector);
    }


    SliderHandler.prototype.addChangeHandler = function () {
        // console.log('Setting Slider handler for form');
        // console.log(`VALOARE SLIDERelem: ${this.sliderElement.value}`);
        // console.log(`VALOARE SLIDERcount: ${this.counterElement.textContent}`);
        this.sliderElement.addEventListener('change', function (event) {
            this.counterElement.textContent = this.sliderElement.value;
            if (this.sliderElement.value <= 30) {
                this.counterElement.style.backgroundColor = '';
                this.counterElement.style.color = 'green';
            } else if (this.sliderElement.value > 30 && this.sliderElement.value < 60) {
                this.counterElement.style.backgroundColor = 'rgba(0, 0, 0, .3)';
                this.counterElement.style.color = 'yellow';
            } else if (this.sliderElement.value > 60) {
                this.counterElement.style.backgroundColor = '';
                this.counterElement.style.color = 'red';
            }
        }.bind(this));
    };


    SliderHandler.prototype.addRatingReset = function () {
        // console.log(`-- addRatingReset -- sliderElement.defaultValue : ${this.sliderElement.defaultValue}`);
        this.counterElement.style.backgroundColor = '';
        this.counterElement.style.color = 'green';
        this.counterElement.textContent = this.sliderElement.defaultValue;
    };

    App.SliderHandler = SliderHandler;
    window.App = App;
})(window);