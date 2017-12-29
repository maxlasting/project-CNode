import axios from 'axios'

const GET_TOPICS_SUCC = 'GET_TOPICS_SUCC'
const GET_TOPICS_ERR = 'GET_TOPICS_ERR'
const LOADING = 'LOADING'
const LOADEND = 'LOADEND'

const init = {
  loading: false,
  topics: [],
}

export function topicListReducer(state = init, action) {
  if (action.type === GET_TOPICS_SUCC) {
    return { ...state, success: action.payload.success, topics: action.payload.data }
  }
  
  if (action.type === GET_TOPICS_ERR) {
    return { ...state, msg: action.payload.msg }
  }
  
  if (action.type === LOADING) {
    return { ...state, loading: true }
  }
  
  if (action.type === LOADEND) {
    return { ...state, loading: false }
  }
  
  return state
}

export function getTopicList({tab = 'all', limit = 30, page = 1} = {}) {
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
        dispatch({ type: GET_TOPICS_SUCC, payload: res.data })
      } else {
        dispatch({ type: GET_TOPICS_ERR, payload: res.data })
      }
      dispatch({ type: LOADEND })
    }).catch((err) => {
      if (err.response) {
        dispatch({ type: GET_TOPICS_ERR, payload: err.response.data })
      } else {
        dispatch({ type: GET_TOPICS_ERR, payload: {msg: err.message} })
      }
    })
  }
}











































