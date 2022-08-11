import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Page_About from './Page_About';
import Page_FullMuviesList from './Page_FullMuviesList';
import Page_InfoMovieList from './Page_InfoMovieList';
import Page_Top from './Page_Top';

class PagesRouter extends React.Component {

  static propTypes={
    muvies: PropTypes.object.isRequired, // передано из Redux
  };
          
  render() {

    const allMuvies=this.props.muvies.data.movies.slice(0,59);
    const firstMuviesList=this.props.muvies.data.movies.slice(0,29);
    const secondMuviesList=this.props.muvies.data.movies.slice(30,59);

    return (       
      <Routes>
        <Route path="/" element={<Page_About/>} />
        <Route path="/fullMuviesList" element={<Page_FullMuviesList muviesList={allMuvies} />} />
        <Route path="/firstMuviesList" element={<Page_FullMuviesList muviesList={firstMuviesList} />} />
        <Route path="/SecondMuviesList" element={<Page_FullMuviesList muviesList={secondMuviesList} />} />
        <Route path="/moviesInfo/:clid" element={<Page_InfoMovieList />} />
        <Route path="/Ratig" element={<Page_Top/>}/>        
      </Routes>
    );
    
  }

}
    
const mapStateToProps = function (state) {
  return {      
    muvies: state.muvies,
  };
};

export default connect(mapStateToProps)(PagesRouter);