/*
 * @Author: Maoguijun
 * @Date: 2018-01-02 15:46:42
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-01-29 12:19:05
 */
import Immutable from 'immutable'
import { easyfetch } from '../../../utils/FetchHelper'
import { host } from '../../../config'

export const FETCH_QUESTION = 'FETCH_QUESTION'
export const NEW_QUESTION = 'NEW_QUESTION'
export const OPERATION_QUESTION = 'OPERATION_QUESTION'
export const ALT_QUESTION = 'ALT_QUESTION'
export const FETCH_QUESTION_INFO = 'FETCH_QUESTION_INFO'

export const fetchQuestion = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/questionReplys', 'get', json)
      .then(e => {
        return dispatch({
          type: FETCH_QUESTION,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const fetchQuestionInfo = id => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/questionReplys/' + id, 'get')
      .then(e => {
        return dispatch({
          type: FETCH_QUESTION_INFO,
          payload: e.obj
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const newQuestion = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/questionReplys', 'post', json)
      .then(e => {
        return dispatch(fetchQuestion())
      })
      .catch(e => ({ error: e }))
  }
}

export const updateQuestion = (id, json) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/questionReplys/' + '/' + id, 'put', json)
      .then(e => {
        return dispatch(fetchQuestion())
      })
      .catch(e => ({ error: e }))
  }
}
export const operateQuestion = (id, json) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/questionReplys/' + id, 'put', json)
      .then(e => {
        return dispatch(fetchQuestion())
      })
      .catch(e => ({ error: e }))
  }
}

const ACTION_HANDLERS = {
  [FETCH_QUESTION]: (state, action) =>
    state
      .update('question', () => Immutable.fromJS(action.payload.objs))
      .update('count', () => Immutable.fromJS(action.payload.count))
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function QuestionReducer (state = Immutable.Map(), action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}