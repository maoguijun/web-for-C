/*
 * @Author: Maoguijun
 * @Date: 2018-01-02 15:46:42
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-03-08 14:05:47
 */
import Immutable from 'immutable'
import { easyfetch } from '../../../../utils/FetchHelper'
import { host } from '../../../../config'

export const FETCH_STUDENT = 'FETCH_STUDENT'
export const NEW_STUDENT = 'NEW_STUDENT'
export const OPERATION_STUDENT = 'OPERATION_STUDENT'
export const ALT_STUDENT = 'ALT_STUDENT'
export const FETCH_STUDENT_INFO = 'FETCH_STUDENT_INFO'

export const fetchStudent = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/students', 'get', json)
      .then(e => {
        return dispatch({
          type: FETCH_STUDENT,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const fetchStudentInfo = id => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/students/' + id, 'get')
      .then(e => {
        return dispatch({
          type: FETCH_STUDENT_INFO,
          payload: e.obj
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const newStudent = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/students', 'post', json)
      .then(e => {
        return dispatch({
          type: NEW_STUDENT,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const altStudent = (action, id, json) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/students/' + action + '/' + id, 'put', json)
      .then(e => {
        return dispatch({
          type: ALT_STUDENT,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}
export const operateStudent = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/account/batchUpdate/', 'post', json)
      .then(e => {
        return dispatch({
          type: OPERATION_STUDENT,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

const ACTION_HANDLERS = {
  [FETCH_STUDENT]: (state, action) =>
    state
      .update('student', () => Immutable.fromJS(action.payload.objs))
      .update('count', () => Immutable.fromJS(action.payload.count)),
  [FETCH_STUDENT_INFO]: (state, action) => state.update('studentInfo', () => Immutable.fromJS(action.payload))
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function studentReducer (state = Immutable.Map(), action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
