import axios from "axios";
import config from "../../views/utils/ApiURL";


export const userAction = {
    login
}

function login (username,password){
    const userdata = {
          username: username,
          password: password,
        };
    
        const requestOptions = {
          method: "POST",
          url: config.url.login, 
          data: userdata
        };
    
          axios(requestOptions)
          .then(response => {
              return response
            // this.setState({
            //   userRes : response,
            //   token:response
            // })
          })
          .catch(err => {
            return err
            // this.setState({
            //   alert: err
            // })
          });
}