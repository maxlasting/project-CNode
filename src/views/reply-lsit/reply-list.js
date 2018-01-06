import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Avatar, List, Divider } from 'antd'
import Markdown from '../../components/markdown'
import formatDate from '../../utils/formatDate'

export default ({replyLen, loading, replies, handleSubmit, isLogin}) => (
  <div>
    <Card
      type="inner"
      title={replyLen + '回复'}
      bordered={false}
    >
      <List
        itemLayout="vertical"
        loading={loading}
        dataSource={replies}
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
      {isLogin ? <Divider /> : null}
      {isLogin ? <Markdown handleSubmit={handleSubmit} height={260} /> : null}
    </Card>
  </div>
)