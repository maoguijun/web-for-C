/*
 * @Author: Maoguijun
 * @Date: 2018-01-03 13:53:51
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-01-04 17:58:41
 */
import { injectReducer } from 'store/reducers'
import { rootPath } from '../../config'

export default store => ({
  path: rootPath.courseType,
  getComponent (nextState, cb) {
    require.ensure(
      [],
      require => {
        const courseType = require('./container/courseType').default
        const reducer = require('./modules/courseType').default
        injectReducer(store, { key: 'courseType', reducer })
        cb(null, courseType)
      },
      'courseType'
    )
  }
})
