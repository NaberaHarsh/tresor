
import axios from 'axios';


export default function callApi(requestOption,callback) {
   
    if(!requestOption.headers){
        requestOption.headers = {}
    }    
    
     axios(requestOption)
     .then(response => {
         // return the response in callback
         callback(null,response)
    })
    .catch(e=>callback(e,null));
}