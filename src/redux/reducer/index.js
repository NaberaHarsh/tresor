
const initialState = {
categories:[],
searchList:[]
  }
  
  function reducer(state={initialState}, action) {
    console.log('action ',action.payload)
    
    switch(action.type){
       
        case "CATEGORY":{
        
          return state = {caterogy:action.payload.categories}
        
        }
        case "SEARCH_LIST":{
        
          return state = {searchList:action.payload.searchList}
        
        }   
    }
    // For now, don't handle any actions
    // and just return the state given to us.
    return state
  }

  export default reducer;
