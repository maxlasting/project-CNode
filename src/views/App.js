import React, { Component } from 'react'
import { BackTop } from 'antd'

import MainHeader from './main-header/main-header'
import MainFooter from './main-footer/main-footer'
import RouterIndex from '../router/index'
import CheckLogin from '../components/check-login'

const style = {
  root: {
    minHeight: '100vh', 
    display: 'flex', 
    flexDirection: 'column',
  },
}

class App extends Component {

  render() {
    return (
      <div style={style.root}>
        <CheckLogin />
        <MainHeader />
        <RouterIndex />
        <MainFooter />
        <BackTop />
      </div>
    )
  }

}

export default App