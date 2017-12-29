import React from 'react'
import { connect } from 'react-redux'
import { userLogin }  from '../redux/login.reducer'

@connect(
  state => state,
  { userLogin }
)
class CheckLogin extends React.Component {
  componentDidMount() {
    this.props.userLogin({check: true})
  }
  
  render() {
    return null
  }

}

export default CheckLogin