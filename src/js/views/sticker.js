'use strict';

// imports
var $        = require('jquery'),
    _        = require('lodash'),
    Backbone = require('backbone');


// code
var View = Backbone.View.extend({
    template: require('../templates/sticker'),
    message: require('../templates/sticker-display'),

    events: {
        'dblclick': '_stickerEdit',
        'click [data-ui="delete"]': '_stickerRemove',
        'click [data-ui="cancel"]': '_stickerCancel',
        'click [data-ui="save"]': '_stickerSave',
        'input [data-ui="editor"]': '_resizeEditor'
    },

    initialize: function() {
        var _this = this;

        _this.rendered = false;

        _this.$el
            .addClass('sticker-widget')
            .addClass('sticker-widget--rendering')
            .html(_this.template({}));

        _this._bindUI()
            .redraw();

        _this.listenTo(_this.model, 'change', _this.redraw);
        _this.listenTo(_this.model, 'destroy', _this.remove);
    },

    redraw: function() {
        var _this = this,
            ui = _this.ui,
            data = _this.model.toJSON();

        _this.$el.attr('data-sticker', _this.model.cid);

        ui.$display.html(_this.message({
            data: data
        }));
        ui.$editor.val(data.name);

        if (!_this.rendered || _this.model.hasChanged('active')) {
            if (data.active) {
                _this._startEdit();
            } else {
                _this._finishEdit();
            }
        }

        if (!_this.rendered) {
            _this.$el.removeClass('sticker-widget--rendering');
        }
        _this.rendered = true;

        return _this;
    },

    _bindUI: function() {
        var _this = this,
            $el = _this.$el,
            ui = {};

        ui.$sticker = $el.children().eq(0);
        ui.$editor = $el.find('[data-ui="editor"]');
        ui.$display = $el.find('[data-ui="display"]');
        _this.ui = ui;

        return _this;
    },

    _stickerEdit: function(event) {
        var _this = this;
        _this.model.set('active', true);
        event.preventDefault();
    },

    _stickerCancel: function(event) {
        var _this = this;
        if (_this.model.get('active')) {
            _this.model.set('active', false);
        }
        event.preventDefault();
    },

    _stickerSave: function(event) {
        var _this = this,
            current = _this.current,
            ui = _this.ui;

        if (_this.model.get('active')) {
            current.name = ui.$editor.val();
            current.active = false;
            _this.model.set(current).save();
        }

        event.preventDefault();
    },

    _stickerRemove: function(event) {
        var _this = this;
        if (_this.model.get('active')) {
            _this.model.destroy();
        }
        event.preventDefault();
    },

    _resizeEditor: function() {
        var _this = this,
            ui = _this.ui,
            $editor = ui.$editor,
            limit = 350;

        $editor.css('min-height', '');  // reset height
        $editor.css('min-height', Math.min($editor.prop('scrollHeight'), limit));
    },

    _startEdit: function() {
        var _this = this,
            ui = _this.ui;

        _this.current = _.clone(_this.model.toJSON());

        ui.$sticker.addClass('active');
        ui.$editor.removeAttr('disabled');
        _this._resizeEditor();

        _.defer(function() {
            ui.$editor.focus();
            document.execCommand && document.execCommand('selectAll', false, null);
        });

        return _this;
    },

    _finishEdit: function() {
        var _this = this,
            ui = _this.ui;

        _this.current = {};
        ui.$editor.attr('disabled', 'disabled');
        ui.$sticker.removeClass('active');

        return _this;
    }
});

module.exports = View;

