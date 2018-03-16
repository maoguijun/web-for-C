/*
 * @Author: Maoguijun
 * @Date: 2018-01-02 15:46:42
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-01-29 12:17:38
 */
import Immutable from 'immutable'
import { easyfetch } from '../../../utils/FetchHelper'
import { host } from '../../../config'

export const FETCH_COMPANY = 'FETCH_COMPANY'
export const NEW_COMPANY = 'NEW_COMPANY'
export const OPERATION_COMPANY = 'OPERATION_COMPANY'
export const ALT_COMPANY = 'ALT_COMPANY'
export const FETCH_COMPANY_INFO = 'FETCH_COMPANY_INFO'

export const fetchCompany = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/companys', 'get', json)
      .then(e => {
        return dispatch({
          type: FETCH_COMPANY,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const fetchCompanyInfo = id => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/companys/' + id, 'get')
      .then(e => {
        return dispatch({
          type: FETCH_COMPANY_INFO,
          payload: e.obj
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const newCompany = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/companys', 'post', json)
      .then(e => {
        return dispatch(fetchCompany())
      })
      .catch(e => ({ error: e }))
  }
}

export const updateCompany = (action, id, json) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/companys/' + action + '/' + id, 'put', json)
      .then(e => {
        return dispatch(fetchCompany())
      })
      .catch(e => ({ error: e }))
  }
}
export const operateCompany = (action, id, json) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/companys/' + action + '/' + id, 'put', json)
      .then(e => {
        return dispatch(fetchCompany())
      })
      .catch(e => ({ error: e }))
  }
}

const ACTION_HANDLERS = {
  [FETCH_COMPANY]: (state, action) =>
    state
      .update('company', () => Immutable.fromJS(action.payload.objs))
      .update('count', () => Immutable.fromJS(action.payload.count))
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function companyReducer (state = Immutable.Map(), action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
