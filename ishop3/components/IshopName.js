import React from 'react';
import PropTypes from 'prop-types';

import './IshopBlock.css';


class IshopName extends React.Component{

    static propTypes={
        shopName: PropTypes.string.isRequired,
    };

    render(){
        return <div className='ShopName'>{this.props.shopName}</div>
    }

}

export default IshopName;