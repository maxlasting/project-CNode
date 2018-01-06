import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Form, Input, Icon, Button, Checkbox, message } from 'antd'
import { userLogin } from '../../redux/login.reducer'
import style  from './style.js'

const FormItem = Form.Item

@connect(
  state => state.loginReducer,
  { userLogin }
)
class Login extends Component {
  componentWillMount() {
    if (this.props.isLogin) {
      this.props.history.push('/')
    }
  }
  
  componentWillUpdate(nextProps) {
    if (nextProps.isLogin) {
      this.props.history.push('/')
    }
  }
  
  componentDidUpdate() {
    if (this.props.msg) this.messageInfo(
      this.props.success,
      this.props.msg
    )
  }
  
  messageInfo = (status, info = '') => {
    message[status ? 'info' : 'error'](info)
  }
  
  userLogin = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.props.userLogin(values)
      }
    })
  }
  
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Row>
        <Col xxl={4} xl={3} lg={3} md={2} xs={2} sm={0} />
        <Col xxl={16} xl={18} lg={18} md={20} xs={20} sm={24} style={style.root}>
          <h2 style={style.title}>用户登录</h2>
          <Form onSubmit={this.userLogin} style={style.formContainer}>
            <FormItem label={'用户名'}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名/手机号/邮箱" />
              )}
            </FormItem>
            <FormItem label={'密码'}>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="账户密码" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>记住我</Checkbox>
              )}
              <a style={style.forgot} href="">忘记密码？</a>
              <Button type="primary" htmlType="submit" style={style.submitBtn} loading={this.props.loading}>
                登录
              </Button>
              没有账号？ <a href="">现在注册!</a>
            </FormItem>
          </Form>
        </Col>
        <Col xxl={4} xl={3} lg={3} md={2} xs={2} sm={0} />  
      </Row>
    )
  }
}

export default Form.create()(Login)
