import React from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import Nav from '../../containers/sider/Nav'
import User from '../../containers/sider/User'
import './CoreLayout_.scss'
import { Layout, Icon, notification } from 'antd'
import moment from 'moment'
import { pathJump } from '../../utils/'
import logo1 from '../../../public/logos/logo1.png'
import logo2 from '../../../public/logos/logo2.png'
const { Content, Sider } = Layout
class CoreLayout extends React.Component {
  state = {
    collapsed: false,
    mode: 'inline'
  }

  render () {
    const { userInfo } = this.props
    return (
      <div className='app-wrap'>
        <img src={logo1} className='logo' />
        <Layout className='layout-main'>
          <Sider
            // collapsible
            // collapsed={this.state.collapsed}
            // onCollapse={this.onCollapse}
            width={160}
            className='sider-main'
          >
            <a className='people'>
              <img
                src={
                  userInfo && userInfo.getIn(['person', 'portrait'])
                    ? `${picURL}${userInfo.getIn(['person', 'portrait'])}`
                    : `/people.png`
                }
              />
            </a>
            <span className='userName'>{userInfo ? userInfo.getIn(['person', 'nickName']) : 'Allen Zhang'}</span>
            <span
              className='gray1'
              onClick={e => {
                props.dispatch(logout()).then(e => {
                  if (e.error) {
                    alert(e.error.message)
                  } else {
                    dispatch(pathJump('/login'))
                  }
                })
              }}
            >
              退出
            </span>
            {/* <User /> */}
            <Nav mode={this.state.mode} collapsed={this.state.collapsed} />
          </Sider>
          <Layout style={{ overflowX: 'hidden' }}>
            <Content
              className='content'
              style={this.state.collapsed ? { marginLeft: '90px' } : { marginLeft: '190px' }}
            >
              <div className='content-wrap'>{this.props.children}</div>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}
const mapStateToProps = state => ({
  location: state.get('routing').locationBeforeTransitions,
  user: state.get('user'),
  userInfo: state.getIn(['userInfo', 'userLoginInfo'])
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  pathJump: path => dispatch(pathJump(path))
})

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(CoreLayout))
