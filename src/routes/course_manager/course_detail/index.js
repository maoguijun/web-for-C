/*
 * @Author: Maoguijun
 * @Date: 2018-01-03 16:32:10
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-01-11 18:52:22
 */
import { injectReducer } from 'store/reducers'
import { rootPath } from '../../../config'

export default store => ({
  path: rootPath.courseDetail + '/:id',
  getComponent (nextState, cb) {
    require.ensure(
      [],
      require => {
        const courseDetail = require('./container/courseDetail').default
        const reducer = require('./modules/courseDetail').default
        injectReducer(store, { key: 'courseDetail', reducer })
        cb(null, courseDetail)
      },
      'courseDetail'
    )
  }
})
