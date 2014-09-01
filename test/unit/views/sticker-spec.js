/* global jasmine, beforeEach, afterEach, describe, it, xdescribe, xit, spyOn, expect */
'use strict';

// imports
var Backbone = require('backbone'),
    Sticker = require('../../../src/js/views/sticker'),
    StickerModel = require('../../../src/js/models/sticker');


// code
describe('Sticker', function() {
    var sticker;

    beforeEach(function() {
        sticker = new StickerModel({
            name: '1',
            state: 'todo'
        });
    });

    it('should be a Backbone View', function() {
        var view = new Sticker({
            model: sticker
        });
        expect(view instanceof Backbone.View).toBe(true);
    });
});
