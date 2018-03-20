/*
 * @Author: Maoguijun
 * @Date: 2018-01-02 12:16:58
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-03-20 12:00:04
 */
import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import {
  Row,
  message,
  Spin,
  Button,
  Pagination,
  Modal,
  Col,
  Select,
  Input,
  DatePicker,
  Icon,
  Table,
  Tooltip
} from 'antd'
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
  FlowStatus,
  activeStatus,
  teacher_tableField as _teacher,
  fieldListConfig,
  fieldListOption,
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
import moment from 'moment'
import { fetchTeacher, newTeacher, altTeacher, fetchTeacherInfo, operateTeacher } from '../modules/teacher'
const Option = Select.Option
const Search = Input.Search

import './teacher_.scss'

class Teacher extends React.Component {
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
    dispatch(fetchTeacher(json)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
      } else {
        this.setState({
          loading: false,
          count: e.payload.count
        })
      }
    })
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
    dispatch(fetchTeacher(values)).then(e => {
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
    dispatch(pathJump(`teacher/teacherDetail/${id}`))
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
      dispatch(operateTeacher(json)).then(e => {
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
          dispatch(fetchTeacher(J))
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
      dispatch(operateTeacher(json)).then(e => {
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
          dispatch(fetchTeacher(J))
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
    const { intl: { formatMessage }, location: { pathname }, count, teacher, dispatch } = this.props
    const { loading, currentPage, modal, modalLoad, itemId, modal_t, status, modalTLoad } = this.state
    const columns = [
      {
        dataIndex: _teacher.name,
        render: (text, record, index) => {
          return record.getIn(['person', 'name'])
        }
      },
      { dataIndex: _teacher.createdAt, render: text => moment(text || null).format('YYYY-MM-DD') },
      { dataIndex: _teacher.updatedAt, render: text => moment(text || null).format('YYYY-MM-DD') },
      {
        dataIndex: _teacher.field,
        render: (text, record, index) => {
          let arr = text.split(',')
          arr = arr.map(item => (item && fieldListConfig[item] ? formatMessage({ id: fieldListConfig[item] }) : ''))
          let string = arr.toString()
          return (
            <div style={{ display: 'inline-block', marginRight: '15px' }}>
              <Tooltip title={<p>{string}</p>}>
                {string && string.length > 15 ? (
                  <span>
                    {string.substring(0, 15) + ' ··· '}
                    <Icon type='question-circle-o' />
                  </span>
                ) : (
                  <span>{string}</span>
                )}
              </Tooltip>
            </div>
          )
        }
      },
      { dataIndex: _teacher.position_en },
      { dataIndex: _teacher.position_zh },
      {
        dataIndex: _teacher.companyName
      },
      {
        dataIndex: _teacher.status,
        render: (text, record, index) => {
          return activeStatus[record.getIn(['person', 'account', 'accountStatus'])]
            ? formatMessage({ id: activeStatus[record.getIn(['person', 'account', 'accountStatus'])] })
            : ''
        }
      },
      {
        dataIndex: _teacher.detail,
        render: (text, record, index) => {
          return <a onClick={() => this.detail(record.getIn(['person', 'id']))}>{formatMessage({ id: 'detail' })}</a>
        }
      }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `teacher_${item.dataIndex}` })
    }))
    this.formColumns = [
      {
        dataIndex: 'accountStatus',
        type: 'select_obj',
        noLocal: true,
        selectOption: FlowStatus,
        placeholder: formatMessage({ id: 'search_accountStatus' })
      },
      {
        dataIndex: 'name'
      },
      {
        dataIndex: 'companyName'
      },
      {
        dataIndex: 'field',
        type: 'select_obj',
        noLocal: true,
        props: {
          onChange: value => {
            this.setState({ searchColumn: { ...this.state.searchColumn, field: value } })
          }
        },
        selectOption: fieldListOption.map(item => ({ ...item, label: formatMessage({ id: item.label }) })),
        placeholder: formatMessage({ id: 'search_accountStatus' })
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
        dataIndex: 'position_zh'
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
        <Title title={formatMessage({ id: `${_tit.teacher}` })} />
        <TopSearch {...searchProps} />
        <ImmutableTable
          loading={loading}
          columns={columns}
          rowSelection={rowSelection}
          dataSource={teacher}
          title={() => (
            <Row>
              <Button
                onClick={() => {
                  dispatch(pathJump('teacher/teacherDetail/new'))
                }}
                style={{ marginRight: 24 }}
                type='primary'
              >
                {formatMessage({ id: 'new_btn' })}
              </Button>
              <Button onClick={() => this.operation('active')} style={{ marginRight: 24 }} type='primary'>
                {formatMessage({ id: 'active' })}
              </Button>
              <Button onClick={() => this.operation('suspend')} style={{ marginRight: 24 }} type='primary'>
                {formatMessage({ id: 'suspend' })}
              </Button>
            </Row>
          )}
          pagination={{
            pageSize: tableLimit,
            total: count,
            showQuickJumper: count > tableLimit,
            current: currentPage
          }}
          onChange={this.changeTable}
          rowKey={record => record.get('id')}
        />
      </Row>
    )
  }
}

Teacher.propTypes = {
  pathJump: React.PropTypes.func
}

const mapStateToProps = state => ({
  teacher: state.getIn(['teacher', 'teacher']),
  count: state.getIn(['teacher', 'count'])
})

export default injectIntl(connect(mapStateToProps)(Teacher))

// const WrappedSystemUser = Form.create()();
