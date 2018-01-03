import axios from 'axios'

const GET_DETAIL_SUCC = 'GET_DETAIL_SUCC'
const GET_DETAIL_ERR = 'GET_DETAIL_ERR'
const LOADING = 'LOADING'
const LOADEND = 'LOADEND'
const COLLECT = 'COLLECT'
const DECOLLECT = 'DECOLLECT'

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
    return { ...state, msg: action.payload.msg }
  }
  
  if (action.type === LOADING) {
    return { ...state, msg: '', loading: true }
  }
  
  if (action.type === LOADEND) {
    return { ...state, msg: '', loading: false }
  }
  
  if (action.type === COLLECT) {
    return { ...state, detail: {...state.detail, is_collect: true}, msg: action.payload.msg }
  }
  
  if (action.type === DECOLLECT) {
    return { ...state, detail: {...state.detail, is_collect: false}, msg: action.payload.msg }
  }
  
  return state
}

export function getTopicDetail(topicId, needtoken) {
  return (dispatch) => {
    dispatch({ type: LOADING })
    axios.get('/api/topic/' + topicId + '?needtoken=' + needtoken).then((res) => {
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

export function topicCollect(topic_id) {
  return (dispatch) => {
    axios.post('/api/topic_collect/collect?needtoken=true', {
      topic_id
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        dispatch({type: COLLECT, payload: {msg: ''}})
      }
    }).catch((err) => {
      if (err.response) {
        dispatch({ type: COLLECT, payload: {msg: '发生错误'} })
      } else {
        dispatch({ type: COLLECT, payload: {msg: err.message} })
      }
    })
  }
}

export function topicDeCollect(topic_id) {
  return (dispatch) => {
    axios.post('/api/topic_collect/de_collect?needtoken=true', {
      topic_id
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        dispatch({type: DECOLLECT, payload: {msg: ''}})
      }
    }).catch((err) => {
      console.log(err)
      if (err.response) {
        dispatch({ type: DECOLLECT, payload: {msg: '发生错误'}})
      } else {
        dispatch({ type: DECOLLECT, payload: {msg: err.message} })
      }
    })
  }
}









































