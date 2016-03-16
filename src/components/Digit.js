import React, { PropTypes, Component } from 'react';

class Digit extends Component {
	shouldComponentUpdate(nextProps, nextState){
		// Don't trigger a re-render unless the digit value was changed.
		return nextProps.value !== this.props.value;
	}
    render() {
        let style = {
            display: 'inline-block',
            fontSize: 20,
            padding: 10,
            margin: 5,
            backgroundColor: '#eee'
        };
        let displayValue;
        if(this.props.value < 10){
        	displayValue = '0' + this.props.value;
        }else{
        	displayValue = this.props.value;
        }
        return (
        	<div style={style}>{displayValue}</div>
        );
    }
}

Digit.propTypes = {
	value: PropTypes.number.isRequired
};

export default Digit;
