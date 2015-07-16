var React = require("react");

var PopoverItem = React.createClass({
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
      <span className="tag ignore-react-onclickoutside" onClick={this.handleClick} >
        {this.props.label}
      </span>
    );
  }
});


module.exports = PopoverItem;