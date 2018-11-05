(function (window) {
    'use strict';
    var App = window.App;

    /* -- FACUT!!--
    * Customizeaza sliderul si adauga culori cat si pentru text
    */

    /* -- FACUT!! --
    - If the user double-clicks an order, load it back into the form for editing.
    - If the user only clicks once, gray out the row.
    - After a few seconds, treat the item as if it were delivered and remove it from the
        checklist and from the application’s data.
    - As an extra bonus, make sure that after the user finishes editing the existing row is updated in place,
        not removed and replaced with a new row.
    */

    /* --  --
    * Adauga popup cu insigne si premiere pentru cine cumpara cafea tare
    */

    /* -- FACUT!! --
    - Add another function to your Validation module. It should accept two arguments: a string and an integer.
    - If the string contains the word “decaf” and the integer is greater than 20, the function should return false.

    - Add listeners for the coffee order text field and for the caffeine strength slider.
    - Trigger the custom validation for whichever field is currently being edited and caused the validation failure.
    */

    var FLAVOR_WINDOW = '[data-flavor-window="select"]';
    var FLAVOR_SELECTOR = '[data-flavor-option]';
    var SLIDER_SELECTOR = '[data-strength-level="slider"]';
    var COUNTER_SELECTOR = '[data-counter-rating="0"]';
    var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
    var FORM_SELECTOR = '[data-coffee-order="form"]';
    var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';

    var Truck = App.Truck;
    var DataStore = App.DataStore;
    var RemoteDataStore = App.RemoteDataStore;
    var FormHandler = App.FormHandler;
    var CheckList = App.CheckList;
    var SliderHandler = App.SliderHandler;
    var ColorFlavor = App.ColorFlavor;
    var Validation = App.Validation;
    var webshim = window.webshim;

    var remoteDS = new RemoteDataStore(SERVER_URL);
    var myTruck = new Truck('ncc-1701', remoteDS);
    var checkList = new CheckList(CHECKLIST_SELECTOR);
    var formHandler = new FormHandler(FORM_SELECTOR);
    var colorOption = new ColorFlavor(FLAVOR_SELECTOR, FLAVOR_WINDOW);
    var sliderHandler = new SliderHandler(SLIDER_SELECTOR, COUNTER_SELECTOR);


    checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
    colorOption.addChangeListener();
    sliderHandler.addChangeHandler();

    window.myTruck = myTruck;
    formHandler.addSubmitHandler(function (data) {
        myTruck.createOrder.call(myTruck, data);
        checkList.reinitForm.call(checkList, FORM_SELECTOR);
        checkList.addRow.call(checkList, data);
        sliderHandler.addRatingReset();
    });
    formHandler.addInputHandler(Validation.isCompanyEmail);
    formHandler.addCoffeeOrderHandler(Validation.isDecaf);
    webshim.polyfill('forms forms-ext');
    webshim.setOptions('forms', {addValidators: true, lazyCustomMessages: true});


})(window);