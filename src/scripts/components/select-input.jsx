var React = require("react");

var SelectInput = React.createClass({

  handleSearch: function(e) {
    var searchInput = React.findDOMNode(this.refs.searchInput);
    this.props.handleSearch(searchInput.value);
  },
  
  handleBackspace: function(e) {
    if(this.props.searchTerm.length == 0 && e.keyCode == 8) {
      this.props.unselectValue();
    }
  },
  
  componentDidUpdate: function() {
    var input = React.findDOMNode(this.refs.searchInput);
    if(this.props.focus == "in") {
      input.focus();
    } else {
      input.blur();
    }
  },
  
  render: function() {
    return (
      <input type="text" className="search-input" ref="searchInput" onKeyDown={this.handleBackspace} value={this.props.searchTerm} onChange={this.handleSearch} />
    );
  }
});

module.exports = SelectInput;

