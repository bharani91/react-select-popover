var React = require("react"),
    ReactDOM = require("react-dom");

var SelectInput = React.createClass({

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
      <input  type="text"
              className="search-input"
              ref="searchInput"
              onKeyDown={this.handleBackspace}
              value={this.props.searchTerm}
              onChange={this.handleSearch}
      />
    );
  }
});

module.exports = SelectInput;
