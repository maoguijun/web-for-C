/*
 * @Author: Maoguijun
 * @Date: 2018-01-03 16:32:10
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-01-12 15:50:19
 */
import { injectReducer } from 'store/reducers'
import { rootPath } from '../../../config'

export default store => ({
  path: rootPath.courseTypeDetail + '/:id',
  getComponent (nextState, cb) {
    require.ensure(
      [],
      require => {
        const courseTypeDetail = require('./container/courseTypeDetail').default
        const reducer = require('./modules/courseTypeDetail').default
        injectReducer(store, { key: 'courseTypeDetail', reducer })
        cb(null, courseTypeDetail)
      },
      'courseTypeDetail'
    )
  }
})
