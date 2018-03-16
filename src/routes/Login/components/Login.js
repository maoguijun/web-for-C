import React, { Component } from 'react'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
// import ImmutablePropTypes from 'react-immutable-proptypes'
import { Icon, Form, Input, Button, Row, Col, Alert, message, notification, Modal } from 'antd'
import LocaleBtn from '../../../containers/global/LocaleBtn'
import { fetchState } from 'config'
import { encryptAes, encryptSha256 } from '../../../utils/common'
import moment from 'moment'
import SimpleForm from '../../../components/antd/SimpleForm'
import UpdateP from './updateP'
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
  componentWillUnmount () {
    clearInterval(this.interval)
    notification.close('Vcode')
  }
  onGetCaptcha = () => {
    // 每次获取验证码之前都要先关掉notification
    notification.close('Vcode')
    this.props.form.validateFields((err, value) => {
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
            message.error(e.error.message)
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
                key: 'Vcode',
                message: '验证码',
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
  updatePwdC = time => {
    let days = moment().diff(time, 'days')
    console.log(days)
    const args = {
      key: 'pwd',
      message: '请修改密码',
      description: `您的密码有效期还剩 ${90 - days} 天，请尽快修改密码！`,
      duration: 60
    }

    if (days > 82 && days < 91) {
      notification.open(args)
      this.props.pathJump('/student')
    } else if (days > 90) {
      this.setState({
        updatePwdModal: true
      })
    } else {
      this.props.pathJump('/student')
    }
  }
  // console.log('page',props)
  updatePwdTo = () => {
    this.formUp.validateFields((err, values) => {
      if (!err) {
        // 加密处理
        values = {
          password: encryptSha256(values.newPassword),
          oldPassword: encryptSha256(values.oldPassword)
        }
        console.log('form', values)
        this.setState({ loading: true })
        this.props.updatePwd(values).then(e => {
          if (e.payload) {
            this.setState({
              updatePwdModal: false,
              loading: false
            })
            this.props.pathJump('/student')
          } else {
            message.error(e.error.message)
            this.setState({
              loading: false
            })
          }
        })
      }
      // console.log(values)
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
                  let pwd = encryptAes(`${encryptSha256(values.password)},${new Date().getTime()}`)
                  values = {
                    ...values,
                    password: pwd,
                    type: '0'
                  }
                  if (!values.verificationCode) {
                    message.error('请输入验证码！')
                    return
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
                          this.updatePwdC(event.payload.lastUpdatePasswordTime)
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
            <Row>
              <Col>
                <Button type='primary' htmlType='submit' style={{ width: '100%' }} size='large' loading={loading}>
                  {formatMessage({ id: 'login_login' })}
                </Button>
              </Col>
              <Col style={{ marginTop: 16, fontSize: 14, fontWeight: 400 }}>
                <span>{'忘记密码了?请点击'}</span>
                <a
                  onClick={() => {
                    this.props.pathJump('resetPassword')
                  }}
                >
                  {'重置密码'}
                </a>
              </Col>
            </Row>
          </Form>
        </Col>
        {/* 更新密码 */}
        <Modal
          visible={updatePwdModal}
          title={null}
          // onOk={this.handleOk}
          width={400}
          // onCancel={this.handleCancel}
          footer={null}
        >
          <Row className='login-wrap'>
            <h1>{formatMessage({ id: 'Project_Title' })}</h1>
            <UpdateP
              props={this.props}
              ref={f => {
                this.formUp = f
              }}
            />
            <Row>
              <Col>
                <Button
                  type='primary'
                  onClick={() => this.updatePwdTo()}
                  style={{ width: '100%' }}
                  size='large'
                  loading={loading}
                >
                  {formatMessage({ id: 'update_password' })}
                </Button>
              </Col>
            </Row>
          </Row>
        </Modal>
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
