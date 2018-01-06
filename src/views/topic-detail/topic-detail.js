import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col, Card, Avatar, Button, Tag, message } from 'antd'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import 'github-markdown-css'
import { tabSchema } from '../../utils/schema'
import formatDate from '../../utils/formatDate'
import ReplyList from '../reply-lsit/reply-list'

@connect(
  (state) => (state.loginReducer)
)
class TopicDetail extends Component {
  state = {
    loading: false,
    author: {},
    author_id: '',
    content: '',
    create_at: '',
    good: false,
    replies: [],
    id: '',
    is_collect: false,
    last_reply_at: '',
    tab: '',
    title: '',
    top: false,
    visit_count: '',
    msg: '',
  }
  
  componentDidMount() {
    const topic_id = this.props.match.params.id
    const { isLogin } = this.props
    this.getTopicDetail(topic_id, isLogin ? 'yes' : 'no')
  }
  
  messageInfo = (msg) => {
    message.info(msg)
  }
  
  getTopicDetail = (topic_id, needtoken) => {
    this.setState({
      loading: true
    }, () => {
      axios.get(`/api/topic/${topic_id}?needtoken='${needtoken}`).then((res) => {
        if (res.status === 200 && res.data.success) {
          this.setState({
            ...res.data.data,
            loading: false,
            success: true
          })
        }
      }).catch((err) => {
        this.props.history.push('/')
      })
    })
  }
  
  topicCollect = (topic_id) => {
    axios.post('/api/topic_collect/collect?needtoken=true', {
      topic_id
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        this.setState({
          is_collect: true
        })
      }
    }).catch((err) => {
      this.messageInfo('出错啦~')
    })
  }
  
  topicDeCollect = (topic_id) => {
    axios.post('/api/topic_collect/de_collect?needtoken=true', {
      topic_id
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        this.setState({
          is_collect: false
        })
      }
    }).catch(() => {
      this.messageInfo('出错啦~')
    })
  }
  
  setTopicCollect = (id) => {
    const { is_collect } = this.state
    if (!is_collect) {
      this.topicCollect(id)
    } else {
      this.topicDeCollect(id)
    }
  }
  
  topicReply = (topic_id, content, reply_id = '') => {
    axios.post(`/api/topic/${topic_id}/replies?needtoken=true`, {
      content,
      reply_id,
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        this.getTopicDetail(topic_id, 'yes')
      }
    })
  }
  
  handleSubmit = (content) => {
    const topic_id = this.props.match.params.id
    this.topicReply(topic_id, content)
  }
  
  render() {
    const { isLogin } = this.props
    const { is_collect, loading, tab, author, create_at, id, title, content, replies, top: isTop, good: isGood } = this.state
    
    const cardTitle = (
      <div>
        <h2 style={{fontSize: '26px', wordWrap:'break-word', whiteSpace: 'pre-wrap'}}>{title}</h2>
        <br />
        {
          content ?
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Tag color={isTop ? 'magenta' : isGood ? 'green' : 'green'}>
              {isTop ? '置顶' : isGood ? '精华' : tabSchema[tab]}
            </Tag>
            <span style={{margin: '0 8px', display: 'flex', alignItems: 'center'}}>
              <Avatar size="small" icon="user" src={author.avatar_url} style={{marginRight: 3}} />
              <Link to={`/user/${author.loginname}`}>{author.loginname}</Link>
            </span>
            <span style={{margin: '0 8px'}}>发表于: {formatDate(create_at)}</span>
            {
              isLogin ? 
              <Button 
                type={is_collect ? 'dashed' : "default"}
                style={{margin: '0 10px'}}
                onClick={() => {this.setTopicCollect(id)}}
              >
                {is_collect ? '取消收藏' : '添加收藏'}
              </Button> :
              null
            }
          </div> : null
        }
      </div>
    )
    
    return (
      <Row>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Col xxl={4} xl={3} lg={3} md={2} xs={2} sm={0} />
        <Col xxl={16} xl={18} lg={18} md={20} xs={20} sm={24}>
          <div>
            <Card 
              bordered={false}
              title={cardTitle}
              loading={loading}
            >
              <p className="markdown-body" dangerouslySetInnerHTML={{__html: content}}></p>
            </Card>
          </div>
          <ReplyList 
            replyLen={replies.length} 
            loading={loading} 
            replies={replies} 
            handleSubmit={this.handleSubmit} 
            isLogin={isLogin}
          />
        </Col>
        <Col xxl={4} xl={3} lg={3} md={2} xs={2} sm={0} />
      </Row>
    )
  }

}

export default TopicDetail