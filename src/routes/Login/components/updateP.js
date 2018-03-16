/*
 * @Author: Maoguijun
 * @Date: 2018-01-30 19:02:10
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-01-31 11:44:08
 */
import React, { Component } from 'react'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
// import ImmutablePropTypes from 'react-immutable-proptypes'
import { Icon, Form, Input, Button, Row, Col, Alert, message, notification, Modal } from 'antd'
import LocaleBtn from '../../../containers/global/LocaleBtn'
import { fetchState } from 'config'
import { encryptAes, encryptSha256 } from '../../../utils/common'
import moment from 'moment'
import SimpleForm from '../../../components/antd/SimpleForm'
const FormItem = Form.Item
import './login.scss'

export class UpdateP extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false
    }
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const { loading } = this.state
    const { formatMessage } = this.props.intl
    console.log(this.props)
    const username = formatMessage({ id: 'login_username' })
    const password = formatMessage({ id: 'login_password' })
    const oldPassword = formatMessage({ id: 'login_oldPassword' })
    return (
      <Form>
        <FormItem label={null}>
          {getFieldDecorator('oldPassword', {
            rules: [{ required: true, message: formatMessage({ id: 'input_require' }, { name: password }) }]
          })(
            <Input
              prefix={<Icon type='lock' style={{ fontSize: 13 }} />}
              placeholder={formatMessage({ id: 'input_placeholder' }, { name: oldPassword })}
              type='password'
            />
          )}
        </FormItem>
        <FormItem label={null}>
          {getFieldDecorator('newPassword', {
            rules: [{ required: true, message: formatMessage({ id: 'input_require' }, { name: password }) }]
          })(
            <Input
              prefix={<Icon type='lock' style={{ fontSize: 13 }} />}
              placeholder={formatMessage({ id: 'input_placeholder' }, { name: password })}
              type='password'
            />
          )}
        </FormItem>
      </Form>
    )
  }
}
export default Form.create()(injectIntl(UpdateP))
