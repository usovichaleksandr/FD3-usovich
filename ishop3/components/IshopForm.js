import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

class IshopForm extends React.Component {

    static propTypes={
        workMode: PropTypes.number, //может быть null        
        selectedProductText: PropTypes.string,
        selectedProductCount: PropTypes.number,
        cbAddProductName: PropTypes.func.isRequired, 
        cbaddProductCount: PropTypes.func.isRequired, 
        newAddedProductName: PropTypes.string, // имя нового введенного товара 
        newAddedProductCount: PropTypes.number, //колличество нового введенного товара
        cbSaveNewProduct: PropTypes.func.isRequired, // колбэк функции сохранить
        cansel: PropTypes.func.isRequired,// колбэк функции отмена
        selectedProduct: PropTypes.number,        
    };
    

    addProductName=(EO)=>{
        this.props.cbAddProductName(EO.target.value);
    }

    addProductCount=(EO)=>{
        this.props.cbaddProductCount(Number(EO.target.value));
    }
    saveNewProduct=()=>{      
        this.props.cbSaveNewProduct();      
               
    }   
    cansel=()=>{
        this.props.cansel();
    }
    // валидация полей формы производится только на предмет отсутствия введенных данных
    invalid=(inputValid)=>{        
         if(!inputValid)  return' строка не заполнена ';        
    }
    
    render(){      
        
        let formAddEdit=<Fragment>
            <div>
                           <span>Название: </span>
                           <input type='text' onChange={this.addProductName}
                               value={this.props.newAddedProductName} style={{width: '200px' }}/>
                           <span className='Invalid'>{this.invalid(this.props.newAddedProductName)}</span>    
                       </div>
                       <div>
                           <span>Колличество: </span>
                           <input type='text' onChange={this.addProductCount}
                                value={this.props.newAddedProductCount} style={{width: '200px' }}/>
                                <span className='Invalid'>{this.invalid(this.props.newAddedProductCount)}</span>
                       </div>                       
                       <div>{(this.props.newAddedProductCount&&this.props.newAddedProductName)?
                            <input type='button' value='save' onClick={this.saveNewProduct}/>:
                            <input type='button'disabled='true' value='save' onClick={this.saveNewProduct}/>}
                            <input type='button' value='cancel' onClick={this.cansel}/>
                       </div> 
        </Fragment>

        return(<div className='IshopForm'>            
            
                    {((this.props.workMode==1)&&
                    <Fragment>
                       <div className='FormMode'>Iformation</div>
                       <div><span>Товар: </span> <span>{this.props.selectedProductText}</span></div>
                       <div><span>Остаток: </span> <span>{this.props.selectedProductCount}</span></div>
                    </Fragment>)||
                    ((this.props.workMode==2)&&
                    <Fragment>
                       <div className='FormMode'>Add new product</div>
                       {formAddEdit}
                    </Fragment>)||
                    ((this.props.workMode==3)&&
                    <Fragment>
                        <div className='FormMode'>Edit selectid product</div>
                        {formAddEdit}             
                    </Fragment>)
                    }
                </div>
        );
        
    }

}

export default IshopForm;