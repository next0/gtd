'use strict';

// imports
var $           = require('jquery'),
    _           = require('lodash'),
    Backbone    = require('backbone'),
    Sortable    = require('sortable'),
    StickerView = require('./sticker');


// code
var View = Backbone.View.extend({
    template: require('../templates/stickers-list'),

    defaults: {
        state: 'todo'
    },

    events: {
        'click [data-ui="sticker-add"]': '_stickerAdd'
    },

    initialize: function(options) {
        var _this = this;

        options || (options = {});

        _this.state = options.state || _this.defaults.state;
        _this.group = options.group || _this.cid;

        _this.stickers = {};

        _this.$el.html(_this.template({
            state: _this.state
        }));

        _this.redraw = _.debounce(_this.redraw, 100);   // 100ms wait period

        _this._bindUI()
            .redraw();

        _this.listenTo(_this.collection, 'add', _this._stickerCreate);
        _this.listenTo(_this.collection, 'change', _this._stickerChange);
        _this.listenTo(_this.collection, 'remove', _this._stickerRemove);
        _this.listenTo(_this.collection, 'reset', _this.redraw);
    },

    remove: function() {
        var _this = this;

        _this._clear()
            ._unbindUI();

        return _this.__super__.remove.call(_this);
    },

    redraw: function() {
        var _this = this,
            $fragment = $(document.createDocumentFragment());

        _this._clear();

        _this.collection
            .chain()
            .filter(function(model) {
                return model.get('state') === _this.state;
            })
            .sortBy(function(model) {
                return model.get('order');
            })
            .each(function(model) {
                var sticker = new StickerView({
                    model: model
                });
                _this.stickers[model.cid] = sticker;

                $fragment.append(sticker.$el);
            });

        _this.ui.$container.html($fragment);

        _this.trigger('redraw', _this);
        // console.log('stickers list redrawed. ' + _this.state);

        return _this;
    },

    _clear: function() {
        var _this = this;
        _.invoke(_this.stickers, 'remove');
        _this.stickers = {};
        return _this;
    },

    _bindUI: function() {
        var _this = this,
            ui = {},
            callback;

        ui.$container = _this.$('[data-ui="container"]');

        callback = _.bind(_this._stickerDragDrop, _this);
        ui.sortable = new Sortable(ui.$container.get(0), {
            draggable: '.sticker-widget',
            handle: '.sticker-normal',
            group: _this.group,
            onAdd: callback,
            onUpdate: callback,
            onRemove: callback
        });

        _this.ui = ui;

        return _this;
    },

    _unbindUI: function() {
        var _this = this,
            ui = _this.ui;

        ui.sortable.destroy();

        return _this;
    },

    _stickerAdd: function(event) {
        var _this = this;

        _this.collection.add({
            state: _this.state,
            order: _.size(_this.stickers),
            active: true
        });

        event.preventDefault();
    },

    _stickerCreate: function(model) {
        var _this = this,
            $container = _this.ui.$container,
            sticker;

        if (model.get('state') === _this.state) {
            sticker = new StickerView({
                model: model
            });
            _this.stickers[model.cid] = sticker;

            $container.append(sticker.$el);
        }

        return _this;
    },

    _stickerChange: function(model) {
        var _this = this,
            prev = model.changedAttributes();

        if (prev.state || prev.order) {
            _this.redraw();
        }

        return _this;
    },

    _stickerRemove: function(model) {
        var _this = this;

        if (model.get('state') === _this.state) {
            _this.stickers[model.cid].remove();
            delete _this.stickers[model.cid];
        }

        return _this;
    },

    _stickerDragDrop: function() {
        var _this = this;

        _this.ui.$container.children().each(function(order, el) {
            var $el = $(el),
                id = $el.attr('data-sticker');

            _this.collection.get(id).set({
                state: _this.state,
                order: order
            }).save();
        });

        return _this;
    }
});

module.exports = View;
