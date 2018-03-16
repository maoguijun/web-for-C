import React from 'react'
import Nav from '../../containers/sider/Nav'
import User from '../../containers/sider/User'
import './CoreLayout.scss'
import { Layout, Icon, notification } from 'antd'
import moment from 'moment'
import logo2 from '../../../public/logos/logo2.png'
const { Content, Sider } = Layout
class CoreLayout extends React.Component {
  state = {
    // collapsed: eval(sessionStorage.getItem('collapsed')||false),
    collapsed: false,
    mode: 'inline'
  }

  onCollapse = collapsed => {
    // sessionStorage.setItem("collapsed",collapsed)
    this.setState({
      collapsed,
      mode: collapsed ? 'vertical' : 'inline'
    })
  }

  render () {
    const { userInfo } = this.props
    return (
      <Layout className='layout-main' style={{ width: '100%' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          width={180}
          className='sider-main'
        >
          <div className='logo'>
            <img src={logo2} />
          </div>
          {/* <User /> */}
          <Nav mode={this.state.mode} collapsed={this.state.collapsed} />
        </Sider>
        <Layout style={{ overflowX: 'hidden' }}>
          <Content className='content' style={this.state.collapsed ? { marginLeft: '90px' } : { marginLeft: '190px' }}>
            <div className='content-wrap'>{this.props.children}</div>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
