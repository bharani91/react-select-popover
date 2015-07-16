var SelectPopover   = require("./components/select-popover"),
    React           = require('react');

var OPTIONS = [ "CSS", "JavaScript", "React", "HTML", "Ruby on Rails", "Ruby"];
var SELECTFIELDNAME = "my-select";
var SELECTFIELDREF = "mySelect";

React.render(
    <SelectPopover 
        options={OPTIONS} 
        name={SELECTFIELDNAME} 
        selectPlaceholder="Choose some skills"
    />,
    document.getElementById("root")
);