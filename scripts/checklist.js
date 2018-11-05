(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;



    function CheckList(selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$element = $(selector);
        if (this.$element.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }
    }



    CheckList.prototype.addClickHandler = function (fn) {
        // Time 2 seconds the main one click event
        this.$element.on('click', 'span', function (event) {
            var email = event.target.value;
            setTimeout(function () {
                fn(email)
                    .then(function () {
                        this.removeRow(email);
                    }.bind(this));
            }.bind(this), 200);
        }.bind(this));
    };



    CheckList.prototype.addRow = function (coffeeOrder) {
        // Remove any existing rows that match the email address.
        this.removeRow(coffeeOrder.emailAddress);
        // Create a new instance of a row, using the coffee order info.
        var rowElement = new Row(coffeeOrder);
        // Add the new row instance's $element property to the checklist.
        this.$element.append(rowElement.$element);
        // Add Rewrite click handler per Pending order.
        rowElement.addRewriteHandler(coffeeOrder, this.$formElement);
    };



    CheckList.prototype.removeRow = function (email) {
        this.$element
            .find(`[value="${email}"]`)
            .closest('[data-coffee-order="checkbox"]')
            .remove();
    };



    CheckList.prototype.reinitForm = function (selector) {
        if (!selector) {
            throw new Error('No selector provided');
        }

        this.$formElement = $(selector);

        if (this.$formElement.length === 0) {
            throw new Error('Could not find element with selector: ' + selector);
        }

    };



    // Add order row obj.
    function Row(coffeeOrder) {
        var currentFlavor = '';
        switch (coffeeOrder.flavor) {
            case 'caramel':
                currentFlavor = 'caramel';
                break;
            case 'almond':
                currentFlavor = 'almond';
                break;
            case 'mocha':
                currentFlavor = 'mocha';
                break;
            default:
                break;
        }

        // Assembly the row.
        var $changeDescription = $("<p>Press here to rewrite order!</p>");
        var $changeLabel = $("<label></label>", {
            'data-change-handler': 'label',
            class: "muie"
        });
        var $changeCheckBox = $("<input></input>", {
            type: 'button',
            name: 'change',
            class: 'mybutton'
        });
        var $div = $('<div></div>', {
            'data-coffee-order': 'checkbox',
            'class': 'checkbox' + ' ' + currentFlavor
        });
        var $label = $('<label></label>', {
            class: 'muieDoi'
        });
        var $checkbox = $("<input></input>", {
            type: 'checkbox',
            value: coffeeOrder.emailAddress,
            id: 'deliverBox'
        });

        var desTextNode = document.createTextNode('');
        var description = $('<p></p>');

        desTextNode = ' [' + coffeeOrder.strength + 'x] ';
        desTextNode += coffeeOrder.size + ' ';
        if (coffeeOrder.flavor) {
            desTextNode += coffeeOrder.flavor + ' ';
        }

        desTextNode += coffeeOrder.coffee + ', ';
        desTextNode += ' (' + coffeeOrder.emailAddress + ')';

        var $spacer = $('<span></span>', {
            class: 'spacer'
        });

        description.append(desTextNode);

        $changeLabel.append($changeCheckBox);
        $changeLabel.append($changeDescription);
        $spacer.append($checkbox);
        $spacer.append(description);
        $label.append($spacer);
        $div.append($label);
        $div.append($changeLabel);

        this.$element = $div;
    }

    // Activates the second button for editing a given Pending Order.
    Row.prototype.addRewriteHandler = function (coffeeOrder, formElement) {
        var formElem = $(formElement);
        var sliderCounter = document.querySelector('[data-counter-rating="0"]');
        this.$element.on('click', '[data-change-handler="label"]', function (event) {
            console.log(this.$element);

            formElem[0][0].value = coffeeOrder.coffee;
            formElem[0][1].value = coffeeOrder.emailAddress;
            for (var i = 2; i <= 5; i++) {
                if (formElem[0][i].value === coffeeOrder.size) {
                    formElem[0][i].checked = true;
                }
            }
            for (var i = 0; i <= 3; i++) {
                if (formElem[0][6][i].value === coffeeOrder.flavor) {
                    formElem[0][6][i].selected = true;
                }
            }
            formElem[0][7].value = coffeeOrder.strength;
            sliderCounter.textContent = coffeeOrder.strength;
        }.bind(this));
    };


    App.CheckList = CheckList;

    window.App = App;
})(window);