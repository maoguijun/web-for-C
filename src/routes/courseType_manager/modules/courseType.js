/*
 * @Author: Maoguijun
 * @Date: 2018-01-02 15:46:42
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-03-08 14:37:41
 */
import Immutable from 'immutable'
import { easyfetch } from '../../../utils/FetchHelper'
import { host } from '../../../config'

export const FETCH_COURSETYPE = 'FETCH_COURSETYPE'
export const NEW_COURSETYPE = 'NEW_COURSETYPE'
export const OPERATION_COURSETYPE = 'OPERATION_COURSETYPE'
export const ALT_COURSETYPE = 'ALT_COURSETYPE'
export const FETCH_COURSETYPE_INFO = 'FETCH_COURSETYPE_INFO'

export const fetchCourseType = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/categorys', 'get', json)
      .then(e => {
        return dispatch({
          type: FETCH_COURSETYPE,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const fetchCourseTypeInfo = id => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/categorys/' + id, 'get')
      .then(e => {
        return dispatch({
          type: FETCH_COURSETYPE_INFO,
          payload: e.obj
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const newCourseType = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/categorys', 'post', json)
      .then(e => {
        return dispatch({
          type: NEW_COURSETYPE,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const updateCourseType = (id, json) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/categorys/' + '/' + id, 'put', json)
      .then(e => {
        return dispatch({
          type: ALT_COURSETYPE,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}
export const operateCourseType = (action, id, json) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/courseTypes/' + action + '/' + id, 'put', json)
      .then(e => {
        return dispatch({
          type: OPERATION_COURSETYPE,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

const ACTION_HANDLERS = {
  [FETCH_COURSETYPE]: (state, action) =>
    state
      .update('courseType', () => Immutable.fromJS(action.payload.objs))
      .update('count', () => Immutable.fromJS(action.payload.count))
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function courseTypeReducer (state = Immutable.Map(), action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
