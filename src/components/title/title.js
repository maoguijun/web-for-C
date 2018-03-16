import React from 'react'
import { Form, Row, Col, Input, Button, Icon, DatePicker } from 'antd'
import { injectIntl } from 'react-intl'
import './title.scss'

class Title extends React.PureComponent {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  constructor (props) {
    super(props)
    this.state = {
      title_width: '100%'
    }
  }
  componentDidMount () {
    const { title_width } = this.state
    if (title_width === '100%') {
      let siderWidth = document.getElementsByClassName('sider-main')[0].style.width
      let bodyWidth = document.body.clientWidth
      console.dir(bodyWidth)
      let titleWidth = parseInt(bodyWidth) - parseInt(siderWidth)
      console.log(20, titleWidth)
      this.setState({
        title_width: `${titleWidth}px`
      })
    }
  }

  render () {
    const { intl: { formatMessage }, rightContent } = this.props
    const { title_width } = this.state
    return (
      <Row className='title_all' style={{ width: title_width }}>
        <Col span={6} className='title_words'>
          <span>{this.props.title}</span>
        </Col>
        <Col span={18}>{rightContent && rightContent}</Col>
      </Row>
    )
  }
}
Title.propTypes = {
  title: React.PropTypes.string
}

export default injectIntl(Title)
