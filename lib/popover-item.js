var React = require("react");

var PopoverItem = React.createClass({displayName: "PopoverItem",
  handleClick: function(e) {
    e.preventDefault();
    var selectedObj = {
      label: this.props.label,
      value: this.props.value
    }
    this.props.selectValue(selectedObj);
  },
  render: function() {
    return (
      React.createElement("span", {className: "tag ignore-react-onclickoutside", onClick: this.handleClick}, 
        this.props.label
      )
    );
  }
});


module.exports = PopoverItem;