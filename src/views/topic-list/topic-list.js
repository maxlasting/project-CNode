import React from 'react'
import { Col, Avatar, List, Tag, Pagination } from 'antd'

const style = {
  root: {
    paddingLeft: 20, 
    paddingRight: '12vw', 
    borderLeft: '1px solid #e9e9e9',
  },
  pagination: {
    margin: '20px 0'
  }
}

const TopicList = ({ topics, changePage, current = 1, pageSize = 30, total = 500 } = {}) => (
  <Col xxl={20} xl={19} lg={19} md={18} xs={24} sm={24} style={style.root}>
    <List
      itemLayout="horizontal"
      loading={false}
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
                  color={'magenta'}
                >
                  {'分享'}
                </Tag>
                <a href="https://ant.design">{item.title}</a>
              </div>
            }
            description={<span>{item.author.loginname} 发表于: {item.create_at}</span>}
          />
          <div />
        </List.Item>
      )}
    />
    <Pagination 
      style={style.pagination} 
      size="small"
      onChange={() => {}}
      showQuickJumper 
      current={current}
      pageSize={pageSize}
      total={total} 
    />
  </Col>
)

export default TopicList