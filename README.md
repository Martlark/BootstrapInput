# bootstrap-input-react

Bootstrap (or not) inputs for react that manage themselves.

Installation.
=============

npm install bootstrap-input-react

Details.
========

A single component that creates a bootstrap 4 input of one of the 
following common input types:

* input 
* checkbox
* select
* radio
* text area

Each input component does all the work for you.  Handling input and setting
state.  A minimum number of properties are required:

* **parent** - the parent component maintaining the state for the input, usually *this*
* **name** - the name of the component and the *state* value.

Example:

```jsx
import BootstrapInput from "bootstrap-input-react";

export class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numeric: 100,
        };
    }

    render() {
        return (<div> <BootstrapInput parent={this} name="numeric"/></div>)
    }
}
```

Creates a text input using the state property of _numeric_ with the initial value of 
100 .  It will then be available as:
 
```javascript
   this.state.numeric
```

Input types.
============

Use the _type_ property to set the input type.  Supported:

* text
* number
* tel
* email
* checkbox
* select
* textarea

Basically any other HTML input type can be used.  Select, checkbox and textarea have
specific style and label handling.  Any other property will be passed along to the 
HTML input element.

Select
------

To create a select input, set the type="select", and provide a list of the select options as either a 
simple list or a list of objects with _label_ and _value_. As follows:

```jsx
<BootstrapInput parent={this} name="select" type="select" label="select" 
    options={[{label: 'a',value:1}, {label: 'b',value: 2}, {label: 'c',value: 3}]}
/>
<BootstrapInput parent={this} name="selectSimple" type="select" label="select simple" 
    options={[4,5,6]}
/>
```

Radio button group
------------------

Very similar to the select input.  Use type="radio" and provide a list of the radio options as either a 
simple list or a list of objects with _label_ and _value_. As follows:

```jsx
    <BootstrapInput parent={this} name="radio" type="radio" label={"radio"} options={[{label: 'a',value:1}, {label: 'b',value: 2}, {label: 'c',value: 3}]}/>
```

The state value, provided as _name_, will have the value of the selected radio option.

Checkbox
--------

A checkbox control is the same as an input excepting the state value will be true or false.  Example:

```jsx
    <BootstrapInput parent={this} name="checkbox" type="checkbox" label="Checkbox"/>

```


Requirements.
=============

To properly style the inputs you should have bootstrap 4 CSS included somewhere
