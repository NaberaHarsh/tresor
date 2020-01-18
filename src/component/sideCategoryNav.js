
import React , { Component }  from 'react'
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import Link from "@material-ui/core/Link";
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
                        <ul type="none" style={{marginInlineStart:'10px' , padding:'0px'}} >
                        {category.map((p, index) => (                          
  
      <ExpansionPanel style={{marginRight:'8px'}}>
         <ExpansionPanelSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
                 <Typography >
 {<li><Button onClick={(e)=>this.handleClick(e)} value={p.name} key={p.catId} nodeId={p.catId} label={p.name} variant="outlined" style={{width:250}}>{p.name}</Button>
           
        </li>}
      </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <ul type='none'>
          {p.subcat.map((data, index) => (
 
 <li onClick={this.handleClose} key={data.subcat_id} > 
<Link href={`/products/${data.cat_id}/${data.subcat_id}`} >{data.sub_name}</Link>
</li>))}
</ul>
          
        </ExpansionPanelDetails>
      </ExpansionPanel>
))}
</ul>
   </div>
        )}
}
export default CustomizedTreeView;