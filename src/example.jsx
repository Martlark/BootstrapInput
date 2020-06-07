import React, {Component} from 'react'
import ReactDOM from 'react-dom'
// import BootstrapInput from "./../dist/index.js";
import BootstrapInput from "./index.jsx";

class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radio: 1,
            numeric: 100,
            select: 2,
            checkbox: true,
            checkboxNoLabel: false,
            textArea: 'Hello there.\nGoodbye.'
        };
    }

    render() {
        return (<div>
                <BootstrapInput parent={this} name="radio" type="radio" label="radio"
                                options={[{label: 'a', value: 1}, {label: 'b', value: 2}, {label: 'c', value: 3}]}/>
                <hr/>
                <BootstrapInput parent={this} name="select" type="select" label="select"
                                options={[{label: 'a', value: 1}, {label: 'b', value: 2}, {label: 'c', value: 3}]}/>
                <hr/>
                <BootstrapInput parent={this} name="selectPlain" type="select" label="select plain"
                                options={['one','two','three']}/>
                <hr/>
                <BootstrapInput parent={this} name="selectRight" type="select" label="select right label" labelPos={"right"}
                                options={['one','two','three']}/>
                <hr/>
                <BootstrapInput parent={this} name="numeric" type="number" label="numeric:" min="1"/>
                <hr/>
                <BootstrapInput parent={this} name="email" type="email" label=": email right label" labelPos={"right"}/>
                <hr/>
                <BootstrapInput parent={this} name="checkbox" type="checkbox" label="Checkbox"/>
                <BootstrapInput parent={this} name="checkboxLeft" type="checkbox" label="Left side" labelPos={"left"}/>
                <BootstrapInput parent={this} name="checkboxNoLabel" type="checkbox"/>
                <hr/>
                <BootstrapInput parent={this} name="textArea" type="textarea" label="Text Area:"/>
                <hr/>
                <BootstrapInput parent={this} name="textAreaRight" type="textarea" label=": Text Area Right" labelPos={"right"}/>
                <hr/>
                <h3>State</h3>
                <pre>{JSON.stringify(this.state)}
                </pre>
            </div>
        )
    }
}

ReactDOM.render(<Content/>, document.getElementById('jsx_content'));
