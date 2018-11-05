(function (window) {
    'use strict';
    var App = window.App || {};

    function Truck(truckId, db) {
        this.truckId = truckId;
        this.db = db;
    }


    Truck.prototype.createOrder = function (order) {
        console.log('Adding order for ' + order.emailAddress);
        this.db.add(order.emailAddress, order);
    };


    Truck.prototype.deliverOrder = function (customerId) {
        console.log('Delivering order for ' + customerId);
        this.db.remove(customerId);
    };


    Truck.prototype.printOrders = function () {
        var getdb = this.db.getAll((item) => {item});
        var customerIdArray = Object.keys(getdb);

        console.log('Truck #' + this.truckId + ' has pending orders:');
        customerIdArray.forEach(function (id) {
            console.log(this.db.get(id, (item) => {item}));
        }.bind(this))
    };
    App.Truck = Truck;
    window.App = App;
})(window);