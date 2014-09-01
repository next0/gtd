'use strict';

// imports
var $                  = require('jquery'),
    TableGTDView       = require('./views/table-gtd'),
    StickersCollection = require('./collections/stickers');

// code
var collection = new StickersCollection();

var table = new TableGTDView({
    el: $('[data-ui="grid"]'),
    collection: collection
});

collection.fetch();
