import { combineReducers } from 'redux'
import { topicListReducer } from './topic-list.reducer'
import { topicDetailReducer } from './topic-detail.reducer'

export default combineReducers({
  topicListReducer,
  topicDetailReducer,
})