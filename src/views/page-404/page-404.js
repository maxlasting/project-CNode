import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { Row, Col } from 'antd'
import Tree from '../../utils/tree'

class Page404 extends Component {
  componentDidMount() {
    const { canvas } = this
    const W = canvas.width = Math.min(window.innerWidth, window.innerHeight, 500)
    const H = canvas.height = W
    const ctx = canvas.getContext('2d')
    Tree(ctx, W/2, H*0.86, 44, -Math.PI/2, 14, 8);
  }
  
  render() {
    return (
      <Row>
        <Helmet>
          <title>404</title>
        </Helmet>
        <Col xxl={4} xl={3} lg={3} md={2} xs={2} sm={1} />
        <Col xxl={16} xl={18} lg={18} md={20} xs={20} sm={22} style={{display: 'flex', flexDirection: 'column'}}>
          <h2 style={{textAlign: 'center', margin: '20px 0 0', fontSize: '30px'}}>
            404 Not Found.
          </h2>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <canvas style={{display: 'block', margin: '0 auto'}} ref={(canvas) => {this.canvas = canvas}} />
          </div>
        </Col>
        <Col xxl={4} xl={3} lg={3} md={2} xs={2} sm={1} />
      </Row>
    )
  }

}

export default Page404