/*
 * @Author: Maoguijun
 * @Date: 2018-01-03 16:32:10
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-01-22 11:31:20
 */
import { injectReducer } from 'store/reducers'
import { rootPath } from '../../../config'

export default store => ({
  path: rootPath.questionDetail + '/:id',
  getComponent (nextState, cb) {
    require.ensure(
      [],
      require => {
        const questionDetail = require('./container/questionDetail').default
        const reducer = require('./modules/questionDetail').default
        injectReducer(store, { key: 'questionDetail', reducer })
        cb(null, questionDetail)
      },
      'questionDetail'
    )
  }
})
