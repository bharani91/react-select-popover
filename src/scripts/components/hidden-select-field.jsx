var React = require("react");

var HiddenSelectField = React.createClass({
  render: function() {
    var options = [];
    
    this.props.options.map(function(option, index) {
      var label = option.label,
          value = option.value;

        options.push(<option key={index} value={value}>{label}</option>);
    });

    var values = this.props.selectedValues.map(function(option) {
      return option.value;
    });

    return (
      <select ref="hiddenSelectBox" defaultValue={values} name={this.props.name} className="hidden-select-box" multiple="true">
        {options}
      </select>
    )
  }
});

module.exports = HiddenSelectField;