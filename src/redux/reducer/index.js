// import {SUCCESS_LOGIN} from '../../action/generic';
//import * as generic from '../../action/generic';



const initialState = {
categories:[]
  }
  
  function reducer(state={initialState}, action) {
    console.log('action ',action.payload)
    switch(action.type){
       
        case "CATEGORY":{
        
          return state = {caterogy:action.payload.categories}
        
        }   
    }
    // For now, don't handle any actions
    // and just return the state given to us.
    return state
  }

  export default reducer;
