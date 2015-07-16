var HiddenSelectField   = require("./hidden-select-field"),
    SelectBox           = require("./select-box"),
    Popover             = require("./popover"),
    React               = require("react");


var SelectPopover = React.createClass({
  propTypes: {
    options             : React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    name                : React.PropTypes.string,
    selectPlaceholder   : React.PropTypes.string,
    componentClassNames : React.PropTypes.arrayOf(React.PropTypes.string),
    selectBoxClassNames : React.PropTypes.arrayOf(React.PropTypes.string),
    popoverClassNames   : React.PropTypes.arrayOf(React.PropTypes.string)
  },

  getDefaultProps: function() {
    return {
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
      selectedValues    : [],
      focus             : "out"
    }
  },

  selectValue: function(name) {  
    var selectedValues = this.state.selectedValues;
    selectedValues.push(name);
    
    this.setState({
      selectedValues: selectedValues,
      searchTerm: ""
    });
  },
  
  unselectValue: function(name) {
    var selectedValues = this.state.selectedValues;
    var index = selectedValues.indexOf(name);
    
    selectedValues.splice(index, 1);
    
    this.setState({
      selectedValues: selectedValues
    });
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
  
  removeLast: function() {
    var selectedValues = this.state.selectedValues;
    
    if(selectedValues.length) {
      selectedValues.pop();
    }
    
    this.setState({
      selectedValues: selectedValues
    });
    
  },
  
  render: function() {
    return (
      <div className="react-select-popover">
        <HiddenSelectField 
            selectedValues={this.state.selectedValues} 
            name={this.props.name} 
            options={this.props.options} 
            ref={this.props.ref} 
        />
        
        <SelectBox 
            selectedValues={this.state.selectedValues} 
            unselectValue={this.unselectValue} 
            handleSearch={this.handleSearch} 
            searchTerm={this.state.searchTerm} 
            focusIn={this.focusIn} 
            focus={this.state.focus} 
            focusOut={this.focusOut} 
            removeLast={this.removeLast}
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
        />
        
      </div>
    )
  }
});

module.exports = SelectPopover;