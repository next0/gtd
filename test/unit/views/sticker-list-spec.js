/* global jasmine, beforeEach, afterEach, describe, it, xdescribe, xit, spyOn, expect */
'use strict';

// imports
var Backbone = require('backbone'),
    StickerList = require('../../../src/js/views/stickers-list'),
    StickerCollection = require('../../../src/js/collections/stickers');


// code
describe('StickerList', function() {
    var stickers;

    beforeEach(function() {
        stickers = new StickerCollection([{
            name: '1',
            state: 'todo'
        }, {
            name: '2',
            state: 'in-progress'
        }, {
            name: '3',
            state: 'todo'
        }, {
            name: '4',
            state: 'done'
        }]);
    });

    it('should be a Backbone View', function() {
        var list = new StickerList({
            collection: stickers,
            state: 'todo'
        });
        expect(list instanceof Backbone.View).toBe(true);
    });

    it('should show only stickers with predetermined state', function(done) {
        var list = new StickerList({
            collection: stickers,
            state: 'todo'
        });

        list.on('redraw', function() {
            expect(Object.keys(list.stickers).length).toBe(2);
            done();
        });
    });

    it('should called only one time in 100ms', function(done) {
        var list = new StickerList({
            collection: stickers,
            state: 'todo'
        });

        var redrawSpy = jasmine.createSpy('spy');
        list.on('redraw', redrawSpy);

        stickers.add({name: '5', state: 'todo'});
        stickers.at(0).set('name', 'new 1');
        stickers.at(1).set('state', 'todo');

        expect(redrawSpy).not.toHaveBeenCalled();

        setTimeout(function() {
            expect(redrawSpy.calls.count()).toEqual(1);
            done();
        }, 110);
    });
});
