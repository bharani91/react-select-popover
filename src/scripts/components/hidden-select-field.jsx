var React = require("react");

var HiddenSelectField = React.createClass({
  render: function() {
    var options = [];
    
    this.props.options.forEach(function(option, index) {
      if(this.props.selectedValues.indexOf(option) >= 0) {
        options.push(<option key={index} selected="selected" value={option}>{option}</option>);
      } else {
        options.push(<option key={index} value={option}>{option}</option>);
      }
    }, this);
    
    return (
      <select name={this.props.name} className="hidden-select-box" multiple>
        {options}
      </select>
    )
  }
});

module.exports = HiddenSelectField;