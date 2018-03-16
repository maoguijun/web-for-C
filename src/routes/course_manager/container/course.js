/*
 * @Author: Maoguijun
 * @Date: 2018-01-02 12:16:58
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-03-08 14:21:58
 */
import React, { PureComponent } from 'react'
import { injectIntl } from 'react-intl'
import { Row, message, Spin, Button, Pagination, Modal, Col, Select, Input, DatePicker, Icon, Table } from 'antd'
import { connect } from 'react-redux'
import { ImmutableTable } from '../../../components/antd/Table'
import ImmutablePropTypes from 'react-immutable-proptypes'
import SimpleForm from '../../../components/antd/SimpleForm'
import { Link } from 'react-router'
import { pathJump } from '../../../utils/'

import TopSearch from '../../../components/search/topSearch'
import Title from '../../../components/title/title'
import { titles as _tit, FlowStatus, course_tableField as _course, activeStatus, tableLimit } from '../../../config'
import Immutable from 'immutable'
import { formatDate, formatMoney, configDirectory, configDirectoryObject, configCate } from '../../../utils/formatData'
import { getFormRequired } from '../../../utils/common'
import { fetchCourse, newCourse, altCourse, fetchCourseInfo, operateCourse } from '../modules/course'
import { fetchCourseType } from '../../courseType_manager/modules/courseType'
import moment from 'moment'
const Option = Select.Option
const Search = Input.Search

import './course_.scss'

class Course extends React.Component {
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
      },
      courseTypeList: []
    }
  }

  componentWillMount () {
    const { dispatch, params, location } = this.props
    // console.log('this.props',this.props)
    console.log(location)
    let teacherId = ''
    if (location && location.search) {
      teacherId = location.search.split('=')[1]
    }
    this.setState({ loading: true })
    let json = {
      limit: tableLimit,
      offset: 0
    }
    dispatch(fetchCourse({ ...json, teacherId: teacherId })).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
      } else {
        this.setState({
          loading: false,
          count: e.payload.count
        })
      }
    })
    dispatch(fetchCourseType(json)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
      } else {
        console.log('courseTypeList', e.payload)
        this.setState({
          loading: false,
          courseTypeList: e.payload.objs
        })
      }
    })
  }

  onFetch = (values, limit, offset, cur = 1, p) => {
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
    dispatch(fetchCourse(values)).then(e => {
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
    dispatch(pathJump(`course/courseDetail/${id}`))
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
          if (item.get('courseStatus') === 1) {
            count++
          }
        })
      console.log(171, count)
      if (count !== 0) {
        message.error(formatMessage({ id: 'selectSameStatusData' }), 1)
        return
      }
      let json = {
        ids: selectedRowKeys,
        courseStatus: 1
      }
      dispatch(operateCourse(json)).then(e => {
        if (!e.error) {
          message.success('success', 1)
          let _selectedRows = selectedRows.map(item => {
            let item_ = item.toJS()
            item_.courseStatus = 1
            return Immutable.fromJS(item_)
          })
          let J = {
            ...searchColumn,
            limit: tableLimit,
            offset: 0
          }
          dispatch(fetchCourse(J))
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
          if (item.get('courseStatus') === 0) {
            count++
          }
        })
      if (count !== 0) {
        message.error(formatMessage({ id: 'selectSameStatusData' }), 1)
        return
      }
      let json = {
        ids: selectedRowKeys,
        courseStatus: 0
      }
      dispatch(operateCourse(json)).then(e => {
        if (!e.error) {
          message.success('success', 1)
          let _selectedRows = selectedRows.map(item => {
            let item_ = item.toJS()
            item_.courseStatus = 0
            return Immutable.fromJS(item_)
          })
          let J = {
            ...searchColumn,
            limit: tableLimit,
            offset: 0
          }
          dispatch(fetchCourse(J))
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
    const { intl: { formatMessage }, location: { pathname }, count, course, courseInfo, dispatch } = this.props
    const { loading, currentPage, modal, modalLoad, itemId, modal_t, status, modalTLoad, courseTypeList } = this.state
    // console.log('state',this.state)
    console.log('hhhhh', courseInfo && courseInfo.toJS())
    const columns = [
      {
        dataIndex: _course.name_zh
      },
      {
        dataIndex: _course.name_en
      },
      { dataIndex: _course.createdAt, render: text => (text ? moment(text).format('YYYY-MM-DD') : '') },
      { dataIndex: _course.updatedAt, render: text => (text ? moment(text).format('YYYY-MM-DD') : '') },
      // { dataIndex: _course.createdUser },
      {
        dataIndex: _course.categories,
        render: (text, record, index) => {
          let arr = []
          let _record = record.toJS()
          _record.categories &&
            _record.categories.forEach(item => {
              arr.push(item.name_zh)
            })
          return arr.toString()
        }
      },
      { dataIndex: _course.courseStatus, render: (text, record, index) => formatMessage({ id: activeStatus[text] }) },
      {
        dataIndex: _course.detail,
        render: (text, record, index) => {
          return <a onClick={() => this.detail(record.get('id'))}>{formatMessage({ id: 'detail' })}</a>
        }
      }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `course_${item.dataIndex}` })
    }))
    this.formColumns = [
      {
        dataIndex: 'courseStatus',
        type: 'select_obj',
        noLocal: true,
        selectOption: FlowStatus,
        placeholder: formatMessage({ id: 'search_courseStatus' }),
        props: {
          onChange: value => {
            this.setState({ searchColumn: { ...this.state.searchColumn, courseStatus: value } })
          }
        }
      },
      {
        dataIndex: 'categoryId',
        type: 'select_obj',
        noLocal: true,
        // mode: 'combobox',
        selectOption: courseTypeList,
        lv: { label: 'name_zh', value: 'id' },
        placeholder: formatMessage({ id: 'search_categoryId' }),
        props: {
          onChange: value => {
            this.setState({ searchColumn: { ...this.state.searchColumn, categoryId: value } })
          }
        }
      },
      {
        dataIndex: 'name',
        title: formatMessage({ id: `search_course_name_zh` })
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
    ].map(item => {
      return {
        title: item.title || formatMessage({ id: `search_${item.dataIndex}` }),
        props: item.props || {
          onChange: e => {
            this.setState({ searchColumn: { ...this.state.searchColumn, [item.dataIndex]: e.target.value } })
          }
        },
        ...item
      }
    })
    this.expandColumns = [
      {
        dataIndex: 'updatedAt',
        type: 'date',
        props: {
          onChange: value => {
            this.setState({ searchColumn: { ...this.state.searchColumn, updatedAt: value } })
          }
        }
      }
    ].map(item => ({
      title: formatMessage({ id: `search_${item.dataIndex}` }),
      ...item
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
        <Title title={formatMessage({ id: `${_tit.course}` })} />
        <TopSearch {...searchProps} />
        <ImmutableTable
          loading={loading}
          columns={columns}
          rowSelection={rowSelection}
          dataSource={course}
          title={() => (
            <Row>
              <Button
                onClick={() => {
                  dispatch(pathJump('course/courseDetail/new'))
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

Course.propTypes = {
  pathJump: React.PropTypes.func
}

const mapStateToProps = state => ({
  course: state.getIn(['course', 'course']),
  count: state.getIn(['course', 'count']),
  courseInfo: state.getIn(['course', 'courseInfo'])
})

export default injectIntl(connect(mapStateToProps)(Course))

// const WrappedSystemUser = Form.create()();
