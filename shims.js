module.exports = {
    jquery: {
        exports: 'jQuery'
    },
    lodash: {
        exports: '_'
    },
    backbone: {
        exports: 'Backbone',
        depends: {
            lodash: 'underscore',
            jquery: 'jQuery'
        }
    },
    'backbone.localstorage': {
        exports: null,
        depends: {
            backbone: 'backbone'
        }
    },
    sortable: {
        exports: 'Sortable'
    }
};
