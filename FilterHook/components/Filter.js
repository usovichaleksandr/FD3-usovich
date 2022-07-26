
import React, {  useState, Fragment } from 'react';

import Controls from './Controls';
import List from './List';

import "./Filter.css";



export default ({massWords}) =>{
    
    let [sort, serSort]=useState(false);
    let [filter, setFilter]=useState("");

    let newmassWords=massWords.slice();

    if(sort){
        newmassWords.sort();
    }
    if(filter){
        newmassWords= newmassWords.filter(v=> v.indexOf(filter)>=0);
    }


    return(
        <Fragment>
            <Controls sort={sort} cbSetSort={serSort} filter={filter} cbSetFilter={setFilter}/>
            <List massWords={newmassWords}/>
        </Fragment>
    );
};