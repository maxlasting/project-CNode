import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import TopicIndex from '../views/topic-index/topic-index'

export default () => (
  [
    <Route key="home" path="/" exact render={() => (<Redirect to="/index" />)} />,
    <Route key="index" path="/index" component={TopicIndex} />,
  ]
)