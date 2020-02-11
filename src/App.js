import React from 'react';
import './App.css';
import Websocket from 'react-websocket';
import DonutChart from './DonutChart';
import './back.css'
import LolipopChart from './LolipopChart';
class App extends React.Component {
  state = {
    chartData:[],
    hospiChartData:[]
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
        console.log(this.state.hospiChartData)
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
  render(){
  return (
    <div className="App">
        <Websocket url= "ws://k-data-api.herokuapp.com//ws/event/1/"
                onMessage={this.handleData.bind(this)}/>
      <div className="split left">
        <div className="centered">
          <div className="yellowbox">
            <LolipopChart chartData={this.state.hospiChartData}/>
          </div>
        </div>
      </div>
      <div className="split right">
        <div className="centered">
          <div className="blackbox">
            <DonutChart chartData={this.state.chartData}/>
          </div>
        </div>
      </div>
        
    </div>
  );
  }
}

export default App;
