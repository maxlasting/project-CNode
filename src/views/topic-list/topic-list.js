import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Avatar, List, Tag, Pagination } from 'antd'
import { tabSchema } from '../../utils/schema'
import style from './style'
import formatDate from '../../utils/formatDate'

const TopicList = ({ topics, loading, pageChange, currentPage = 1, pageSize = 30, pageLen = 500 } = {}) => (
  <Col xxl={20} xl={19} lg={19} md={18} xs={24} sm={24} style={style.root}>
    <List
      itemLayout="horizontal"
      loading={loading}
      dataSource={topics}
      renderItem={item => (
        <List.Item 
          actions={
            [
              <span style={{marginLeft: 35}}>回复:{item.reply_count}</span>, 
              <span>访问:{item.visit_count}</span>
            ]
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.author.avatar_url} />}
            title={
              <div>
                <Tag 
                  color={
                    item.top ?
                    'magenta' :
                    item.good ?
                    'green' :
                    'geekblue'
                  }
                >
                  { item.top ? '置顶' : item.good ? '精华' : tabSchema[item.tab] ? tabSchema[item.tab] : '分享' }
                </Tag>
                <Link to={`/detail/${item.id}`}>{item.title}</Link>
              </div>
            }
            description={<span>{item.author.loginname} 发表于: {formatDate(item.create_at)}</span>}
          />
          <div />
        </List.Item>
      )}
    />
    <Pagination 
      style={style.pagination} 
      size="small"
      onChange={pageChange}
      showQuickJumper 
      current={currentPage}
      pageSize={pageSize}
      total={pageLen} 
    />
  </Col>
)

export default TopicList