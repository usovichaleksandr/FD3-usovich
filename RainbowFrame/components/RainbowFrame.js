import React from 'react';
import PropTypes from 'prop-types';

import './RainbowFrame.css';

class RainbowFrame extends React.Component{

    static propTypes={

         colors : PropTypes.array.isRequired, //массив цветов передается массивом
    };

    render(){
        
        let text=this.props.children;
        for(let color of this.props.colors){           
            text=<div style={{ border:'solid 2px '+color}}>{text}</div>;
        } 
         
        return text
    }

}
export default RainbowFrame;