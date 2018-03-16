/*
 * @Author: Maoguijun
 * @Date: 2018-01-03 13:53:51
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-01-19 18:35:33
 */
import { injectReducer } from 'store/reducers'
import { rootPath } from '../../config'

export default store => ({
  path: rootPath.question,
  getComponent (nextState, cb) {
    require.ensure(
      [],
      require => {
        const question = require('./container/question').default
        const reducer = require('./modules/question').default
        injectReducer(store, { key: 'question', reducer })
        cb(null, question)
      },
      'question'
    )
  }
})
