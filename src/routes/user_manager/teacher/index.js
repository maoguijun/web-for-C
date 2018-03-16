/*
 * @Author: Maoguijun
 * @Date: 2018-01-03 13:53:51
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-01-03 14:36:03
 */
import { injectReducer } from 'store/reducers'
import { rootPath } from '../../../config'

export default store => ({
  path: rootPath.teacher,
  getComponent (nextState, cb) {
    require.ensure(
      [],
      require => {
        const teacher = require('./container/teacher').default
        const reducer = require('./modules/teacher').default
        injectReducer(store, { key: 'teacher', reducer })
        cb(null, teacher)
      },
      'teacher'
    )
  }
})
