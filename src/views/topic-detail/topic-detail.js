import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col, Card, Avatar, Button, Tag, List, message } from 'antd'
import { Helmet } from 'react-helmet'
import 'github-markdown-css'
import { getTopicDetail, topicCollect, topicDeCollect } from '../../redux/topic-detail.reducer'
import { tabSchema } from '../../utils/schema'
import formatDate from '../../utils/formatDate'

@connect(
  state => state,
  { getTopicDetail, topicCollect, topicDeCollect }
)
class TopicDetail extends Component {
  state = {
    isCollect: false
  }
  
  componentDidMount() {
    const topicId = this.props.match.params.id
    const { isLogin } = this.props.loginReducer 
    this.props.getTopicDetail(topicId, isLogin)
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.topicDetailReducer.detail.is_collect !== this.props.topicDetailReducer.detail.is_collect) {
      this.setState({
        isCollect: nextProps.topicDetailReducer.detail.is_collect
      })
    }
  }
  
  componentDidUpdate() {
    const { msg } = this.props.topicDetailReducer
    msg && this.messageInfo(msg)
  }
  
  messageInfo = (msg) => {
    message.info(msg)
  }
  
  setTopicCollect = (id) => {
    const { isCollect } = this.state
    if (isCollect) {
      this.props.topicDeCollect(id)
    } else {
      this.props.topicCollect(id)
    }
  }
  
  render() {
    const { detail, loading } = this.props.topicDetailReducer
    const { isLogin } = this.props.loginReducer
    const { isCollect } = this.state
    
    const title = (
      <div>
        <h2 style={{fontSize: '26px', wordWrap:'break-word', whiteSpace: 'pre-wrap'}}>{detail.title}</h2>
        <br />
        {
          detail.content ?
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Tag color={detail.top ? 'magenta' : detail.good ? 'green' : 'green'}>
              {detail.top ? '置顶' : detail.good ? '精华' : tabSchema[detail.tab]}
            </Tag>
            <span style={{margin: '0 8px', display: 'flex', alignItems: 'center'}}>
              <Avatar size="small" icon="user" src={detail.author.avatar_url} style={{marginRight: 3}} />
              <Link to={`/user/${detail.author.loginname}`}>{detail.author.loginname}</Link>
            </span>
            <span style={{margin: '0 8px'}}>发表于: {formatDate(detail.create_at)}</span>
            {
              isLogin ? 
              <Button 
                type={isCollect ? 'dashed' : "default"}
                style={{margin: '0 10px'}}
                onClick={() => {this.setTopicCollect(detail.id)}}
              >
                {isCollect ? '取消收藏' : '添加收藏'}
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
          <title>{detail.title}</title>
        </Helmet>
        <Col xxl={4} xl={3} lg={3} md={2} xs={2} sm={0} />
        <Col xxl={16} xl={18} lg={18} md={20} xs={20} sm={24} >
          <div>
            <Card 
              bordered={false}
              title={title}
              loading={loading}
            >
              <p className="markdown-body" dangerouslySetInnerHTML={{__html: detail.content}}></p>
            </Card>
          </div>
          <div>
            <Card
              type="inner"
              title={detail.replies.length + '回复'}
              bordered={false}
            >
              <List
                itemLayout="vertical"
                loading={loading}
                dataSource={detail.replies}
                renderItem={(item, i) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <div>
                          <Link to="/">{item.title}</Link>
                        </div>
                      }
                      description={
                        <span style={{display: 'flex', alignItems: 'center'}}>
                          <Avatar src={item.author.avatar_url} style={{marginRight: 5}} />
                          {item.author.loginname} {i+1}楼 回复于: {formatDate(item.create_at)}
                        </span>
                      }
                    />
                    <p dangerouslySetInnerHTML={{__html: item.content}} />
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </Col>
        <Col xxl={4} xl={3} lg={3} md={2} xs={2} sm={0} />
      </Row>
    )
  }

}

export default TopicDetail