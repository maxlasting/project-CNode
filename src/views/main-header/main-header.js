import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Menu, Dropdown, Icon, Button, Avatar } from 'antd'
import style from './style'
import { menuSchema, linkSchema } from '../../utils/schema'

class MainHeader extends Component {

  render() {
    const longinMenu = (
      <Dropdown 
        overlay={
          <Menu style={style.loginMenu}>
            <Menu.Item>发布话题</Menu.Item>
            <Menu.Item>用户中心</Menu.Item>
            <Menu.Item>退出登陆</Menu.Item>
          </Menu>
        }
        placement="bottomCenter"
      >
        <div style={style.avatar}>
          <Avatar size="small" icon="user" />
          <h3 style={{margin: '0 5px'}}>Fq</h3>
        </div>
      </Dropdown>
    )
    
    const screenMenu = (
      <Menu style={style.screenMenu}>
        {
          Object.keys(menuSchema).map((itemKey) => (
            <Menu.Item key={itemKey}>
              <Link to={linkSchema[itemKey]}>
                <Icon type={itemKey} /> {menuSchema[itemKey]}
              </Link>
            </Menu.Item>
          ))
        }
        <Menu.Divider />
        <Menu.Item>
          {/* <Icon type="user" /> 登陆 */}
          {longinMenu}
        </Menu.Item>
        {/* <Menu.Item>
          <Icon type="flag" /> 注册
        </Menu.Item> */}
      </Menu>
    )

    return (
      <header style={style.root}>
        <Row style={style.fullHeight}>
          <Col xxl={4} xl={5} lg={5} md={6} xs={24} sm={24} style={style.fullHeight}>
            <h1 style={style.title}>
              <Link to="/">CNode</Link>
            </h1>
          </Col>
          <Col xxl={20} xl={19} lg={19} md={18} xs={0} sm={0} style={style.menuCol}>
            <div style={style.divLine} />
            <Menu
              mode="horizontal"
              selectable={false}
              style={style.menuStyle}
            >
              {
                Object.keys(menuSchema).map((itemKey) => (
                  <Menu.Item key={itemKey}>
                    <Link to={linkSchema[itemKey]}>
                      <Icon type={itemKey} /> {menuSchema[itemKey]}
                    </Link>
                  </Menu.Item>
                ))
              }
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
    )
  }

}

export default MainHeader