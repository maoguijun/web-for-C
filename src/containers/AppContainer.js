import React, { Component, PropTypes } from 'react'
import { browserHistory, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { addLocaleData } from 'react-intl'
import { connect, Provider } from 'react-redux'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
import LocaleContainer from './LocaleContainer'
import enUS from 'antd/lib/locale-provider/en_US'
import { Modal, Button, message } from 'antd'
import { pathJump } from '../utils/'
import moment from 'moment'
import 'babel-polyfill'
import { fetchUserInfo } from '../routes/Login/modules/login'
import '../styles/core.scss'
import '../styles/swiper-3.4.2.min.css'
import '../styles/myfont/iconfont.css'
import './AppContainer_.scss'
import '../styles/common.css'
moment.locale('zh')

class AppContainer extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  }

  componentWillMount () {}

  shouldComponentUpdate () {
    return false
  }

  render () {
    const { routes, store } = this.props
    const history = syncHistoryWithStore(browserHistory, store, {
      selectLocationState (state) {
        return state.get('routing')
      }
    })

    addLocaleData([...en, ...zh])
    return (
      <Provider store={store}>
        <LocaleContainer>
          <div style={{ height: '100%' }}>
            <Router history={history} children={routes} />
          </div>
        </LocaleContainer>
      </Provider>
    )
  }
}

export default connect()(AppContainer)
// export default injectIntl(connect(mapStateToProps)(JRDetailsPage))
