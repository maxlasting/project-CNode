import axios from 'axios'

const REG_SUCC = 'REG_SUCC'
const REG_ERR = 'REG_ERR'
const LOADING = 'LOADING'
const LOADEND = 'LOADEND'

const init = {
  loading: false,
  msg: '',
}

export function registerReducer(state = init, action) {
  if (action.type === REG_SUCC) {
    return { ...state, ...action.payload }
  }
  
  if (action.type === REG_ERR) {
    return { ...state, ...action.payload }
  }
  
  if (action.type === LOADING) {
    return { ...state, msg: '', loading: true }
  }
  
  if (action.type === LOADEND) {
    return { ...state, msg: '', loading: false }
  }
  
  return state
}

export function userRegister({name, password, accesstoken}) {
  return (dispatch) => {
    dispatch({type: LOADING})
    axios.post('/api/user/register', {name, password, accesstoken})
      .then((res) => {
        console.log(res.data)
        if (res.status === 200 && res.data.success) {
          dispatch({type: REG_SUCC, payload: res.data})
        } else {
          dispatch({type: REG_ERR, payload: res.data})
        }
        dispatch({type: LOADEND})
      })
      .catch((err) => {
        if (err.response) {
          dispatch({type: REG_ERR, payload: err.response.data})
        } else {
          dispatch({type: REG_ERR, payload: {msg: err.message}})
        }
        dispatch({type: LOADEND})
      })
  }
}
























