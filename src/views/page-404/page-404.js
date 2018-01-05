import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Row, Col } from 'antd'
import Tree from '../../utils/tree'

class Page404 extends Component {
  componentDidMount() {
    const { canvas } = this
    const pw = canvas.parentNode.clientWidth
    const ph = canvas.parentNode.clientHeight
    const W = canvas.width = pw > ph ? ph : pw
    const H = canvas.height = W
    const ctx = canvas.getContext('2d')
    Tree(ctx, W/2, H*0.75, W/14, -Math.PI/2, W/40, 8);
  }
  
  render() {
    return (
      <Row style={{flex: 1}}>
        <Helmet>
          <title>404</title>
        </Helmet>
        <Col xxl={4} xl={3} lg={3} md={2} xs={2} sm={1} />
        <Col xxl={16} xl={18} lg={18} md={20} xs={20} sm={22} style={{display: 'flex', height: '100%', flexDirection: 'column'}}>
          <h2 style={{textAlign: 'center'}}>
            404 Not Found.
            <br/>
            一颗有点丑的树
          </h2>
          <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <canvas style={{display: 'block', margin: '0 auto'}} ref={(canvas) => {this.canvas = canvas}} />
          </div>
        </Col>
        <Col xxl={4} xl={3} lg={3} md={2} xs={2} sm={1} />
      </Row>
    )
  }

}

export default Page404