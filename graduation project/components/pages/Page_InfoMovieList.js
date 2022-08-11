import React  from 'react';
import {connect} from 'react-redux';
import {useParams} from "react-router-dom";

import MovieInfo from '../../components/MovieInfo';


const Page_InfoMovieList = props =>{

    const appData = props.muvies.data.movies;
    const params = useParams();    
    let movieTitle=params.clid;
    let clientData=appData.find( c => c.title==movieTitle );    

    return(        
        <MovieInfo
        info={clientData}
      />
    );
}

const mapStateToProps = function (state) {
    return {      
      muvies: state.muvies,     
    };
  };  
export default connect(mapStateToProps)(Page_InfoMovieList);