import React from 'react';
import PropTypes from 'prop-types';

import './br2jsx.css';

class BR2JSX extends React.Component{

    static propTypes={

         text : PropTypes.string.isRequired, 
    };

    render(){

        let b=this.props.text.split(/<br *\/?>/);
        
        let a=[];
        for(let i=0; i<b.length;i++){
            if(i){
                a.push(<br/>);
            }
            a.push(b[i]);
        }
       
         
        return a      
    }

}
export default BR2JSX;