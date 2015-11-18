var PopoverItem = require("./popover-item"),
    React       = require("react");

var Popover = React.createClass({
  render: function() {
    var tags = [];
    var searchTerm = this.props.searchTerm.toString().toLowerCase();

    this.props.options.forEach(function(option, index) {
      var label = option.label,
          value = option.value,
          labelSlug = label.toString().toLowerCase();

      var opt = this.props.isInSelectedValues(option);

      if(opt && this.props.selectedValues.indexOf(opt) >= 0 || (searchTerm && labelSlug.indexOf(searchTerm) == -1 ) ) return;

      tags.push(<PopoverItem key={index} label={label} value={value} selectValue={this.props.selectValue} />);
    }, this);
    
    if(!tags.length) {
      tags.push(<span key="none" className="empty-list">No Options to show</span>);
    }
    
    var classNames = this.props.popoverClassNames;
    if(classNames.indexOf("ignore-react-onclickoutside") == -1) {
      classNames.push("ignore-react-onclickoutside");
    }

    var style = {
      display: (this.props.focus == "in" ? "block" : "none")
    };
    
    return (
      <div className={classNames.join(" ")} style={style}>
        {tags}
      </div>
    )
  }
});

module.exports = Popover;