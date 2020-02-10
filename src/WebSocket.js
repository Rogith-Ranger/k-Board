import React, { Component } from 'react';

class WebSocket extends Component {
        handleData(data) {
        this.props.fetchData(data)
      }
   
      render() {
        return (
          <div>
            <Websocket url= "ws://k-data-api.herokuapp.com//ws/event/1/"
                onMessage={this.handleData.bind(this)}/>
          </div>
        );
      }
    }
   


export default WebSocket
