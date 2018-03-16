import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux'
import localReducer from './locale'
import userReducer from './user'
import userInfoReducer from '../routes/Login/modules/login'
import courseReducer from '../routes/course_manager/modules/course'
import courseTypeReducer from '../routes/courseType_manager/modules/courseType'

export const makeRootReducer = asyncReducers => {
  return combineReducers({
    routing: routerReducer,
    locale: localReducer,
    user: userReducer,
    userInfo: userInfoReducer,
    course: courseReducer,
    courseType: courseTypeReducer,
    ...asyncReducers
  })
}
export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
