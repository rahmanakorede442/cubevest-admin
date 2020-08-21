import React from 'react';
import { connect } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import viewImg from '../../../../assets/img/Group 84.png';
import savetime from '../../../../assets/img/savetime.png';
import penImg from '../../../../assets/img/Group85.png';
import { getConfig, checkToken, numberFormat } from '../../config/config'
import { authHeader, history } from '../../logic';
import Lottie from 'react-lottie';
import BluePreloader from "../../../../assets/lotties/19451-blue-preloader.json";
import dateFormat from 'dateformat';


import { adminActions } from '../../action';
import { Link } from 'react-router-dom';
import SavingsTable from '../../components/SavingsTable';

class AdminRegular extends React.Component {
    constructor(props){
        super(props);
        checkToken()
        this.state={
            savings: [],
            loading: true,
            tableheaders : [
            { id: "1", name: "Id"},
            { id:"2", name: "Transaction ID" },
            { id:"3", name: "Payment Method" },
            { id:"4", name: "Amount" },
            { id:"5", name: "Date " }
        ]
        }
        const requestOptions = {
            method: 'GET',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
        };
      let user = JSON.parse(localStorage.getItem('user'));
      fetch(getConfig('getRegularSavings'), requestOptions)
        .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        this.setState({savings: data, loading:false });
    })
    .catch(error => {
     
        if (error === "Unauthorized") {
           history.push('/login');
           }
        // this.setState({ errorMessage: error });
        this.setState({loading:false, err : "internet error" });
        console.error('There was an error!', error);
    });
}
    render() {
        const {savings, loading, tableheaders} = this.state;
        const numRows = this.state.savings.length
        return (
            <div>
                <Sidebar />
                    {loading ?
                        <div className="loading">
                        <Lottie
                         options={{
                           loop: true,
                           autoplay: true,
                           animationData: BluePreloader,
                           rendererSettings: {
                             preserveAspectRatio: 'xMidYMid slice'
                           }
                         }}
                         height={80}
                         width={80}
                       />
                      </div>
                    :
                    <SavingsTable tableheader={tableheaders} tablerows={savings}/>
                    }
            </div>    
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getNotifications: adminActions.getAll,
    getUserDetails: adminActions.getUserDetails
}

const connectedAdminRegular = connect(mapState, actionCreators)(AdminRegular);
export { connectedAdminRegular as AdminRegular };
 