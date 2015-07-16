var React = require("react");

var PopoverItem = React.createClass({
  handleClick: function(e) {
    e.preventDefault();
    this.props.selectValue(this.props.name);
  },
  render: function() {
    return (
      <span className="tag ignore-react-onclickoutside" onClick={this.handleClick} >
        {this.props.name}
      </span>
    );
  }
});


module.exports = PopoverItem;