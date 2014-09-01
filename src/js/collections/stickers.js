'use strict';

// imports
var _              = require('lodash'),
    Backbone       = require('backbone'),
    StickerModel   = require('../models/sticker');

require('backbone.localstorage');


// code
var Collection = Backbone.Collection.extend({
    localStorage: new Backbone.LocalStorage('stickers'),
    model: StickerModel
});


module.exports = Collection;
