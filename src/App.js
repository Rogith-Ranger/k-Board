import React from 'react';
import './App.css';
import Websocket from 'react-websocket';
import DonutChart from './DonutChart';
import './back.css'
import LolipopChart from './LolipopChart';
import BubbleChart from './BubbleChart';
class App extends React.Component {
  state = {
    chartData:[],
    hospiChartData:[],
    toggle:false
  }
  handleData = (data) =>{
    let chartData = JSON.parse(data)
    if(chartData.type === "hospitality")
    {
      let dict = chartData.data
      let finalData = []
      if(dict !== undefined)
      {
        Object.keys(dict).forEach(function(key) {
          let temp = {}
          temp['college'] = key
          temp['count'] = dict[key]
          finalData.push(temp)
        });
      }
        this.setState({hospiChartData:finalData})
    }
    else{
      let dict = chartData.data
      let finalData = []
      if(dict !== undefined)
      {
        Object.keys(dict).forEach(function(key) {
          let temp = {}
          temp['event'] = key
          temp['count'] = dict[key]
          finalData.push(temp)
        });
      }
      this.setState({chartData:finalData})
     }
  }
  handleClick = () =>{
      if(this.state.toggle)
      this.setState({toggle:false})
      else
      this.setState({toggle:true})
    
  }

  render(){
  return (
    <div className="App">
        <Websocket url= "wss://k-data-api.herokuapp.com//ws/event/1/"
                onMessage={this.handleData.bind(this)}/>
      <div className="loading wave"> 
          K! Board  
      </div>
      <h2 style={{color:"white",marginTop:"10%"}} className="top">Top 10</h2>
      <div className="split">
        <div className="div">
        <h2 style={{color:"white",marginTop:"10%"}} className="top">Event-O-Meter</h2>
          <DonutChart chartData={this.state.chartData}/>
          </div>
          <div className="div">
          <h2 style={{color:"white",marginTop:"10%"}} className="top">College-O-Meter</h2>
            <LolipopChart chartData={this.state.hospiChartData}/>     
            </div>
            <div className="div">
            <h2 style={{color:"white",marginTop:"10%"}} className="top">Event-O-Meter</h2>
            <BubbleChart chartData={this.state.chartData}/>
            </div>
      </div>
        <div className="credit">Developed by Rogith and Srinivas Raman</div>
    </div>
  );
  }
}

export default App;
