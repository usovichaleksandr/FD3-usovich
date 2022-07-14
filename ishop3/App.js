import React from 'react';
import ReactDOM from 'react-dom';

import IshopBlock from './components/IshopBlock';

let shopName='магази фруктов ';
let ourProducts=require('./Products.json');

ReactDOM.render(
  <IshopBlock 
    shop={shopName}
    product={ourProducts}    
  />
  , document.getElementById('container') 
);

