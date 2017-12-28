import axios from 'axios'

const GET_DETAIL_SUCC = 'GET_DETAIL_SUCC'
const GET_DETAIL_ERR = 'GET_DETAIL_ERR'
const LOADING = 'LOADING'
const LOADEND = 'LOADENG'

const init = {
  loading: false,
  detail: {
    author: {},
    author_id: '',
    content: '',
    create_at: '',
    good: false,
    replies: [],
    id: '',
    is_collect: false,
    last_reply_at: '',
    tab: '',
    title: '',
    top: false,
    visit_count: ''
  },
}

export function topicDetailReducer(state = init, action) {
  if (action.type === GET_DETAIL_SUCC) {
    return { ...state, success: action.payload.success, detail: action.payload.data }
  }
  
  if (action.type === GET_DETAIL_ERR) {
    return { ...state, msg: action.msg }
  }
  
  if (action.type === LOADING) {
    return { ...state, loading: true }
  }
  
  if (action.type === LOADEND) {
    return { ...state, loading: false }
  }
  
  return state
}

export function getTopicDetail(topicId) {
  return (dispatch) => {
    dispatch({ type: LOADING })
    axios.get('/api/topic/' + topicId).then((res) => {
      if (res.status === 200 && res.data.success) {
        dispatch({type: GET_DETAIL_SUCC, payload: res.data})
      } else {
        dispatch({type: GET_DETAIL_ERR, msg: res.data.msg})
      }
      dispatch({ type: LOADEND })
    }).catch((err) => {
      if (err.response) {
        dispatch({ type: GET_DETAIL_ERR, payload: err.response.data })
      } else {
        dispatch({ type: GET_DETAIL_ERR, payload: {msg: err.message} })
      }
    })
  }
}











































