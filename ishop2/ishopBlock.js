var IshopBlock = React.createClass({

    displayName: 'ishopBlock',
  
    propTypes: {
      shop: React.PropTypes.string.isRequired, // название магазина передается(обязательно) строкой    
      product:React.PropTypes.arrayOf(
        React.PropTypes.shape({
          code: React.PropTypes.number.isRequired, // ункалиный код должен передаватся(обязательно) числом, 
          count: React.PropTypes.number.isRequired, // остаток товара на складе, передается(обязательно) числом,      
          text: React.PropTypes.string.isRequired, // название товара передается(обязательно) стококй, 
        })
      )      
    },

    getInitialState: function(){
      return {selectedProduct: null,
              startListProducts:this.props.product, 
      }
    },

    select: function(newSelectProduct){
      this.setState({selectedProduct:newSelectProduct});      
    },
     delete: function(selectedProductCode){
      var userQuestion=confirm('вы хотите удалить товар?');
      if(userQuestion){
       var newListProducts=this.state.startListProducts.filter(
        v=> v.code!=selectedProductCode
       );
       this.setState({startListProducts:newListProducts,});
      }
     }, 
  
    render: function() {  
      
      var allProducts=this.state.startListProducts.map(v=>
        React.createElement(IshopProduct,{
          key:v.code,
          text:v.text,
          code:v.code,
          count:v.count,
          image:v.image,
          selectedProduct:this.state.selectedProduct,
          cbSelected: this.select,
          delete:this.delete,
          })
        );       

        return React.DOM.div({className:'Ishop'},
            React.DOM.div({className:'ShopName'}, this.props.shop),
            React.DOM.table({className:'ShopTab'},
            React.DOM.thead({className:'ShopProdName'}, 
            React.DOM.tr(null, 
            React.DOM.td(null,'Название продукта'),
            React.DOM.td(null,'Остаток на складе, кг'),
            React.DOM.td(null, 'Фото продукта'),     
              ) 
            ),
            React.DOM.tbody(null, allProducts),            
            ), 
        );         
    },  
  });  