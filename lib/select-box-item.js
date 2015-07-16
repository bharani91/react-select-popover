var React = require("react");

var SelectBoxItem = React.createClass({displayName: "SelectBoxItem",
  handleRemove: function(e) {
    e.preventDefault();
    this.props.unselectValue(this.props.name);
  },
  render: function() {
    return (
      React.createElement("span", {className: "tag"}, 
        React.createElement("button", {onClick: this.handleRemove}, "×"), 
        this.props.name
      )
    )
  }
});

module.exports = SelectBoxItem;