var HiddenSelectField   = require("./hidden-select-field"),
    SelectBox           = require("./select-box"),
    Popover             = require("./popover"),
    React               = require("react");


var SelectPopover = React.createClass({
  propTypes: {
    options             : React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    selectedOptions     : React.PropTypes.arrayOf(React.PropTypes.object),
    name                : React.PropTypes.string,
    selectPlaceholder   : React.PropTypes.string,
    componentClassNames : React.PropTypes.arrayOf(React.PropTypes.string),
    selectBoxClassNames : React.PropTypes.arrayOf(React.PropTypes.string),
    popoverClassNames   : React.PropTypes.arrayOf(React.PropTypes.string),
    onChange            : React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
        options             : [],
        name                : "react-select-popover",
        selectPlaceholder   : "Choose some options",
        componentClassNames : ["react-select-popover"],
        selectBoxClassNames : ["select-input"],
        popoverClassNames   : ["popover", "arrow-top"],
    }
  },

  getInitialState: function() {
    return {
      searchTerm        : "",
      selectedValues    : this.props.selectedOptions || [],
      focus             : "out"
    }
  },

  selectValue: function(selectedObj) {  
    var selectedValues = this.state.selectedValues;
    selectedValues.push(selectedObj);
    
    this.setState({
      selectedValues: selectedValues,
      searchTerm: ""
    });

    this.triggerOnChange({
      event: "added",
      item: selectedObj,
      value: this.state.selectedValues
    });

  },
  
  unselectValue: function(objToUnselect) {
    var selectedValues = this.state.selectedValues;

    if(!objToUnselect) {
      var last = selectedValues[selectedValues.length - 1];
      objToUnselect = last ? last : null;
    }

    var selected = this.isInSelectedValues(objToUnselect);
    if(selected) {
      var index = selectedValues.indexOf(selected);
      selectedValues.splice(index, 1);
    
      this.setState({
        selectedValues: selectedValues
      });

      this.triggerOnChange({
        event: "removed",
        item: selected,
        value: this.state.selectedValues
      });

    }
  },

  isInSelectedValues: function(object) {
    if(!object) return;

    var result = this.state.selectedValues.filter(function(obj) {
      return obj.label == object.label && obj.value == object.value;
    });

    return result ? result[0] : null;
  },
  
  handleSearch: function(term) {
    this.setState({
      searchTerm: term
    });
  },
  
  focusIn: function() {
    this.setState({
      focus: "in"
    });
  },
  
  focusOut: function() {
    this.setState({
      focus: "out",
      searchTerm: ""
    });
  },
  
  triggerOnChange: function(eventObject) {
    if(this.props.onChange) {
      this.props.onChange(eventObject);
    }
  },
  
  render: function() {
    return (
      <div className="react-select-popover">
        <HiddenSelectField 
            selectedValues={this.state.selectedValues} 
            name={this.props.name} 
            options={this.props.options} 
            isInSelectedValues={this.isInSelectedValues}

        />
        
        <SelectBox 
            selectedValues={this.state.selectedValues} 
            unselectValue={this.unselectValue} 
            handleSearch={this.handleSearch} 
            searchTerm={this.state.searchTerm} 
            focusIn={this.focusIn} 
            focus={this.state.focus} 
            focusOut={this.focusOut}
            selectPlaceholder={this.props.selectPlaceholder}
            selectBoxClassNames={this.props.selectBoxClassNames}
        />
        
        <Popover 
            options={this.props.options} 
            selectedValues={this.state.selectedValues} 
            selectValue={this.selectValue} 
            searchTerm={this.state.searchTerm} 
            focus={this.state.focus} 
            popoverClassNames={this.props.popoverClassNames}
            isInSelectedValues={this.isInSelectedValues}
        />
        
      </div>
    )
  }
});

module.exports = SelectPopover;
