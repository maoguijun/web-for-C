/*
 * @Author: Maoguijun
 * @Date: 2018-01-02 15:46:42
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-03-08 14:12:24
 */
import Immutable from 'immutable'
import { easyfetch } from '../../../../utils/FetchHelper'
import { host } from '../../../../config'

export const FETCH_TEACHER = 'FETCH_TEACHER'
export const NEW_TEACHER = 'NEW_TEACHER'
export const OPERATION_TEACHER = 'OPERATION_TEACHER'
export const ALT_TEACHER = 'ALT_TEACHER'
export const FETCH_TEACHER_INFO = 'FETCH_TEACHER_INFO'

export const fetchTeacher = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/teachers', 'get', json)
      .then(e => {
        return dispatch({
          type: FETCH_TEACHER,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const fetchTeacherInfo = id => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/teachers/' + id, 'get')
      .then(e => {
        return dispatch({
          type: FETCH_TEACHER_INFO,
          payload: e.obj
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const newTeacher = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/teachers', 'post', json)
      .then(e => {
        return dispatch({
          type: NEW_TEACHER,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const updateTeacher = (action, id, json) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/teachers/' + action + '/' + id, 'put', json)
      .then(e => {
        return dispatch({
          type: ALT_TEACHER,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}
export const operateTeacher = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/account/batchUpdate/', 'post', json)
      .then(e => {
        return dispatch({
          type: OPERATION_TEACHER,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

const ACTION_HANDLERS = {
  [FETCH_TEACHER]: (state, action) =>
    state
      .update('teacher', () => Immutable.fromJS(action.payload.objs))
      .update('count', () => Immutable.fromJS(action.payload.count))
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function teacherReducer (state = Immutable.Map(), action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
