import React from 'react';
import PropTypes from 'prop-types';

import {clientEvents} from './events';

import './MobileClient.css';

class MobileClient extends React.PureComponent {

  static propTypes = {
    info : PropTypes.shape({
        id: PropTypes.number.isRequired,
        fam: PropTypes.string.isRequired,
        im: PropTypes.string.isRequired,
        otch: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
      }),
    
  };  

  checkActivity = ()=>{
      if(this.props.info.balance>0){
        return 'Активен';
      }else return 'Заблокирован';
  }  
  delete=()=>{
    clientEvents.emit('EAclientDeleteClicked', this.props.info.id);
  }
  edit=()=>{
    clientEvents.emit('EAclientEditClicked', this.props.info.id );
  }
  colorised=()=>{
    if(this.props.info.balance>0){
      return {backgroundColor: 'green'};
    }else return {backgroundColor:'red'};
  }  
  render() {

    console.log("MobileClient id="+this.props.info.id+" render");    
    
    return (
      <tr className='Client'>
      <td>{this.props.info.fam}</td>
      <td>{this.props.info.im}</td>
      <td>{this.props.info.otch}</td>
      <td>{this.props.info.balance}</td>
      <td style={this.colorised()}>{this.checkActivity()}</td>
      <td><input type='button' value='Редактировать' onClick={this.edit}/></td>
      <td><input type='button' value='Удалить' onClick={this.delete}/></td> 
      </tr>     
    );
  }
}
export default MobileClient;
