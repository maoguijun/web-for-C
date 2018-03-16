/*
 * @Author: Maoguijun
 * @Date: 2018-01-03 13:53:51
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-01-04 18:40:29
 */
import { injectReducer } from 'store/reducers'
import { rootPath } from '../../config'

export default store => ({
  path: rootPath.course,
  getComponent (nextState, cb) {
    require.ensure(
      [],
      require => {
        const course = require('./container/course').default
        const reducer = require('./modules/course').default
        injectReducer(store, { key: 'course', reducer })
        cb(null, course)
      },
      'course'
    )
  }
})
