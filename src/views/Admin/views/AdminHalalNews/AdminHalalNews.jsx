import React from 'react';
import { connect } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import { getConfig, checkToken, numberFormat } from '../../config/config'
import { authHeader, history } from '../../logic';
import Lottie from 'react-lottie';
import BluePreloader from "../../../../assets/lotties/19451-blue-preloader.json";
import dateFormat from 'dateformat';


import { adminActions } from '../../action';
import { Link } from 'react-router-dom';
import NewsTable from '../../components/NewsTable';

export class AdminHalalNews extends React.Component {
    constructor(props){
        super(props);
        checkToken()
        this.state={
            savings: [],
            balance:[],
            loading: true, 
            cancreate: true, 
            opened: false,
            err:"",
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
      fetch(getConfig('getMarketView'), requestOptions)
        .then(async response => {
        const data = await response.json();
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        this.setState({savings: data.data, loading:false});
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
        const {savings, loading,tableheaders} = this.state;
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
                    <NewsTable tableheader={tableheaders} tablerows={savings} addpage={"/admin/add_market_news"} />}
            </div>    
        );
    }
}

export default AdminHalalNews
 