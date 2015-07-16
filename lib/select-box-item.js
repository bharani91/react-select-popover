var React = require("react");

var SelectBoxItem = React.createClass({displayName: "SelectBoxItem",
  handleRemove: function(e) {
    e.preventDefault();
    var objToUnselect = {
      label: this.props.label,
      value: this.props.value
    }
    this.props.unselectValue(objToUnselect);
  },
  render: function() {
    return (
      React.createElement("span", {className: "tag"}, 
        React.createElement("button", {onClick: this.handleRemove}, "×"), 
        this.props.label
      )
    )
  }
});

module.exports = SelectBoxItem;