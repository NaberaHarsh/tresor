
import axios from 'axios';
// import getCookie from './getCookie';


export default function callApi(requestOption,callback) {
   
    if(!requestOption.headers){
        requestOption.headers = {}
    }    
    // requestOption.headers.token = getCookie('token')
    
     axios(requestOption)
     .then(response => {
         // return the response in callback
         callback(null,response)
    })
    .catch(e=>callback(e,null));
}