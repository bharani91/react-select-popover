var React = require("react");

var SelectBoxItem = React.createClass({
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
      <span className="tag" >
        <button onClick={this.handleRemove}>&times;</button>
        {this.props.label}
      </span>
    )
  }
});

module.exports = SelectBoxItem;