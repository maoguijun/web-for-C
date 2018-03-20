import Immutable from 'immutable'
import { easyFetchWithCache, easyfetch } from '../../../utils/FetchHelper'
import { host } from '../../../config'
export const FETCH_VERIFICATIONCODE = 'FETCH_VERIFICATIONCODE'
export const UPDATEPWD = 'UPDATEPWD'
export const CHECK_VERIFICATIONCODE = 'CHECK_VERIFICATIONCODE'
export const FETCH_CAPTCHA = 'FETCH_CAPTCHA'
export const CHECK_CAPTCHA = 'CHECK_CAPTCHA'
// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------

/** 验证图片验证码 */
export const checkCaptcha = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/checkCaptcha/', 'post', json)
      .then(e => {
        return dispatch({
          type: CHECK_CAPTCHA,
          payload: e
        })
      })
      .catch(error => ({ error: error }))
  }
}
export const fetchVerificationCode = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/commons/sendEmailVerificationCode/', 'post', json)
      .then(e => {
        return dispatch({
          type: FETCH_VERIFICATIONCODE,
          payload: e.obj
        })
      })
      .catch(error => ({ error: error }))
  }
}
export const checkVerificationCode = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/commons/checkVerificationCode/', 'post', json)
      .then(e => {
        return dispatch({
          type: CHECK_VERIFICATIONCODE,
          payload: e.obj
        })
      })
      .catch(error => ({ error: error }))
  }
}
export const updatePwd = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/account/forgetPassword/', 'put', json)
      .then(e => {
        return dispatch({
          type: UPDATEPWD,
          payload: e.obj
        })
      })
      .catch(error => ({ error: error }))
  }
}

const ACTION_HANDLERS = {}

// ------------------------------------
// Reducer
// ------------------------------------
export default function userInfoReducer (state = Immutable.Map(), action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
