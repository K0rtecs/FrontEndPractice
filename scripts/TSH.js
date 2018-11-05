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




// var person = {};
//
// var zack = Object.create(person, {
//     age: {value: 13},
//     kind: {value: 'pulalalu'},
//     type: {value: {
//         alien: true,
//         muie: false,
//             caca: false}},
//     hair: {value: 'blonde'},
//     sex: {value: 'mad bitch'}
// });
//
// zack.type.caca = true;
//
// console.log();
