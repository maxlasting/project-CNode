import React, { Component } from 'react'
import { Row, Col, Menu, Dropdown, Icon, Button, Avatar, List, Tag, Pagination } from 'antd'

const MenuItem = Menu.Item

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

const longinMenu = (
  <Dropdown 
    overlay={
      <Menu style={{minWidth: 200, textAlign: 'center'}}>
        <MenuItem>发布话题</MenuItem>
        <MenuItem>用户中心</MenuItem>
        <MenuItem>退出登陆</MenuItem>
      </Menu>
    }
    placement="bottomCenter"
  >
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px 0'}}>
      <Avatar size="small" icon="user" />
      <h3 style={{margin: '0 10px'}}>Fq</h3>
    </div>
  </Dropdown>
)

const screenMenu = (
  <Menu style={{minWidth: 200, textAlign: 'center'}}>
    <MenuItem>
      <Icon type="home" /> 主页
    </MenuItem>
    <MenuItem>
      <Icon type="book" /> 教程
    </MenuItem>
    <MenuItem>
      <Icon type="info-circle-o" /> 关于
    </MenuItem>
    <Menu.Divider />
    <MenuItem>
      <Icon type="user" /> 登陆
      {/* {longinMenu} */}
    </MenuItem>
    <MenuItem>
      <Icon type="flag" /> 注册
    </MenuItem>
  </Menu>
)

class App extends Component {

  render() {
    return (
      <div 
        style={{
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column'
        }}
      >
        <header style={{
            height: 64, 
            boxShadow: '0 2px 8px #f0f1f2', 
            position: 'relative'
          }}
        >
          <Row 
            style={{height: '100%'}}
          >
            <Col 
              xxl={4} 
              xl={5} 
              lg={5} 
              md={6} 
              xs={24} 
              sm={24}
              style={{heigth: '100%'}}
            >
              <h1 
                style={{
                  lineHeight: '64px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  margin: 0
                }}
              >CNode</h1>
            </Col>
            <Col 
              xxl={20} 
              xl={19} 
              lg={19} 
              md={18} 
              xs={0} 
              sm={0}
              style={{height: '100%', paddingRight: '10vw'}}
            >
              <div style={{float: 'left', width:0, height: 56, marginTop: 4, marginRight: 10, borderLeft: '1px solid rgb(233, 233, 233)'}}/>
              <Menu
                mode="horizontal"
                selectable={false}
                style={{lineHeight: '64px', float: 'left'}}
              >
                <MenuItem>
                  <Icon type="home" /> 主页
                </MenuItem>
                <MenuItem>
                  <Icon type="book" /> 教程
                </MenuItem>
                <MenuItem>
                  <Icon type="info-circle-o" /> 关于
                </MenuItem>
              </Menu>
              <div style={{float: 'right', height: '100%', display: 'flex', alignItems: 'center'}}>
                {/* <div>
                  <Button style={{marginRight: 2}}><Icon type="user" />登陆</Button>
                  <Button style={{marginLeft: 2}}><Icon type="flag" />注册</Button>
                </div> */}
                {longinMenu}
              </div>
            </Col>
          </Row>
          <Row style={{position: 'absolute', right: 30, top: 16}}>
            <Col xxl={0} xl={0} lg={0} md={0} xs={24} sm={24}>
              <Dropdown overlay={screenMenu} placement="bottomCenter">
                <Button><Icon type="bars" /></Button>
              </Dropdown>
            </Col>
          </Row>
        </header>
        <div style={{padding: '40px 0', flex: 1}}>
          <Row style={{minHeight: '100%'}}>
            <Col
              xxl={4} 
              xl={5} 
              lg={5} 
              md={6} 
              xs={0} 
              sm={0}
            >
              <Menu
                mode="inline"
                style={{lineHeight: '64px', border: 'none', textAlign: 'center'}}
              >
                <MenuItem>全部</MenuItem>
                <MenuItem>精华</MenuItem>
                <MenuItem>分享</MenuItem>
                <MenuItem>问答</MenuItem>
                <MenuItem>招聘</MenuItem>
                <MenuItem>测试</MenuItem>
              </Menu>
            </Col>
            <Col 
              xxl={0} 
              xl={0} 
              lg={0} 
              md={0} 
              xs={24} 
              sm={24}
            >
              <Menu
                mode="horizontal"
                style={{paddingLeft: '10vw'}}
              >
                <MenuItem>全部</MenuItem>
                <MenuItem>精华</MenuItem>
                <MenuItem>分享</MenuItem>
                <MenuItem>问答</MenuItem>
                <MenuItem>招聘</MenuItem>
                <MenuItem>测试</MenuItem>
              </Menu>
            </Col>
            <Col
              xxl={20} 
              xl={19} 
              lg={19} 
              md={18} 
              xs={24} 
              sm={24}
              style={{paddingLeft: 20, paddingRight: '12vw', borderLeft: '1px solid #e9e9e9'}}
            >
              <List
                itemLayout="horizontal"
                loading={false}
                dataSource={topics}
                renderItem={item => (
                  <List.Item 
                    actions={
                      [
                        <span style={{marginLeft: 35}}>回复:{item.reply_count}</span>, 
                        <span>访问:{item.visit_count}</span>
                      ]
                    }
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.author.avatar_url} />}
                      title={
                        <div>
                          <Tag 
                            color={'magenta'}
                          >
                            {'分享'}
                          </Tag>
                          <a href="https://ant.design">{item.title}</a>
                        </div>
                      }
                      description={<span>{item.author.loginname} 发表于: {item.create_at}</span>}
                    />
                    <div />
                  </List.Item>
                )}
              />
              <Pagination 
                style={{margin: '20px 0'}} 
                size="small"
                // onChange={changePage}
                showQuickJumper 
                current={1}
                pageSize={30}
                total={500} 
              />
            </Col>
          </Row>
        </div>
        <footer>
          <Row style={{padding: '40px 80px', backgroundColor: '#000', color: 'rgba(255, 255, 255, 0.65)'}}>
            <Col span={24} style={{textAlign: 'center', lineHeight: '30px'}}>
              CNode Project - Created By React | Copyright © Fq
              <br/>
              网站备案编号: ICP 吉证 17-008864
            </Col>
          </Row>
        </footer>
      </div>
    )
  }

}

export default App