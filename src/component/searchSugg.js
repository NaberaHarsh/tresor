import React from 'react'
import { Paper } from "@material-ui/core";
import {connect} from 'react-redux';
import Link from "@material-ui/core/Link";
const Suggestions = (props) => {
    console.log(props.searchList);

    let searchList = props.searchList !== undefined ? props.searchList : []
    
  const options = searchList.map(r => (
      
  <Link href={`/details/${r.product_id}`}>
        <li key={r.name}>
     {r.name}
    </li>
  </Link>
  ))
  return <Paper className="marginB search-list"><ul>{options}</ul></Paper>
}

const mapStateToProps = (state) => {
return {searchList : state.searchList }
}

export default connect(mapStateToProps)(Suggestions)