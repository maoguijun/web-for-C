/*
 * @Author: Maoguijun
 * @Date: 2018-01-02 12:16:58
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-03-08 14:38:31
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
import { titles as _tit, FlowStatus, courseType_tableField as _courseType, tableLimit } from '../../../config'
import Immutable from 'immutable'
import { formatDate, formatMoney, configDirectory, configDirectoryObject, configCate } from '../../../utils/formatData'
import { getFormRequired } from '../../../utils/common'
import moment from 'moment'
import {
  fetchCourseType,
  newCourseType,
  altCourseType,
  fetchCourseTypeInfo,
  operateCourseType
} from '../modules/courseType'
const Option = Select.Option
const Search = Input.Search
const TextArea = Input.TextArea

import './courseType_.scss'

class CourseType extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      currentPage: 1,
      newModal: false,
      confirmLoading: false,
      itemId: null,
      status: false,
      modalTLoad: false,
      searchColumn: {},
      count: 0,
      rowSelection: {
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
    dispatch(fetchCourseType(json)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
      } else {
        this.setState({
          loading: false
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
    dispatch(fetchCourseType(values)).then(e => {
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
    dispatch(pathJump(`courseType/courseTypeDetail/${id}`))
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
  create = () => {
    const { dispatch } = this.props
    const { searchColumn } = this.state
    this.formRef.validateFields((err, value) => {
      if (!err) {
        this.setState({ confirmLoading: true })
        console.log(value)
        dispatch(newCourseType(value)).then(e => {
          this.setState({ confirmLoading: false })
          if (e.error) {
            message.error(e.error.message, 1)
          } else {
            this.formRef.setFieldsValue({
              name_en: '',
              name_zh: '',
              description_en: '',
              description_zh: ''
            })
            let J = {
              ...searchColumn,
              limit: tableLimit,
              offset: 0
            }
            dispatch(fetchCourseType(J))
            this.setState({
              newModal: false
            })
          }
        })
      }
    })
  }

  render () {
    const { intl: { formatMessage }, location: { pathname }, count, courseType, courseTypeInfo, dispatch } = this.props
    const { loading, currentPage, newModal, itemId, status, confirmLoading } = this.state
    console.log('state', this.state)

    const columns = [
      {
        dataIndex: _courseType.name_zh
      },
      {
        dataIndex: _courseType.name_en
      },
      { dataIndex: _courseType.createdAt, render: text => (text ? moment(text).format('YYYY-MM-DD') : '') },
      { dataIndex: _courseType.updatedAt, render: text => (text ? moment(text).format('YYYY-MM-DD') : '') },
      // { dataIndex: _courseType.createdUser },
      {
        dataIndex: _courseType.detail,
        render: (text, record, index) => {
          return <a onClick={() => this.detail(record.get('id'))}>{formatMessage({ id: 'detail' })}</a>
        }
      }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `courseType_${item.dataIndex}` })
    }))
    this.formColumns = [
      {
        dataIndex: 'name',
        title: formatMessage({ id: 'search_categoryId' })
      },
      {
        dataIndex: 'createdAt',
        type: 'date',
        props: {
          onChange: value => {
            this.setState({ searchColumn: { ...this.state.searchColumn, createdAt: value } })
          }
        }
      },
      {
        dataIndex: 'updatedAt',
        type: 'date',
        props: {
          onChange: value => {
            this.setState({ searchColumn: { ...this.state.searchColumn, updatedAt: value } })
          }
        }
      }
    ].map(item => {
      return {
        ...item,
        props: item.props || {
          onChange: e => {
            this.setState({ searchColumn: { ...this.state.searchColumn, [item.dataIndex]: e.target.value } })
          }
        },
        title: item.title || formatMessage({ id: `search_${item.dataIndex}` })
      }
    })
    // this.expandColumns = [
    //   {
    //     dataIndex: 'mobile'
    //   },
    //   {
    //     dataIndex: 'position'
    //   }
    // ].map(item => ({
    //   ...item,
    //   title: formatMessage({ id: `search_${item.dataIndex}` })
    // }))

    let searchProps = {
      formColumns: this.formColumns,
      onSave: this.onFetch,
      rightContent: this.getcontent()
      // expand: true,
      // expandForm: this.expandColumns
    }
    // const rowSelection = {
    //   onChange: (selectedRowKeys, selectedRows) => {
    //     let selected = {
    //       selectedRowKeys: selectedRowKeys,
    //       selectedRows: selectedRows
    //     }
    //     console.log(selectedRowKeys)
    //     this.setState({
    //       selected
    //     })
    //   }
    // }
    const formColumnsNew = [
      {
        dataIndex: _courseType.name_zh
      },
      {
        dataIndex: _courseType.name_en
      },
      { dataIndex: _courseType.description_zh, FormTag: <TextArea autosize={{ minRows: 5, maxRows: 6 }} /> },
      { dataIndex: _courseType.description_en, FormTag: <TextArea autosize={{ minRows: 5, maxRows: 6 }} /> }
    ]
      .map(item => ({
        ...item,
        title: formatMessage({ id: `courseType_${item.dataIndex}` }),
        option: { rules: [{ required: true, message: ' ' }] },
        placeholder: formatMessage({ id: `courseType_${item.dataIndex}` })
      }))
      .filter(item => {
        if (!item.show) {
          return item
        }
      })

    return (
      <Row>
        <Title title={formatMessage({ id: `${_tit.courseType}` })} />
        <TopSearch {...searchProps} />
        <ImmutableTable
          loading={loading}
          columns={columns}
          // rowSelection={rowSelection}
          dataSource={courseType}
          title={() => (
            <Row>
              <Button
                onClick={() =>
                  this.setState({
                    newModal: true
                  })
                }
                style={{ marginRight: 24 }}
                type='primary'
              >
                {formatMessage({ id: 'new_btn' })}
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
        <Modal
          visible={newModal}
          onCancel={() => this.setState({ newModal: false, confirmLoading: false })}
          title={formatMessage({ id: 'newCourseType' })}
          maskClosable={false}
          confirmLoading={confirmLoading}
          width={800}
          // footer={}
          onOk={() => this.create()}
        >
          <Row>
            <SimpleForm
              columns={formColumnsNew}
              // initial={courseInfo}
              colSpan={12}
              labelCol={{ span: 7 }}
              // onChange={this.changeForm}
              hideRequiredMark
              ref={f => {
                this.formRef = f
              }}
            />
          </Row>
        </Modal>
      </Row>
    )
  }
}

CourseType.propTypes = {
  pathJump: React.PropTypes.func
}

const mapStateToProps = state => ({
  courseType: state.getIn(['courseType', 'courseType']),
  count: state.getIn(['courseType', 'count']),
  courseTypeInfo: state.getIn(['courseType', 'courseTypeInfo'])
})

export default injectIntl(connect(mapStateToProps)(CourseType))

// const WrappedSystemUser = Form.create()();
