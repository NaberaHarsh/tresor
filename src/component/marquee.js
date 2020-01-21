import React from "react";

class Moving extends React.Component {
    constructor(props){
        super(props)
        this.state={
            shows:[]
        }
    }

    componentDidMount(){
   console.log(this.props.shows)
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState !== nextProps) {
        
        
          return {
            shows:nextProps.shows
          };
        }
    
        // Return null to indicate no change to state.
        return null;
      }
    

render(){
  if(this.props.shows.length>0){
return(
<div style={{backgroundColor:'black', fontSize:'20px', color:'white', padding:"12px"}}>
    {this.props.shows.map((p)=>(
<marquee>{p.detail}</marquee>
    ))}
</div>
)}
else{
  return(
    <div></div>
  )
}

}
}
export default Moving;