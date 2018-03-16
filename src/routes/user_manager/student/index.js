/*
 * @Author: Maoguijun
 * @Date: 2018-01-03 13:53:51
 * @Last Modified by:   Maoguijun
 * @Last Modified time: 2018-01-03 13:53:51
 */
import { injectReducer } from 'store/reducers'
import { rootPath, chilPath } from '../../../config'

export default store => ({
  path: rootPath.student,
  getComponent (nextState, cb) {
    require.ensure(
      [],
      require => {
        const student = require('./container/student').default
        const reducer = require('./modules/student').default
        injectReducer(store, { key: 'student', reducer })
        cb(null, student)
      },
      'student'
    )
  }
})
