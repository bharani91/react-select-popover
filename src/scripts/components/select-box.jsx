var SelectBoxItem   = require("./select-box-item"),
    SelectInput     = require("./select-input"),
    React           = require("react");

var SelectBox = React.createClass({
  mixins: [
    require('react-onclickoutside')
  ],
 
  handleClickOutside: function(evt) {
    this.props.focusOut();
  },

  handleClick: function() {
    this.props.focusIn();
  },

  
  render: function() {
    var selectedItems = this.props.selectedValues.map(function(item, index) {
      var label = item.label,
          value = item.value;

      return (
        <SelectBoxItem label={label} value={value} key={index} unselectValue={this.props.unselectValue} />
      )
    }, this);
    
    var classNames = this.props.selectBoxClassNames;

    if(!selectedItems.length && this.props.focus != "in") {
        selectedItems = <p className="empty-list">{this.props.selectPlaceholder}</p>
    }
    
    return (
      <div className={classNames.join(" ") + (this.props.focus == "in" ? " active" : "") } onClick={this.handleClick}>

        {selectedItems}
        
        <SelectInput 
            focus={this.props.focus} 
            searchTerm={this.props.searchTerm} 
            handleSearch={this.props.handleSearch} 
            unselectValue={this.props.unselectValue} 
        />
        
      </div>
    )
  }
});


module.exports = SelectBox;