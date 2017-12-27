import axios from 'axios'

const GET_TOPICS_SUCC = 'GET_TOPICS_SUCC'
const GET_TOPICS_ERR = 'GET_TOPICS_ERR'
const GET_TOPIC_ITEM = 'GET_TOPIC_ITEM'
const LOADING = 'LOADING'
const LOADEND = 'LOADENG'

const init = {
  loading: false,
  msg: '',
  topics: [],
  detail: {},
}

export function topicReducer(state = init, action) {
  if (action.type === GET_TOPICS_SUCC) {
    return { ...state, success: action.payload.success, topics: action.payload.data }
  }
  
  if (action.type === GET_TOPICS_ERR) {
    return { ...state, msg: action.msg }
  }
  
  if (action.type === GET_TOPIC_ITEM) {
    return { ...state, detail: action.payload }
  }
  
  if (action.type === LOADING) {
    return { ...state, loading: true }
  }
  
  if (action.type === LOADEND) {
    return { ...state, loading: false }
  }
  
  return state
}

export function getTopics({tab = 'all', limit = 30, page = 1} = {}) {
  return (dispatch) => {
    dispatch({ type: LOADING })
    axios.get('/api/topics', {
      params: {
        tab,
        limit,
        page,
      },
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        dispatch({type: GET_TOPICS_SUCC, payload: res.data})
      } else {
        dispatch({type: GET_TOPICS_ERR, msg: res.data.msg})
      }
      dispatch({ type: LOADEND })
    })
  }
}

export function getTopicItem(topicId) {
  
}











































