import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class BootstrapInput extends Component {
    constructor(props) {
        super(props);
        this.inputProps = {};
        this.state = {value: props.parent.state[props.name], id: props.id || Math.random()};
        // remove specific props and pass rest to the input control
        Object.keys(this.props).filter(prop => !BootstrapInput.propTypes.hasOwnProperty(prop)).forEach(prop => this.inputProps[prop] = this.props[prop]);
    }

    static propTypes = {
        name: PropTypes.string.isRequired,
        parent: PropTypes.instanceOf(Component).isRequired,
        type: PropTypes.string,
        label: PropTypes.string,
        onChange: PropTypes.func,
        options: PropTypes.array,
        inputClassName: PropTypes.string,
        inlineClassName: PropTypes.string,
        labelClassName: PropTypes.string,
        labelPos: PropTypes.string,
    };

    static defaultProps = {
        type: 'text',
        label: '',
        inputClassName: "form-control",
        inlineClassName: "form-check-inline",
        labelClassName: "form-check-label",
        options: ['set', 'options=[1,2,3]', 'for selections'],
    }

    onChange = (evt) => {
        let {value, tagName, type, checked} = evt.target;
        const {name, parent} = this.props;
        const currentValue = parent.state[name];
        if (!isNaN(currentValue)) {
            value = Number(value)
        }
        switch (type) {
            case 'checkbox':
                value = checked;
                break;
        }
        parent.setState({[name]: value});
        this.setState({value: value});
        // call any extra onChange
        if (this.props.onChange) {
            this.props.onChange(evt, value);
        }
    }

    renderWithLabel(inputControl) {
        if (this.props.label) {
            if (this.props.labelPos === "right") {
                return <div className={this.props.inlineClassName}>
                    <label
                        className={this.props.labelClassName}
                        htmlFor={this.state.id}>{inputControl}{this.props.label}</label>
                </div>;
            }
            return <div className={this.props.inlineClassName}>
                <label
                    className={this.props.labelClassName}
                    htmlFor={this.state.id}>{this.props.label}{inputControl}</label>
            </div>;
        }
        return inputControl;
    }

    render() {
        const state = this.props.parent.state;
        let {name, type, label, options} = this.props;

        switch (type) {
            case 'textarea':
                return this.renderWithLabel(<textarea className={"form-control"} value={state[name]} id={this.state.id}
                                                      onChange={evt => this.onChange(evt)} {...this.inputProps} />);
            case 'checkbox':
                return this.renderCheckbox(type, state, name);
            case 'radio':
                return this.renderRadio(options, name, type);
            case 'select':
                return this.renderSelect(label, name, state, options);
            default:
                return this.renderWithLabel(<input className={this.props.inputClassName} type={type} value={state[name]}
                                                   checked={state[name]} id={this.state.id}
                                                   onChange={evt => this.onChange(evt)} {...this.inputProps} />)
        }
    }

    renderSelect(label, name, state, options) {
        let leftLabel = <label className={this.props.labelClassName} htmlFor={this.state.id}>{label}</label>;
        let rightLabel = "";
        if (this.props.labelPos === "right") {
            rightLabel = leftLabel;
            leftLabel = "";
        }
        return <div className={"form-group"}>
            {leftLabel}
            <select name={name} value={state[name]} className={"form-control"} id={this.state.id}
                    onChange={evt => this.onChange(evt)} {...this.inputProps}>
                {options.map(option => <option key={option.label || option}
                                               value={option.value || option}>{option.label || option}</option>)}
            </select>
            {rightLabel}
        </div>;
    }

    renderCheckbox(type, state, name) {
        let rightLabel = this.props.label;
        let leftLabel = "";
        if (this.props.labelPos === "left") {
            leftLabel = rightLabel;
            rightLabel = "";
        }
        return (<div className={"form-check"}>
            <label className="form-check-label">
                {leftLabel}<input className="form-check-input" type={type} value={state[name]}
                                  checked={state[name] ? true : false}
                                  onChange={evt => this.onChange(evt)} {...this.inputProps} />{rightLabel}
            </label>
        </div>);
    }

    renderRadio(options, name, type) {
        return options.map(option => {
            let rightLabel = option.label || option;
            let leftLabel = "";
            const label = rightLabel;
            if (this.props.labelPos === "left") {
                leftLabel = rightLabel;
                rightLabel = "";
            }
            const input = <input className={"form-check-input"} name={name} type={type}
                                 value={option.value || option}
                                 checked={option.value == this.state.value}
                                 onChange={evt => this.onChange(evt)} {...this.inputProps} />;
            return (<div className={"form-check"} key={label}>
                <label className={this.props.labelClassName}>
                    {leftLabel}{input}{rightLabel}
                </label>
            </div>)
        });
    }
}

