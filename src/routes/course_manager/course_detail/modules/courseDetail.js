/*
 * @Author: Maoguijun
 * @Date: 2018-01-02 15:46:42
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-03-07 19:03:43
 */
import Immutable from 'immutable'
import { easyfetch } from '../../../../utils/FetchHelper'
import { host } from '../../../../config'

export const FETCH_COURSE = 'FETCH_COURSE'
export const NEW_COURSE = 'NEW_COURSE'
export const OPERATION_COURSE = 'OPERATION_COURSE'
export const UPDATE_COURSE = 'UPDATE_COURSE'
export const FETCH_COURSE_INFO = 'FETCH_COURSE_INFO'
export const FETCH_UPLOADAUTH = 'FETCH_UPLOADAUTH'
export const UPDATE_UPLOADAUTH = 'UPDATE_UPLOADAUTH'

export const NEW_CHAPTER = 'NEW_CHAPTER'
export const UPDATE_CHAPTER = 'UPDATE_CHAPTER'
export const FETCH_CHAPTER = 'FETCH_CHAPTER'
export const FETCH_CHAPTER_INFO = 'FETCH_CHAPTER_INFO'

export const NEW_PARAGRAPHS = 'NEW_PARAGRAPHS'
export const UPDATE_PARAGRAPHS = 'UPDATE_PARAGRAPHS'
export const FETCH_PARAGRAPHS = 'FETCH_PARAGRAPHS'
export const FETCH_PARAGRAPHS_INFO = 'FETCH_PARAGRAPHS_INFO'
export const DELETE_PARAGRAPHS = 'DELETE_PARAGRAPHS'

export const NEW_COURSEPERMISSIONS = 'NEW_COURSEPERMISSIONS'
export const DELETE_COURSEPERMISSIONS = 'DELETE_COURSEPERMISSIONS'

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
        return dispatch(fetchCourse())
      })
      .catch(e => ({ error: e }))
  }
}

export const updateCourse = (id, json) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/courses/' + id, 'put', json)
      .then(e => {
        return dispatch(fetchCourse())
      })
      .catch(e => ({ error: e }))
  }
}
export const operateCourse = (id, json) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/courses/batchUpdate/', 'post', json)
      .then(e => {
        return {
          type: OPERATION_COURSE,
          payload: e
        }
      })
      .catch(e => ({ error: e }))
  }
}
export const fetchUploadAuth = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/common/getUploadAuth', 'get', json)
      .then(e => {
        return dispatch({
          type: FETCH_UPLOADAUTH,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}
export const updateUploadAuth = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/common/refreshUploadAuth/', 'post', json)
      .then(e => {
        return dispatch({
          type: UPDATE_UPLOADAUTH,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}
export const fetchChapter = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/chapters', 'get', json)
      .then(e => {
        return dispatch({
          type: FETCH_CHAPTER,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const fetchChapterInfo = id => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/chapters/' + id, 'get')
      .then(e => {
        return dispatch({
          type: FETCH_CHAPTER_INFO,
          payload: e.obj
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const newChapter = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/chapters', 'post', json)
      .then(e => {
        return dispatch({
          type: NEW_CHAPTER,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const updateChapter = (id, json) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/chapters/' + id, 'put', json)
      .then(e => {
        return dispatch({
          type: UPDATE_CHAPTER,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const fetchParagraphs = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/paragraphs', 'get', json)
      .then(e => {
        return dispatch({
          type: FETCH_PARAGRAPHS,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const fetchParagraphsInfo = id => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/paragraphs/' + id, 'get')
      .then(e => {
        return dispatch({
          type: FETCH_PARAGRAPHS_INFO,
          payload: e.obj
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const newParagraphs = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/paragraphs', 'post', json)
      .then(e => {
        return dispatch({
          type: NEW_PARAGRAPHS,
          payload: e.obj
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const updateParagraphs = (id, json) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/paragraphs/' + id, 'put', json)
      .then(e => {
        return dispatch({
          type: UPDATE_PARAGRAPHS,
          payload: e.obj
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const deleteParagraphs = id => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/paragraphs/' + id, 'delete')
      .then(e => {
        return dispatch({
          type: DELETE_PARAGRAPHS,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}
// 视频权限
export const newCoursePermissions = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/coursePermissions', 'post', json)
      .then(e => {
        return dispatch({
          type: NEW_COURSEPERMISSIONS,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}
export const deleteCoursePermissions = id => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/coursePermissions/' + id, 'delete')
      .then(e => {
        return dispatch({
          type: DELETE_COURSEPERMISSIONS,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

const ACTION_HANDLERS = {
  [FETCH_COURSE_INFO]: (state, action) => state.update('course', () => Immutable.fromJS(action.payload)),
  [FETCH_CHAPTER_INFO]: (state, action) => state.update('chapterInfo', () => Immutable.fromJS(action.payload)),
  [FETCH_CHAPTER]: (state, action) =>
    state
      .update('chapter', () => Immutable.fromJS(action.payload.objs))
      .update('chapterCount', () => Immutable.fromJS(action.payload.objs))
}

// ------------------------------------
// Reducer
// ------------------------------------
export default function courseReducer (state = Immutable.Map(), action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
