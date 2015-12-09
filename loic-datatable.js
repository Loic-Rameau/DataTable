Polymer({
  is: 'loic-datatable',
  properties: {
    dataTable: {
      type: Object,
      value: function() {
        return {
          Header: []
        };
      }
    },
    withBootstrap: {
      type: Boolean,
      value: true
    },
    customClass: {
      type: String,
      value: ""
    },
    classList: {
      type: String,
      computed: '_classList(withBootstrap,customClass)'
    }
  },
  _classList: function(withBootstrap, customClass) {
    if (withBootstrap) {
      return "table table-hover" + customClass;
    }
    return customClass;
  }
});