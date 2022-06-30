var IshopProduct=React.createClass({

    displayName: 'ishopProduct',

    propTypes: {                  
            code: React.PropTypes.number.isRequired, // код товара,передаватся(обязательно) числом,   
            count: React.PropTypes.number.isRequired, // остаток товара на складе, передается(обязательно) числом,      
            text: React.PropTypes.string.isRequired, // название товара передается(обязательно) стококй,                    
            selectedProduct: React.PropTypes.number, // код выбранного продукта
            cbSelected: React.PropTypes.func.isRequired, // collback функция родителя о выбранном товаре
            delete: React.PropTypes.func.isRequired, //collback функции родителя о удалении товара
    },
    
    select: function(){     
    this.props.cbSelected(this.props.code);
    //console.log(thi);
    },

    delete: function(EO){
      this.props.delete(this.props.code);
      EO.stopPropagation();
    },

    selectColor: function(){      
      if (this.props.code==this.props.selectedProduct){
        return 'ProdlineSelect';
      } else return 'Prodline'; 
    },
    

    render: function(){
       
      return React.DOM.tr({ className:this.selectColor(), onClick:this.select,},
             React.DOM.td({className:'Text'},this.props.text),
             React.DOM.td({className:'Count'},this.props.count),
             React.DOM.td(null, React.DOM.img({src:this.props.image, className:'Foto'},null)),
             React.DOM.td(null, React.DOM.input({type:'button', value:"delete", onClick:this.delete}, null)),            
             );

            
    },
});