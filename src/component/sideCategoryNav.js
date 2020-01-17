
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

    }
  }
    
   handleClick(event){
    this.setState({anchorEl:event.currentTarget})
  };
    
  handleClose = () => {
    this.setState({anchorEl:null})
  };

 
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