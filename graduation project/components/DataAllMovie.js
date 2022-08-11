import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import {addingData_top} from '../redux/muvieAC';
import isoFetch from 'isomorphic-fetch';

import './DataAllMovie.css';

class DataAllMovie extends React.PureComponent{

    static propTypes={
        muvies: PropTypes.object.isRequired,
        info : PropTypes.shape({
            id: PropTypes.number.isRequired,                        
          }),
        cbSelected: PropTypes.func.isRequired,
        celected: PropTypes.number           
    }     
    

    password;
    
    addTopMovies=(EO)=>{
        EO.stopPropagation();
        let topToSave;
        const top=[...this.props.muvies.top];
        if(top.length >= 10){            
            top.shift();
            let newTopmass=[...top, this.props.info];
            topToSave=newTopmass;            
            this.props.dispatch(addingData_top(newTopmass));
        }else{            
         let newTopmass=[...this.props.muvies.top, this.props.info];
         this.props.dispatch(addingData_top(newTopmass));
         topToSave=newTopmass;
        }        
        this.saveData(topToSave);     
        
    };

    saveData = (topToSave) => {
        
        
        this.password= Math.random();

        let sp = new URLSearchParams();
        sp.append('f', 'LOCKGET');
        sp.append('n', 'Usovih_Aleksandr_MoviesInfo_StoregeHash');
        sp.append('p', this.password);              
            
        isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php", {    
            method: 'post',            
            body : sp,           
        }).then( response => { 
            if (!response.ok)
            throw new Error("fetch error " + response.status); 
                else
                    return response.json(); 
        }).then( data => {
            this.locGetReady(topToSave); 
        }).catch( error => {
            this.fetchError(error.message);
        });
    }

    locGetReady=(topToSave)=>{

        const saveTopList= JSON.stringify(topToSave);

        let dp=new URLSearchParams();
        dp.append('f', 'UPDATE');
        dp.append('n', 'Usovih_Aleksandr_MoviesInfo_StoregeHash');
        dp.append('p', this.password);
        dp.append('v', saveTopList);

        isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php", {    
            method: 'post',            
            body : dp,           
        }).then( response => { 
            if (!response.ok)
            throw new Error("fetch error " + response.status); 
                else
                    return response.json(); 
        }).then( data => {
            this.fetchSuccess(data); 
        }).catch( error => {
            this.fetchError(error.message);
        });
            
    }

    fetchErrorTop = (errorMessage) => {
        alert('По запросу прилетела ошибка: '+errorMessage);
    };
            
    fetchSuccess = (loadedData) => {   
         
        //console.log(loadedData+' loadedData');
    };

    select=()=>{
       
        this.props.cbSelected(this.props.info.id)
    }

    selekdedColor=()=>{        
        if(this.props.info.id==this.props.celected){
            return 'UlLinkUrlSelect'
        }else return 'UlLinkUrl'
    }




    render(){
       
        let top=false;
            for(let i=0; i<this.props.muvies.top.length; i++){                           
                if(this.props.muvies.top[i].id==this.props.info.id){                
                    top=true;                
                }
            };
                    


        return(
            <ul className={this.selekdedColor()} onClick={this.select}>
                <li className='title' >{this.props.info.title}</li>               
                <li><NavLink to={"/moviesInfo/"+this.props.info.title} className='linkUrl'>info</NavLink></li>               
                <li>{top?<div className='inTop'>top10</div>:
                <input type='button' value='add top' onClick={this.addTopMovies}/>}</li>
            </ul>
        )
    }

}

const mapStateToProps = function (state) {
    return {      
      muvies: state.muvies,     
    };
  };  
export default connect(mapStateToProps)(DataAllMovie);