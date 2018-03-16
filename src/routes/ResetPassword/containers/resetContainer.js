import { connect } from 'react-redux'
import { resetPwd } from '../modules/resetPassword'
import { fetchVerificationCode } from '../../Login/modules/login'
import { pathJump } from '../../../utils/'
import ResetPWD from '../components/resetPassword'

const mapDispatchToProps = {
  resetPwd,
  fetchVerificationCode,
  pathJump
}

const mapStateToProps = state => ({
  user: state.get('user')
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPWD)
