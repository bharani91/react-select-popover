var SelectPopover   = require("./components/select-popover"),
    React           = require('react'),
    ReactDOM    = require("react-dom");


var OPTIONS = [
    { label: "CSS", value: "css" },
    { label: "JavaScript", value: "javascript" },
    { label: "HTML", value: "html" },    
    { label: "Ruby", value: "ruby" },    
    { label: "Ruby on Rails", value: "ror" },    
    { label: "React", value: "react" },    
    { label: "Node.js", value: "nodejs" },    
];
var SELECTFIELDNAME = "my-select";
var onChange = function(val) {
    console.log("CHANGED");
    console.log(val);
}

ReactDOM.render(
    <SelectPopover 
        options={OPTIONS} 
        name={SELECTFIELDNAME} 
        selectPlaceholder="Choose some skills"
        onChange={onChange}
    />,
    document.getElementById("root")
);