import { combineReducers } from 'redux'
import { topicListReducer } from './topic-list.reducer'
import { topicDetailReducer } from './topic-detail.reducer'
import { loginReducer } from './login.reducer'
import { registerReducer } from './register.reducer'

export default combineReducers({
  topicListReducer,
  topicDetailReducer,
  loginReducer,
  registerReducer,
})