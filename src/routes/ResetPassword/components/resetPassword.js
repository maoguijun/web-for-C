import React, { Component } from 'react'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
// import ImmutablePropTypes from 'react-immutable-proptypes'
import { Icon, Form, Input, Button, Row, Col, Alert, message, notification, Modal } from 'antd'
import LocaleBtn from '../../../containers/global/LocaleBtn'
import { fetchState } from 'config'
import { encryptAes, encryptSha256 } from '../../../utils/common'
import moment from 'moment'
const FormItem = Form.Item
import './resetPassword_.scss'
import logo1 from '../../../../public/logos/logo1.png'

export class ResetPWD extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      count: 0,
      updatePwdModal: false
    }
  }
  componentWillUnmount () {
    clearInterval(this.interval)
    notification.close('resetcode')
  }
  onGetCaptcha = () => {
    // 每次获取验证码都要先关上之前的notification
    notification.close('restcode')
    this.props.form.validateFields(['mail'], (err, value) => {
      if (err) {
        console.log(err)
        return
      } else {
        let json = {
          accountType: 0,
          ...value
        }
        this.props.fetchVerificationCode(json).then(e => {
          if (e.error) {
            message.error(e.error.message, 1)
          } else {
            let count = 59
            this.setState({ count })
            this.interval = setInterval(() => {
              count -= 1
              this.setState({ count })
              if (count === 0) {
                clearInterval(this.interval)
              }
            }, 1000)
            if (e.payload && e.payload.code) {
              const args = {
                key: 'resetcode',
                message: '您正在重置密码',
                description: `您的验证码是：${e.payload.code}`,
                duration: 300
              }
              notification.open(args)
            }
          }
        })
      }
    })
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
                  let pwd = encryptSha256(values.password)
                  values = {
                    ...values,
                    password: pwd,
                    accountType: '0'
                  }
                  if (!values.verificationCode) {
                    message.error('请输入验证码！', 1)
                    return
                  }
                  console.log('form', values)
                  this.setState({ loading: true })
                  this.props.resetPwd(values).then(e => {
                    if (e.payload) {
                      message.success('密码重置成功', 1)
                      this.props.pathJump('/login')
                    } else {
                      this.setState({
                        loading: false
                      })
                      message.error(e.error.message, 1)
                    }
                  })
                }
              })
            }}
          >
            <h1>{formatMessage({ id: 'update_password' })}</h1>
            {/* <Col offset={baseLeft} span={baseRight}>
              <Alert message={formatMessage({ id: 'login_alert' })} type='info' showIcon />
            </Col> */}
            <FormItem label={null}>
              {getFieldDecorator('mail', {
                // initialValue: 'superadmin@cn.pwc.com', // A_general superMan
                rules: [
                  {
                    required: true,
                    pattern: /@cn.pwc.com$/,
                    message: formatMessage({ id: 'input_require' }, { name: username })
                  }
                ]
              })(
                <Input
                  prefix={<Icon type='mail' style={{ fontSize: 13 }} />}
                  placeholder={formatMessage({ id: 'input_placeholder' }, { name: username })}
                />
              )}
            </FormItem>
            <FormItem>
              <Row gutter={8}>
                <Col span={15}>
                  {getFieldDecorator('verificationCode', {
                    rules: [
                      {
                        required: false,
                        message: '请输入验证码！'
                      }
                    ]
                  })(<Input prefix={<Icon type='mail' />} placeholder='验证码' />)}
                </Col>
                <Col span={8}>
                  <Button disabled={count} style={{ width: 102 }} onClick={() => this.onGetCaptcha()}>
                    {count ? `${count} s` : '获取验证码'}
                  </Button>
                </Col>
              </Row>
            </FormItem>
            <FormItem label={null}>
              {getFieldDecorator('password', {
                // initialValue: '123456',
                rules: [{ required: true, message: formatMessage({ id: 'input_require' }, { name: password }) }]
              })(
                <Input
                  prefix={<Icon type='lock' style={{ fontSize: 13 }} />}
                  placeholder={formatMessage({ id: 'input_placeholder' }, { name: password })}
                  type='password'
                />
              )}
            </FormItem>
            <FormItem label={null}>
              {getFieldDecorator('Lpassword', {
                // initialValue: '123456',
                rules: [
                  {
                    required: true,
                    message: '请输入与上面相同的密码',
                    validator: (relu, value, cb) => {
                      console.log(value)
                      this.props.form.validateFields(['password'], (err, v) => {
                        if (err) {
                          cb(false)
                        } else {
                          console.log(value, v.password)
                          if (value !== v.password) {
                            cb(false)
                          } else {
                            cb()
                          }
                        }
                      })
                    }
                  }
                ]
              })(
                <Input
                  prefix={<Icon type='lock' style={{ fontSize: 13 }} />}
                  placeholder={formatMessage({ id: 'input_placeholder' }, { name: password })}
                  type='password'
                />
              )}
            </FormItem>
            <Row>
              <Col>
                <Button type='primary' htmlType='submit' style={{ width: '100%' }} size='large' loading={loading}>
                  {formatMessage({ id: 'updatePWD' })}
                </Button>
              </Col>
              <Col style={{ marginTop: 16, fontSize: 14, fontWeight: 400 }}>
                <span>{'前往'}</span>
                <a
                  onClick={() => {
                    this.props.pathJump('Login')
                  }}
                >
                  {'登录'}
                </a>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    )
  }
}

ResetPWD.propTypes = {
  form: React.PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  login: React.PropTypes.func,
  fetchVerificationCode: React.PropTypes.func
}

class CheckResetPWD extends React.Component {
  // componentWillMount(){
  //   let page = '';
  //   //console.log('CheckResetPWD',this.props)
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
    return <ResetPWD {...this.props} page={this.props.user.toJS().roles} />
  }
}

export default Form.create()(injectIntl(CheckResetPWD))
