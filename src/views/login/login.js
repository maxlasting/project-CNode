import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {Row, Col, Form, Input, Icon, Button, Checkbox} from 'antd'
import { userLogin } from '../../redux/login.reducer'

const FormItem = Form.Item

const style = {
  root: {
    flex: 1,
    padding: '40px 80px',
    display: 'flex',
    justifyContent: 'center',
  },
  formContainer: {
    margin: '0 auto',
    width: '20%',
    minWidth: 360
  },
  title: {
    textAlign: 'center',
    margin: '20px 0'
  },
  submitBtn: {
    width: '100%'
  },
  forgot: {
    float: 'right'
  }
}

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
      <div style={style.root}>
        {this.props.isLogin ? <Redirect to="/" /> : null}
        <div style={style.formContainer}>
          <h2 style={style.title}>用户登录</h2>
          <Form onSubmit={this.userLogin}>
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
              <Button type="primary" htmlType="submit" style={style.submitBtn}>
                登录
              </Button>
              没有账号？ <a href="">现在注册!</a>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(Login)
