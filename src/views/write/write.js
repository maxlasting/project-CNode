import React, { Component } from 'react'
import axios from 'axios'
import { Row, Col, Select, Input, Divider, message } from 'antd'
import Markdown from '../../components/markdown'

const Option = Select.Option

class Write extends Component {
  state = {
    tab: '',
    title: '',
    loading: false,
  }
  
  handleSubmit = (content) => {
    const { title, tab } = this.state
    console.log(title, tab)
    if (title.trim().length < 10) {
      message.info('标题不能小于10个字符')
      return
    }
    
    if (content.trim().length < 2) {
      message.info('内容太短')
      return
    }
    
    if (!tab) return message.info('请选择板块')
    
    this.setState({loading: true})
    axios.post('/api/topics?needtoken=yes', {
      title,
      tab,
      content,
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        this.props.history.push('/detail/' + res.data.topic_id)
      }
      this.setState({loading: false})
    })
  }
  
  handleVal = (key, val) => {
    this.setState({
      [key]: val
    })
  }
  
  render() {
    return (
      <Row style={{minWidth: 580}}>
        <Col xxl={4} xl={3} lg={3} md={2} xs={2} sm={1} />
        <Col xxl={16} xl={18} lg={18} md={20} xs={20} sm={22}>
          <h2 style={{marginBottom: 20}}>发布话题</h2>
          <div style={{marginBottom: 20}}>
            <Input placeholder="标题字数10字以上" onChange={(e) => this.handleVal('title', e.target.value)} />
          </div>
          <div style={{display: 'flex', alignItems: 'center', margin: '10px 0'}}>
            <span style={{fontSize: 14, marginRight: 10, lineHeight: '32px'}}>选择板块:</span>
            <Select 
              placeholder="请选择板块" 
              style={{ width: 200 }} 
              size="small" 
              onChange={(val) => this.handleVal('tab', val)}
            >
              <Option value="share">分享</Option>
              <Option value="ask">问答</Option>
              <Option value="job">招聘</Option>
              <Option value="dev">测试</Option>
            </Select>
          </div>
          <Divider />
          <Markdown handleSubmit={this.handleSubmit}/>
        </Col>
        <Col xxl={4} xl={3} lg={3} md={2} xs={2} sm={1} />
      </Row>
    )
  }

}

export default Write