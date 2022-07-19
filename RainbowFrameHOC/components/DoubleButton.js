import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

class DoubleButton extends React.Component{

    static propTypes={
        caption1: PropTypes.string.isRequired, //первое значение строка
        caption2: PropTypes.string.isRequired, //второе значение строка
        cbPressed: PropTypes.func.isRequired, //колбэк функции родителя
    };

    pressed=(EO)=>{
        this.props.cbPressed(EO.target.value);
    }

    render(){

        return(
            <Fragment>
                <input type='button' value={this.props.caption1} onClick={this.pressed}/>
                {this.props.children}
                <input type='button' value={this.props.caption2} onClick={this.pressed}/>
            </Fragment>
        );
    }

}
export default DoubleButton;