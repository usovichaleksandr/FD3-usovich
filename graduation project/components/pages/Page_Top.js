import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import MoviesTopList from '../../components/MoviesTopList';

class Page_Top extends React.PureComponent{
    

    static propTypes={
        muvies: PropTypes.object.isRequired,
    }

    render(){
       


        if(this.props.muvies.top[0]){
        const topMoviesList= this.props.muvies.top.map(v=>
            <MoviesTopList key={v.id} info={v}/>);
        return(
            <div>{topMoviesList}</div>
        );
        }else{
            return(
                <div>нет выбраных фильмов</div>
            );
     } 
    };

}

const mapStateToProps = function (state) {
    return {      
      muvies: state.muvies,     
    };
  };  
export default connect(mapStateToProps)(Page_Top);