var React = require("react");

var SelectBoxItem = React.createClass({
  handleRemove: function(e) {
    e.preventDefault();
    this.props.unselectValue(this.props.name);
  },
  render: function() {
    return (
      <span className="tag" >
        <button onClick={this.handleRemove}>&times;</button>
        {this.props.name}
      </span>
    )
  }
});

module.exports = SelectBoxItem;