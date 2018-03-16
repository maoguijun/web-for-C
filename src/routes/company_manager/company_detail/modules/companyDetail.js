/*
 * @Author: Maoguijun
 * @Date: 2018-01-02 15:46:42
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-01-31 18:36:17
 */
import Immutable from 'immutable'
import { easyfetch } from '../../../../utils/FetchHelper'
import { host } from '../../../../config'
import { OPERATION_STUDENT } from '../../../user_manager/student/modules/student'

export const FETCH_COMPANY = 'FETCH_COMPANY'
export const NEW_COMPANY = 'NEW_COMPANY'
export const OPERATION_COMPANY = 'OPERATION_COMPANY'
export const UPDATE_COMPANY = 'UPDATE_COMPANY'
export const FETCH_COMPANY_INFO = 'FETCH_COMPANY_INFO'
export const FETCH_UPLOADAUTH = 'FETCH_UPLOADAUTH'
export const UPDATE_UPLOADAUTH = 'UPDATE_UPLOADAUTH'

export const FETCH_COURSEOUTCOMPANY = 'FETCH_COURSEOUTCOMPANY'
export const FETCH_COURSEINCOMPANY = 'FETCH_COURSEINCOMPANY'

export const NEW_COMPANYSTUDENT = 'NEW_COMPANYSTUDENT'
export const UPDATE_STUDENT = 'UPDATE_STUDENT'
export const DELETE_STUDENT = 'DELETE_STUDENT'
export const FETCH_STUDENT = 'FETCH_STUDENT'
export const CHECK_STUDENT = 'CHECK_STUDENT'
export const FETCH_STUDENT_INFO = 'FETCH_STUDENT_INFO'

export const NEW_GROUPS = 'NEW_GROUPS'
export const UPDATE_GROUPS = 'UPDATE_GROUPS'
export const FETCH_GROUPS = 'FETCH_GROUPS'
export const FETCH_GROUPS_INFO = 'FETCH_GROUPS_INFO'
export const DELETE_GROUPS = 'DELETE_GROUPS'

export const FETCH_GROUPCOURSE = 'FETCH_GROUPCOURSE'
export const NEW_GROUPCOURSE = 'NEW_GROUPCOURSE'
export const DELETE_GROUPCOURSE = 'DELETE_GROUPCOURSE'

export const FETCH_GROUPSTUDENT = 'FETCH_GROUPSTUDENT'
export const NEW_GROUPSTUDENT = 'NEW_GROUPSTUDENT'
export const DELETE_GROUPSTUDENT = 'DELETE_GROUPSTUDENT'

export const NEW_COMPANYPERMISSIONS = 'NEW_COMPANYPERMISSIONS'
export const DELETE_COMPANYPERMISSIONS = 'DELETE_COMPANYPERMISSIONS'
export const UPDATE_COURSEINCOMPANY = 'UPDATE_COURSEINCOMPANY'
export const NEW_COURSEINCOMPANY = 'NEW_COURSEINCOMPANY'
export const DELETE_COURSEINCOMPANY = 'DELETE_COURSEINCOMPANY'

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

export const updateCompany = (id, json) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/companys/' + id, 'put', json)
      .then(e => {
        return dispatch(fetchCompany())
      })
      .catch(e => ({ error: e }))
  }
}
export const deleteCompany = (id, json) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/companys/' + id, 'delete', json)
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
// 上传凭证
export const fetchUploadAuth = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/common/getPlayAuth', 'get', json)
      .then(e => {
        return dispatch({
          type: FETCH_UPLOADAUTH,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}
export const updateUploadAuth = (id, json) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/common/refreshUploadAuth' + id, 'put', json)
      .then(e => {
        return dispatch({
          type: UPDATE_UPLOADAUTH,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}
// fetch 筛选之后的课程权限(当前公司没有的课程)
export const fetchCourseOutCompany = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/coursePermissions', 'get', json)
      .then(e => {
        return dispatch({
          type: FETCH_COURSEOUTCOMPANY,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}
// fetch 筛选之后的课程权限(当前公司有的课程)
export const fetchCourseInCompany = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/compCoursePermissions', 'get', json)
      .then(e => {
        return dispatch({
          type: FETCH_COURSEINCOMPANY,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}
export const updateCourseInCompany = (id, json) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/compCoursePermissions/' + id, 'put', json)
      .then(e => {
        return dispatch({
          type: UPDATE_COURSEINCOMPANY,
          payload: e.obj
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const newCourseInCompany = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/compCoursePermissions', 'post', json)
      .then(e => {
        return dispatch({
          type: NEW_COURSEINCOMPANY,
          payload: e.obj
        })
      })
      .catch(e => ({ error: e }))
  }
}
export const deleteCourseInCompany = id => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/compCoursePermissions/' + id, 'delete')
      .then(e => {
        return dispatch({
          type: DELETE_COURSEINCOMPANY,
          payload: e.obj
        })
      })
      .catch(e => ({ error: e }))
  }
}

//
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
    return easyfetch(host, '/a/companyStudents', 'post', json)
      .then(e => {
        return dispatch({
          type: NEW_COMPANYSTUDENT,
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
        return dispatch({
          type: UPDATE_STUDENT,
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
        return {
          type: OPERATION_STUDENT,
          payload: e.obj
        }
      })
      .catch(e => ({ error: e }))
  }
}
export const checkStudent = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/companyStudents/checkStudentInfo/', 'post', json)
      .then(e => {
        return {
          type: CHECK_STUDENT,
          payload: e
        }
      })
      .catch(e => ({ error: e }))
  }
}
export const deleteStudent = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/companyStudents/removeStudent/', 'post', json)
      .then(e => {
        return {
          type: DELETE_STUDENT,
          payload: e
        }
      })
      .catch(e => ({ error: e }))
  }
}

export const fetchGroup = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/groups', 'get', json)
      .then(e => {
        return dispatch({
          type: FETCH_GROUPS,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const fetchGroupInfo = id => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/groups/' + id, 'get')
      .then(e => {
        return dispatch({
          type: FETCH_GROUPS_INFO,
          payload: e.obj
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const newGroup = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/groups', 'post', json)
      .then(e => {
        return dispatch({
          type: NEW_GROUPS,
          payload: e.obj
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const updateGroup = (id, json) => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/groups/' + id, 'put', json)
      .then(e => {
        return dispatch({
          type: UPDATE_GROUPS,
          payload: e.obj
        })
      })
      .catch(e => ({ error: e }))
  }
}

export const deleteGroup = id => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/groups/' + id, 'delete')
      .then(e => {
        return dispatch({
          type: DELETE_GROUPS,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}
export const fetchGroupCourse = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/groupCoursePermissionList', 'get', json)
      .then(e => {
        return dispatch({
          type: FETCH_GROUPCOURSE,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}
export const AddGroupCourse = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/groups/addCoursePermissions', 'post', json)
      .then(e => {
        return dispatch({
          type: NEW_GROUPCOURSE,
          payload: e.obj
        })
      })
      .catch(e => ({ error: e }))
  }
}
export const deleteGroupCourse = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/groups/removeCoursePermissions/', 'post', json)
      .then(e => {
        return dispatch({
          type: DELETE_GROUPCOURSE,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}
// group中的学生
export const AddGroupStudent = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/groupStudents/addStudents/', 'post', json)
      .then(e => {
        return dispatch({
          type: NEW_GROUPSTUDENT,
          payload: e.obj
        })
      })
      .catch(e => ({ error: e }))
  }
}
export const deleteGroupStudent = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/groupStudents/removeStudent/', 'post', json)
      .then(e => {
        return dispatch({
          type: DELETE_GROUPSTUDENT,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

// 视频权限
export const newCompanyPermissions = json => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/coursePermissions', 'post', json)
      .then(e => {
        return dispatch({
          type: NEW_COMPANYPERMISSIONS,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}
export const deleteCompanyPermissions = id => {
  return (dispatch, getState) => {
    return easyfetch(host, '/a/coursePermissions/' + id, 'delete')
      .then(e => {
        return dispatch({
          type: DELETE_COMPANYPERMISSIONS,
          payload: e
        })
      })
      .catch(e => ({ error: e }))
  }
}

const ACTION_HANDLERS = {
  [FETCH_COMPANY_INFO]: (state, action) => state.update('course', () => Immutable.fromJS(action.payload)),
  [FETCH_STUDENT_INFO]: (state, action) => state.update('chapterInfo', () => Immutable.fromJS(action.payload)),
  [FETCH_STUDENT]: (state, action) =>
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
