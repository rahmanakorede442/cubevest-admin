import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import { withRouter } from "react-router-dom";
import { adminActions } from "../../../redux/action";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { getConfig} from '../../../redux/config/config'
import { authHeader } from '../../../redux/logic';
import { UsersTable } from '../components/Users';
import { SearchInput } from 'components';
import ExportCSV from 'helpers/export';


class UserList extends Component{
  constructor(props){
    super(props)
    this.state={
        users: [],
        loading:true,
        all: [],
        search: "",
        open:false
    }
    this.fetchUsers = this.fetchUsers.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.fetch_next_page = this.fetch_next_page.bind(this);
    this.fetch_page = this.fetch_page.bind(this);
    this.fetch_prev_page = this.fetch_prev_page.bind(this);

  }

componentDidMount(){
  this.fetchUsers()
}

fetchUsers = () =>{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body:JSON.stringify({search_term:this.state.search})
    };
  fetch(getConfig('getAllUsers'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        this.setState({loading:false });
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    this.setState({users: data.data, all:data, loading:false});
})
.catch(error => {
 
    if (error === "Unauthorized") {
        this.props.logout();
       }
    this.setState({loading:false });
    console.error('There was an error!', error);
});
}

searchChange(event) {
  const { name, value } = event.target;
    this.setState({ search:value, loading:true},()=>{
    this.fetchUsers()
  });
}

fetch_next_page = ()=>{
  const {all} = this.state
  this.setState({ loading: true});
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  fetch(all.next_page_url, requestOptions).then(async (response) =>{
    const data =await response.json();
    this.setState({ loading: false, users:data.data, all:data });
  }).catch(error=>{
    if (error === "Unauthorized") {
      this.props.logout();
    }
  })
}

fetch_prev_page = ()=>{
  const {all} = this.state
  this.setState({ loading: true});
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  fetch(all.prev_page_url, requestOptions).then(async (response) =>{
    const data =await response.json();
    this.setState({ loading: false, users:data.data, all:data });
  }).catch(error=>{
    if (error === "Unauthorized") {
      this.props.logout();
    }
  })
}

fetch_page = (index)=>{
  const {all} = this.state
  this.setState({ loading: true});
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };
  fetch(all.path+"?page="+index, requestOptions).then(async (response) =>{
    const data =await response.json();
    this.setState({ loading: false, users:data.data, all:data });
  }).catch(error=>{
    if (error === "Unauthorized") {
      this.props.logout();
    }
  })
}

render(){
  let {theme} = this.props
  const {users, loading, search, open, all} = this.state
  const filename = `user-${new Date().getTime()}`
  return (
      <div style={{padding: theme.spacing(3)}}>
        <div style={{height: '42px',display: 'flex',alignItems: 'center',marginTop: theme.spacing(1)}}>
          <SearchInput
            value={search}
            onChange={this.searchChange}
            style={{marginRight: theme.spacing(1)}}
            placeholder="Search user"
          />
          <ExportCSV url="exportUser" fileName={filename} />
        </div>
        <div style={{marginTop: theme.spacing(2)}}>
          <UsersTable users={users} pagination={all} fetch_page={this.fetch_page} fetch_next_page={this.fetch_next_page} fetch_prev_page={this.fetch_prev_page} loading={loading} />
        </div>
      </div>
    );
  };
}

// export default UserList;
function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
// export default withStyles({}, { withTheme: true })(Dashboard1);
const actionCreators = {
  saveWallet: adminActions.saveWallet,
  logout: adminActions.logout,
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(UserList))
);