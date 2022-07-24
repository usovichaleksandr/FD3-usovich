import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import {clientEvents} from './events';

import MobileClient from './MobileClient';

import './MobileCompany.css';

class MobileCompany extends React.PureComponent {

  static propTypes = {   
    clients:PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        fam: PropTypes.string.isRequired,
        im: PropTypes.string.isRequired,
        otch: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
      })
    ),
  };

  state = {    
    clients: this.props.clients,
    workMode:null,
    selectClientCode:null,
  };

  allClients=this.props.clients;
  newkey=130;
  newFam=null;
  newIm=null;
  newOtch=null;
  newBalance=null;

  setFamRef=(ref)=>{
    this.newFam=ref;
  }
  setImRef=(ref)=>{
    this.newIm=ref;
  }
  setOtchRef=(ref)=>{
    this.newOtch=ref;
  }
  setBalanceRef=(ref)=>{
    this.newBalance=ref;
  }
  addNewClient=()=>{
    this.setState({workMode:1})
  }
  cansel=()=>{
    this.setState({workMode:null})
  }
  saveChanges=()=>{
    if((this.state.workMode===1)&& this.newFam.value && this.newIm.value && this.newOtch.value && this.newBalance.value){
      let newClient={id:this.newkey,
                    fam:this.newFam.value,
                    im:this.newIm.value,
                    otch:this.newOtch.value,
                    balance:(+this.newBalance.value),
                  };
      let newListClients= [...this.allClients, newClient];
      this.allClients=newListClients;      
      this.newkey=this.newkey+10;
      this.setState({clients:newListClients, workMode:null});     
      }
      if((this.state.workMode===2)&& this.newFam.value && this.newIm.value && this.newOtch.value && this.newBalance.value){
        let newListClients=[...this.allClients];
        newListClients.forEach((v, i)=>{        
          if(v.id==this.state.selectClientCode){
            let newClientInfo={...v};              
            newClientInfo.fam=this.newFam.value;
            newClientInfo.im=this.newIm.value;
            newClientInfo.otch=this.newOtch.value;
            newClientInfo.balance=(+this.newBalance.value);
            newListClients[i]=newClientInfo;
          }
         }
        );         
         this.allClients=newListClients;
         this.setState({clients:newListClients, workMode:null});
      }           
    
  }
  
  setActiveClients=()=>{
    let newListClients=this.allClients.filter(v=>v.balance>0);
    this.setState({clients:newListClients});
  }
  setBlockedClients=()=>{
    let newListClients=this.allClients.filter(v=>v.balance<=0);
    this.setState({clients:newListClients});
  }
  setAllClients=()=>{
    this.setState({clients:this.allClients});
  }
  componentDidMount=()=>{
    clientEvents.addListener('EAclientDeleteClicked', this.clientDelete);
    clientEvents.addListener('EAclientEditClicked', this.clientEdit);
  }
  componentWillUnmount = () => {
    clientEvents.removeListener('EAclientDeleteClicked', this.clientDelete);
    clientEvents.removeListener('EAclientEditClicked', this.clientEdit);
  }
  clientDelete=(code)=>{
     let newListClients=this.state.clients.filter(v=>v.id!=code);
     this.setState({clients:newListClients});
  }
  clientEdit=(code)=>{    
    this.setState({workMode:2, selectClientCode:code,});
  }

  render() {

     console.log("MobileCompany render");
    

     const clientsCode = this.state.clients.map(v =>
      <MobileClient key={v.id} info={v}/>
     ) 

    return (
      <div className='MobileCompany'><div>Какая-то Мобильная Компания</div>
        <input type="button" value="Все" onClick={this.setAllClients} />
        <input type="button" value="Активные" onClick={this.setActiveClients} />
        <input type="button" value="Заблокированные" onClick={this.setBlockedClients} />
        <table className='AllClientsTab'>
          <thead>
            <tr>
            <td>Фамилия</td>
            <td>Имя</td>
            <td>Отчество</td>
            <td>Баланс</td>
            <td>Статус</td>
            <td>Редактировать</td>
            <td>Удалить</td>
            </tr>
          </thead>
          <tbody>{clientsCode}</tbody>
        </table>     
         <input type="button" value="Новый Клиент" onClick={this.addNewClient} />
         {(this.state.workMode)&&
         <Fragment>
         <div><span className='InputName'>Введите Фамилию: </span><input className='InputVal' type='text' ref={this.setFamRef} /></div>
         <div><span className='InputName'>Введите Имя: </span><input className='InputVal' type='text' ref={this.setImRef}/></div>
         <div><span className='InputName'>Введите Отчество: </span><input className='InputVal' type='text' ref={this.setOtchRef}/></div>
         <div><span className='InputName'>Введите Баланс: </span><input className='InputVal' type='number' ref={this.setBalanceRef}/></div>
         <input type='button' value='сохранить' onClick={this.saveChanges} />
         <input type='button' value='выход' onClick={this.cansel}/> 
         </Fragment>
          }
       </div>
    );
  }
}

export default MobileCompany;
