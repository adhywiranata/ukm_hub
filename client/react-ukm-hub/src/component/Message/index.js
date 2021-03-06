import React, { Component } from 'react'

import Sidebar from '../Sidebar'
import Topbar from '../Topbar'
import MessageList from './MessageList'

export default class Message extends Component {
  constructor(){
    super()
    this.state = {
      topbarTitle: 'Message',
      activeNavigation: ['','','','','active']
    }
  }

  render () {
    return (
      <div className="wrapper">
        <Sidebar activeNavigation={this.state.activeNavigation} />
        <div className="main-panel">
          <Topbar title={this.state.topbarTitle} />
          <MessageList />
        </div>
      </div>
    )
  }
}
