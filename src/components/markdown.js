import React, { Component } from 'react'
import { Divider, Button } from 'antd'
import '../../node_modules/mditor/dist/js/mditor.min.js'
import '../../node_modules/mditor/dist/css/mditor.css'

const Mditor = window.Mditor

class Markdown extends Component {
  componentDidMount() {
    const mditor = this.mditor =  Mditor.fromTextarea(this.text)
    mditor.on('ready',() => {
      mditor.height = this.props.height ? this.props.height + 'px' : mditor.height
      mditor.toolbar.removeItem('help')
      mditor.split = false
    })
  }
  
  handleSubmit = () => {
    this.props.handleSubmit(this.mditor.value)
    this.mditor.value = ''
  }
  
  render() {
    return (
      <div>
        <textarea 
          name="editor" 
          ref={(text) => {this.text = text}}
        />
        <Divider />
        <Button type="primary" onClick={this.handleSubmit}>提交</Button>
      </div>
    )
  }

}

export default Markdown