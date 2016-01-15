var React = require("react");

var HiddenSelectField = React.createClass({displayName: "HiddenSelectField",
  render: function() {
    var options = [];
    
    this.props.options.map(function(option, index) {
      var label = option.label,
          value = option.value;

        options.push(React.createElement("option", {key: index, value: value}, label));
    });

    var values = this.props.selectedValues.map(function(option) {
      return option.value;
    });

    return (
      React.createElement("select", {ref: "hiddenSelectBox", defaultValue: values, name: this.props.name, className: "hidden-select-box", multiple: "true"}, 
        options
      )
    )
  }
});

module.exports = HiddenSelectField;