import React from 'react';
import './App.css';
import Websocket from 'react-websocket';
import DonutChart from './DonutChart';
import './back.css'
class App extends React.Component {
  state = {
    chartData:{}
  }
  handleData = (data) =>{
    console.log(data)
    let chartData = JSON.parse(data)
    console.log(chartData)
  }
  render(){
  return (
    <div className="App">
        <Websocket url= "ws://k-data-api.herokuapp.com//ws/event/1/"
                onMessage={this.handleData.bind(this)}/>
      <div className="split left">
        <div className="centered">
          <div className="yellowbox"></div>
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
