import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { authHeader } from 'redux/logic';
import { getConfig } from 'redux/config/config';
import { adminActions } from 'redux/action';
import WithdrawalTable from './components/WithdrawalTable';


class PendingWithdrawal extends Component{
  constructor(props){
    super(props)
    this.state={
        data: [],
        loading:true,
    }
    this.fetchWithdrawal = this.fetchWithdrawal.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

componentDidMount(){
  const val = ""
  this.fetchWithdrawal(val)
}

fetchWithdrawal = (search_user) =>{
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body:JSON.stringify({search_user})
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
      let newArray = []
      data.forEach(d => {
        if(d.withdrawal_status === 0){
          newArray.push(d)
        }
      });
      this.setState({data: newArray, all:data, loading:false});
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

render(){
  let {theme} = this.props
  const {loading, data} = this.state
  return (
    <div style={{padding: theme.spacing(3)}}>
      <div style={{marginTop: theme.spacing(2)}}>
        <WithdrawalTable table={'pending'} data={data} handleChange={this.handleChange} loading={loading} />
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