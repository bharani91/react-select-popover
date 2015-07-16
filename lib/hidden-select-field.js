var React = require("react");

var HiddenSelectField = React.createClass({displayName: "HiddenSelectField",
  render: function() {
    var options = [];
    
    this.props.options.forEach(function(option, index) {
      if(this.props.selectedValues.indexOf(option) >= 0) {
        options.push(React.createElement("option", {key: index, selected: "selected", value: option}, option));
      } else {
        options.push(React.createElement("option", {key: index, value: option}, option));
      }
    }, this);
    
    return (
      React.createElement("select", {name: this.props.name, className: "hidden-select-box", multiple: true}, 
        options
      )
    )
  }
});

module.exports = HiddenSelectField;