/*
 * @Author: Maoguijun
 * @Date: 2018-01-03 16:32:20
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-03-08 15:40:57
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
import { ImmutableTable } from '../../../../../components/antd/Table'
import ImmutablePropTypes from 'react-immutable-proptypes'
import SimpleForm from '../../../../../components/antd/SimpleForm'
import { Link } from 'react-router'
import { pathJump } from '../../../../../utils/'
import { encryptSha256 } from '../../../../../utils/common'
import TopSearch from '../../../../../components/search/topSearch'
import Title from '../../../../../components/title/title'
import {
  host,
  titles as _tit,
  teacher_tableField as _teacher,
  fieldList,
  activeStatus,
  picURL,
  fieldListConfig,
  emailTest,
  passwordTest,
  mobileTest
} from '../../../../../config'
import Immutable from 'immutable'
import { formatMoney } from '../../../../../utils/formatData'
import { getFormRequired } from '../../../../../utils/common'
import {
  fetchTeacherInfo,
  newTeacher,
  updateTeacher,
  operateTeacher,
  fetchTeacher,
  updateTeacherPwd,
  deleteTeacher
} from '../modules/teacherDetail'
import TableTitle from '../../../../../components/TableTitle/TableTitle'
import './teacherDetail.scss'
import { teacherDetailData } from '../../../../../testData'
import { isEmail } from 'validator'
const Option = Select.Option
const Search = Input.Search
const RadioGroup = Radio.Group
const FormItem = Form.Item
const { TextArea } = Input

const TabPane = Tabs.TabPane
const { MonthPicker, RangePicker } = DatePicker
import moment from 'moment'

class TeacherDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      teacherFlowStatus: 1,
      slideList: [],
      picModal: false,
      teacherInfo: Immutable.fromJS({
        person: {}
      }),
      portrait: '',
      textContent: '',
      pwdModal: false
    }
  }
  /**
   *
   *
   * @memberof TeacherDetail
   */
  componentWillMount () {
    const { dispatch, params, location } = this.props

    if (params.id !== 'new') {
      this.setState({ loading: true })
      dispatch(fetchTeacherInfo(params.id)).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
        } else {
          console.log(e.payload)
          this.setState({
            teacherInfo: Immutable.fromJS(e.payload),
            loading: false,
            portrait: e.payload.person.portrait,
            teacherFlowStatus: e.payload.person.account.accountStatus
          })
        }
      })
    }
  }
  // 上传
  beforeUpload = file => {
    const { intl: { formatMessage } } = this.props
    console.log(643, file.type)
    const isPIC = ['image/jpeg', 'image/png', 'image/gif'].some(item => item === file.type)
    if (!isPIC) {
      message.error(formatMessage({ id: 'plsUploadImage' }), 1)
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error(formatMessage({ id: 'plsLess2' }), 1)
    }
    return isPIC && isLt2M
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  handleSlideChange = ({ fileList }) => {
    // if(fileList[0].status ==="done"){
    //   message.success(`${fileList[0].name}   upload success`)
    // }
    console.log(672, fileList)
    this.setState({ slideList: fileList })
  }

  handlePicModal = () => {
    const { teacherInfo, slideList } = this.state
    let portrait = ''
    console.log(143, slideList)
    portrait = slideList[0].response.name
    this.setState({
      portrait,
      picModal: false
    })
  }
  receiveRaw = content => {
    console.log('recieved Raw content', content)
  }
  create = () => {
    // todo
    const { dispatch, intl: { formatMessage } } = this.props
    const { portrait } = this.state
    this.setState({
      btnLoading: true
    })
    this.formRef.validateFields((error, value) => {
      if (error) {
        message.info(formatMessage({ id: 'checkRuler' }), 1)
        this.setState({
          btnLoading: false
        })
        return
      }
      console.log(value)
      value.field = value.field
        .map(item => {
          for (let key in fieldListConfig) {
            if (item === formatMessage({ id: fieldListConfig[key] })) {
              return key
            }
          }
        })
        .sort((a, b) => a - b)
      let json = {
        portrait,
        ...value,
        password: encryptSha256(value.password),
        nickName: value.name,
        field: value.field.toString()
      }
      console.log(json)
      dispatch(newTeacher(json)).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
          this.setState({
            btnLoading:false
          })
        } else {
          message.success(formatMessage({ id: 'submitSuccess' }), 1)
          dispatch(pathJump('/teacher'))
          this.setState({
            btnLoading:false
          })
        }
      })
    })
  }
  update = () => {
    // todo
    const { dispatch, intl: { formatMessage }, params } = this.props
    const { portrait } = this.state
    this.setState({
      btnLoading: true
    })
    this.formRef.validateFields((error, value) => {
      if (error) {
        message.info(formatMessage({ id: 'checkRuler' }), 1)
        this.setState({
          btnLoading: false
        })
        return
      }
      console.log(value)
      console.log(value)
      value.field = value.field
        .map(item => {
          for (let key in fieldListConfig) {
            if (item === formatMessage({ id: fieldListConfig[key] })) {
              return key
            }
          }
        })
        .sort((a, b) => a - b)
      let json = {
        portrait,
        ...value,
        nickName: value.name,
        field: value.field.toString()
      }
      console.log(json)
      dispatch(updateTeacher(params.id, json)).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
          this.setState({
            btnLoading: false
          })
        } else {
          message.success(formatMessage({ id: 'saveSuccess' }), 1)
          dispatch(pathJump('/teacher'))
          this.setState({
            btnLoading: false
          })
        }
      })
    })
  }
  operation = operation => {
    const { dispatch, intl: { formatMessage }, params } = this.props
    const { teacherInfo } = this.state
    if (operation === 'active') {
      let json = {
        ids: [teacherInfo.getIn(['person', 'account', 'id'])],
        accountStatus: 1
      }
      dispatch(operateTeacher(params.id, json)).then(e => {
        if (!e.error) {
          message.success('success', 1)
          dispatch(fetchTeacherInfo(params.id)).then(event => {
            if (event.error) {
              message.error(e.error.message, 1)
            } else {
              this.setState({
                teacherInfo: Immutable.fromJS(e.payload),
                loading: false,
                portrait: e.payload.person.portrait,
                teacherFlowStatus: e.payload.person.account.accountStatus
              })
            }
          })
        }
      })
    } else if (operation === 'suspend') {
      let json = {
        ids: [teacherInfo.getIn(['person', 'account', 'id'])],
        accountStatus: 0
      }
      dispatch(operateTeacher(params.id, json)).then(e => {
        if (!e.error) {
          message.success('success', 1)
          dispatch(fetchTeacherInfo(params.id)).then(event => {
            if (event.error) {
              message.error(e.error.message, 1)
            } else {
              this.setState({
                teacherInfo: Immutable.fromJS(e.payload),
                loading: false,
                portrait: e.payload.person.portrait,
                teacherFlowStatus: e.payload.person.account.accountStatus
              })
            }
          })
        }
      })
    }
  }
  // 下拉框的筛选
  filterOption = (inputValue, option) => {
    // console.log(299,inputValue, option)
    return option.props.children.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
  }
  render () {
    const { intl: { formatMessage }, location: { pathname }, params, dispatch } = this.props
    const { loading, teacherFlowStatus, picModal, slideList, textContent, teacherInfo, portrait, pwdModal } = this.state
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )
    const renderOption = config => {
      // console.log(269,config)
      if (config) {
        return config.map(v => <Option key={v}>{v}</Option>)
      }
    }
    const formColumns = [
      {
        dataIndex: _teacher.status,
        show: params.id === 'new',
        FormTag: (
          <span>
            {teacherInfo.getIn(['person', 'account', 'accountStatus']) !== undefined &&
              formatMessage({ id: activeStatus[teacherInfo.getIn(['person', 'account', 'accountStatus'])] })}
          </span>
        )
      },
      {
        dataIndex: _teacher.name,
        deep: ['person', 'name']
      },
      {
        dataIndex: _teacher.mail,
        deep: ['person', 'account', 'mail'],
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
        dataIndex: _teacher.password,
        show: params.id !== 'new',
        deep: ['person', 'account', 'password'],
        option: { rules: [{ required: true, message: ' ', pattern: passwordTest }] },
        FormTag: <Input type='password' placeholder={formatMessage({ id: 'teacherDetail_password' })} />
      },
      {
        dataIndex: _teacher.position_zh
      },
      {
        dataIndex: _teacher.position_en
      },
      {
        dataIndex: _teacher.companyName
      },
      {
        dataIndex: _teacher.field,
        FormTag: (
          <Select
            mode='multiple'
            allowClear
            placeholder='Please select'
            filterOption={(inputValue, option) => this.filterOption(inputValue, option)}
          >
            {renderOption(fieldList.map(item => formatMessage({ id: item })))}
          </Select>
        )
      },
      { dataIndex: _teacher.introduction_zh, FormTag: <TextArea autosize={{ minRows: 5, maxCols: 6 }} /> },
      { dataIndex: _teacher.introduction_en, FormTag: <TextArea autosize={{ minRows: 5, maxCols: 6 }} /> }
    ]
      .map(item => {
        if (item.dataIndex !== 'status') {
          return {
            ...item,
            title: formatMessage({ id: `teacherDetail_${item.dataIndex}` }),
            option: item.option || { rules: [{ required: true, message: ' ' }] },
            placeholder: formatMessage({ id: `teacherDetail_${item.dataIndex}` })
          }
        } else {
          return {
            ...item,
            title: formatMessage({ id: `teacherDetail_${item.dataIndex}` }),
            placeholder: formatMessage({ id: `teacherDetail_${item.dataIndex}` })
          }
        }
      })
      .filter(item => {
        if (!item.show) {
          return item
        }
      })
    return (
      <Row>
        <Title
          title={
            params.id !== 'new'
              ? formatMessage({ id: `${_tit.teacherDetail}` })
              : formatMessage({ id: `${_tit.newTeacher}` })
          }
          rightContent={
            params.id !== 'new' && (
              <Row style={{ width: '100%', textAlign: 'right' }}>
                <Button onClick={() => this.setState({ pwdModal: true })} style={{ marginRight: 24 }}>
                  {formatMessage({ id: 'update_password' })}
                </Button>
                <Button
                  onClick={() => this.operation('active')}
                  style={{ marginRight: 24 }}
                  disabled={teacherFlowStatus}
                >
                  {formatMessage({ id: 'active' })}
                </Button>
                <Button
                  onClick={() => this.operation('suspend')}
                  style={{ marginRight: 24 }}
                  disabled={!teacherFlowStatus}
                >
                  {formatMessage({ id: 'suspend' })}
                </Button>
                {/* {params.id !== 'new' && (
                  <Button
                    type='danger'
                    onClick={() => {
                      const { dispatch } = this.props
                      dispatch(deleteTeacher(params.id)).then(e => {
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
                )} */}
              </Row>
            )
          }
        />
        <Card loading={loading} hoverable className={'wrap-card wrap-new'}>
          {params.id !== 'new' && (
            <div className='button-left-group'>
              <div>
                <Button
                  onClick={() => {
                    const { dispatch, params } = this.props
                    dispatch(pathJump(`/question?teacher=${params.id}`))
                  }}
                >
                  {formatMessage({ id: 'answerWithThisTeacher' })}
                </Button>
              </div>
              <div className='button-one'>
                <Button
                  onClick={() => {
                    const { dispatch, params } = this.props
                    dispatch(pathJump(`/course?teacher=${params.id}`))
                  }}
                >
                  {formatMessage({ id: 'courseWithThisTeacher' })}
                </Button>
              </div>
              <div className='button-one'>
                <Button
                  onClick={() => {
                    const { dispatch, params } = this.props
                    dispatch(pathJump(`/works?teacher=${params.id}`))
                  }}
                >
                  {formatMessage({ id: 'workWithThisTeacher' })}
                </Button>
              </div>
            </div>
          )}
          <Row style={{ width: 1000, margin: '0 auto' }}>
            <Col span={24} style={{ padding: '16px 165px' }}>
              {portrait ? (
                <Avatar
                  onClick={() => this.setState({ picModal: true })}
                  src={teacherInfo && `${picURL}${portrait}`}
                  className='user-header'
                />
              ) : (
                <Avatar
                  className='user-header'
                  style={{ paddingTop: 16 }}
                  onClick={() => this.setState({ picModal: true })}
                >
                  <Icon type='plus' />
                  <div className='ant-upload-text'>Upload</div>
                </Avatar>
              )}
            </Col>
            <Col span={24}>
              <SimpleForm
                columns={formColumns}
                initial={teacherInfo}
                colSpan={24}
                labelCol={{ span: 4 }}
                onChange={this.changeForm}
                hideRequiredMark
                ref={f => {
                  this.formRef = f
                }}
              />
            </Col>
          </Row>
          <Row style={{ width: 1000, margin: '32px auto' }}>
            <Col span={12} style={{ textAlign: 'center' }}>
              {params.id === 'new' && (
                <div>
                  <Button onClick={() => this.create()} style={{ marginRight: 24 }} type='primary'>
                    {formatMessage({ id: 'create' })}
                  </Button>
                  <Button onClick={() => this.newOne()} style={{ marginRight: 24 }}>
                    {formatMessage({ id: 'cancel' })}
                  </Button>
                </div>
              )}

              {params.id !== 'new' && (
                <div>
                  <Button
                    loading={this.state.btnLoading}
                    onClick={() => this.update()}
                    style={{ marginRight: 24 }}
                    type='primary'
                  >
                    {formatMessage({ id: 'save_btn' })}
                  </Button>
                  <Button
                    onClick={() => {
                      dispatch(pathJump('teacher'))
                    }}
                    style={{ marginRight: 24 }}
                  >
                    {formatMessage({ id: 'back' })}
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Card>
        <Modal
          visible={picModal}
          onCancel={() => this.setState({ uploadId: null, picModal: false, slideList: [] })}
          title={formatMessage({ id: 'headerPic' })}
          onOk={this.handlePicModal}
          maskClosable={false}
          width={500}
        >
          <Row style={{ marginTop: 50, marginBottom: 50 }}>
            <Upload
              listType='picture-card'
              action={`${host}/upload`}
              beforeUpload={this.beforeUpload}
              onPreview={this.handlePreview}
              onChange={this.handleSlideChange}
              fileList={slideList}
              name='file'
            >
              {slideList.length >= 1 ? null : uploadButton}
            </Upload>
            <Col>{'只能上传图片.jpg .png .gif 并且只能小于2MB'}</Col>
          </Row>
        </Modal>
        <Modal
          title={formatMessage({ id: 'updatePWD' })}
          visible={pwdModal}
          onOk={() => {
            const { dispatch, params } = this.props
            dispatch(updateTeacherPwd(params.id)).then(e => {
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
          <p style={{ color: '#e43937' }}>{'是否生成一个随机密码发送到讲师邮箱？'}</p>
        </Modal>
      </Row>
    )
  }
}

TeacherDetail.propTypes = {
  pathJump: React.PropTypes.func
}

const mapStateToProps = state => {
  console.log(277, state && state.toJS())
  // let _vat_credit = state.getIn([])
  return {
    // teacherInfo: state.getIn(['teacherDetail', 'teacherInfo'])
  }
}

export default Form.create()(injectIntl(connect(mapStateToProps)(TeacherDetail)))
