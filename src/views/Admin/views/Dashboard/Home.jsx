import React, { Component } from 'react'
import Sidebar from '../../components/Sidebar'
import Dashboard from '../../components/Dashboard'
import TableData from './TableData'
import { getConfig, checkToken, numberFormat } from '../../config/config'
import { authHeader, history } from '../../logic';

export class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            users:[],
            loading:true,
            tableheaders : [
                { id: "1", name: "Id"},
                { id:"2", name: " First Name" },
                { id:"3", name: "Last Name" },
                { id:"4", name: "Email" },
                { id:"5", name: "Phone Number " },
                { id:"6", name: "Register Date " },
            ]
        }
        this.fetchUsers = this.fetchUsers.bind(this);
        this.fetchUsers();
}
fetchUsers = () =>{
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
    };
  fetch(getConfig('getAllUsers'), requestOptions)
    .then(async response => {
    const data = await response.json();
    if (!response.ok) {
        this.setState({loading:false });
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    console.log(data.data);
    this.setState({users: data.data, loading:false});
})
.catch(error => {
 
    if (error === "Unauthorized") {
       history.push('/admin/login');
       }
    this.setState({loading:false });
    console.error('There was an error!', error);
});
}
    render() {
        const {users} = this.state;
        return (
            <div>
                <Sidebar />
                <TableData tableheader={this.state.tableheaders} tablerows={users}/>
            </div>
        )
    }
}

export default Home
