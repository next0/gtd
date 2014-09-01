/* global jasmine, beforeEach, afterEach, describe, it, xdescribe, xit, spyOn, expect */
'use strict';

// imports
var Backbone = require('backbone'),
    TableGTD = require('../../../src/js/views/table-gtd'),
    StickerCollection = require('../../../src/js/collections/stickers');


// code
describe('TableGTD', function() {
    var stickers;

    beforeEach(function() {
        stickers = new StickerCollection();
    });

    it('should be a Backbone View', function() {
        var view = new TableGTD({
            collection: stickers
        });
        expect(view instanceof Backbone.View).toBe(true);
    });
});
