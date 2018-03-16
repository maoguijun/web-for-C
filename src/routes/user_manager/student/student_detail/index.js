/*
 * @Author: Maoguijun
 * @Date: 2018-01-02 15:59:02
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-01-09 12:30:05
 */
import { injectReducer } from 'store/reducers'
import { rootPath, chilPath } from '../../../../config'

export default store => ({
  path: rootPath.studentDetail + '/:id',
  getComponent (nextState, cb) {
    require.ensure(
      [],
      require => {
        const studentDetail = require('./container/studentDetail').default
        const reducer = require('./modules/studentDetail').default
        injectReducer(store, { key: 'studentDetail', reducer })
        cb(null, studentDetail)
      },
      'studentDetail'
    )
  }
})
