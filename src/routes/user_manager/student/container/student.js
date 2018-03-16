/*
 * @Author: Maoguijun
 * @Date: 2018-01-02 12:16:58
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-03-08 14:08:20
 */
import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import { Row, message, Spin, Button, Pagination, Modal, Col, Select, Input, DatePicker, Icon, Table } from 'antd'
import { connect } from 'react-redux'
import { ImmutableTable } from '../../../../components/antd/Table'
import ImmutablePropTypes from 'react-immutable-proptypes'
import SimpleForm from '../../../../components/antd/SimpleForm'
import { Link } from 'react-router'
import { pathJump } from '../../../../utils/'

import TopSearch from '../../../../components/search/topSearch'
import Title from '../../../../components/title/title'
import {
  titles as _tit,
  studentType,
  studentTypeArr,
  activeStatus,
  FlowStatus,
  student_tableField as _student,
  tableLimit
} from '../../../../config'
import Immutable from 'immutable'
import {
  formatDate,
  formatMoney,
  configDirectory,
  configDirectoryObject,
  configCate
} from '../../../../utils/formatData'
import { getFormRequired } from '../../../../utils/common'
import { fetchStudent, newStudent, altStudent, fetchStudentInfo, operateStudent } from '../modules/student'
const Option = Select.Option
const Search = Input.Search

import dragula from 'dragula'
import 'dragula/dist/dragula.css'
import './student_.scss'

class Student extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      currentPage: 1,
      modal: false,
      modalLoad: false,
      itemId: null,
      modal_t: false,
      status: false,
      modalTLoad: false,
      searchColumn: {},
      count: 0,
      selected: {
        selectedRowKeys: [],
        selectedRows: []
      }
    }
  }

  componentWillMount () {
    const { dispatch, params, location } = this.props
    // console.log('this.props',this.props)
    this.setState({ loading: true })
    let json = {
      limit: tableLimit,
      offset: 0
    }
    dispatch(fetchStudent(json)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
      } else {
        this.setState({
          loading: false
        })
      }
    })
  }

  handleReorder = (dragIndex, draggedIndex) => {
    const { student } = this.props
    let _data = student.toJS()
    const data = [..._data]
    const item = data.splice(dragIndex, 1)[0]
    data.splice(draggedIndex, 0, item)
    this.setState({
      data
    })
  }
  componentDidMount () {
    const container = document.querySelector('.ant-table-tbody')
    console.log('container', container)
    const drake = dragula([container], {
      moves: (el, container, handle, sibling) => {
        console.log(el, container, handle, sibling)
        this.start = this.getIndexInParent(el)
        return true
      }
    })

    drake
      .on('drag', el => {
        console.log(el)
      })
      .on('drop', (el, target, source, sibling) => {
        this.end = this.getIndexInParent(el)
        this.handleReorder(this.start, this.end)
      })
  }
  getIndexInParent = el => {
    return Array.from(el.parentNode.children).indexOf(el)
  }

  onFetch = (values, limit, offset, cur = 1) => {
    this.setState({ loading: true, currentPage: cur })
    const { dispatch } = this.props
    this.setState({
      searchColumn: values
    })
    values = {
      ...values,
      limit: limit,
      offset: offset
    }
    dispatch(fetchStudent(values)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
        this.setState({ loading: false })
      } else {
        this.setState({
          loading: false
        })
      }
    })
  }

  changeTable = (pagination, filters, sorter) => {
    const { searchColumn } = this.state
    const limit = tableLimit
    const offset = (pagination.current - 1) * limit
    this.onFetch(searchColumn, limit, offset, pagination.current, 1)
  }

  getRequiredMessage = (e, type) => {
    return getFormRequired(this.props.intl.formatMessage({ id: 'input_require' }, { name: e }), type)
  }

  detail = id => {
    const { dispatch } = this.props
    dispatch(pathJump(`student/studentDetail/${id}`))
  }
  operation = operation => {
    const { dispatch, intl: { formatMessage } } = this.props
    const { selected: { selectedRowKeys, selectedRows }, searchColumn } = this.state
    // to do
    console.log(operation, selectedRowKeys)
    if (selectedRowKeys.length === 0) {
      message.error(formatMessage({ id: 'selectSameStatusData' }), 1)
      return
    }
    // 遍历每个student的状态是否满足接下来的操作
    if (operation === 'active') {
      let count = 0
      selectedRows &&
        selectedRows.forEach(item => {
          if (item.getIn(['person', 'account', 'accountStatus']) === 1) {
            count++
          }
        })
      console.log(171, count)
      if (count !== 0) {
        message.error(formatMessage({ id: 'selectSameStatusData' }), 1)
        return
      }
      let ids = []
      selectedRows &&
        selectedRows.forEach(item => {
          ids.push(item.getIn(['person', 'account', 'id']))
        })
      let json = {
        ids: ids,
        accountStatus: 1
      }
      dispatch(operateStudent(json)).then(e => {
        if (!e.error) {
          message.success('success', 1)
          let _selectedRows = selectedRows.map(item => {
            let item_ = item.toJS()
            if (item.getIn(['person', 'account'])) {
              item_.person.account.accountStatus = 1
            }
            return Immutable.fromJS(item_)
          })
          let J = {
            ...searchColumn,
            limit: tableLimit,
            offset: 0
          }
          dispatch(fetchStudent(J))
          this.setState({
            selected: {
              selectedRowKeys,
              selectedRows: _selectedRows
            }
          })
        }
      })
    } else if (operation === 'suspend') {
      let count = 0
      selectedRows &&
        selectedRows.forEach(item => {
          if (item.getIn(['person', 'account', 'accountStatus']) === 0) {
            count++
          }
        })
      if (count !== 0) {
        message.error(formatMessage({ id: 'selectSameStatusData' }), 1)
        return
      }
      let ids = []
      selectedRows &&
        selectedRows.forEach(item => {
          ids.push(item.getIn(['person', 'account', 'id']))
        })
      let json = {
        ids: ids,
        accountStatus: 0
      }
      dispatch(operateStudent(json)).then(e => {
        if (!e.error) {
          message.success('success', 1)
          let _selectedRows = selectedRows.map(item => {
            let item_ = item.toJS()
            if (item.getIn(['person', 'account'])) {
              item_.person.account.accountStatus = 0
            }
            return Immutable.fromJS(item_)
          })
          let J = {
            ...searchColumn,
            limit: tableLimit,
            offset: 0
          }
          dispatch(fetchStudent(J))
          this.setState({
            selected: {
              selectedRowKeys,
              selectedRows: _selectedRows
            }
          })
        }
      })
    }
  }

  getcontent = () => {
    // const { intl: { formatMessage } } = this.props;
    // return (
    //   <Col>
    //     <Button
    //       onClick={() => {
    //         this.setState({ modal: true, itemId: null });
    //       }}
    //       type="primary"
    //     >
    //       {formatMessage({ id: "new_btn" })}
    //     </Button>
    //   </Col>
    // );
  }

  render () {
    const { intl: { formatMessage }, location: { pathname }, count, student, studentInfo } = this.props
    const { loading, currentPage, modal, modalLoad, itemId, modal_t, status, modalTLoad } = this.state
    // console.log('state',this.state)
    console.log('hhhhh', studentInfo && studentInfo.toJS())
    const columns = [
      {
        dataIndex: _student.name,
        render: (text, record, index) => {
          return record.getIn(['person', 'name'])
        }
      },
      {
        dataIndex: _student.mobile,
        render: (text, record, index) => {
          return record.getIn(['person', 'account', 'mobile'])
        }
      },
      {
        dataIndex: _student.mail,
        render: (text, record, index) => {
          return record.getIn(['person', 'account', 'mail'])
        }
      },
      { dataIndex: _student.position },
      {
        dataIndex: _student.companyName,
        render: (text, record, index) => {
          let companyName = []
          let _record = record.toJS()
          _record.companies.forEach(item => {
            companyName.push(item.name)
          })
          return companyName.toString()
        }
      },
      {
        dataIndex: _student.studentType,
        render: (text, record, index) => {
          return formatMessage({ id: studentTypeArr[text] })
        }
      },
      {
        dataIndex: _student.status,
        render: (text, record, index) => {
          return formatMessage({ id: activeStatus[record.getIn(['person', 'account', 'accountStatus'])] })
        }
      },
      {
        dataIndex: _student.detail,
        render: (text, record, index) => {
          return <a onClick={() => this.detail(record.get('id'))}>{formatMessage({ id: 'detail' })}</a>
        }
      }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `student_${item.dataIndex}` })
    }))
    this.formColumns = [
      {
        dataIndex: 'studentType',
        type: 'select_obj',
        noLocal: true,
        selectOption: studentType,
        placeholder: formatMessage({ id: 'search_studentType' }),
        props: {
          onChange: value => {
            this.setState({ searchColumn: { ...this.state.searchColumn, studentType: value } })
          }
        }
      },
      {
        dataIndex: 'accountStatus',
        type: 'select_obj',
        noLocal: true,
        selectOption: FlowStatus,
        placeholder: formatMessage({ id: 'search_accountStatus' }),
        props: {
          onChange: value => {
            this.setState({ searchColumn: { ...this.state.searchColumn, accountStatus: value } })
          }
        }
      },
      {
        dataIndex: 'name'
      },
      {
        dataIndex: 'companyName'
      }
    ].map(item => ({
      ...item,
      props: item.props || {
        onChange: e => {
          this.setState({ searchColumn: { ...this.state.searchColumn, [item.dataIndex]: e.target.value } })
        }
      },
      title: formatMessage({ id: `search_${item.dataIndex}` })
    }))
    this.expandColumns = [
      {
        dataIndex: 'mobile'
      },
      {
        dataIndex: 'mail'
      },
      {
        dataIndex: 'position'
      },
      {
        dataIndex: 'createdAt',
        type: 'date',
        props: {
          onChange: value => {
            this.setState({ searchColumn: { ...this.state.searchColumn, createdAt: value } })
          }
        }
      }
    ].map(item => ({
      ...item,
      props: item.props || {
        onChange: e => {
          this.setState({ searchColumn: { ...this.state.searchColumn, [item.dataIndex]: e.target.value } })
        }
      },
      title: formatMessage({ id: `search_${item.dataIndex}` })
    }))

    let searchProps = {
      formColumns: this.formColumns,
      onSave: this.onFetch,
      rightContent: this.getcontent(),
      expand: true,
      expandForm: this.expandColumns
    }
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        let selected = {
          selectedRowKeys: selectedRowKeys,
          selectedRows: selectedRows
        }
        console.log(selectedRowKeys)
        this.setState({
          selected
        })
      }
    }

    return (
      <Row>
        <Title title={formatMessage({ id: `${_tit.student}` })} />
        <TopSearch {...searchProps} />
        <ImmutableTable
          loading={loading}
          columns={columns}
          dataSource={student}
          rowSelection={rowSelection}
          title={() => (
            <Row>
              <Button onClick={() => this.operation('active')} style={{ marginRight: 24 }} type='primary'>
                {formatMessage({ id: 'active' })}
              </Button>
              <Button onClick={() => this.operation('suspend')} style={{ marginRight: 24 }} type='primary'>
                {formatMessage({ id: 'suspend' })}
              </Button>
            </Row>
          )}
          pagination={{
            pageSize: 20,
            total: count,
            showQuickJumper: count > 20,
            current: currentPage
          }}
          onChange={this.changeTable}
          rowKey={record => record.get('id')}
        />
      </Row>
    )
  }
}

Student.propTypes = {
  pathJump: React.PropTypes.func
}

const mapStateToProps = state => ({
  student: state.getIn(['student', 'student']),
  count: state.getIn(['student', 'count'])
  // studentInfo: state.getIn(['student', 'studentInfo'])
})

export default injectIntl(connect(mapStateToProps)(Student))

// const WrappedSystemUser = Form.create()();
