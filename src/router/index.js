import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import TopicIndex from '../views/topic-index/topic-index'
import TopicDetail from '../views/topic-detail/topic-detail'

export default () => (
  <div style={{flex: 1, padding: '20px 0 40px'}}>
    <Switch>
      <Route path="/" exact render={() => (<Redirect to="/index" />)} />,
      <Route path="/index" component={TopicIndex} />
      <Route path="/detail/:id" component={TopicDetail} />
    </Switch>
  </div>
)