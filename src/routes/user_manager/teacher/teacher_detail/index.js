/*
 * @Author: Maoguijun
 * @Date: 2018-01-03 16:32:10
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-01-03 16:59:32
 */
import { injectReducer } from 'store/reducers'
import { rootPath } from '../../../../config'

export default store => ({
  path: rootPath.teacherDetail + '/:id',
  getComponent (nextState, cb) {
    require.ensure(
      [],
      require => {
        const teacherDetail = require('./container/teacherDetail').default
        const reducer = require('./modules/teacherDetail').default
        injectReducer(store, { key: 'teacherDetail', reducer })
        cb(null, teacherDetail)
      },
      'teacherDetail'
    )
  }
})
