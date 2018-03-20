import React, { Component } from 'react'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Icon, Form, Input, Button, Row, Col, Alert, message, notification, Modal } from 'antd'
import LocaleBtn from '../../../containers/global/LocaleBtn'
import { fetchState } from 'config'
import { encryptAes, encryptSha256 } from '../../../utils/common'
import moment from 'moment'
import SimpleForm from '../../../components/antd/SimpleForm'
const FormItem = Form.Item
import logo1 from '../../../../public/logos/logo1.png'
import './login.scss'

export class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      count: 0,
      updatePwdModal: false
    }
  }
  render () {
    const { getFieldDecorator } = this.props.form
    const { formatMessage } = this.props.intl
    const { loading, count, updatePwdModal } = this.state
    const baseLeft = 6
    const baseRight = 17
    const formItemLayout = {
      labelCol: { span: baseLeft },
      wrapperCol: { span: baseRight }
    }

    const username = formatMessage({ id: 'login_username' })
    const password = formatMessage({ id: 'login_password' })
    const oldPassword = formatMessage({ id: 'login_oldPassword' })
    return (
      <Row type='flex' justify='center' align='middle' className='login'>
        <Col className='login-wrap'>
          {/* <LocaleBtn /> */}
          <div className='logo'>
            <img src={logo1} />
          </div>
          <Form
            hideRequiredMark
            ref={f => {
              this.formLo = f
            }}
            onSubmit={e => {
              let page
              e.preventDefault()
              this.props.form.validateFields((err, values) => {
                if (!err) {
                  // 加密处理
                  console.log(moment().valueOf())
                  let pwd = encryptAes(`${encryptSha256(values.password)},${new Date().getTime()}`)
                  values = {
                    ...values,
                    password: pwd,
                    type: '3',
                    equipmentType: '1'
                  }
                  console.log('form', values)
                  this.setState({ loading: true })
                  this.props.login(values).then(e => {
                    if (e.payload) {
                      this.props.fetchUserInfo().then(event => {
                        if (!event.error) {
                          this.setState({
                            loading: false
                          })
                          this.props.pathJump('/allworks')
                        }
                      })
                    } else {
                      this.setState({
                        loading: false
                      })
                      message.error(e.error.message)
                    }
                  })
                }
                // console.log(values)
              })
            }}
          >
            <h1>{formatMessage({ id: 'adminLoging' })}</h1>
            {/* <Col offset={baseLeft} span={baseRight}>
              <Alert message={formatMessage({ id: 'login_alert' })} type='info' showIcon />
            </Col> */}
            <FormItem label={null} className='login-input' style={{ marginTop: -1 }}>
              {getFieldDecorator('mail', {
                initialValue: 'wenbo.wang@loncus.com', // A_general superMan
                rules: [
                  {
                    required: true,
                    // pattern: /@cn.pwc.com$/,
                    message: formatMessage({ id: 'input_require' }, { name: username })
                  }
                ]
              })(
                <Input
                  // prefix={<Icon type='mail' style={{ fontSize: 13 }} />}
                  placeholder={formatMessage({ id: 'input_placeholder' }, { name: username })}
                />
              )}
            </FormItem>
            <FormItem label={null} className='login-input'>
              {getFieldDecorator('password', {
                initialValue: '123456',
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'input_require' }, { name: password })
                  }
                ]
              })(
                <Input
                  // prefix={<Icon type='lock' style={{ fontSize: 13 }} />}
                  placeholder={formatMessage({ id: 'input_placeholder' }, { name: password })}
                  type='password'
                />
              )}
            </FormItem>
            <Row>
              <Col>
                <Button
                  type='primary'
                  htmlType='submit'
                  style={{ width: '100%', marginTop: '0.45rem' }}
                  size='large'
                  loading={loading}
                >
                  {formatMessage({ id: 'login' })}
                </Button>
              </Col>
              <Col
                style={{
                  marginTop: '0.16rem',
                  fontSize: '0.14rem',
                  fontWeight: 400,
                  textAlign: 'right'
                }}
              >
                <a
                  onClick={() => {
                    this.props.pathJump('resetPwd')
                  }}
                >
                  {formatMessage({ id: 'forgotPassword' })}
                </a>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    )
  }
}

Login.propTypes = {
  form: React.PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  login: React.PropTypes.func,
  fetchVerificationCode: React.PropTypes.func
}

class CheckLogin extends React.Component {
  // componentWillMount(){
  //   let page = '';
  //   //console.log('CheckLogin',this.props)
  //   if(this.props.user && this.props.user.get('status')===fetchState.success){
  //     let _user = this.props.user.toJS();
  //
  //     // _user.roles.map(v=>{
  //     //   switch (v.id){
  //     //     case 'applicant':page = '/my-list/waiting';
  //     //           break;
  //     //     case 'manager':page = '/supervisor/approving';
  //     //           break;
  //     //     default:page = null;
  //     //   }
  //     // })
  //     //
  //     // this.setState({page})
  //     this.props.pathJump(this.props.location.query.next || '/my-list/waiting')
  //   }
  // }
  render () {
    return <Login {...this.props} page={this.props.user.toJS().roles} />
  }
}

export default Form.create()(injectIntl(CheckLogin))
