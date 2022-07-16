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
    selectedProductImage:null, // картинка выбранного для изменения товара
  } 
  // функия просмотра информации о товаре, в режиме создания нового товара и при заполненых полях формы недоступна
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
// функция удаления товара, при заполненых полях формы и врежимах изменения и создания товара недоступна 
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
// функция изменения тована, при заполненых полях формы и режиме создания товара недоступна 
  editProdut= (selctProductCode,  selectedProductText, selectedProductCount, selectedProductImage)=>{
    if(this.state.workMode==2){
      return
    }else    this.setState({workMode:3,
                            selectedProduct:selctProductCode,
                            selectedProductImage: selectedProductImage,
                            newAddedProductName:selectedProductText,
                            newAddedProductCount:selectedProductCount, })
  }
// функция добавления товара, в режиме редактирования недоступна 
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

  //функция сохранения товара
  SaveNewProduct=()=>{
    if(this.state.newAddedProductCount&&this.state.newAddedProductName){
      
    
    if(this.state.workMode==2){
    let a={text: this.state.newAddedProductName, count: this.state.newAddedProductCount, code: Math.random(),};
    let newListProducts=[...this.state.startListProducts, a];
    this.setState({startListProducts: newListProducts,
                    newAddedProductName:'',
                    newAddedProductCount:'',
                    workMode:null,
                    selectedProduct:null,});
    }
    if(this.state.workMode==3){
    let listCopy=[...this.state.startListProducts];
    for(let i=0;i<listCopy.length; i++){
      if(listCopy[i].code==this.state.selectedProduct){
        listCopy[i].text=this.state.newAddedProductName;
        listCopy[i].count=this.state.newAddedProductCount;
      }
    }
    this.setState({startListProducts: listCopy,
      newAddedProductName:'',
      newAddedProductCount:'',
      workMode:null,
      selectedProduct:null,});               
    }
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
          </table>{(this.state.workMode==3||this.state.workMode==2)?
          <input type='button' disabled={true} value='new product' onClick={this.addProduct}/>:
          <input type='button' value='new product' onClick={this.addProduct}/> }
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

