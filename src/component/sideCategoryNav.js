import React , { Component }  from 'react'
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import Link from "@material-ui/core/Link";
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


class CustomizedTreeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      catId: "",
      anchorEl:null,
    //  silver_visible: {display : 'none'}, gemstone_visible: {display : 'none'}, diamond_visible: {display : 'none'}, charm_visible:{display: 'none'}};


    }
  }
    
   handleClick(event){
    this.setState({anchorEl:event.currentTarget})
  };
    
  handleClose = () => {
    this.setState({anchorEl:null})
  };
// do(e){
  
//   if(e.target.value=='silver'){
//     console.log("hello")
//     this.setState({silver_visible:{display:'block'}})
//     this.setState({gemstone_visible:{display:'none'}})
//     this.setState({diamond_visible:{display:'none'}})
//     this.setState({charm_visible:{display:'none'}})

//   }
//   if(e.target.value=='gemstone'){
//     this.setState({silver_visible:{display:'none'}})
//   this.setState({gemstone_visible:{display:'block'}})
//   this.setState({diamond_visible:{display:'none'}})
//   this.setState({charm_visible:{display:''}})

//   }
//   if(e.target.value=='diamond'){
//     this.setState({silver_visible:{display:'none'}})
//   this.setState({gemstone_visible:{display:'none'}})
//   this.setState({diamond_visible:{display:'block'}})
//   this.setState({charm_visible:{display:'none'}})

//   }
//   if(e.target.value=='charm'){
//     this.setState({silver_visible:{display:'none'}})
//   this.setState({gemstone_visible:{display:'none'}})
//   this.setState({diamond_visible:{display:'none'}})
//   this.setState({charm_visible:{display:'block'}})

//   }
// }

 
static getDerivedStateFromProps(nextProps, prevProps) {
  console.debug(nextProps, prevProps, "next");
  if (prevProps !== nextProps) {

    return {
      category: nextProps.category,
      catId: nextProps.catId
    };
  }


  return null;
}

  render(){
    const { category, catId } = this.state;

        return (
           
            <div>
                        <ul type="none" >
                        {category.map((p, index) => (
                            <li><Button onClick={(e)=>this.handleClick(e)} value={p.name} key={p.catId} nodeId={p.catId} label={p.name} variant="outlined" style={{width:250}}>{p.name}</Button>
                            
  
       <Menu
  id="simple-menu"
  anchorEl={this.state.anchorEl}
  keepMounted
  open={Boolean(this.state.anchorEl)}
  onClose={this.handleClose}
>       
{p.subcat.map((data, index) => (
 
  <MenuItem onClick={this.handleClose} key={data.subcat_id} > 
<Link href={`/products/${data.cat_id}/${data.subcat_id}`} >{data.sub_name}</Link>
</MenuItem>
))}
</Menu>
<br /><br />
</li>))}
</ul>
   </div>
        )}
}
export default CustomizedTreeView;