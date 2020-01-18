
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
expanded:'83'
    }
  }
    
   handleChange = panel => (event, newExpanded) => {

    console.log(panel);
    this.setState({ expanded:panel});
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
                        {category.map((p, index) => console.log(p) || (                          
  
      <ExpansionPanel expanded={this.state.expanded === p.catId} onChange={this.handleChange(p.catId)}>
         <ExpansionPanelSummary
                   expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id={`${p.catId}`}
        >
                 <Typography value={p.name} key={p.catId} nodeId={p.catId} label={p.name}  style={{width:250, textAlign:'center'}} >
 {p.name}
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
        </div>
        )
      }
    }
export default CustomizedTreeView;