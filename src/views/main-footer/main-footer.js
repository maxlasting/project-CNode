import React from 'react'
import { Row, Col } from 'antd'

const MainFooter = () => (
  <footer style={{position: 'relative', zIndex: 99}}>
    <Row style={{padding: '40px 80px', backgroundColor: '#000', color: 'rgba(255, 255, 255, 0.65)'}}>
      <Col span={24} style={{textAlign: 'center', lineHeight: '30px'}}>
        CNode Project - Created By FuQiang | Copyright © 2017-12-12
        <br/>
        网站备案编号: <a href="http://www.miitbeian.gov.cn/">吉ICP备 17008864号-1</a>
      </Col>
    </Row>
  </footer>
)

export default MainFooter