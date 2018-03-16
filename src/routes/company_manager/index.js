/*
 * @Author: Maoguijun
 * @Date: 2018-01-03 13:53:51
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-01-04 15:10:46
 */
import { injectReducer } from 'store/reducers'
import { rootPath } from '../../config'

export default store => ({
  path: rootPath.company,
  getComponent (nextState, cb) {
    require.ensure(
      [],
      require => {
        const company = require('./container/company').default
        const reducer = require('./modules/company').default
        injectReducer(store, { key: 'company', reducer })
        cb(null, company)
      },
      'company'
    )
  }
})
