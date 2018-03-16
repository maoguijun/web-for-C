/*
 * @Author: Maoguijun
 * @Date: 2018-01-02 15:46:42
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-03-08 14:20:57
 */
import Immutable from 'immutable'
import { easyfetch } from '../../../utils/FetchHelper'
import { host } from '../../../config'

export const FETCH_COURSE = 'FETCH_COURSE'
export const NEW_COURSE = 'NEW_COURSE'
export const OPERATION_COURSE = 'OPERATION_COURSE'
export const ALT_COURSE = 'ALT_COURSE'
export const FETCH_COURSE_INFO = 'FETCH_COURSE_INFO'

export const fetchCourse = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/courses', 'get', json)
      .then(e => {
        return dispatch({
          type: FETCH_COURSE,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const fetchCourseInfo = id => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/courses/' + id, 'get')
      .then(e => {
        return dispatch({
          type: FETCH_COURSE_INFO,
          payload: e.obj
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const newCourse = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/courses', 'post', json)
      .then(e => {
        return dispatch({
          type: NEW_COURSE,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const updateCourse = (id, json) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/courses/' + id, 'put', json)
      .then(e => {
        return dispatch({
          type: ALT_COURSE,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}
export const operateCourse = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/courses/batchUpdate', 'post', json)
      .then(e => {
        return dispatch({
          type: OPERATION_COURSE,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

const ACTION_HANDLERS = {
  [FETCH_COURSE]: (state, action) =>
    state
      .update('course', () => Immutable.fromJS(action.payload.objs))
      .update('count', () => Immutable.fromJS(action.payload.count))
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function courseReducer (state = Immutable.Map(), action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
