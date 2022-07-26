
import React from 'react';

export default ({massWords}) =>{

    let mass = massWords.map(v=> <div key={v}>{v}</div> );

    return(      
        <div className='wordsArea'>{mass}</div>
    ); 

};