/*
 * @Author: Maoguijun
 * @Date: 2018-01-02 16:02:13
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-03-09 18:42:10
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
  Card,
  Avatar
} from 'antd'
import { connect } from 'react-redux'
import { ImmutableTable } from '../../../../../components/antd/Table'
import ImmutablePropTypes from 'react-immutable-proptypes'
import SimpleForm from '../../../../../components/antd/SimpleForm'
import { Link } from 'react-router'
import { pathJump } from '../../../../../utils/'

import TopSearch from '../../../../../components/search/topSearch'
import Title from '../../../../../components/title/title'
import {
  titles as _tit,
  FlowStatus,
  student_tableField as _student,
  course_tableField as _course,
  picURL,
  activeStatus,
  courseType,
  studentTypeArr,
  mobileTest,
  emailTest
} from '../../../../../config'
import Immutable from 'immutable'
import {
  formatDate,
  formatMoney,
  configDirectory,
  configDirectoryObject,
  configCate
} from '../../../../../utils/formatData'
import { getFormRequired } from '../../../../../utils/common'
import {
  updateStudent,
  fetchStudentInfo,
  operateStudent,
  fetchStudCoursePermissions,
  updateStudentPwd,
  deleteStudent
} from '../modules/studentDetail'
import moment from 'moment'
import { isEmail } from 'validator'
const Option = Select.Option
const Search = Input.Search

import './studentDetail_.scss'

class StudentDetail extends React.Component {
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
      tableLoading: false,
      count: 0,
      pwdModal: false,
      studentFlowStatus: 1,
      studentInfo: Immutable.fromJS({})
    }
  }

  componentWillMount () {
    const { dispatch, params, location } = this.props
    // console.log('this.props',this.props)
    this.setState({ loading: true })
    let json = {
      limit: 20,
      offset: 0,
      studentId: params.id
    }
    dispatch(fetchStudCoursePermissions(json))
    dispatch(fetchStudentInfo(params.id)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
      } else {
        let value = {
          ...e.payload.person.account,
          ...e.payload.person,
          ...e.payload
        }
        console.log(105, value)
        this.setState({
          loading: false,
          studentInfo: Immutable.fromJS(value),
          studentFlowStatus: e.payload.person && e.payload.person.account && e.payload.person.account.accountStatus
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
    // const container = document.querySelector(".ant-table-tbody");
    // const drake = dragula([container], {
    //   moves: (el, container, handle, sibling) => {
    //     this.start = this.getIndexInParent(el);
    //     return true;
    //   }
    // });
    // drake.on("drop", (el, target, source, sibling) => {
    //   this.end = this.getIndexInParent(el);
    //   this.handleReorder(this.start, this.end);
    // });
  }
  // getIndexInParent = el => {
  //   return Array.from(el.parentNode.children).indexOf(el);
  // };

  onFetch = (values, limit, offset, cur = 1, p) => {
    this.setState({ tableLoading: true, currentPage: cur })
    const { dispatch } = this.props
    values = {
      ...values,
      limit: limit,
      offset: offset
    }
    dispatch(fetchStudCoursePermissions(values)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
        this.setState({ tableLoading: false })
      } else {
        this.setState({
          tableLoading: false
        })
      }
    })
  }

  changeTable = (pagination, filters, sorter) => {
    const { params } = this.props
    // console.log(pagination, filters, sorter)
    const limit = 20
    const offset = (pagination.current - 1) * limit
    this.onFetch({ studentId: params.id }, limit, offset, pagination.current, 1)
  }

  getRequiredMessage = (e, type) => {
    return getFormRequired(this.props.intl.formatMessage({ id: 'input_require' }, { name: e }), type)
  }
  operation = operation => {
    const { dispatch, intl: { formatMessage }, params } = this.props
    const { studentInfo } = this.state
    // 遍历每个student的状态是否满足接下来的操作
    if (operation === 'active') {
      let json = {
        ids: [studentInfo.getIn(['person', 'account', 'id'])],
        accountStatus: 1
      }
      dispatch(operateStudent(params.id, json)).then(e => {
        if (!e.error) {
          message.success('success', 1)
          dispatch(fetchStudentInfo(params.id)).then(event => {
            let value = {
              ...event.payload.person.account,
              ...event.payload.person,
              ...event.payload
            }
            // console.log(value)
            this.setState({
              loading: false,
              studentInfo: Immutable.fromJS(value),
              studentFlowStatus:
                event.payload.person && event.payload.person.account && event.payload.person.account.accountStatus
            })
          })
        }
      })
    } else if (operation === 'suspend') {
      let json = {
        ids: [studentInfo.getIn(['person', 'account', 'id'])],
        accountStatus: 0
      }
      dispatch(operateStudent(params.id, json)).then(e => {
        if (!e.error) {
          message.success('success', 1)
          dispatch(fetchStudentInfo(params.id)).then(event => {
            let value = {
              ...event.payload.person.account,
              ...event.payload.person,
              ...event.payload
            }
            // console.log(value)
            this.setState({
              loading: false,
              studentInfo: Immutable.fromJS(value),
              studentFlowStatus:
                event.payload.person && event.payload.person.account && event.payload.person.account.accountStatus
            })
          })
        }
      })
    }
  }
  updateStudent = () => {
    const { dispatch, params } = this.props
    this.formRef.validateFieldsAndScroll((err, value) => {
      if (err) {
        console.log(err)
      } else {
        console.log(value)
        dispatch(updateStudent(params.id, value)).then(e => {
          if (e.error) {
            message.error(e.error.message, 1)
          } else {
            message.success('save success', 1)
            dispatch(pathJump('/student'))
          }
        })
      }
    })
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
    const { intl: { formatMessage }, location: { pathname }, count, student, course, params } = this.props
    const { loading, studentFlowStatus, currentPage, tableLoading, studentInfo, pwdModal } = this.state
    // console.log('state',this.state)
    const renderForm = (v, column) => {
      if (column.trans) {
        return column.trans(v, column.config)
      } else if (column.format) {
        return column.format(v).map((t, i) => <Row key={i}>{t}</Row>)
      } else {
        return v && v.toString()
      }
    }
    const columns = [
      {
        dataIndex: _course.name_zh,
        render: (text, record, index) => record.getIn(['course', 'name_zh'])
      },
      {
        dataIndex: _course.name_en,
        render: (text, record, index) => record.getIn(['course', 'name_en'])
      },
      { dataIndex: _course.startDt, render: (text, record, index) => (text ? moment(text).format('YYYY-MM-DD') : '') },
      { dataIndex: _course.endDt, render: (text, record, index) => (text ? moment(text).format('YYYY-MM-DD') : '') },
      {
        dataIndex: _course.videoType,
        render: (text, record, index) => {
          return formatMessage({ id: courseType[record.getIn(['coursePermission', 'type'])] })
        }
      },
      {
        dataIndex: _course.courseStatus,
        render: (text, record, index) => {
          return formatMessage({ id: activeStatus[record.getIn(['course', 'courseStatus'])] })
        }
      }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `course_${item.dataIndex}` })
    }))

    const columnMap = column => {
      let bold = column.bold
      let text
      let styleHeight = { border: 0 }
      if (column.dataIndex === 'description') {
        styleHeight = { ...styleHeight, height: 'auto' }
      }

      if (studentInfo) {
        text = column.deep ? studentInfo.getIn(column.deep) : studentInfo.get(column.dataIndex)
        if (column.render) {
          text = column.render(text)
        }
      } else {
        text = ''
      }

      return (
        <Col key={column.dataIndex} span={column.span || 8} className={`payment-item`} style={styleHeight}>
          {!column.noLabel && (
            <Col span={column.labelSpan || 8} className='payment-label' style={{ fontWeight: 'bold' }}>
              {formatMessage({ id: `studentDetail_${column.dataIndex}` })}
            </Col>
          )}
          <Col span={column.valueSpan || 16} className={`payment-value ${column.className}`}>
            {renderForm(text, column)}
          </Col>
        </Col>
      )
    }
    const renderCompany = () => {
      let student_ = studentInfo && studentInfo.toJS()
      let arr = []
      console.log(314, student_)
      if (student_ && student_.companies) {
        student_.companies.forEach(item => {
          arr.push(item.name)
        })
      }
      return arr.toString()
    }
    const renderGroup = () => {
      let student_ = studentInfo && studentInfo.toJS()
      let arr = []
      console.log(314, student_)
      if (student_ && student_.groups) {
        student_.groups.forEach(item => {
          arr.push(
            <Button
              style={{ marginLeft: 8 }}
              type='primary'
              key={item.id}
              onClick={() => {
                const { dispatch } = this.props
                dispatch(pathJump(`/company/companyDetail/${item.companyId}?group=${item.id}`))
              }}
            >
              {item.name_zh}
            </Button>
          )
        })
      }
      return arr
    }

    const formColumns1 = [
      {
        dataIndex: _student.createdAt,
        span: 12,
        render: text => (text ? moment(text).format('YYYY-MM-DD') : '')
      },
      {
        dataIndex: _student.lastLoginTime,
        span: 12,
        render: text => (text ? moment(text).format('YYYY-MM-DD') : '')
      },
      {
        dataIndex: _student.status,
        deep: ['person', 'account', 'accountStatus'],
        render: text => (text !== undefined ? formatMessage({ id: activeStatus[text] }) : ''),
        span: 12
      },
      {
        dataIndex: _student.studentType,
        span: 12,
        render: text => (text ? formatMessage({ id: studentTypeArr[text] }) : '')
      }
      // { dataIndex: _student.workExperience, span: 12 }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `studentDetail_${item.dataIndex}` })
    }))
    const formColumns2 = [
      {
        dataIndex: _student.name,
        option: { rules: [{ required: true, message: ' ' }] }
      },
      // {
      //   dataIndex: _student.nickName,
      //   option: { rules: [{ required: true, message: ' ' }] }
      // },
      {
        dataIndex: _student.position,
        option: { rules: [{ required: true, message: ' ' }] }
      },
      // {
      //   dataIndex: _student.birthday,
      //   FormTag: <DatePicker style={{ width: 200 }} />,
      //   option: { rules: [{ required: true, message: ' ' }] }
      // },
      // {
      //   dataIndex: _student.mobile,
      //   option: { rules: [{ pattern: mobileTest }] }
      // },
      {
        dataIndex: _student.mail,
        option: {
          rules: [
            {
              required: true,
              message: ' ',
              validator: (rule, value, cb) => {
                if (isEmail(value)) {
                  cb()
                } else {
                  cb(false)
                }
              }
            }
          ]
        }
      },
      {
        dataIndex: _student.companyName,
        FormTag: <span>{renderCompany()}</span>
      },

      {
        dataIndex: _student.groupNameZh,
        FormTag: <span>{renderGroup()}</span>
      }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `studentDetail_${item.dataIndex}` })
    }))

    return (
      <Row>
        <Title
          title={formatMessage({ id: `${_tit.studentDetail}` })}
          rightContent={
            <Row style={{ width: '100%', textAlign: 'right' }}>
              <Button onClick={() => this.setState({ pwdModal: true })} style={{ marginRight: 24 }}>
                {formatMessage({ id: 'update_password' })}
              </Button>
              <Button onClick={() => this.updateStudent()} style={{ marginRight: 24 }}>
                {formatMessage({ id: 'save_btn' })}
              </Button>
              <Button onClick={() => this.operation('active')} style={{ marginRight: 24 }} disabled={studentFlowStatus}>
                {formatMessage({ id: 'active' })}
              </Button>
              <Button
                onClick={() => this.operation('suspend')}
                style={{ marginRight: 24 }}
                disabled={!studentFlowStatus}
              >
                {formatMessage({ id: 'suspend' })}
              </Button>
              {params.id !== 'new' && (
                <Button
                  type='danger'
                  onClick={() => {
                    const { dispatch } = this.props
                    dispatch(deleteStudent(params.id)).then(e => {
                      if (e.error) {
                        message.error(e.error.message, 1)
                      } else {
                        history.back()
                      }
                    })
                  }}
                  style={{ marginRight: 24 }}
                >
                  {formatMessage({ id: 'delete' })}
                </Button>
              )}
            </Row>
          }
        />
        <Card loading={loading} hoverable className={'wrap-card wrap-new'}>
          <Row style={{ width: 1000 }}>
            <Col span={24} style={{ padding: '16px 106px' }}>
              <Avatar
                src={studentInfo && `${picURL}${studentInfo.getIn(['person', 'portrait'])}`}
                className='user-header'
              />
            </Col>
            <Col span={24}>
              <Row className='payment-read' style={{ margin: '10px 50px 20px', border: 0 }}>
                <Col className='wrap' style={{ border: 0, margin: '0 32px' }}>
                  {formColumns1.map(columnMap)}
                </Col>
              </Row>
              <Row className='payment-read' style={{ margin: '10px 50px 20px', border: 0 }}>
                <Col style={{ margin: '0 32px' }} className='labelLeft'>
                  <SimpleForm
                    columns={formColumns2}
                    initial={studentInfo}
                    colSpan={12}
                    labelCol={{ span: 8 }}
                    onChange={this.changeForm}
                    hideRequiredMark
                    ref={f => {
                      this.formRef = f
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <ImmutableTable
                loading={tableLoading}
                columns={columns}
                // rowSelection={rowSelection}
                dataSource={course}
                title={() => <Row>{formatMessage({ id: 'courseByStudent' })}</Row>}
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
        <Modal
          title={formatMessage({ id: 'updatePWD' })}
          visible={pwdModal}
          onOk={() => {
            const { dispatch, params } = this.props
            dispatch(updateStudentPwd(params.id)).then(e => {
              if (e.error) {
                message.error(e.error.message, 1)
                return
              } else {
                message.success('update success', 1)
                this.setState({ pwdModal: false })
              }
            })
          }}
          onCancel={() => this.setState({ pwdModal: false })}
        >
          <p style={{ color: '#e43937' }}>{'是否生成一个随机密码发送到学员邮箱？'}</p>
        </Modal>
      </Row>
    )
  }
}

StudentDetail.propTypes = {
  pathJump: React.PropTypes.func
}

const mapStateToProps = state => {
  console.log('state', state && state.toJS())
  return {
    // studentInfo: state.getIn(['studentDetail', 'studentInfo']),
    course: state.getIn(['studentDetail', 'course']),
    count: state.getIn(['studentDetail', 'count'])
  }
}

export default injectIntl(connect(mapStateToProps)(StudentDetail))

// const WrappedSystemUser = Form.create()();
