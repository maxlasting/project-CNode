import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { Row, Col, Menu, Dropdown, Icon, Button, Avatar } from 'antd'
import style from './style'
import { menuSchema, linkSchema, menuItemSchema } from '../../utils/schema'
import { userLogOut } from '../../redux/login.reducer'

@connect(
  state => state.loginReducer,
  { userLogOut }
)
@withRouter
class MainHeader extends Component {
  state = {
    initKey: menuItemSchema[this.props.history.location.pathname]
  }
  
  menuClick = (e) => {
    this.setState({
      initKey: menuItemSchema[this.props.history.location.pathname]
    })
  }
  
  render() {
    const { isLogin, avatar_url, loginname } = this.props
    
    const longinMenu = (
      <Dropdown 
        overlay={
          <Menu style={style.loginMenu}>
            <Menu.Item>
              <Link to='/write'>
                发布话题
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to={`/user/${loginname}`}>
                用户中心
              </Link>
            </Menu.Item>
            <Menu.Item>
              <span style={style.userStyle} onClick={this.props.userLogOut}>
                退出登陆
              </span>
            </Menu.Item>
          </Menu>
        }
        placement="bottomCenter"
      >
        <div style={style.avatar}>
          <Avatar size="small" icon="user" src={avatar_url} />
          <h3 style={{margin: '0 5px'}}>{loginname}</h3>
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
        {
          isLogin ?
          <Menu.Item>
            { longinMenu }
          </Menu.Item> : null
        }
        {
          !isLogin ?
          <Menu.Item>
            <Link to="/login">
              <Icon type="user" /> 登陆
            </Link>
          </Menu.Item> : null
        }
        {
          !isLogin ?
          <Menu.Item>
            <Link to="/register">
              <Icon type="flag" /> 注册
            </Link>
          </Menu.Item> : null
        }
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
              selectedKeys={[this.state.initKey]}
              onClick={this.menuClick}
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
              {
                isLogin ? 
                longinMenu :
                <div>
                  <Link to="/login">
                    <Button style={{marginRight: 2}}>
                      <Icon type="user" /> 登陆
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button style={{marginLeft: 2}}>
                      <Icon type="flag" /> 注册
                    </Button>
                  </Link>
                </div>
              }
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