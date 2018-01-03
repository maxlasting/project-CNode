import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Row, Col, Form, Input, Icon, Button, Checkbox, message } from 'antd'
import { userRegister } from '../../redux/register.reducer'
import style from './style'

const FormItem = Form.Item

@connect(
  state => state,
  { userRegister }
)
class Register extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      confirmDirty: false
    }
  }
  
  componentWillMount() {
    if (this.props.loginReducer.isLogin) {
      this.props.history.push('/')
    }
  }
  
  componentWillUpdate(nextProps, nextState) {
    if (nextProps.loginReducer.isLogin) {
      this.props.history.push('/')
      return
    }
    if (this.props.registerReducer.success) {
      this.props.history.push('/login')
    }
  }
  
  componentDidUpdate() {
    if (this.props.registerReducer.msg) this.messageInfo(
      this.props.registerReducer.success,
      this.props.registerReducer.msg
    )
  }
  
  messageInfo = (status, info = '') => {
    message[status ? 'info' : 'error'](info)
  }
  
  userRegister = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if(!err){
        let {name, password, accesstoken} = values
        name = encodeURIComponent(name.trim())
        this.props.userRegister({name, password, accesstoken})
      }
    })
  }
  
  checkUserName = (rule, value, cb) => {
    clearTimeout(this.checkedTimer)
    
    if(!value) return cb()
    value = value.trim()
    if(!value) return cb('用户名不正确!')
    
    this.checkedTimer = setTimeout(() => {
      axios.post('/api/user/register', {name: value, check: true})
      .then((res) => {
        if(res.status === 200 && res.data.success){
          cb()
        }else{
          cb(res.data.msg)
        }
      })
    }, 500)
  }
  
  checkConfirm = (rule, value, cb) => {
    const form = this.props.form
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    cb()
  }
  
  checkPassword = (rule, value, cb) => {
    const form = this.props.form
    if (value && value !== form.getFieldValue('password')) {
      cb('两次输入的密码不一致!')
    } else {
      cb()
    }
  }
  
  handleConfirmBlur = (e) => {
    const value = e.target.value
    this.setState({ confirmDirty: this.state.confirmDirty || !!value })
  }
  
  render() {
    const { getFieldDecorator } = this.props.form
    
    return (
      <Row>
        <Col xxl={4} xl={3} lg={3} md={2} xs={2} sm={0} />
        <Col xxl={16} xl={18} lg={18} md={20} xs={20} sm={24} style={style.root}>
          <h2 style={style.title}>用户注册</h2>
          <Form onSubmit={this.userRegister} style={style.formContainer}>
            <FormItem label={'用户名'} hasFeedback>
              {
                getFieldDecorator('name', {
                  rules: [
                    {required: true, message: '用户名必须输入!'},
                    {validator: this.checkUserName}
                  ]
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                )
              }
            </FormItem>
            <FormItem label={'密码'} hasFeedback>
              {
                getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: '密码必须输入!'
                    },
                    {
                      validator: this.checkConfirm
                    }
                  ]
                })(
                  <Input
                    type="password"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    onBlur={this.handleConfirmBlur}
                  />
                )
              }
            </FormItem>
            <FormItem label={'确认密码'} hasFeedback>
              {
                getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: '确认密码必须输入!'
                    },
                    {
                      validator: this.checkPassword
                    }
                  ]
                })(
                  <Input
                    type="password"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                )
              }
            </FormItem>
            <FormItem 
              label={
                <span>
                  Token (<a href="https://cnodejs.org/" target="_blank" rel="noopener noreferrer">点击获取</a>)
                </span>
              }
            >
              {
                getFieldDecorator('accesstoken', {
                  rules: [
                    {
                      required: true,
                      message: 'Token必须输入!'
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type="api" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                )
              }
            </FormItem>
            <FormItem>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
                initialValue: true,
                rules: [{required: true, message: '必须同意条款!'}]
              })(
                <Checkbox>我已经阅读并且会遵守 <a href="">用户条款</a></Checkbox>
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" loading={this.props.registerReducer.loading} style={style.submitBtn}>注册</Button>
            </FormItem>
          </Form>
        </Col>
        <Col xxl={4} xl={3} lg={3} md={2} xs={2} sm={0} />
      </Row>
    )
  }

}

export default Form.create()(Register)