var Filter = React.createClass({
    
    displayName:'filter',

    propTypes: {
        words: React.PropTypes.arrayOf(React.PropTypes.string.isRequired), //массив со словами
    },

    getInitialState: function() {     
        
        var mass=JSON.parse(JSON.stringify(this.props.words)); //делаем копию массива
        return { deffMassWords:mass,
                 prevMass:"",  
                 checkedNow:false,  //начальное знасение для 
                 deffSort:"",          
        };
    },

    alfavitSort: function(EO){
      var bullVall=EO.target.checked;      
      var reMass;
      var memPrevMass=JSON.parse(JSON.stringify(this.state.deffMassWords));
      if(bullVall){        
        reMass=this.state.deffMassWords.sort();        
        this.setState({deffMassWords:reMass,checkedNow:true,prevMass:memPrevMass});        
      }else {reMass=this.state.prevMass;
             this.setState({deffMassWords:reMass,checkedNow:false});             
        }            
    },

    clearMode:function(){
        var clear=JSON.parse(JSON.stringify(this.props.words));
        this.setState({deffMassWords:clear,checkedNow:false, deffSort:""});

        
    },

    inerSort: function(EO){
        var inNode=EO.target.value;
        var sortMass;
        if(inNode){                
        sortMass=this.state.deffMassWords.filter(v=> v.indexOf(inNode)>=0);
        this.setState({deffMassWords:sortMass, deffSort:inNode });   
        }else if(inNode=="") {
          sortMass=JSON.parse(JSON.stringify(this.props.words));
          this.setState({deffMassWords:sortMass, deffSort:inNode });
        }        
        
    },

    
    render: function(){
        //в качестве значения "key" установим значение самого элемента 
        var wordsNow=this.state.deffMassWords.map(v=> React.DOM.div({key:v},v) );
        

        return React.DOM.div(null,
            React.DOM.input({type:'checkbox', onChange:this.alfavitSort, checked: this.state.checkedNow,}),
            React.DOM.input({type:'text', className:'enteredValue', onChange:this.inerSort, value:this.state.deffSort}),
            React.DOM.input({type:'button', value:'clear', onClick:this.clearMode,}),
            React.DOM.div({className:'wordsArea'},wordsNow),            
            );
    }
});