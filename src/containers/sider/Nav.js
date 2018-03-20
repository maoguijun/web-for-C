import React from 'react'
import { injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { IndexLink, Link } from 'react-router'
import { Menu, Icon, message, Badge } from 'antd'
import { pathJump } from '../../utils/'
import { logout, getLogNum } from '../../store/user'
import Immutable from 'immutable'
import './Nav.scss'
const SubMenu = Menu.SubMenu

class Side extends React.PureComponent {
  componentDidMount () {}
  componentWillUnmount () {}
  render () {
    const props = this.props
    const { intl: { formatMessage }, location: { pathname }, user, userInfo, collapsed } = props
    console.log('user', user, userInfo, props)
    const nav = [
      {
        key: 'user_manager',
        name: formatMessage({ id: 'user_manager' }),
        icon: 'user',
        show: true,
        type: 'sub',
        child: [
          {
            key: 'student',
            name: formatMessage({ id: 'student' }),
            show: true
          },
          {
            key: 'teacher',
            name: formatMessage({ id: 'teacher' }),
            show: true
          }
        ]
      },
      {
        key: 'company',
        name: formatMessage({ id: 'company' }),
        icon: 'team',
        show: true
      },
      {
        key: 'course',
        name: formatMessage({ id: 'course' }),
        icon: 'database',
        show: true
      },
      {
        key: 'courseType',
        name: formatMessage({ id: 'courseType' }),
        icon: 'book',
        show: true
      },
      {
        key: 'question',
        name: formatMessage({ id: 'question' }),
        icon: 'question',
        show: true
      }
    ]

    const getSubKey = pathname => {
      // //console.log('pathname',pathname)
      let key = pathname.replace(/(^\/)+|\/.*/g, '')
      let sub = [],
        subkey
      nav.forEach(item => {
        if (item.show && item.type === 'sub') {
          sub.push(item)
        }
      })
      sub.forEach(item => {
        let iskey = false
        item.child.forEach(child => {
          if (child.key === key) {
            iskey = true
          }
        })
        iskey && (subkey = item.key)
      })
      return subkey
    }

    return (
      <Menu
        theme='dark'
        mode='inline'
        selectedKeys={[pathname.replace(/(^\/)+|\/.*/g, '')]}
        defaultSelectedKeys={['student']}
        defaultOpenKeys={collapsed === false ? [getSubKey(pathname)] : []}
        onClick={e => {
          if (e.key === 'login') {
            props.dispatch(logout()).then(result => {
              if (result.error) {
                message.error(result.error.message, 1)
              } else {
                props.pathJump('/' + e.key)
              }
            })
          } else if (e.key === 'username') {
            if (user) {
              props.pathJump('personal_information')
            }
          } else {
            props.pathJump('/' + e.key)
          }
        }}
      >
        {nav.map(item => {
          return item.type === 'sub' ? (
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span className='nav-text'>{item.name}</span>
                </span>
              }
              style={{ display: item.show ? 'block' : 'none' }}
            >
              {item.child &&
                item.child.map(v => (
                  <Menu.Item key={v.key} style={{ display: v.show ? 'block' : 'none' }}>
                    {v.name}
                  </Menu.Item>
                ))}
            </SubMenu>
          ) : (
            <Menu.Item key={item.key} style={{ display: item.show ? 'block' : 'none' }}>
              <Icon type={item.icon} />
              <span className='nav-text'>{item.name}</span>
            </Menu.Item>
          )
        })}
      </Menu>
    )
  }
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
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Side))
