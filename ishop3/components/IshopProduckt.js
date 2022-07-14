import React from 'react';
import PropTypes from 'prop-types';

import './IshopBlock.css';


class IshopProduckt extends React.Component{

  static propTypes= {
    code: PropTypes.number.isRequired, // код товара,передаватся(обязательно) числом,   
    count: PropTypes.number.isRequired, // остаток товара на складе, передается(обязательно) числом,      
    text: PropTypes.string.isRequired, // название товара передается(обязательно) стококй,                    
    selectedProduct: PropTypes.number, // код выбранного продукта
    cbSelected: PropTypes.func.isRequired, // collback функция родителя о выбранном товаре
    delete: PropTypes.func.isRequired, //collback функции родителя о удалении товара
    edit: PropTypes.func.isRequired, //сollback функцииродителя об зменении товара
    workMode: PropTypes.number,// режим отбражения
  };

  

  select=()=>{     
    this.props.cbSelected(this.props.code, this.props.text, this.props.count);
    }

    delete = (EO)=>{
      this.props.delete(this.props.code);
      EO.stopPropagation();
    }

    selectColor = ()=>{        
      if (this.props.code==this.props.selectedProduct){
        return  'coral'
      } 
    }
    edit = (EO) =>{
      this.props.edit(this.props.code);
      EO.stopPropagation()
    }

    render (){

      return(
        <tr style={{backgroundColor: this.selectColor()}} onClick={this.select}>
          <td className='Text'>{this.props.text}</td>
          <td className='Count'>{this.props.count}</td>
          <td><img src={this.props.image } className='Foto' /></td>
          <td><input type='button' value='edit' onClick={this.edit}/></td>
          <td><input type='button' value='delete' onClick={this.delete}/></td> 
        </tr>
      )     

                 
    }    
  
}
export default IshopProduckt;

