'use strict';

// imports
var $            = require('jquery'),
    _            = require('lodash'),
    Backbone     = require('backbone'),
    StickersList = require('./stickers-list');


// code
var View = Backbone.View.extend({
    template: require('../templates/table-gtd'),

    defaults: {
        states: {
            'todo': 'ToDo',
            'in-progress': 'In Progress',
            'done': 'Done'
        }
    },

    initialize: function(options) {
        var _this = this;

        options || (options = {});
        _this.states = options.states || _.clone(_this.defaults.states);

        _this.$el.html(_this.template({
            states: _this.states,
            level: _.size(_this.states)
        }));

        _this._bindUI();
    },

    remove: function() {
        var _this = this;
        _this._unbindUI();
        return _this.__super__.remove.call(_this);
    },

    _bindUI: function() {
        var _this = this,
            ui = {};

        ui.lists = _.chain(_this.states)
            .keys()
            .map(function(state) {
                return new StickersList({
                    el: _this.$('[data-state="' + state + '"]'),
                    collection: _this.collection,
                    state: state,
                    group: _this.cid
                });
            })
            .value();

        _this.ui = ui;

        return _this;
    },

    _unbindUI: function() {
        var _this = this,
            ui = _this.ui;

        _.invoke(ui.lists, 'remove');
        ui.lists.length = 0;        // ui.lists = [];

        return _this;
    }
});

module.exports = View;
