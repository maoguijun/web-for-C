/*
 * @Author: Maoguijun
 * @Date: 2018-01-03 16:32:10
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-01-22 15:59:55
 */
import { injectReducer } from 'store/reducers'
import { rootPath } from '../../../config'

export default store => ({
  path: rootPath.companyDetail + '/:id',
  getComponent (nextState, cb) {
    require.ensure(
      [],
      require => {
        const companyDetail = require('./container/companyDetail').default
        const reducer = require('./modules/companyDetail').default
        injectReducer(store, { key: 'companyDetail', reducer })
        cb(null, companyDetail)
      },
      'companyDetail'
    )
  }
})
