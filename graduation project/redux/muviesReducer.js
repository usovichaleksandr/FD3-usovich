import {LOAD_DATA, ADD_TOP, LOAD_TOP} from './muvieAC';


const initState={
    
    data: null,
    top: [],  
  };  
 
  
  function muviesReducer(state=initState,action) {
    switch(action.type){

        case LOAD_DATA:{           
            let newState={...state,
            data:action.loadData};         
          return newState;
        }
        case ADD_TOP:{
          let newState={...state,
            top:action.topNode};
          return newState;     
        }
        case LOAD_TOP:{
          let newState={...state,
            top:action.loadTop};
          return newState;     
        }
        default:
            return state;
    }

  }

  export default muviesReducer;