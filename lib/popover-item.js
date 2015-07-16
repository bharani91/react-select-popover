var React = require("react");

var PopoverItem = React.createClass({displayName: "PopoverItem",
  handleClick: function(e) {
    e.preventDefault();
    this.props.selectValue(this.props.name);
  },
  render: function() {
    return (
      React.createElement("span", {className: "tag ignore-react-onclickoutside", onClick: this.handleClick}, 
        this.props.name
      )
    );
  }
});


module.exports = PopoverItem;