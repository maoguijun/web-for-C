import { connect } from 'react-redux'
import { login, fetchVerificationCode, fetchUserInfo, updatePwd } from '../modules/login'
import { pathJump } from '../../../utils/'

import Login from '../components/Login'

const mapDispatchToProps = {
  login,
  pathJump,
  fetchVerificationCode,
  fetchUserInfo
}

const mapStateToProps = state => ({
  user: state.get('user')
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
