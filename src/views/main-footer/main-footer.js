import React from 'react'
import { Row, Col } from 'antd'

const MainFooter = () => (
  <footer>
    <Row style={{padding: '40px 80px', backgroundColor: '#000', color: 'rgba(255, 255, 255, 0.65)'}}>
      <Col span={24} style={{textAlign: 'center', lineHeight: '30px'}}>
        CNode Project - Created By React | Copyright © Fq
        <br/>
        网站备案编号: ICP 吉证 17-008864
      </Col>
    </Row>
  </footer>
)

export default MainFooter