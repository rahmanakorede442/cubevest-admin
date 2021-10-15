import { Button } from '@material-ui/core';
import React, {Component} from 'react'
import { getConfig } from 'redux/config/config';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
// import * as FileSaver from 'file-saver';
// import * as XLSX from 'xlsx';
// import { getConfig } from 'services/config/config';
// import axios from 'axios';


class ExportCSV extends Component {

  constructor(props){
    super(props)
    this.state ={
      filter:"user",
      was:[],
      loading:false
    }
    this.exportToCSV = this.exportToCSV.bind(this)
  }

  exportToCSV = () => {
    const {url, name, fileName, data} = this.props
    const token = JSON.parse(localStorage.getItem('admin'));
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    this.setState({loading:true}, ()=>{
      const requestOptions = {
        method: "POST",
        headers: { 'authorization': `Bearer ${token.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      };
      fetch(getConfig(url), requestOptions)
        .then(async(response) => {
          const dat = await response.json();
          if(name === 'report'){
            const ws = XLSX.utils.json_to_sheet(dat.withdrawal_record);
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
            const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, fileName + ".csv");
            this.setState({loading:false})
          }else if(name === 'deport'){
            const ws = XLSX.utils.json_to_sheet(dat.transaction_record);
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
            const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, fileName + ".csv");
            this.setState({loading:false})
          }else{            
            const ws = XLSX.utils.json_to_sheet(dat);
            const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
            const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, fileName + ".csv");
            this.setState({loading:false})
          }
      })
        .catch((error) => {
          console.log(error)
          this.setState({loading:false})
        });
    })
  }

  render(){
    const {loading } = this.state
    return (
      <Button color="primary" variant="contained" disabled={loading} onClick={() => this.exportToCSV()}>{loading? "Downloading...":"Export"}</Button>
    )
  }
}

export default ExportCSV