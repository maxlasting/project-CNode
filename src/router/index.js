import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'

import TopicIndex from '../views/topic-index/topic-index'
import TopicDetail from '../views/topic-detail/topic-detail'
import Register from '../views/register/register'
import Login from '../views/login/login'
import User from '../views/user/user'
import Write from '../views/write/write'
import About from '../views/about/about'
import Study from '../views/study/study'
import Page404 from '../views/page-404/page-404'

export default () => (
  <div style={{flex: 1, padding: '20px 0 40px'}}>
    <Switch>
      <Route path="/" exact render={() => (<Redirect to="/index" />)} />,
      <Route path="/index" component={TopicIndex} />
      <Route path="/detail/:id" component={TopicDetail} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/user/:name" component={User} />
      <Route path="/write" component={Write} />
      <Route path="/info" component={About} />
      <Route path="/book" component={Study} />
      <Route component={TopicIndex} />
    </Switch>
  </div>
)