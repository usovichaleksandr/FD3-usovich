var Ishop = React.createClass({

    displayName: 'ishop',
  
    propTypes: {
      shop: React.PropTypes.string.isRequired, // название магазина передается(обязательно) строкой 
    //   product: React.PropTypes.array.isRequired, // таблица с продуктами передается(обязательно) массивом.
      
      product:React.PropTypes.arrayOf(
        React.PropTypes.shape({
          code: React.PropTypes.number.isRequired, // ункалиный код должен передаватся(обязательно) числом, 
          count: React.PropTypes.number.isRequired, // остаток товара на складе, передается(обязательно) числом,      
          text: React.PropTypes.string.isRequired, // название товара передается(обязательно) стококй, 
        })
      )
      
    },
  
    render: function() {       
        var products=this.props.product.map(v=>
            React.DOM.tr({key:v.code, className:'Prodline'},
            React.DOM.td({className:'Text'},v.text),
            React.DOM.td({className:'Count'},v.count),
            React.DOM.td(null, React.DOM.img({src:v.image,className:'Foto'},null)),
            )
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
            React.DOM.tbody(null,  products)),
        );
         
    },
  
  });