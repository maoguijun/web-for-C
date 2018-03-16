/*
 * @Author: Maoguijun
 * @Date: 2018-01-02 12:16:58
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-03-08 14:42:44
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
import {
  titles as _tit,
  FlowStatus,
  question_tableField as _question,
  questionReplyType,
  tableLimit,
  questionReplyTypeArr
} from '../../../config'
import Immutable from 'immutable'
import { formatDate, formatMoney, configDirectory, configDirectoryObject, configCate } from '../../../utils/formatData'
import { getFormRequired } from '../../../utils/common'
import { fetchQuestion, newQuestion, altQuestion, fetchQuestionInfo, operateQuestion } from '../modules/question'
import moment from 'moment'
const Option = Select.Option
const Search = Input.Search
const TextArea = Input.TextArea

import './question_.scss'

class Question extends React.Component {
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
      count: 0,
      searchColumn: {},
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
    let teacherId = ''
    if (location && location.search) {
      teacherId = location.search.split('=')[1]
    }
    let json = {
      limit: tableLimit,
      offset: 0,
      targetPerson: teacherId
    }
    dispatch(fetchQuestion(json)).then(e => {
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
    dispatch(fetchQuestion(values)).then(e => {
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
    dispatch(pathJump(`question/questionDetail/${id}`))
  }

  getcontent = () => {
    //
  }
  render () {
    const { intl: { formatMessage }, location: { pathname }, count, question, questionInfo, dispatch } = this.props
    const { loading, currentPage, newModal, itemId, status, confirmLoading } = this.state
    console.log('state', this.state)

    const columns = [
      {
        dataIndex: _question.courseName_zh,
        render: (text, record, index) => record.getIn(['course', 'name_zh'])
      },
      {
        dataIndex: _question.courseName_en,
        render: (text, record, index) => record.getIn(['course', 'name_en'])
      },
      {
        dataIndex: _question.chapterName_zh,
        render: (text, record, index) => record.getIn(['chapter', 'name_zh'])
      },
      {
        dataIndex: _question.chapterName_en,
        render: (text, record, index) => record.getIn(['chapter', 'name_en'])
      },
      { dataIndex: _question.updatedAt, render: text => (text ? moment(text).format('YYYY-MM-DD') : '') },
      {
        dataIndex: _question.replyStatus,
        render: (text, record, index) => formatMessage({ id: `que_${questionReplyType[record.get('replyStatus')]}` })
      },
      { dataIndex: _question.qPersonName, render: (text, record, index) => record.getIn(['qPerson', 'name']) },
      { dataIndex: _question.tPersonName, render: (text, record, index) => record.getIn(['tPerson', 'name']) },
      {
        dataIndex: _question.detail,
        render: (text, record, index) => {
          return <a onClick={() => this.detail(record.get('id'))}>{formatMessage({ id: 'detail' })}</a>
        }
      }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `question_${item.dataIndex}` })
    }))
    this.formColumns = [
      {
        dataIndex: 'chapterName'
      },
      {
        dataIndex: 'courseName'
      },
      {
        dataIndex: 'qPersonName'
      },
      {
        dataIndex: 'teacherName'
      }
    ].map(item => {
      return {
        ...item,
        props: {
          onChange: e => {
            this.setState({ searchColumn: { ...this.state.searchColumn, [item.dataIndex]: e.target.value } })
          }
        },
        title: item.title || formatMessage({ id: `search_${item.dataIndex}` })
      }
    })
    this.expandColumns = [
      {
        dataIndex: 'replyStatus',
        type: 'select_obj',
        noLocal: true,
        selectOption: questionReplyTypeArr.map(v => ({ ...v, label: formatMessage({ id: `que_${v.label}` }) })),
        placeholder: formatMessage({ id: 'search_replyStatus' })
      }
    ].map(item => ({
      ...item,
      props: {
        onChange: value => {
          this.setState({ searchColumn: { ...this.state.searchColumn, [item.dataIndex]: value } })
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

    return (
      <Row>
        <Title title={formatMessage({ id: `${_tit.question}` })} />
        <TopSearch {...searchProps} />
        <ImmutableTable
          loading={loading}
          columns={columns}
          // rowSelection={rowSelection}
          dataSource={question}
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

Question.propTypes = {
  pathJump: React.PropTypes.func
}

const mapStateToProps = state => ({
  question: state.getIn(['question', 'question']),
  count: state.getIn(['question', 'count']),
  questionInfo: state.getIn(['question', 'questionInfo'])
})

export default injectIntl(connect(mapStateToProps)(Question))

// const WrappedSystemUser = Form.create()();
