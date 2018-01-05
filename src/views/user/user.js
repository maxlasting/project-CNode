import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Row, Col, Card, Avatar, List } from 'antd'
import axios from 'axios'
import formatDate from '../../utils/formatDate'

@connect(
  (state) => (state.loginReducer)
)
class User extends Component {
  state = {
    loginname: '',
    avatar_url: '',
    githubUsername: '',
    create_at: '',
    score: 0,
    recent_topics: [],
    recent_replies: [],
    loading: false,
    collects: []
  }
  
  componentWillMount() {
    if (!this.props.isLogin) {
      this.props.history.replace('/')
    }
  }
  
  componentDidMount() {
    this.getUserInfo(this.props.match.params.name)
  }
  
  componentWillReceiveProps(nextProps) {
    if (!nextProps.isLogin) {
      this.props.history.replace('/')
    }
    if (nextProps.match.params.name !== this.props.match.params.name) {
      this.getUserInfo(nextProps.match.params.name)
    }
  }
  
  getUserInfo = (name) => {
    const info = axios.get('/api/user/' + name)
    const collect = axios.get('/api/topic_collect/' + name)
    
    this.setState({loading: true})
    
    axios.all([info, collect]).then(axios.spread((acce, perms) => {
      this.setState({
        ...acce.data.data,
        collects: perms.data.data,
        loading: false,
      })
    }))
  }
  
  render() {
    const { loginname, avatar_url, score, create_at, recent_topics, recent_replies, loading, collects }  = this.state
    
    const topicList = (title, data) => (
      <Card title={title} bordered={false} loading={loading}>
        <List
          itemLayout="horizontal"
          dataSource={data.slice(0, 3)}
          split={false}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.author.avatar_url} />}
                title={
                  <div>
                    <Link to={`/detail/${item.id}`}>{item.title}</Link>
                  </div>
                }
                description={<span>{item.author.loginname} 时间: {formatDate(item.last_reply_at)}</span>}
              />
              <div />
            </List.Item>
          )} 
        />
        <List.Item>
          <Link to="/">查看更多</Link>
        </List.Item>
      </Card>
    )
    
    return (
      <Row style={{padding: '0 5vw', flex: 1}}>
        <Helmet>
          <title>用户中心</title>
        </Helmet>
        <Col span={24}>
          <Card title="用户信息" bordered={false} loading={loading}>
            <List split={false}>
              <List.Item>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <Avatar icon="user" src={avatar_url} />
                  <span style={{margin: '0 10px'}}>{loginname}</span>
                </div>
              </List.Item>
              <List.Item>
                {score} 积分
              </List.Item>
              <List.Item>
                注册日期：{formatDate(create_at)}
              </List.Item>
            </List>
          </Card>
          { topicList('收藏的话题', collects) }
          { topicList('创建的话题', recent_topics) }
          { topicList('参与的话题', recent_replies) }
        </Col>
      </Row>
    )
  }

}

export default User