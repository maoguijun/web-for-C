// We only need to import the modules necessary for initial render
import { rootPath, chilPath } from '../config'
import { requireAuth } from '../components/authentication/requireAuth'
import NotMatch from '../containers/global/NotMatch'
import LoginRoute from './Login'
import ResetPWD from './ResetPassword'
import Layout from '../layouts/CoreLayout'
import Student from './user_manager/student'

console.log(
  '%c',
  'padding:50px 118px;background:url(http://www.loncus.com/img/logo.png) no-repeat 0 10px;line-height:100px;height:1px'
)

export const createRoutes = store => ({
  path: '/',
  exact: true,
  indexRoute: {
    onEnter: (_, replaceState) => {
      replaceState('/login') // 应该跳转到默认的首页
    }
  },
  childRoutes: [
    {
      component: requireAuth(Layout),
      childRoutes: [Student(store)]
    },
    LoginRoute(store),
    ResetPWD(store),
    LoginRoute(store),
    {
      path: 'notFound',
      component: NotMatch
    },
    {
      path: '*',
      exact: true,
      indexRoute: {
        onEnter: (_, replaceState) => {
          replaceState('/notFound') // 应该跳转到默认的首页
        }
      }
    }
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
