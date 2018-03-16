/*
 * @Author: Maoguijun
 * @Date: 2018-01-02 12:16:58
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-02-28 17:10:24
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
import { titles as _tit, FlowStatus, company_tableField as _company, tableLimit } from '../../../config'
import Immutable from 'immutable'
import { formatDate, formatMoney, configDirectory, configDirectoryObject, configCate } from '../../../utils/formatData'
import { getFormRequired } from '../../../utils/common'
import { fetchCompany, newCompany, altCompany, fetchCompanyInfo, operateCompany } from '../modules/company'
import moment from 'moment'
const Option = Select.Option
const Search = Input.Search

import './company_.scss'

class Company extends React.Component {
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
    dispatch(fetchCompany(json)).then(e => {
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
    dispatch(fetchCompany(values)).then(e => {
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
    dispatch(pathJump(`company/companyDetail/${id}`))
  }
  operation = operation => {
    const { dispatch } = this.props
    // to do
    console.log(operation)
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
    const { intl: { formatMessage }, location: { pathname }, count, company, companyInfo, dispatch } = this.props
    const { loading, currentPage, modal, modalLoad, itemId, modal_t, status, modalTLoad } = this.state
    // console.log('state',this.state)
    console.log('hhhhh', companyInfo && companyInfo.toJS())
    const columns = [
      {
        dataIndex: _company.name
      },
      {
        dataIndex: _company.companyOperationer
      },
      { dataIndex: _company.createdAt, render: text => (text ? moment(text).format('YYYY-MM-DD') : '') },
      { dataIndex: _company.updatedAt, render: text => (text ? moment(text).format('YYYY-MM-DD') : '') },
      // { dataIndex: _company.createdUser },
      // { dataIndex: _company.companyStatus },
      {
        dataIndex: _company.detail,
        render: (text, record, index) => {
          return <a onClick={() => this.detail(record.get('id'))}>{formatMessage({ id: 'detail' })}</a>
        }
      }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `company_${item.dataIndex}` })
    }))
    this.formColumns = [
      // {
      //   dataIndex: 'companyStatus',
      //   type: 'select_obj',
      //   noLocal: true,
      //   selectOption: FlowStatus,
      //   props: {
      //     onChange: value => {
      //       this.setState({ searchColumn: { ...this.state.searchColumn, companyStatus: value } })
      //     }
      //   }
      // },
      {
        dataIndex: 'name',
        title: formatMessage({ id: `search_companyName` })
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
    ].map(item => ({
      ...item,
      props: item.props || {
        onChange: e => {
          this.setState({ searchColumn: { ...this.state.searchColumn, [item.dataIndex]: e.target.value } })
        }
      },
      title: item.title || formatMessage({ id: `search_${item.dataIndex}` })
    }))
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
        <Title title={formatMessage({ id: `${_tit.company}` })} />
        <TopSearch {...searchProps} />
        <ImmutableTable
          loading={loading}
          columns={columns}
          rowSelection={rowSelection}
          dataSource={company}
          title={() => (
            <Row>
              <Button
                onClick={() => {
                  dispatch(pathJump('company/companyDetail/new'))
                }}
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
      </Row>
    )
  }
}

Company.propTypes = {
  pathJump: React.PropTypes.func
}

const mapStateToProps = state => ({
  company: state.getIn(['company', 'company']),
  count: state.getIn(['company', 'count']),
  companyInfo: state.getIn(['company', 'companyInfo'])
})

export default injectIntl(connect(mapStateToProps)(Company))

// const WrappedSystemUser = Form.create()();
