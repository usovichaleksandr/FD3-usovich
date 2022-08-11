import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import isoFetch from 'isomorphic-fetch';
import { BrowserRouter } from 'react-router-dom';

import PagesRouter from './pages/PagesRouter';
import PagesLinks from './pages/PagesLinks';

import {loadingData_net,loadingTop_net} from '../redux/muvieAC';

class MuviesLoadData extends React.Component{

    static propTypes = {
        muvies: PropTypes.object.isRequired, // передано из Redux
      };


  componentDidMount(){
    if ( this.props.muvies.data){
      return console.log('dontCriate');
    }else{            
    this.loadData();
    }       
  }

  fetchError = (errorMessage) => {
    alert('По запросу прилетела ошибка: '+errorMessage);
  };

  fetchSuccess = (loadedData) => {   
    this.props.dispatch(loadingData_net(loadedData));
  };
  fetchErrorTop = (errorMessage) => {
    alert('По запросу прилетела ошибка: '+errorMessage);
  };

  fetchSuccessTop = (loadedTop) => {   
     this.props.dispatch(loadingTop_net(JSON.parse(loadedTop.result)));    
  };
    
  loadData = () => {   

    isoFetch("https://raw.githubusercontent.com/erik-sytnyk/movies-list/master/db.json", {    
        method: 'get',
        headers: {
            "Accept": "application/json",
        },
    })
        .then( response => { // response - HTTP-ответ
            if (!response.ok)
                throw new Error("fetch error " + response.status); // дальше по цепочке пойдёт отвергнутый промис
            else
                return response.json(); // дальше по цепочке пойдёт промис с пришедшими по сети данными
        })
        .then( data => {
            this.fetchSuccess(data); // передаём полезные данные в fetchSuccess, дальше по цепочке пойдёт успешный пустой промис
        })
        .catch( error => {
            this.fetchError(error.message);
        });

    let sp = new URLSearchParams();
    sp.append('f', 'READ');
    sp.append('n', 'Usovih_Aleksandr_MoviesInfo_StoregeHash');
        
     
    isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php", {    
      method: 'post',            
      body : sp,           
    }).then( response => { 
      if (!response.ok)
      throw new Error("fetch error " + response.status); 
      else
        return response.json(); 
    }).then( data => {
        this.fetchSuccessTop(data); 
    }).catch( error => {
        this.fetchErrorTop(error.message);
    });

  };  


  render(){
    if ( !this.props.muvies.data){
      return <div>загрузка данных...</div>;
    }else{         

    return(      
      <BrowserRouter>
      <div>
        <PagesLinks />
        <PagesRouter />
      </div>
    </BrowserRouter>
    )
  }
   };  
}

const mapStateToProps = function (state) {
    return {      
      muvies: state.muvies,
    };
  };
  
export default connect(mapStateToProps)(MuviesLoadData);