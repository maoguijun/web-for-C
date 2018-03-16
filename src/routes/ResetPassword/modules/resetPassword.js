import Immutable from 'immutable'
import { easyFetchWithCache, easyfetch } from '../../../utils/FetchHelper'
import { host } from '../../../config'
export const RESETPWD = 'RESETPWD'
// ------------------------------------
// Constants
// ------------------------------------

// ------------------------------------
// Actions
// ------------------------------------

export const resetPwd = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/account/forgetPassword/', 'put', json)
      .then(e => {
        return dispatch({
          type: RESETPWD,
          payload: e
        })
      })
      .catch(error => ({ error: error }))
  }
}

const ACTION_HANDLERS = {}

// ------------------------------------
// Reducer
// ------------------------------------
export default function resetReducer (state = Immutable.Map(), action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
