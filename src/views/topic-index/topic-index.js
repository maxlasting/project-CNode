import React, { Component } from 'react'
import { Row, Col, Menu } from 'antd'
import TopicList from '../topic-list/topic-list'
import { tabSchema } from '../../utils/schema'

const topics = [
  {
    reply_count: 30,
    visit_count: 400,
    author: {
      loginname: 'Fq',
      avatar_url: 'https://avatars0.githubusercontent.com/u/7286498?v=4&s=120'
    },
    create_at: '2017-12-11',
    title: '首届蚂蚁金服体验科技大会'
  },
  {
    reply_count: 30,
    visit_count: 400,
    author: {
      loginname: 'Fq',
      avatar_url: 'https://avatars0.githubusercontent.com/u/7286498?v=4&s=120'
    },
    create_at: '2017-12-11',
    title: '首届蚂蚁金服体验科技大会'
  },
  {
    reply_count: 30,
    visit_count: 400,
    author: {
      loginname: 'Fq',
      avatar_url: 'https://avatars0.githubusercontent.com/u/7286498?v=4&s=120'
    },
    create_at: '2017-12-11',
    title: '首届蚂蚁金服体验科技大会'
  }
]

const style = {
  root: {
    padding: '40px 0',
    flex: 1,
  },
  menuPc: {
    lineHeight: '64px', 
    border: 'none', 
    textAlign: 'center',
  },
  menuMb: {
    paddingLeft: '10vw'
  },
}

class TopicIndex extends Component {

  render() {
    const menuItems = Object.keys(tabSchema).map((itemKey) => (
      <Menu.Item key={itemKey}>{tabSchema[itemKey]}</Menu.Item>
    ))
    
    return (
      <div style={style.root}>
        <Row>
          <Col xxl={4} xl={5} lg={5} md={6} xs={0} sm={0}>
            <Menu
              mode="inline"
              style={style.menuPc}
            >
              { menuItems }
            </Menu>
          </Col>
          <Col xxl={0} xl={0} lg={0} md={0} xs={24} sm={24}>
            <Menu
              mode="horizontal"
              style={style.menuMb}
            >
              { menuItems }
            </Menu>
          </Col>
          <TopicList topics={topics} />
        </Row>
      </div>
    )
  }

}

export default TopicIndex