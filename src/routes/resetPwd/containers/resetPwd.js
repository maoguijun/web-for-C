import { connect } from 'react-redux'
import { fetchVerificationCode, updatePwd, checkVerificationCode, checkCaptcha } from '../modules/resetPwd'
import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { injectIntl, intlShape } from 'react-intl'
import { fetchState, host } from 'config'
import { pathJump } from '../../../utils/'
import { encryptAes, encryptSha256 } from '../../../utils/common'
import './resetPwd_.scss'
/** */
export class ResetPwd extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      step: 1,
      code: '', // 本地生成的验证码图片
      pwd: '123456',
      email: '',
      setvalue: '',
      value: '',
      Vcode: '', // 邮箱验证码的输入框的值，
      inputCode: '' // 验证码输入框的值
    }
  }
  componentWillMount () {
    // this.createCode()
  }
  /** 先验证图片验证码，再请求邮箱验证码 */
  getEmailCode = () => {
    const { email, inputCode, emailError, inputCodeError, step } = this.state
    const { dispatch } = this.props
    //
    if (!email || !email.length) {
      alert('请输入邮箱')
      return
    }
    if (!inputCode || !inputCode.length) {
      alert('请输入验证码')
      return
    }
    let json = {
      mail: email,
      accountType: '3'
    }
    dispatch(checkCaptcha({ captcha: inputCode })).then(event => {
      if (event.error) {
        alert(event.error.message)
      } else {
        dispatch(fetchVerificationCode(json)).then(e => {
          if (e.error) {
            alert(e.error.message)
          } else {
            this.setState(
              {
                step: step + 1
              },
              () => {
                if (e.payload.code) {
                  setTimeout(() => alert(e.payload.testBody), 50)
                }
              }
            )
          }
        })
      }
    })
  }
  /** 验证 邮箱验证码 */
  checkCode = e => {
    const { dispatch } = this.props
    const { email, Vcode } = this.state
    const step = this.state.step
    // todo
    let json = {
      mail: email,
      accountType: '3',
      verificationCode: Vcode
    }
    dispatch(checkVerificationCode(json)).then(e => {
      if (e.error) {
        alert(e.error.message)
      } else {
        this.setState({
          step: step + 1
        })
      }
    })
  }
  handleInputCode = e => {
    this.setState({
      inputCode: e.target.value
    })
  }
  handleEmail = e => {
    let value = e.target.value
    let error = ''
    if (
      !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        value
      )
    ) {
      error = '请输入正确的Email'
    }
    this.setState({
      email: value,
      emailError: error
    })
  }
  handlePwd = event => {
    const setvalue = this.state.setvalue
    this.setState({
      setvalue: event.target.value
    })
  }
  handlePwdtwo = event => {
    const value = this.state.value
    this.setState({
      value: event.target.value
    })
  }
  submit = () => {
    const { pathJump, dispatch } = this.props
    const { setvalue, value, email, Vcode } = this.state
    if (setvalue === '' && value === '') {
      alert('请将密码填写完整')
      return
    }
    if (setvalue === value) {
      let json = {
        verificationCode: Vcode,
        mail: email,
        accountType: '3',
        password: encryptSha256(value)
      }
      console.log(json)
      dispatch(updatePwd(json)).then(e => {
        if (e.error) {
          alert(e.error.message)
        } else {
          this.setState({
            setvalue: '',
            value: ''
          })
          alert('密码设置成功!')
          browserHistory.push('/login')
        }
      })
    } else {
      alert('您输入的密码不匹配!')
    }
  }
  deteleemail = () => {
    let email = this.refs.email.value
    this.setState({
      email: ''
    })
  }
  clearInput = name => {
    this.setState({
      [name]: ''
    })
  }
  createCode = () => {
    // 修改 验证码的版本
    this.setState({
      code: new Date().getTime()
    })
  }
  render () {
    const { pathJump } = this.props
    const { step, code, email, inputCode } = this.state
    return (
      <div className='edit'>
        <div className='prop-login'>
          <div className='login-top clearfix'>
            <a className='logo1'>
              <img src='./2.png' />
            </a>
            <div className='img-logo'>
              <a>
                <img src='./logo.png' width='100%' height='' />
              </a>
              <span className='learn'>Online Learning</span>
            </div>
            <div className='fr login-res'>
              <a>登录</a>
              <a>|</a>
              <a className='gray bold'>注册</a>
            </div>
          </div>
          <div className='login-pop'>
            <ul>
              <li className={step > 0 ? 'on' : ''}>
                <span className='num'>
                  <em>1</em>
                  <i className='round1' />
                </span>
                <span className='line lbg-r' />
                <p className='lbg-txt'>确认账号</p>
              </li>
              <li className={step > 1 ? 'on' : ''}>
                <span className='num'>
                  <em>2</em>
                  <i className='round2' />
                  <i className='round3' />
                </span>
                <span className='line lbg-l' />
                <span className='line lbg-r' />
                <p className='lbg-txt'>安全验证</p>
              </li>
              <li className={step > 2 ? 'on' : ''}>
                <span className='num'>
                  <em>3</em>
                  <i className='round4' />
                </span>
                <span className='line lbg-l' />
                <p className='lbg-txt'>重置密码</p>
              </li>
            </ul>
            <form className='login-form' style={{ display: step === 1 ? 'block' : 'none' }}>
              <div>
                <span>邮箱</span>
                <label className='iconfont' onClick={() => this.clearInput('email')}>
                  &#xe66e;
                </label>
                <input
                  type='text'
                  placeholder='请输入您的邮箱'
                  id='email'
                  value={this.state.email}
                  ref='email'
                  onChange={this.handleEmail}
                />
                <small style={{ color: '#e0301e', marginLeft: '2%' }}>{this.state.emailError}</small>
              </div>
              <div style={{ marginTop: 13 }}>
                <span>验证码</span>
                <div className='yanzheng'>
                  <input
                    type='text'
                    placeholder='输入验证码'
                    value={inputCode}
                    id='inputCode'
                    onChange={this.handleInputCode}
                  />
                  <i className={'code'} id='checkCode'>
                    <img src={`${host}/captcha?v=${code}`} width='100%' height='100%' />
                  </i>
                </div>
                <a onClick={this.createCode} style={{ marginLeft: '2%' }}>
                  {' '}
                  换一张
                </a>
              </div>
              <input type='button' value='确认并发送验证码' id='comfir' onClick={() => this.getEmailCode()} />
            </form>
            <form className='login-form2' style={{ display: step === 2 ? 'block' : 'none' }}>
              <table>
                <tbody>
                  <tr className='yx'>
                    <td />
                    <td>
                      邮箱: <span>{email}</span>
                    </td>
                  </tr>
                  <tr>
                    <td className='yxyz'>邮箱验证码</td>
                    <td className='size34'>
                      <label className='iconfont'>&#xe66e;</label>
                      <input
                        type='text'
                        placeholder='输入邮箱验证码'
                        id='email2'
                        ref='pwd'
                        value={this.state.Vcode}
                        onChange={e => this.setState({ Vcode: e.target.value })}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td className='size34'>
                      <input type='button' value='下一步' id='comfir1' onClick={this.checkCode} />
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td className='yz'>
                      <a
                        onClick={() => {
                          let r = window.confirm('再次发送验证码？')
                          if (r) {
                            const { dispatch } = this.props
                            const { email } = this.state
                            let json = {
                              mail: email,
                              accountType: '3'
                            }
                            dispatch(fetchVerificationCode(json)).then(e => {
                              if (e.error) {
                                alert(e.error.message)
                              } else {
                                alert(e.payload.testBody)
                              }
                            })
                          }
                        }}
                      >
                        验证码未收到?
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>

            <form className='login-form3' style={{ display: step === 3 ? 'block' : 'none' }}>
              <table>
                <tbody>
                  <tr>
                    <td className='mm'>新密码</td>
                    <td>
                      <label className='iconfont x1' onClick={() => this.clearInput('setvalue')}>
                        &#xe66e;
                      </label>
                      <input
                        type='password'
                        placeholder='输入新密码'
                        ref='pwd'
                        value={this.state.setvalue}
                        onChange={this.handlePwd}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className='mm'>确认密码</td>
                    <td>
                      <label className='iconfont x2' onClick={() => this.clearInput('value')}>
                        &#xe66e;
                      </label>
                      <input
                        type='password'
                        placeholder='确认新密码'
                        ref='newpwd'
                        value={this.state.value}
                        onChange={this.handlePwdtwo}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td />
                    <td>
                      <input type='button' value='完 成' id='comfir2' onClick={() => this.submit()} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

ResetPwd.propTypes = {
  pathJump: React.PropTypes.func
}
const mapStateToProps = state => ({
  user: state.get('user')
})

export default connect(mapStateToProps)(ResetPwd)
