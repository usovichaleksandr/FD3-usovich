import React from 'react';
import PropTypes from 'prop-types';

import './Page_FullMuviesList.css';

import DataAllMovie from '../../components/DataAllMovie';


class Page_FullMuviesList extends React.PureComponent{

    static propTypes = {
        muviesList: PropTypes.array.isRequired,       
      };

    state={
      selected:null
    };

    selected=(newSelectedItem)=>{      
      this.setState({selected:newSelectedItem});
    };


    
    render(){
      

        const allMoviesList=this.props.muviesList.map(v=>
          <DataAllMovie key={v.id}
           info={v} 
           celected={this.state.selected} 
           cbSelected={this.selected}/>);

        return(
            <div className='Gridlist'>
              {allMoviesList}
            </div>
        );
    }  


}

  
export default Page_FullMuviesList;