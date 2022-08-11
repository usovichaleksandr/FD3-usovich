import React, { Fragment } from 'react';


const MovieInfo = props =>{    


    

    return(
        <ul>
            <li><span className='MovieInfo'>Название Фильма:</span> {props.info.title}</li>
            <li><span className='MovieInfo'>Режисер:</span>{props.info.director}</li>
            <li><span className='MovieInfo'>Актеры:</span> {props.info.actors}</li>
            <li><span className='MovieInfo'>Год выхода:</span>{props.info.year}</li>
            <li><span className='MovieInfo'>Продолжительность:</span>{props.info.runtime}</li>
            <li><span className='MovieInfo'>Описание:</span>{props.info.plot}</li>                      
            
        </ul>
    );


}

export default MovieInfo;