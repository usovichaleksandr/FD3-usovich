import React from 'react';
import PropTypes from 'prop-types';

import './IshopBlock.css';

import IshopProduct from './IshopProduckt';
import IshopName from './IshopName';
import IshopForm from './IshopForm';

class IshopBlock extends React.Component{
  
  static propTypes= {
    shop: PropTypes.string.isRequired, // название магазина передается(обязательно) строкой    
    product:PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number.isRequired, // ункалиный код должен передаватся(обязательно) числом, 
        count:PropTypes.number.isRequired, // остаток товара на складе, передается(обязательно) числом,      
        text: PropTypes.string.isRequired, // название товара передается(обязательно) стококй, 
           })
         ),  
  };
  
  state= {
    selectedProduct: null,
    startListProducts:this.props.product,
    workMode:null,
    selectedProductText: null,// название товара выбранного щелчком
    selectedProductCount: null, // щстаток товара выбранного щелчком
    newAddedProductName:'', // имя нового введенного товара
    newAddedProductCount:'', // колличество нового введенного товара
  } 
  
  select= (newSelectProductCde,selectText, selectCount )=>{
    if(this.state.newAddedProductCount||this.state.newAddedProductName||(this.state.workMode==2)){
      return
    }else{
    this.setState({selectedProduct:newSelectProductCde,
                   workMode:1,
                  selectedProductText:selectText,
                  selectedProductCount:selectCount, });  
    }               
  }

  delete= (selectedProductCode) => {
    if(this.state.newAddedProductCount||this.state.newAddedProductName||
      this.state.workMode==3||this.state.workMode==2){
      return
    }else{
    let userQuestion=confirm('вы хотите удалить товар?');
    if(userQuestion){
     let newListProducts=this.state.startListProducts.filter(
      v=> v.code!=selectedProductCode
     );
     this.setState({startListProducts:newListProducts,
                    workMode:null,});
    }
   }
  }

  editProdut= (selctProductcode)=>{
    if(this.state.workMode==2){
      return
    }else    this.setState({workMode:3,
                            selectedProduct:selctProductcode})
  }

  addProduct =()=>{
    if(this.state.workMode==3){
      return
    }else{  
    this.setState({workMode:2,
                   selectedProduct:null})
    }
  }

  addProductNane=(nameNode)=>{
    this.setState({newAddedProductName: nameNode});
  }
  addProductCount=(countNode)=>{
    this.setState({newAddedProductCount: countNode});
  }
  SaveNewProduct=(saveName, saveCount, saveCode)=>{
    if(this.state.workMode==2){
    let a={text:saveName, count: saveCount, code: Math.random(),};
    let newListProducts=[...this.state.startListProducts, a];
    this.setState({startListProducts: newListProducts,
                    newAddedProductName:'',
                    newAddedProductCount:'',});
    }
    if(this.state.workMode==3){
          
    }

  }
  cansel=()=>{
    this.setState({workMode:null,
                   newAddedProductName:'',
                   newAddedProductCount:'',
                  selectedProduct:null},
      );
  }

  render () {  
      
    const allProducts=this.state.startListProducts.map(v=>
      <IshopProduct
        key={v.code}
        text={v.text}
        code={v.code}
        count={v.count}
        image={v.image}
        selectedProduct={this.state.selectedProduct}
        cbSelected={this.select}
        delete={this.delete}
        edit={this.editProdut}
        workMode={this.state.workMode}
        
      />
    );       

      return (
        <div className='Ishop'>
          <IshopName shopName={this.props.shop}/>
          <table className='ShopTab'>
            <thead className='ShopProdName'>
              <tr>
                <td>Название продукта</td>
                <td>Остаток на складе</td>
                <td>Фото продукта</td>
              </tr>
            </thead>
            <tbody>{allProducts}</tbody>
          </table>
          <input type='button' value='new product' onClick={this.addProduct}/>
          <IshopForm key={this.state.workMode}
            workMode={this.state.workMode} 
            selectedProductText={this.state.selectedProductText}
            selectedProductCount={this.state.selectedProductCount}
            cbAddProductName={this.addProductNane}
            cbaddProductCount={this.addProductCount}
            cbSaveNewProduct={this.SaveNewProduct}
            newAddedProductName={this.state.newAddedProductName}
            newAddedProductCount={Number(this.state.newAddedProductCount)}
            cansel={this.cansel}
            selectedProduct={this.state.selectedProduct}             
        />
        </div>
      );     
      
  }  
   
}
export default IshopBlock;

