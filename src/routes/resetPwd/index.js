import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'resetPwd',
  getComponent (nextState, cb) {
    require.ensure(
      [],
      require => {
        const resetPwd = require('./containers/resetPwd').default

        /*  Return getComponent   */
        cb(null, resetPwd)

        /* Webpack named bundle   */
      },
      'resetPwd'
    )
  }
})
