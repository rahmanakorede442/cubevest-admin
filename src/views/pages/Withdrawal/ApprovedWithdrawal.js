import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/styles";
import { authHeader } from 'redux/logic';
import { getConfig } from 'redux/config/config';
import { adminActions } from 'redux/action';
import WithdrawalTable from './components/WithdrawalTable';


class ApprovedWithdrawal extends Component{
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
        if(d.withdrawal_status === 1){
          newArray.push(d)
        }
      });
      this.setState({data: newArray, loading:false});
    }
})
.catch(error => {
 
    if (error === "Unauthorized") {
        this.props.logout();
       }
    this.setState({loading:false });
    console.error('There was an error!', error);
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
    <div>
      <div style={{marginTop: theme.spacing(2)}}>
        <WithdrawalTable table={'approved'} handleChange={this.handleChange} data={data} loading={loading} />
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
  addUser: adminActions.addUser,
  logout: adminActions.logout,
};

export default withStyles({}, { withTheme: true })(
  withRouter(connect(mapState,  actionCreators)(ApprovedWithdrawal))
);