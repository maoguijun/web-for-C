import { injectReducer } from 'store/reducers'

export default store => ({
  path: 'resetPassword',
  getComponent (nextState, cb) {
    require.ensure(
      [],
      require => {
        const Login = require('./containers/resetContainer').default

        /*  Return getComponent   */
        cb(null, Login)

        /* Webpack named bundle   */
      },
      'resetPassword'
    )
  }
})
