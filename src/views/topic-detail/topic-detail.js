import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row, Col, Card, Avatar, Button, Tag, List } from 'antd'
import 'github-markdown-css'
import { getTopicDetail } from '../../redux/topic-detail.reducer'
import { tabSchema } from '../../utils/schema'
import formatDate from '../../utils/formatDate'

@connect(
  state => state,
  { getTopicDetail }
)
class TopicDetail extends Component {
  componentDidMount() {
    const topicId = this.props.match.params.id
    this.props.getTopicDetail(topicId)
  }
  
  render() {
    const { detail, loading } = this.props.topicDetailReducer
    // console.log(detail)
    
    const title = (
      <div>
        <h2 style={{fontSize: '26px', wordWrap:'break-word', whiteSpace: 'pre-wrap'}}>{detail.title}</h2>
        <br/>
        {
          detail.content ?
          <div style={{display: 'flex', alignItems: 'center'}}>
            <Tag color={detail.top ? 'magenta' : detail.good ? 'green' : 'green'}>
              {detail.top ? '置顶' : detail.good ? '精华' : tabSchema[detail.tab]}
            </Tag>
            <span style={{margin: '0 8px', display: 'flex', alignItems: 'center'}}>
              <Avatar size="small" icon="user" src={detail.author.avatar_url} style={{marginRight: 3}} />
              <Link to="/">{detail.author.loginname}</Link>
            </span>
            <span style={{margin: '0 8px'}}>发表于: {formatDate(detail.create_at)}</span>
          </div> : null
        }
      </div>
    )
    
    return (
      <Row>
        <Col xxl={4} xl={3} lg={3} md={2} xs={2} sm={0} />
        <Col xxl={16} xl={18} lg={18} md={20} xs={20} sm={24} >
          <div>
            <Card 
              bordered={false}
              title={title}
              loading={loading}
              extra={detail.content ? <Button type="danger" style={{marginTop: 40}}>收藏</Button> : null}
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