'use strict';

// imports
var Backbone = require('backbone');


// code
var Model = Backbone.Model.extend({
    defaults: {
        name: 'New Sticker...',
        state: null,
        order: null
    }
});

module.exports = Model;
