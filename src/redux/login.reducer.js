import axios from 'axios'

const LOGIN_SUCC = 'LOGIN_SUCC'
const LOGIN_ERR = 'LOGIN_ERR'
const LOGOUT_SUCC = 'LOGOUT_SUCC'
const LOGOUT_ERR = 'LOGOUT_ERR'
const LOADING = 'LOADING'
const LOADEND = 'LOADEND'

const init = {
  loading: false,
  isLogin: false
}

export function loginReducer(state = init, action) {
  if (action.type === LOGIN_SUCC) {
    return { ...state, isLogin: true, msg: '', ...action.payload }
  }
  
  if (action.type === LOGIN_ERR) {
    return { ...state, isLogin: false, msg: '', ...action.payload }
  }
  
  if (action.type === LOGOUT_SUCC) {
    return { ...state, isLogin: false, msg: '', loading: false, ...action.payload }
  }
  
  if (action.type === LOGOUT_ERR) {
    return { ...state, loading: false, msg: '', ...action.payload }
  }
  
  if (action.type === LOADING) {
    return { ...state, msg: '', loading: true }
  }
  
  if (action.type === LOADEND) {
    return { ...state,  msg: '', loading: false }
  }
  
  return state
}

export function userLogin({name = '', password = '', check = false} = {}) {
  return (dispatch) => {
    dispatch({type: LOADING})
    axios.post('/api/user/login', {
      name,
      password,
      check
    }).then((res) => {
      if (res.status === 200 && res.data.success) {
        dispatch({type: LOGIN_SUCC, payload: res.data})
      } else {
        dispatch({type: LOGIN_ERR, payload: res.data})
      }
      dispatch({type: LOADEND})
    }).catch((err) => {
      if (err.response) {
        dispatch({type: LOGIN_ERR, payload: err.response.data})
      } else {
        dispatch({type: LOGIN_ERR, payload: {msg: err.message}})
      }
      dispatch({type: LOADEND})
    })
  }
}

export function userLogOut() {
  return (dispatch) => {
    dispatch({type: LOADING})
    axios.post('/api/user/logout').then((res) => {
      if (res.status === 200 && res.data.success) {
        dispatch({type: LOGOUT_SUCC, payload: res.data})
      } else {
        dispatch({type: LOGOUT_ERR, payload: res.data})
      }
      dispatch({type: LOADEND})
    }).catch((err) => {
      if (err.response) {
        dispatch({type: LOGOUT_ERR, payload: err.response.data})
      } else {
        dispatch({type: LOGOUT_ERR, payload: {msg: err.message}})
      }
      dispatch({type: LOADEND})
    })
  }
}
















