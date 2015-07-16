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
      return (
        <SelectBoxItem name={item} key={index} unselectValue={this.props.unselectValue} />
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
            removeLast={this.props.removeLast} 
        />
        
      </div>
    )
  }
});


module.exports = SelectBox;