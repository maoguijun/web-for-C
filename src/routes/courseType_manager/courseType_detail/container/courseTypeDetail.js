/*
 * @Author: Maoguijun
 * @Date: 2018-01-03 16:32:20
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-03-13 11:56:26
 */
import React from 'react'
import { injectIntl } from 'react-intl'
import {
  Form,
  InputNumber,
  Radio,
  Row,
  message,
  Card,
  Spin,
  Button,
  Pagination,
  Modal,
  Col,
  Select,
  Input,
  DatePicker,
  Upload,
  Icon,
  Tooltip,
  Menu,
  Tabs,
  Popconfirm,
  Avatar
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
  host,
  titles as _tit,
  courseType_tableField as _courseType,
  positionList,
  course_tableField as _course,
  activeStatus
} from '../../../../config'
import Immutable from 'immutable'
import { formatMoney } from '../../../../utils/formatData'
import { getFormRequired } from '../../../../utils/common'
import { fetchCourseTypeInfo, newCourseType, updateCourseType, operateCourseType } from '../modules/courseTypeDetail'
import TableTitle from '../../../../components/TableTitle/TableTitle'
import './courseTypeDetail_.scss'
import { courseTypeDetailData } from '../../../../testData'
const Option = Select.Option
const Search = Input.Search
const RadioGroup = Radio.Group
const FormItem = Form.Item
const { TextArea } = Input

const TabPane = Tabs.TabPane
const { MonthPicker, RangePicker } = DatePicker
import moment from 'moment'
import { fetchCourse } from '../../../course_manager/modules/course'

class CourseTypeDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      courseTypeFlowStatus: 'active',
      slideList: [],
      picModal: false,
      courseTypeInfo: Immutable.fromJS({}),
      textContent: '',
      tableLoading: false
    }
  }
  /**
   *
   *
   * @memberof CourseTypeDetail
   */
  componentWillMount () {
    const { dispatch, params, location } = this.props

    if (params.id !== 'new') {
      this.setState({ loading: true })
      let json = {
        limit: 20,
        offset: 0,
        categoryId: params.id
      }
      dispatch(fetchCourse(json))
      dispatch(fetchCourseTypeInfo(params.id)).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
        } else {
          console.log(e.payload)
          this.setState({
            courseTypeInfo: Immutable.fromJS(e.payload),
            loading: false
          })
        }
      })
    }
  }
  detail = id => {
    const { dispatch } = this.props
    dispatch(pathJump(`/course/courseDetail/${id}`))
  }
  onFetch = (values, limit, offset, cur = 1, p) => {
    this.setState({ loading: true, currentPage: cur })
    const { dispatch } = this.props
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
  save = () => {
    const { dispatch, intl: { formatMessage }, params } = this.props
    this.formRef.validateFields((err, value) => {
      if (value) {
        dispatch(updateCourseType(params.id, value)).then(e => {
          if (e.error) {
            message.error(e.error.message, 1)
          } else {
            message.success(formatMessage({ id: 'saveSuccess' }, 1))
          }
        })
      }
    })
  }

  changeTable = (pagination, filters, sorter) => {
    // console.log(pagination, filters, sorter)
    const limit = 20
    const offset = (pagination.current - 1) * limit
    this.onFetch({}, limit, offset, pagination.current, 1)
  }
  create = () => {
    // todo
    const { dispatch, intl: { formatMessage } } = this.props
    this.formRef.validateFields((error, value) => {
      if (error) {
        message.info(formatMessage({ id: 'checkRuler' }), 1)
        return
      }
      console.log(value)
      // dispatch(newCourseType(value))
    })
  }
  update = () => {
    // todo
    const { dispatch, intl: { formatMessage } } = this.props
    this.formRef.validateFields((error, value) => {
      if (error) {
        message.info(formatMessage({ id: 'checkRuler' }))
        return
      }
      console.log(value)
      // dispatch()
    })
  }
  search = () => {
    const { dispatch, params } = this.props
    console.log(this.courseName)
    let json = {
      name: this.courseName.input.value,
      categoryId: params.id
    }
    this.setState({
      tableLoading: true
    })
    dispatch(fetchCourse(json)).then(e => {
      if (!e.error) {
        this.setState({
          tableLoading: false
        })
      }
    })
  }
  render () {
    const { intl: { formatMessage }, location: { pathname }, params, dispatch, course, count } = this.props
    const {
      loading,
      courseTypeFlowStatus,
      picModal,
      slideList,
      textContent,
      courseTypeInfo,
      currentPage,
      tableLoading
    } = this.state
    const formColumns = [
      { dataIndex: _courseType.name_zh },
      { dataIndex: _courseType.name_en }
      // { dataIndex: _courseType.course }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `courseTypeDetail_${item.dataIndex}` }),
      placeholder: formatMessage({ id: `courseTypeDetail_${item.dataIndex}` })
    }))
    const columns = [
      {
        dataIndex: _course.name_zh
      },
      {
        dataIndex: _course.name_en
      },
      // {
      //   dataIndex: _course.videoName,
      //   render: (text, record, index) => record.getIn(['video', 'name'])
      // },
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
      {
        dataIndex: _course.courseStatus,
        render: (text, record, index) => formatMessage({ id: activeStatus[text] })
      },
      {
        dataIndex: _course.detail,
        render: (text, record, index) => {
          return <a onClick={() => this.detail(record.get('id'))}>{formatMessage({ id: 'detail' })}</a>
        }
      }
    ].map(item => ({
      ...item,
      width: 150,
      title: formatMessage({ id: `course_${item.dataIndex}` })
    }))
    return (
      <Row>
        <Title
          title={formatMessage({ id: `${_tit.courseTypeDetail}` })}
          rightContent={
            params.id !== 'new' && (
              <Row style={{ width: '100%', textAlign: 'right' }}>
                <Button onClick={() => this.save()} style={{ marginRight: 24 }}>
                  {formatMessage({ id: 'save_btn' })}
                </Button>
              </Row>
            )
          }
        />
        <Card loading={loading} hoverable className={'wrap-card wrap-new'}>
          <Row style={{ width: 1000 }}>
            {/* <Col span={24} style={{ marginBottom: 8 }}>
              <Col span={2} style={{ textAlign: 'right', fontSize: 14, color: 'rgba(0,0,0,.85)' }}>
                {formatMessage({ id: 'courseTypeDetail_name_zh' })}
                {'：'}
              </Col>
              <Col span={6}>{courseTypeInfo && courseTypeInfo.get('name_zh')}</Col>
            </Col> */}
            <Col span={24}>
              {/* <Col span={3}>{formatMessage({ id: 'courseTypeDetail_course' })}</Col> */}
              <Col span={12}>
                <SimpleForm
                  columns={formColumns}
                  initial={courseTypeInfo}
                  colSpan={24}
                  labelCol={{ span: 6 }}
                  // onChange={this.changeForm}
                  hideRequiredMark
                  ref={f => {
                    this.formRef = f
                  }}
                />
              </Col>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <ImmutableTable
                loading={tableLoading}
                columns={columns}
                // rowSelection={rowSelection}
                dataSource={course}
                title={() => (
                  <div>
                    <span>{formatMessage({ id: 'courseByCategory' })}</span>
                    <span style={{ marginLeft: 16 }}>
                      {formatMessage({ id: 'search_course_name_zh' })}
                      {':'}
                    </span>
                    <Input
                      ref={f => {
                        this.courseName = f
                      }}
                      style={{ width: 200, marginLeft: 8 }}
                    />
                    <Button type='primary' onClick={() => this.search()}>
                      {formatMessage({ id: 'search' })}
                    </Button>
                  </div>
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
            </Col>
          </Row>
        </Card>
      </Row>
    )
  }
}

CourseTypeDetail.propTypes = {
  pathJump: React.PropTypes.func
}

const mapStateToProps = state => {
  console.log(277, state && state.toJS())
  // let _vat_credit = state.getIn([])
  return {
    // courseTypeInfo: state.getIn(['courseTypeDetail', 'courseTypeInfo'])
    course: state.getIn(['course', 'course']),
    count: state.getIn(['course', 'count'])
  }
}

export default Form.create()(injectIntl(connect(mapStateToProps)(CourseTypeDetail)))
