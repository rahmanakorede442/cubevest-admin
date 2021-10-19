import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { authHeader } from 'redux/logic';
import { getConfig } from 'redux/config/config';
import { adminActions } from 'redux/action';
import WithdrawalTable from './components/WithdrawalTable';
import ExportCSV from 'helpers/export';


class PendingWithdrawal extends Component{
  constructor(props){
    super(props)
    this.state={
        data: [],
        users:[],
        loading:true,
        all:[]
    }
    this.fetchWithdrawal = this.fetchWithdrawal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.fetch_next_page = this.fetch_next_page.bind(this);
    this.fetch_page = this.fetch_page.bind(this);
    this.fetch_prev_page = this.fetch_prev_page.bind(this);
    this.getData = this.getData.bind(this);

  }

componentDidMount(){
  this.fetchWithdrawal("")
}

fetchWithdrawal = (search_term) =>{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body:JSON.stringify({search_term})
    };
  fetch(getConfig('getWithdrawal'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        this.setState({loading:false });
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    if(data.success == false){
      this.setState({data: [], loading:false});
    }else{
      this.setState({users:data, loading:false });
      this.getData(data)
    }
})
.catch(error => {
    if (error === "Unauthorized") {
        this.props.logout();
       }
    this.setState({loading:false });
});
}

handleChange = (e) =>{
  this.setState({ loading:true })
  this.fetchWithdrawal(e.target.value)
}

getData =(data)=>{
  let newArray = []
  if(data.success === false){
    this.setState({data: [], all:[], loading:false });
  }else{
    data.withdrawal_lists.data.forEach(d => {
      if(d.withdrawal_status === 0){
        newArray.push(d)
      }
    });
    this.setState({data: newArray, all:data, loading:false});
  }
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
    this.getData(data)
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
    this.getData(data)
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
    this.getData(data)
  }).catch(error=>{
    if (error === "Unauthorized") {
      this.props.logout();
    }
  })
}

render(){
  let {theme} = this.props
  const {loading, users, data, all} = this.state
  const filename = `Pending Withdrawal-${new Date().getTime()}`
  return (
    <div>
      <ExportCSV url="exportPendinWithdraw" fileName={filename} />
      <div style={{marginTop: theme.spacing(3)}}>
        <WithdrawalTable table={'pending'} pagination={all} fetch_page={this.fetch_page} fetch_next_page={this.fetch_next_page} fetch_prev_page={this.fetch_prev_page} data={data} total={users.total} handleChange={this.handleChange} loading={loading} />
      </div>
    </div>
    );
  };
}

function mapState(state) {
  const { savings } = state.savings;
  return { savings };
}
const actionCreators = {
  logout: adminActions.logout,
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(PendingWithdrawal))
);