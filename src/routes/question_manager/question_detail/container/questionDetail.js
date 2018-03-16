/*
 * @Author: Maoguijun
 * @Date: 2018-01-03 16:32:20
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-02-08 15:25:49
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
  question_tableField as _question,
  positionList,
  activeStatus,
  questionReplyType
} from '../../../../config'
import Immutable from 'immutable'
import { formatMoney } from '../../../../utils/formatData'
import { getFormRequired } from '../../../../utils/common'
import { fetchQuestionInfo, newQuestion, updateQuestion, operateQuestion } from '../modules/questionDetail'
import TableTitle from '../../../../components/TableTitle/TableTitle'
import './questionDetail_.scss'
import { questionDetailData } from '../../../../testData'
const Option = Select.Option
const Search = Input.Search
const RadioGroup = Radio.Group
const FormItem = Form.Item
const { TextArea } = Input

const TabPane = Tabs.TabPane
const { MonthPicker, RangePicker } = DatePicker
import moment from 'moment'
import { fetchCourse } from '../../../question_manager/modules/question'

class QuestionDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      questionFlowStatus: 'active',
      slideList: [],
      picModal: false,
      questionInfo: Immutable.fromJS({}),
      textContent: '',
      tableLoading: false,
      replyContent: ''
    }
  }
  /**
   *
   *
   * @memberof QuestionDetail
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
      // dispatch(fetchCourse(json))
      dispatch(fetchQuestionInfo(params.id)).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
        } else {
          console.log(e.payload)
          this.setState({
            questionInfo: Immutable.fromJS(e.payload),
            replyContent: e.payload.fathQuestions && e.payload.fathQuestions[0] && e.payload.fathQuestions[0].content,
            loading: false
          })
        }
      })
    }
  }
  update = () => {
    // todo
    const { dispatch, intl: { formatMessage } } = this.props
    this.formRef.validateFields((error, value) => {
      if (error) {
        message.info(formatMessage({ id: 'checkRuler' }), 1)
        return
      }
      console.log(value)
      // dispatch()
    })
  }
  newReply = () => {
    const { dispatch } = this.props
    const { questionInfo } = this.state
    console.log(125, this.props, this.formRef)
    this.props.form.validateFields((err, value) => {
      if (err) {
        console.log(err.message)
        return
      } else {
        let json = {
          fatherId: questionInfo.get('id'),
          content: value.replyContent
        }
        dispatch(newQuestion(json)).then(e => {
          if (e.error) {
            message.error(e.error.message, 1)
          } else {
            dispatch(pathJump('/question'))
          }
        })
      }
    })
  }
  render () {
    const { intl: { formatMessage }, location: { pathname }, params, dispatch, count } = this.props
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
    const {
      loading,
      questionFlowStatus,
      picModal,
      slideList,
      textContent,
      currentPage,
      tableLoading,
      questionInfo,
      replyContent
    } = this.state
    const renderForm = (v, column) => {
      if (column.trans) {
        return column.trans(v, column.config)
      } else if (column.format) {
        return column.format(v).map((t, i) => <Row key={i}>{t}</Row>)
      } else {
        return v && v.toString()
      }
    }
    const columnMap = column => {
      let bold = column.bold
      let text
      let styleHeight = { border: 0 }
      if (column.dataIndex === 'content') {
        styleHeight = { ...styleHeight, height: 'auto' }
      }

      if (questionInfo) {
        text = column.deep ? questionInfo.getIn(column.deep) : questionInfo.get(column.dataIndex)
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
              {formatMessage({ id: `questionDetail_${column.dataIndex}` })}
            </Col>
          )}
          <Col span={column.valueSpan || 16} className={`payment-value ${column.className || ''}`}>
            {renderForm(text, column)}
          </Col>
        </Col>
      )
    }
    const formColumns = [
      { dataIndex: _question.courseName_zh, deep: ['course', 'name_zh'] },
      { dataIndex: _question.chapterName_zh, deep: ['chapter', 'name_zh'] },
      {
        dataIndex: _question.type,
        render: text => (text ? formatMessage({ id: `que_${questionReplyType[text]}` }) : '')
      },
      { dataIndex: _question.qPersonName, deep: ['qPerson', 'name'] },
      { dataIndex: _question.tPersonName, deep: ['tPerson', 'name'] },
      { dataIndex: _question.content, span: 24, labelSpan: 2, className: 'padding-32' }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `questionDetail_${item.dataIndex}` }),
      placeholder: formatMessage({ id: `questionDetail_${item.dataIndex}` })
    }))
    return (
      <Row>
        <Title title={formatMessage({ id: `${_tit.questionDetail}` })} />
        <Card loading={loading} hoverable className={'wrap-card wrap-new'}>
          <Row style={{ width: 1000 }}>
            <Col span={24}>
              <Row className={'little-title'}>{'基础信息'}</Row>
              <Row className='payment-read' style={{ marginBottom: 20, border: 0 }}>
                <Col className='wrap' style={{ border: 0 }}>
                  {formColumns.map(columnMap)}
                </Col>
              </Row>
              <Row className={'little-title'}>{'回复'}</Row>
              {replyContent ? (
                <Row
                  className='payment-read'
                  style={{ margin: 20, border: '1px solid #d7d7d7', lineHeight: 1.5, padding: 8 }}
                >
                  {replyContent}
                </Row>
              ) : (
                <Form layout='inline' ref={f => (this.formRef = f)} style={{ margin: '20px 24px' }}>
                  <FormItem
                    style={{ width: '100%' }}
                    // label={formatMessage({ id: 'questionDetail_replyContent' })}
                    // labelCol={{ xs: { span: 24 }, sm: { span: 3 } }}
                    wrapperCol={{
                      xs: { span: 24 },
                      sm: { span: 24 }
                    }}
                  >
                    {getFieldDecorator('replyContent', {
                      rules: [{ required: true, message: 'Please input your reply!' }]
                    })(<TextArea style={{ width: '100%', minHeight: 100 }} autosize={{ minRows: 2, minCols: 6 }} />)}
                  </FormItem>
                </Form>
              )}
            </Col>
          </Row>
          <Row style={{ width: 1000, textAlign: 'center', marginTop: 24 }}>
            {!replyContent && (
              <Button type='primary' onClick={() => this.newReply()} style={{ marginRight: 24 }}>
                {formatMessage({ id: 'new_btn' })}
              </Button>
            )}
            <Button
              onClick={() => {
                const { dispatch } = this.props
                dispatch(pathJump('/question'))
              }}
            >
              {formatMessage({ id: 'back' })}
            </Button>
          </Row>
        </Card>
      </Row>
    )
  }
}

QuestionDetail.propTypes = {
  pathJump: React.PropTypes.func
}

const mapStateToProps = state => {
  console.log(277, state && state.toJS())
  // let _vat_credit = state.getIn([])
  return {
    // questionInfo: state.getIn(['questionDetail', 'questionInfo'])
    // question: state.getIn(['question', 'question']),
    // count: state.getIn(['question', 'count'])
  }
}

export default Form.create()(injectIntl(connect(mapStateToProps)(QuestionDetail)))
