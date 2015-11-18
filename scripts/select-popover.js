(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SelectPopover = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var HiddenSelectField = React.createClass({displayName: "HiddenSelectField",
  render: function() {
    var options = [];
    
    this.props.options.map(function(option, index) {
      var label = option.label,
          value = option.value;

        options.push(React.createElement("option", {key: index, value: value}, label));
    });

    var values = this.props.selectedValues.map(function(option) {
      return option.value;
    });

    return (
      React.createElement("select", {ref: "hiddenSelectBox", defaultValue: values, name: this.props.name, className: "hidden-select-box", multiple: "true"}, 
        options
      )
    )
  }
});

module.exports = HiddenSelectField;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var PopoverItem = React.createClass({displayName: "PopoverItem",
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
      React.createElement("span", {className: "tag ignore-react-onclickoutside", onClick: this.handleClick}, 
        this.props.label
      )
    );
  }
});


module.exports = PopoverItem;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],3:[function(require,module,exports){
(function (global){
var PopoverItem = require("./popover-item"),
    React       = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var Popover = React.createClass({displayName: "Popover",
  render: function() {
    var tags = [];
    var searchTerm = this.props.searchTerm.toString().toLowerCase();

    this.props.options.forEach(function(option, index) {
      var label = option.label,
          value = option.value,
          labelSlug = label.toString().toLowerCase();

      var opt = this.props.isInSelectedValues(option);

      if(opt && this.props.selectedValues.indexOf(opt) >= 0 || (searchTerm && labelSlug.indexOf(searchTerm) == -1 ) ) return;

      tags.push(React.createElement(PopoverItem, {key: index, label: label, value: value, selectValue: this.props.selectValue}));
    }, this);
    
    if(!tags.length) {
      tags.push(React.createElement("span", {key: "none", className: "empty-list"}, "No Options to show"));
    }
    
    var classNames = this.props.popoverClassNames;
    if(classNames.indexOf("ignore-react-onclickoutside") == -1) {
      classNames.push("ignore-react-onclickoutside");
    }

    var style = {
      display: (this.props.focus == "in" ? "block" : "none")
    };
    
    return (
      React.createElement("div", {className: classNames.join(" "), style: style}, 
        tags
      )
    )
  }
});

module.exports = Popover;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./popover-item":2}],4:[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var SelectBoxItem = React.createClass({displayName: "SelectBoxItem",
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
      React.createElement("span", {className: "tag"}, 
        React.createElement("button", {onClick: this.handleRemove}, "×"), 
        this.props.label
      )
    )
  }
});

module.exports = SelectBoxItem;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
var SelectBoxItem   = require("./select-box-item"),
    SelectInput     = require("./select-input"),
    React           = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var SelectBox = React.createClass({displayName: "SelectBox",
  mixins: [
    (typeof window !== "undefined" ? window['OnClickOutside'] : typeof global !== "undefined" ? global['OnClickOutside'] : null)
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
        React.createElement(SelectBoxItem, {label: label, value: value, key: index, unselectValue: this.props.unselectValue})
      )
    }, this);
    
    var classNames = this.props.selectBoxClassNames;

    if(!selectedItems.length && this.props.focus != "in") {
        selectedItems = React.createElement("p", {className: "empty-list"}, this.props.selectPlaceholder)
    }
    
    return (
      React.createElement("div", {className: classNames.join(" ") + (this.props.focus == "in" ? " active" : ""), onClick: this.handleClick}, 

        selectedItems, 
        
        React.createElement(SelectInput, {
            focus: this.props.focus, 
            searchTerm: this.props.searchTerm, 
            handleSearch: this.props.handleSearch, 
            unselectValue: this.props.unselectValue}
        )
        
      )
    )
  }
});


module.exports = SelectBox;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./select-box-item":4,"./select-input":6}],6:[function(require,module,exports){
(function (global){
var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null);

var SelectInput = React.createClass({displayName: "SelectInput",

  handleSearch: function(e) {
    var searchInput = ReactDOM.findDOMNode(this.refs.searchInput);
    this.props.handleSearch(searchInput.value);
  },
  
  handleBackspace: function(e) {
    if(this.props.searchTerm.length == 0 && (e.keyCode == 8 || e.keyCode == 46)) {
      this.props.unselectValue();
    }
  },
  
  componentDidUpdate: function() {
    var input = ReactDOM.findDOMNode(this.refs.searchInput);
    if(this.props.focus == "in") {
      input.focus();
    } else {
      input.blur();
    }
  },
  
  render: function() {
    return (
      React.createElement("input", {type: "text", 
              className: "search-input", 
              ref: "searchInput", 
              onKeyDown: this.handleBackspace, 
              value: this.props.searchTerm, 
              onChange: this.handleSearch}
      )
    );
  }
});

module.exports = SelectInput;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
var HiddenSelectField   = require("./hidden-select-field"),
    SelectBox           = require("./select-box"),
    Popover             = require("./popover"),
    React               = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);


var SelectPopover = React.createClass({displayName: "SelectPopover",
  propTypes: {
    options             : React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
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
      selectedValues    : [],
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
      React.createElement("div", {className: "react-select-popover"}, 
        React.createElement(HiddenSelectField, {
            selectedValues: this.state.selectedValues, 
            name: this.props.name, 
            options: this.props.options, 
            isInSelectedValues: this.isInSelectedValues}

        ), 
        
        React.createElement(SelectBox, {
            selectedValues: this.state.selectedValues, 
            unselectValue: this.unselectValue, 
            handleSearch: this.handleSearch, 
            searchTerm: this.state.searchTerm, 
            focusIn: this.focusIn, 
            focus: this.state.focus, 
            focusOut: this.focusOut, 
            selectPlaceholder: this.props.selectPlaceholder, 
            selectBoxClassNames: this.props.selectBoxClassNames}
        ), 
        
        React.createElement(Popover, {
            options: this.props.options, 
            selectedValues: this.state.selectedValues, 
            selectValue: this.selectValue, 
            searchTerm: this.state.searchTerm, 
            focus: this.state.focus, 
            popoverClassNames: this.props.popoverClassNames, 
            isInSelectedValues: this.isInSelectedValues}
        )
        
      )
    )
  }
});

module.exports = SelectPopover;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./hidden-select-field":1,"./popover":3,"./select-box":5}]},{},[7])(7)
});