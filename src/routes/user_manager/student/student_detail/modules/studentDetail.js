/*
 * @Author: Maoguijun
 * @Date: 2018-01-02 15:46:42
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-02-23 14:55:16
 */
import Immutable from 'immutable'
import { easyfetch } from '../../../../../utils/FetchHelper'
import { host } from '../../../../../config'

export const FETCH_STUDENT = 'FETCH_STUDENT'
export const NEW_STUDENT = 'NEW_STUDENT'
export const OPERATION_STUDENT = 'OPERATION_STUDENT'
export const ALT_STUDENT = 'ALT_STUDENT'
export const DELETE_STUDENT = 'DELETE_STUDENT'
export const FETCH_STUDENT_INFO = 'FETCH_STUDENT_INFO'
export const FETCH_STUDENTCOURSEPERMISSION = 'FETCH_STUDENTCOURSEPERMISSION'

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
export const fetchStudCoursePermissions = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/studCoursePermissions', 'get', json)
      .then(e => {
        return dispatch({
          type: FETCH_STUDENTCOURSEPERMISSION,
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

export const deleteStudent = id => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/students/' + id, 'delete')
      .then(e => {
        return dispatch({
          type: DELETE_STUDENT,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const updateStudent = (id, json) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/students/' + id, 'put', json)
      .then(e => {
        return dispatch(fetchStudent())
      })
      .catch(e => ({ error: e }))
  }
}
export const operateStudent = (id, json) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/account/batchUpdate/', 'post', json)
      .then(e => {
        return dispatch(fetchStudentInfo(id))
      })
      .catch(e => ({ error: e }))
  }
}
export const updateStudentPwd = id => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/students/resetPassword/' + id, 'put')
      .then(e => {
        return dispatch(fetchStudentInfo(id))
      })
      .catch(e => ({ error: e }))
  }
}

const ACTION_HANDLERS = {
  [FETCH_STUDENT]: (state, action) =>
    state
      .update('student', () => Immutable.fromJS(action.payload.objs))
      .update('count', () => Immutable.fromJS(action.payload.count)),
  [FETCH_STUDENTCOURSEPERMISSION]: (state, action) =>
    state
      .update('course', () => Immutable.fromJS(action.payload.objs))
      .update('count', () => Immutable.fromJS(action.payload.count)),
  [FETCH_STUDENT_INFO]: (state, action) => state.update('studentInfo', () => Immutable.fromJS(action.payload))
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function studentDetailReducer (state = Immutable.Map(), action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
