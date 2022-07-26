
import React, { Fragment } from 'react';

export default ({sort, cbSetSort, filter, cbSetFilter}) =>{

    return(
        <Fragment>
            <input type='checkbox' checked={sort} onChange={event=>cbSetSort(event.target.checked) }/>
            <input type='text' value={filter} onChange={event=>cbSetFilter(event.target.value) } />
            <input type='button' value='clear' onClick={()=>{cbSetSort(false),cbSetFilter("")} }/>    
        </Fragment>
    );

};