/*
 * @Author: Maoguijun
 * @Date: 2018-01-03 16:32:20
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-03-16 15:22:58
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
  Avatar,
  Progress,
  Switch
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
  company_tableField as _company,
  course_tableField as _course,
  student_tableField as _student,
  group_tableField as _group,
  fieldList,
  activeStatus,
  picURL,
  fieldListConfig,
  courseType
} from '../../../../config'
import Immutable, { fromJS } from 'immutable'
import { formatMoney } from '../../../../utils/formatData'
import { getFormRequired, formmatTimeToDay } from '../../../../utils/common'
import {
  fetchCompanyInfo,
  newCompany,
  updateCompany,
  fetchUploadAuth,
  updateUploadAuth,
  fetchCourseOutCompany,
  fetchCourseInCompany,
  updateCourseInCompany,
  newCourseInCompany,
  deleteCourseInCompany,
  fetchChapter,
  fetchParagraphs,
  newCompanyPermissions,
  deleteCompanyPermissions,
  fetchStudent,
  operateStudent,
  checkStudent,
  deleteStudent,
  newStudent,
  fetchGroup,
  fetchGroupInfo,
  newGroup,
  updateGroup,
  deleteGroup,
  fetchGroupCourse,
  AddGroupCourse,
  deleteGroupCourse,
  AddGroupStudent,
  deleteGroupStudent,
  deleteCompany

} from '../modules/companyDetail'
import TableTitle from '../../../../components/TableTitle/TableTitle'
import './companyDetail_.scss'
import { companyDetailData } from '../../../../testData'
import { upTo } from '../../../../components/uploadToAliyun/uploadToAliyun'
const Option = Select.Option
const Search = Input.Search
const RadioGroup = Radio.Group
const FormItem = Form.Item
const { TextArea } = Input

const TabPane = Tabs.TabPane
const { MonthPicker, RangePicker } = DatePicker
import moment from 'moment'

class CompanyDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      tableLoading:false,
      companyFlowStatus: 'active',
      slideList: [],
      picModal: false,
      companyInfo: Immutable.fromJS({
        person: {}
      }),
      logo: '',
      textContent: '',
      CourseOutcount:0,
      CourseOutcurrentPage:1,
      tabKey:'course',
      // course
      courseModal:false,
      courseInCompnay:Immutable.fromJS([]),
      CourseInCount:0,
      CourseInCurrentPage:1,
      courseInfo:Immutable.fromJS({}),
      selectedCourseOut: Immutable.fromJS([]), // modal table 中选入的课程
      restCourseOut: Immutable.fromJS([]), // modal 待选框中剩余的课程
      filterCourseOut: Immutable.fromJS([]), // modal table 中筛选后的课程
      selectT: [], // modal 选中的课程
      serchCourseOut:'',

      selectedStudent:Immutable.fromJS([]),
      StudentCount:0,
      StudentCurrentPage:1,
      Studentselected: {
        selectedRowKeys: [],
        selectedRows: []
      },
      // modal 中的student
      studentModal:false,
      studentId:null,
      studentModalTable:Immutable.fromJS([]),
      studentModalTablecurrentPage:0,
      checkStatus:false,
      exelList:[],
      // admin
      selectedAdmin:Immutable.fromJS([]),
      Adminselected: {
        selectedRowKeys: [],
        selectedRows: []
      },
      AdminCount:0,
      AdminCurrentPage:1,
      // group
      selectedGroup:Immutable.fromJS([]),
      GroupCount:0,
      GroupCurrentPage:1,
      groupModal:false,
      groupTabKey:'courseGroup',
      restGroupCourse:Immutable.fromJS([]),
      selectC:[],
      selectedGroupCourse:Immutable.fromJS([]),
      GroupCourseCount:0,
      GroupCoursecurrentPage:1,
      selectedGroupStudent:Immutable.fromJS([]),
      GroupStudentCount:0,
      GroupStudentcurrentPage:1,
      restGroupStudent:Immutable.fromJS([]),
      selectStu:[]
    }
  }
  /**
   *
   *
   * @memberof CompanyDetail
   */
  componentWillMount () {
    const { dispatch, params, location } = this.props
    // 拉取课程
    if (params.id !== 'new') {
      this.setState({ loading: true, tableLoading:true })
      console.log(183, location)
      if (location.search) {
        let string = location.search.replace('?')
        let arr = string.split('=')
        this.setState({
          groupId:arr[1],
          tabKey:'group'
        })
      }
      dispatch(fetchCompanyInfo(params.id)).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
        } else {
          console.log(e.payload)
          // 课程权限
          if (e.payload.companyPermissions) {
            e.payload.companyPermissions.forEach(item => {
              if (item.type === 1) {
                this.setState({
                  broadPermision:true
                })
              }
            })
          }
          let json = {
            companyId:params.id,
            limit:10,
            offset:0
          }
          let fetchs = [
            dispatch(fetchCourseInCompany(json)),
            dispatch(fetchCourseOutCompany({...json, limit:99999})),
            dispatch(fetchStudent(json)),
            dispatch(fetchGroup(json))
          ]
          Promise.all(fetchs).then(posts => {
            if (posts.error) {
              message.error(posts.error.message, 1)
            } else {
              console.log(posts)
              // 处理CourseInCompany

              this.setState({
                companyInfo: Immutable.fromJS(e.payload),
                loading: false,
                tableLoading:false,
                logo: e.payload.logo,
                courseInCompnay:Immutable.fromJS(posts[0].payload.objs),
                CourseInCount:posts[0].payload.count,

                restCourseOut:Immutable.fromJS(posts[1].payload.objs),

                selectedStudent:Immutable.fromJS(posts[2].payload.objs),
                StudentCount:posts[2].payload.count,

                selectedGroup:Immutable.fromJS(posts[3].payload.objs),
                GroupCount:posts[3].payload.count
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    }
  }
  onFetch = (values, limit, offset, cur = 1, type) => {
    const { groupId } = this.state
    this.setState({ tableLoading: true, [`${type}CurrentPage`]: cur })
    const { dispatch, params } = this.props
    values = {
      ...values,
      limit: limit,
      offset: offset,
      companyId:params.id
    }
    if (type === 'CourseIn') {
      dispatch(fetchCourseInCompany(values)).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
          this.setState({ tableLoading: false })
        } else {
          this.setState({
            tableLoading: false,
            CourseInCount: e.payload.count,
            courseInCompnay:Immutable.fromJS(e.payload.objs),
            CourseInCurrentPage:cur
          })
        }
      })
    } else if (type === 'Student') {
      dispatch(fetchStudent(values)).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
          this.setState({ tableLoading: false })
        } else {
          this.setState({
            tableLoading: false,
            StudentCount: e.payload.count,
            selectedStudent:Immutable.fromJS(e.payload.objs),
            StudentCurrentPage:cur
          })
        }
      })
    } else if (type === 'Group') {
      dispatch(fetchGroup(values)).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
          this.setState({ tableLoading: false })
        } else {
          this.setState({
            tableLoading: false,
            GroupCount: e.payload.count,
            selectedGroup:Immutable.fromJS(e.payload.objs),
            GroupCoursecurrentPage:cur
          })
        }
      })
    } else if (type === 'GroupCourse') {
      dispatch(fetchGroupCourse({ ...values, groupId:groupId })).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
          this.setState({ tableLoading: false })
        } else {
          this.setState({
            tableLoading: false,
            GroupCourseCount: e.payload.count,
            selectedGroupCourse:Immutable.fromJS(e.payload.objs),
            GroupCoursecurrentPage:cur
          })
        }
      })
    } else if (type === 'GroupStudent') {
      dispatch(fetchStudent({ ...values, groupId:groupId })).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
          this.setState({ tableLoading: false })
        } else {
          this.setState({
            tableLoading: false,
            GroupStudentCount: e.payload.count,
            selectedGroupStudent:Immutable.fromJS(e.payload.objs),
            GroupStudentcurrentPage:cur
          })
        }
      })
    }
  }
  componentDidMount () {
    const {groupId} = this.state
    if (groupId) {
      this.groupDetail(groupId)
    }
  }

  changeTable = (pagination, type) => {
    console.log(pagination)
    const limit = 10
    const offset = (pagination.current - 1) * limit
    this.onFetch({}, limit, offset, pagination.current, type)
  }
  changeCourseOutTable = (pagination) => {
    console.log(199, pagination)
    this.setState({
      CourseOutcurrentPage:pagination.current
    })
  }
  changeStudentModalTable = (pagination) => {
    console.log(199, pagination)
    this.setState({
      studentModalTablecurrentPage:pagination.current
    })
  }
  // 搜索课程
  CourseInSearch = () => {
    const {dispatch, params} = this.props
    this.setState({
      tableLoading:true
    })
    console.log(this.cha)
    let json = {
      limit:10,
      offset:0,
      courseName:this.courseIn.input.value,
      companyId:params.id
    }
    dispatch(fetchCourseInCompany(json)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
        this.setState({
          tableLoading:false
        })
      } else {
        this.setState({
          tableLoading:false,
          CourseInCount:e.payload.count,
          courseInCompnay:Immutable.fromJS(e.payload.objs)
        })
      }
    })
  }
  // 搜索学生
  StudentSearch = () => {
    const {dispatch, params} = this.props
    this.setState({
      tableLoading:true
    })
    console.log(this.cha)
    let json = {
      limit:10,
      offset:0,
      name:this.studentS.input.value,
      companyId:params.id
    }
    dispatch(fetchStudent(json)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
        this.setState({
          tableLoading:false
        })
      } else {
        this.setState({
          tableLoading:false,
          StudentCount:e.payload.count,
          selectedStudent:Immutable.fromJS(e.payload.objs)
        })
      }
    })
  }
  // 搜索班级
  GroupSearch = () => {
    const {dispatch, params} = this.props
    this.setState({
      tableLoading:true
    })
    console.log(this.cha)
    let json = {
      limit:10,
      offset:0,
      name:this.GroupG.input.value,
      companyId:params.id
    }
    dispatch(fetchGroup(json)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
        this.setState({
          tableLoading:false
        })
      } else {
        this.setState({
          tableLoading:false,
          GroupCount:e.payload.count,
          selectedGroup:Immutable.fromJS(e.payload.objs)
        })
      }
    })
  }

  // courseDetail
  courseDetail = (id, record) => {
    const { dispatch, params } = this.props
    this.setState({
      courseModal:true,
      courseInfo:record,
      courseId:id
    })
  }
  // groupDetail
  groupDetail = (id) => {
    const { dispatch, params } = this.props
    const { courseInCompnay, selectedStudent } = this.state
    let json = {
      groupId:id,
      limit:10,
      offset:0
    }
    let paomises = [
      dispatch(fetchGroupInfo(id)),
      dispatch(fetchGroupCourse(json)),
      dispatch(fetchStudent(json)),
      dispatch(fetchCourseInCompany({ companyId:params.id, limit:99999, offset:0 })),
      dispatch(fetchStudent({ companyId:params.id, limit:99999, offset:0 })),
      dispatch(fetchGroupCourse({ groupId:id, limit:99999, offset:0 })),
      dispatch(fetchStudent({ groupId:id, limit:99999, offset:0 }))
    ]
    Promise.all(paomises).then(posts => {
      // 剔除 已经存在的course，剩下的放到select中
      let selected_ = [...posts[5].payload.objs]
      let courseInCompnay_ = [...posts[3].payload.objs]
      console.log(posts)
      console.log(399, selected_, courseInCompnay_)
      selected_.forEach(item => {
        courseInCompnay_ = courseInCompnay_.filter(v => {
          // console.log(402, item.courseId, v.course.id)
          if (item.courseId !== v.course.id) {
            return v
          }
        })
      })
      // 剔除已经存在的student
      let selectedStu = [...posts[6].payload.objs]
      let selectedStudent_ = [...posts[4].payload.objs]
      console.log(457, selectedStu, selectedStudent_)
      selectedStu.forEach(item => {
        selectedStudent_ = selectedStudent_.filter(v => {
          // console.log(402, item.courseId, v.course.id)
          if (item.id !== v.id) {
            return v
          }
        })
      })
      this.setState({
        groupInfo:Immutable.fromJS(posts[0].payload),
        groupModal:true,
        groupId:id,
        selectedGroupCourse:Immutable.fromJS(posts[1].payload.objs),
        GroupCourseCount:Immutable.fromJS(posts[1].payload.count),
        restGroupCourse:Immutable.fromJS(courseInCompnay_),
        selectedGroupStudent:Immutable.fromJS(posts[2].payload.objs),
        GroupStudentCount:posts[2].payload.count,
        restGroupStudent:Immutable.fromJS(selectedStudent_)
      })
    }).catch(err => {
      console.log(err)
    })
  }
  // 移除group中的course
  deleteGroupCourse = id => {
    const { dispatch, params } = this.props
    const { groupId, courseInCompnay } = this.state
    let courseInCompnay_ = courseInCompnay.toJS()
    let json = {
      groupId:groupId,
      coursePermissionId:id
    }
    dispatch(deleteGroupCourse(json)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
        return
      } else {
        message.success('delete success', 1)
        let promises = [
          dispatch(fetchGroupCourse({ groupId:groupId, limit:10, offset:0 })),
          dispatch(fetchCourseInCompany({ companyId:params.id, limit:99999, offset:0 })),
          dispatch(fetchGroupCourse({ groupId:groupId, limit:99999, offset:0 }))
        ]
        Promise.all(promises).then(posts => {
          console.log('posts', posts)
          let selected_ = [...posts[2].payload.objs]
          let courseInCompnay_ = [...posts[1].payload.objs]
          console.log(399, selected_, courseInCompnay_)
          selected_.forEach(item => {
            courseInCompnay_ = courseInCompnay_.filter(v => {
              console.log(402, item.courseId, v.course.id)
              if (item.courseId !== v.course.id) {
                return v
              }
            })
          })
          this.setState({
            selectedGroupCourse:Immutable.fromJS(posts[0].payload.objs),
            GroupCourseCount:Immutable.fromJS(posts[0].payload.count),
            restGroupCourse:Immutable.fromJS(courseInCompnay_)
          })
        })
      }
    })
  }
  // 添加group中的course
  addGroupCourse = () => {
    const { dispatch, params } = this.props
    const {selectC, groupId, courseInCompnay} = this.state
    let courseInCompnay_ = courseInCompnay.toJS()
    console.log(selectC, this.groupCourseE)
    let json = {
      groupId:groupId,
      coursePermissionIds:selectC,
      endDt:formmatTimeToDay(this.groupCourseE.picker.state.value)
    }
    console.log(json)
    dispatch(AddGroupCourse(json)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
        return
      } else {
        let promises = [
          dispatch(fetchGroupCourse({ groupId:groupId, limit:10, offset:0 })),
          dispatch(fetchCourseInCompany({ companyId:params.id, limit:99999, offset:0 })),
          dispatch(fetchGroupCourse({ groupId:groupId, limit:99999, offset:0 }))
        ]
        Promise.all(promises).then(posts => {
          console.log('posts', posts)
          let selected_ = [...posts[2].payload.objs]
          let courseInCompnay_ = [...posts[1].payload.objs]
          console.log(399, selected_, courseInCompnay_)
          selected_.forEach(item => {
            courseInCompnay_ = courseInCompnay_.filter(v => {
              console.log(402, item.courseId, v.course.id)
              if (item.courseId !== v.course.id) {
                return v
              }
            })
          })
          this.setState({
            selectedGroupCourse:Immutable.fromJS(posts[0].payload.objs),
            GroupCourseCount:Immutable.fromJS(posts[0].payload.count),
            restGroupCourse:Immutable.fromJS(courseInCompnay_),
            selectC:[]
          })
        })
      }
    })
  }
  // 移除group中的student
  deleteGroupStudent = id => {
    const { dispatch,params } = this.props
    const { groupId, selectedGroupStudent } = this.state
    let json = {
      groupId:groupId,
      studentId:id
    }
    dispatch(deleteGroupStudent(json)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
        return
      } else {
        message.success('delete success', 1)
        let promises = [
          dispatch(fetchStudent({ groupId:groupId, limit:10, offset:0 })),
          dispatch(fetchStudent({ companyId:params.id, limit:99999, offset:0 })),
          dispatch(fetchStudent({ groupId:groupId, limit:99999, offset:0 }))
        ]
        Promise.all(promises).then(posts => {
          console.log('posts', posts)
          let selected_ = [...posts[2].payload.objs]
          let selectedGroupStudent_ = [...posts[1].payload.objs]
          console.log(399, selected_, selectedGroupStudent_)
          selected_.forEach(item => {
            selectedGroupStudent_ = selectedGroupStudent_.filter(v => {
              if (item.id !== v.id) {
                return v
              }
            })
          })
          this.setState({
            selectedGroupStudent:Immutable.fromJS(posts[0].payload.objs),
            GroupStudentCount:Immutable.fromJS(posts[0].payload.count),
            restGroupStudent:Immutable.fromJS(selectedGroupStudent_)
          })
        })
      }
    })
  }
  // 添加group中的student
  addGroupStudent = () => {
    const { dispatch, params } = this.props
    const {selectStu, groupId} = this.state
    let json = {
      groupId:groupId,
      studentIds:selectStu
    }
    console.log(json)
    dispatch(AddGroupStudent(json)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
        return
      } else {
        let promises = [
          dispatch(fetchStudent({ groupId:groupId, limit:10, offset:0 })),
          dispatch(fetchStudent({ companyId:params.id, limit:99999, offset:0 })),
          dispatch(fetchStudent({ groupId:groupId, limit:99999, offset:0 }))
        ]
        Promise.all(promises).then(posts => {
          console.log('posts', posts)
          let selected_ = [...posts[2].payload.objs]
          let selectedGroupStudent_ = [...posts[1].payload.objs]
          console.log(399, selected_, selectedGroupStudent_)
          selected_.forEach(item => {
            selectedGroupStudent_ = selectedGroupStudent_.filter(v => {
              if (item.id !== v.id) {
                return v
              }
            })
          })
          this.setState({
            selectedGroupStudent:Immutable.fromJS(posts[0].payload.objs),
            GroupStudentCount:Immutable.fromJS(posts[0].payload.count),
            restGroupStudent:Immutable.fromJS(selectedGroupStudent_),
            selectStu:[]
          })
        })
      }
    })
  }
  // 上传 exel
  beforeUploadExel = file => {
    console.log(680, file)
    const isExel = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].some(item => item === file.type)
    if (!isExel) {
      message.error('You can only upload Exel file!', 1)
    }
    return isExel
  }
  // 上传
  beforeUpload = file => {
    console.log(643, file.type)
    const isPIC = ['image/jpeg', 'image/png', 'image/gif'].some(item => item === file.type)
    if (!isPIC) {
      message.error('You can only upload image file!', 1)
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('picture must smaller than 2MB!', 1)
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
    // if(fileList[0].status ==='done'){
    //   message.success(`${fileList[0].name}   upload success`)
    // }
    console.log(672, fileList)
    this.setState({ slideList: fileList })
  }

  handleExel = ({ fileList }) => {
    // if (fileList[0].status === 'done') {
    //   message.success(`${fileList[0].name}   upload success`)
    //   // 把返回的数据放入到table中
    // }
    fileList = [fileList[fileList.length - 1]]
    let objs = []
    let checkStatus = ''
    if (fileList[0] && fileList[0].response && fileList[0].response.obj) {
      objs = fileList[0].response.obj.students.map(item => ({
        ...item,
        operation:'save'
      }))
      checkStatus = fileList[0].response.obj.checkStatus
    }
    console.log(477, objs, checkStatus)
    console.log(672, fileList)
    this.setState({
      studentModalTable:Immutable.fromJS(objs),
      checkStatus,
      exelList: fileList
    })
  }

  handlePicModal = (name) => {
    const { companyInfo, slideList } = this.state
    let picture = ''
    console.log(143, slideList)
    picture = slideList[0].response.name
    console.log(530, name, picture)
    this.setState({
      [name]:picture,
      picModal: false,
      broadPicModal:false
    })
  }
  // 新增 或者 更新 course
  handleCourseModal = () => {
    const { params, dispatch } = this.props
    const { companyInfo, slideList, courseId, selectedCourseOut } = this.state
    console.log('todo')
    this.formCourse.validateFields((err, value) => {
      if (err) {
        return
      } else {
        console.log('course', value)
        let json = {
          companyId:params.id,
          ...value,
          endDt:formmatTimeToDay(value.endDt)
        }
        if (courseId) {
          dispatch(updateCourseInCompany(courseId, json)).then(e => {
            if (e.error) {
              message.error(e.error.message, 1)
            } else {
              let j = {
                companyId:params.id,
                courseName:this.courseIn.input.value,
                limit:10,
                offset:0
              }
              console.log(j)
              dispatch(fetchCourseInCompany(j)).then(event => {
                if (event.error) {
                  message.error(event.error.message, 1)
                } else {
                  this.formCourse.setFieldsValue({
                    endDt:''
                  })
                  console.log(390, event)
                  this.setState({
                    courseId:null,
                    courseModal:false,
                    CourseInCount:event.payload.count,
                    courseInCompnay:Immutable.fromJS(event.payload.objs)
                  })
                }
              })
            }
          })
        } else {
          // table 中的数据
          let selectedCourseOutKeys = []
          if (selectedCourseOut) {
            selectedCourseOut.toJS().forEach(item => {
              selectedCourseOutKeys.push(item.id)
            })
          }
          let values = {
            ...json,
            coursePermissionIds:selectedCourseOutKeys
          }
          dispatch(newCourseInCompany(values)).then(e => {
            if (e.error) {
              message.error(e.error.message, 1)
            } else {
              let j = {
                companyId:params.id,
                courseName:this.courseIn.input.value,
                limit:10,
                offset:0
              }
              console.log(j)
              dispatch(fetchCourseInCompany(j)).then(event => {
                if (event.error) {
                  message.error(event.error.message, 1)
                } else {
                  this.formCourse.setFieldsValue({
                    endDt:''
                  })
                  this.setState({
                    courseId:null,
                    courseModal:false,
                    CourseInCount:event.payload.count,
                    courseInCompnay:Immutable.fromJS(event.payload.objs),
                    selectedCourseOut:Immutable.fromJS([])
                  })
                }
              })
            }
          })
        }
      }
    })
  }
  deleteCoursePermission = () => {
    const { dispatch, params } = this.props
    const { courseId } = this.state
    dispatch(deleteCourseInCompany(courseId)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
      } else {
        let j = {
          companyId:params.id,
          courseName:this.courseIn.input.value,
          limit:10,
          offset:0
        }
        console.log(j)
        dispatch(fetchCourseInCompany(j)).then(event => {
          if (event.error) {
            message.error(event.error.message, 1)
          } else {
            this.formCourse.setFieldsValue({
              endDt:''
            })
            this.setState({
              courseId:null,
              courseModal:false,
              CourseInCount:event.payload.count,
              courseInCompnay:Immutable.fromJS(event.payload.objs)
            })
          }
        })
        let json = {
          limit:99999,
          companyId:params.id,
          offset:0
        }
        dispatch(fetchCourseOutCompany(json)).then(event => {
          if (event.error) {
            message.error(event.error.message, 1)
          } else {
            this.setState({
              restCourseOut:Immutable.fromJS(event.payload.objs)
            })
          }
        })
      }
    })
  }
  deleteGroup = () => {
    const {groupId} = this.state
    const {dispatch, params} = this.props
    dispatch(deleteGroup(groupId)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
        return
      } else {
        let J = {
          companyId:params.id,
          name:this.GroupG.input.value
        }
        dispatch(fetchGroup(J)).then(event => {
          if (event.error) {
            message.error(event.error.message, 1)
            return
          } else {
            this.setState({
              groupModal:false,
              groupId:null,
              selectedGroup:Immutable.fromJS(event.payload.objs),
              GroupCount:event.payload.count
            })
          }
        })
      }
    })
  }
  receiveRaw = content => {
    console.log('recieved Raw content', content)
  }
  create = () => {
    // todo
    const { dispatch, intl: { formatMessage } } = this.props
    const { logo, demoVideoName, selectedCourseOut, demoVideoId } = this.state
    this.formRef1.validateFields((error, value) => {
      if (error) {
        message.info(formatMessage({ id: 'checkRuler' }), 1)
        return
      }
      this.formRef2.validateFields((err, value2) => {
        if (err) {
          return
        }
        let tableCourseOutKeys = []
        let _selectedCourseOut = selectedCourseOut.toJS()
        _selectedCourseOut.forEach(item => {
          tableCourseOutKeys.push(item.id)
        })
        console.log(value)
        let json = {
          logo,
          ...value,
          startDt:formmatTimeToDay(value.startDt),
          endDt:formmatTimeToDay(value.endDt),
          ...value2,
          teacherIds: tableCourseOutKeys,
          companyStatus:'1'
        }
        console.log(json)
        if (json.startDt && json.endDt && !moment(json.startDt).isBefore(json.endDt)) {
          message.info(formatMessage({id:'startBeforeEnd'}))
          return
        }
        this.setState({
          btnLoading:true
        })
        dispatch(newCompany(json)).then(e => {
          if (e.error) {
            message.error(e.error.message, 1)
            this.setState({
              btnLoading:false
            })
          } else {
            message.success(formatMessage({ id: 'submitSuccess' }))
            this.setState({
              btnLoading:false
            })
            dispatch(pathJump('/company'))
          }
        })
      })
    })
  }
  update = () => {
    // todo
    const { dispatch, intl: { formatMessage }, params } = this.props
    const { logo, demoVideoName, selectedCourseOut, demoVideoId } = this.state
    this.formRef1.validateFields((error, value) => {
      if (error) {
        message.info(formatMessage({ id: 'checkRuler' }), 1)
        return
      }
      this.formRef2.validateFields((err, value1) => {
        if (err) {
          return
        }
        let json = {
          logo,
          ...value,
          startDt:formmatTimeToDay(value.startDt),
          endDt:formmatTimeToDay(value.endDt),
          ...value1
        }
        console.log(json)
        if (json.startDt && json.endDt && !moment(json.startDt).isBefore(json.endDt)) {
          message.info(formatMessage({id:'startBeforeEnd'}))
          return
        }
        this.setState({
          btnLoading:true
        })
        dispatch(updateCompany(params.id, json)).then(e => {
          if (e.error) {
            message.error(e.error.message, 1)
            this.setState({
              btnLoading:false
            })
          } else {
            message.success(formatMessage({ id: 'submitSuccess' }), 1)
            this.setState({
              btnLoading:false
            })
            dispatch(pathJump('/company'))
          }
        })
      })
    })
  }
  roll = id => {
    console.log(id)
    let cb = () => {
      console.log(236, window[`${id}_percent`])
      if (this.state[`${id}_percent`] >= 100) {
        clearInterval(persent)
      } else {
        this.setState({
          [`${id}_percent`]: Math.ceil(window[`${id}_percent`])
        })
      }
    }
    let persent = setInterval(cb, 100)
  }

  startUpload = (id, files) => {
    const { dispatch } = this.props
    dispatch(fetchUploadAuth()).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
      } else {
        let { VideoId, UploadAuth, UploadAddress } = e.payload
        upTo(id, files, UploadAuth.replace('=', ''), UploadAddress.replace('=', ''))
        this.roll(id)
        this.setState({
          [`${id}Id`]: VideoId
        })
        uploader.onUploadProgress
      }
    })
  }

  getList = list => {
    if (list) {
      return list.toJS()
    }
  }
  // 添加课程
  addCourseOut = () => {
    const { selectT, selectedCourseOut, restCourseOut } = this.state
    console.log(283, selectT)
    let _restCourseOut = restCourseOut.toJS()
    let _selectedCourseOut = selectedCourseOut.toJS()
    selectT.forEach(v => {
      _restCourseOut.forEach(item => {
        console.log(291, v, item.id)
        if (item.id === v) {
          _selectedCourseOut.unshift(item)
        }
      })
      _restCourseOut = _restCourseOut.filter(item => {
        if (item.id !== v) {
          return item
        }
      })
    })
    this.formC
    this.setState({
      selectT: [],
      restCourseOut: Immutable.fromJS(_restCourseOut),
      selectedCourseOut: Immutable.fromJS(_selectedCourseOut)
    })
  }
  // 下拉框的筛选
  filterOption = (inputValue, option) => {
    console.log(299, inputValue, option)
    return option.props.children.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
  }
  // 删除table中已经添加的CourseOut
  deleteTableCourseOut = id => {
    console.log(id)
    const { selectedCourseOut, restCourseOut } = this.state
    let _restCourseOut = restCourseOut.toJS()
    let _selectedCourseOut = selectedCourseOut.toJS()
    _selectedCourseOut.forEach(item => {
      if (item.id === id) {
        _restCourseOut.push(item)
      }
    })
    _selectedCourseOut = _selectedCourseOut.filter(item => {
      if (item.id !== id) {
        return item
      }
    })
    this.setState({
      selectedCourseOut: Immutable.fromJS(_selectedCourseOut),
      restCourseOut: Immutable.fromJS(_restCourseOut)
    })
  }
  // 激活暂停学生
  operation = operation => {
    const { dispatch, intl: { formatMessage }, params } = this.props
    const { Studentselected: { selectedRowKeys, selectedRows } } = this.state
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
      selectedRows && selectedRows.forEach(item => {
        ids.push(item.getIn(['person', 'account', 'id']))
      })
      let json = {
        ids: ids,
        accountStatus: 1
      }
      dispatch(operateStudent(json)).then(e => {
        if (!e.error) {
          let J = {
            companyId:params.id,
            name:this.studentS.input.value
          }
          dispatch(fetchStudent(J)).then(event => {
            if (event.error) {
              message.error(event.error.message, 1)
            } else {
              message.success('success', 1)
              let _selectedRows = selectedRows.map(item => {
                let item_ = item.toJS()
                if (item.getIn(['person', 'account'])) {
                  item_.person.account.accountStatus = 1
                }
                return Immutable.fromJS(item_)
              })
              this.setState({
                selectedStudent:Immutable.fromJS(event.payload.objs),
                StudentCount:event.payload.count
              })
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
      selectedRows && selectedRows.forEach(item => {
        ids.push(item.getIn(['person', 'account', 'id']))
      })
      let json = {
        ids: ids,
        accountStatus: 0
      }
      dispatch(operateStudent(json)).then(e => {
        if (!e.error) {
          let J = {
            companyId:params.id,
            name:this.studentS.input.value
          }
          dispatch(fetchStudent(J)).then(event => {
            if (event.error) {
              message.error(event.error.message, 1)
            } else {
              message.success('success', 1)
              let _selectedRows = selectedRows.map(item => {
                let item_ = item.toJS()
                if (item.getIn(['person', 'account'])) {
                  item_.person.account.accountStatus = 0
                }
                return Immutable.fromJS(item_)
              })
              this.setState({
                Studentselected: {
                  selectedRowKeys,
                  selectedRows: _selectedRows
                },
                selectedStudent:Immutable.fromJS(event.payload.objs),
                StudentCount:event.payload.count
              })
            }
          })
        }
      })
    }
  }
  // 删除学生
  deleteStu = id => {
    const { dispatch, intl: { formatMessage }, params } = this.props
    const { Studentselected: { selectedRowKeys, selectedRows } } = this.state
    let json = {
      studentId:id,
      companyId:params.id
    }
    dispatch(deleteStudent(json)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
      } else {
        let J = {
          companyId:params.id,
          name:this.studentS.input.value
        }
        dispatch(fetchStudent(J)).then(event => {
          if (event.error) {
            message.error(event.error.message, 1)
          } else {
            message.success('删除成功', 1)
            this.setState({
              selectedStudent:Immutable.fromJS(event.payload.objs),
              StudentCount:event.payload.count,
              Studentselected:{
                selectedRowKeys:[],
                selectedRows:[]
              }
            })
          }
        })
      }
    })
  }
  // 修改一个单元格的数据
  editCell = (value, name, id) => {
    const { studentModalTable } = this.state
    let studentModalTable_ = studentModalTable.toJS()
    studentModalTable_.map(item => {
      if (item.id === id) {
        item[name] = value
        return item
      } else {
        return item
      }
    })
    console.log(937, studentModalTable_)
    this.setState({
      studentModalTable:Immutable.fromJS(studentModalTable_)
    })
  }
  // 使一行变成可编辑状态
  rowEdit = (id) => {
    const {intl:{formatMessage}} = this.props
    const { studentModalTable } = this.state
    let studentModalTable_ = studentModalTable.toJS()
    let count = 0
    studentModalTable_.forEach(item => {
      if (item.operation === 'edit') {
        count++
      }
    })
    if (count) {
      message.info(formatMessage({id:'plsSaveToEdit'}))
      return
    }
    studentModalTable_.map(item => {
      if (item.id === id) {
        item.operation = 'edit'
        return item
      } else {
        return item
      }
    })
    this.setState({
      studentModalTable:Immutable.fromJS(studentModalTable_)
    })
  }
  // 使一行变成保存状态
  rowSave = (id) => {
    const { studentModalTable } = this.state
    const {dispatch} = this.props
    let studentModalTable_ = studentModalTable.toJS()
    // studentModalTable_.map(item => {
    //   if (item.id === id) {
    //     item.operation = 'save'
    //     return item
    //   } else {
    //     return item
    //   }
    // })
    // this.setState({
    //   studentModalTable:Immutable.fromJS(studentModalTable_)
    // })
    let json = {
      students:studentModalTable_
    }
    dispatch(checkStudent(json)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
      } else {
        let arr = []
        if (e.payload.obj && e.payload.obj.students) {
          arr = e.payload.obj.students.map(item => ({...item, operation:'save'}))   
          console.log(arr)
        }
        this.setState({
          studentModalTable:Immutable.fromJS(arr)
        })
      }
    })
  }
  // 删除一行
  deleteStudentModal = id => {
    const { studentModalTable } = this.state
    let studentModalTable_ = studentModalTable.toJS()
    studentModalTable_ = studentModalTable_.filter(item => {
      if (item.id !== id) {
        return item
      }
    })
    this.setState({
      studentModalTable:Immutable.fromJS(studentModalTable_)
    })
  }
  // check 并提交添加学员
  handleStudentModal = () => {
    const { studentModalTable, companyInfo } = this.state
    const { dispatch, params } = this.props
    let studentModalTable_ = studentModalTable.toJS()
    let saveCount = 0
    studentModalTable_.forEach(item => {
      if (item.operation === 'edit') {
        saveCount++
      }
    })
    if (saveCount !== 0) {
      message.error(`还有 ${saveCount} 行数据没有保存！`, 1)
      return
    }
    if (companyInfo.get('maxPersonCount') - companyInfo.get('totalPerson') - studentModalTable_.length < 0) {
      message.error('添加的学员总数已超出当前班级所剩名额！', 1)
      return
    }
    let json = {
      students:studentModalTable_,
      companyId:params.id
    }
    // 检查学员信息
    dispatch(checkStudent(json)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
      } else {
        // 如果返回的是false，则将返回的数据放入到table中继续修改
        if (e.payload.obj && !e.payload.obj.checkStatus) {
          message.error('还有数据不满足要求，请继续修改!', 1)
          let studentModalTable_ = []
          console.log(1018, e.payload)
          studentModalTable_ = e.payload.obj.students.map(item => {
            item.operation = 'save'
            return item
          })
          this.setState({
            checkStatus:e.payload.obj.checkStatus,
            studentModalTable:Immutable.fromJS(studentModalTable_)
          })
        } else {
          // 如果是true 则直接提交
          dispatch(newStudent(json)).then(e => {
            if (e.error) {
              message.error(e.error.message, 1)
              return
            } else {
              // 重新拉取学员列表和公司详情
              let J = {
                companyId:params.id,
                name:this.studentS.input.value
              }
              let promises = [
                dispatch(fetchStudent(J)),
                dispatch(fetchCompanyInfo(params.id))
              ]
              Promise.all(promises).then((posts) => {
                console.log(posts)
                this.setState({
                  selectedStudent:Immutable.fromJS(posts[0].payload.objs),
                  StudentCount:posts[0].payload.count,
                  companyInfo:Immutable.fromJS(posts[1].payload),
                  studentModal:false,
                  studentModalTable:Immutable.fromJS([]),
                  exelList:[]
                })
              }).catch(function (reason) {
                console.log(reason)
              })
            }
          })
        }
      }
    })

    this.setState({
      studentModalTable:Immutable.fromJS(studentModalTable_)
    })
  }

  // 新建group // 更新group
  handleGroupModal = () => {
    const { dispatch, params } = this.props
    const { groupId } = this.state
    this.setState({
      btnLoading:true
    })
    this.formGroup.validateFields((err, value) => {
      if (err) {
        console.log(err)
        this.setState({
          btnLoading:false
        })
      } else {
        let json = {
          ...value,
          endDt:value.endDt ? moment(value.endDt).format('YYYY-MM-DD') : '',
          companyId:params.id
        }
        if (groupId) {
          dispatch(updateGroup(groupId, json)).then(e => {
            if (e.error) {
              message.error(e.error.message, 1)
              this.setState({
                btnLoading:false
              })
              return
            } else {
              message.success('update success', 1)
              let J = {
                companyId:params.id,
                name:this.GroupG.input.value
              }
              dispatch(fetchGroup(J)).then(event => {
                if (event.error) {
                  message.error(event.error.message, 1)
                  return
                } else {
                  this.formGroup.setFieldsValue({
                    name_en:'',
                    name_zh:'',
                    description_zh:'',
                    description_en:'',
                    endDt:''
                  })
                  this.setState({
                    groupModal:false,
                    groupId:null,
                    selectedGroup:Immutable.fromJS(event.payload.objs),
                    GroupCount:event.payload.count,
                    btnLoading:false
                  })
                }
              })
            }
          })
        } else {
          dispatch(newGroup(json)).then(e => {
            if (e.error) {
              message.error(e.error.message, 1)
              this.setState({
                btnLoading:false
              })
              return
            } else {
              let J = {
                companyId:params.id,
                name:this.GroupG.input.value
              }
              dispatch(fetchGroup(J)).then(event => {
                if (event.error) {
                  message.error(event.error.message, 1)
                  this.setState({
                    btnLoading:false
                  })
                  return
                } else {
                  this.formGroup.setFieldsValue({
                    name_en:'',
                    name_zh:'',
                    description_zh:'',
                    description_en:'',
                    endDt:''
                  })
                  this.setState({
                    groupModal:false,
                    groupId:null,
                    selectedGroup:Immutable.fromJS(event.payload.objs),
                    GroupCount:event.payload.count,
                    btnLoading:false
                  })
                }
              })
            }
          })
        }
      }
    })
  }
  // 删除公司
  deleteCom = () => {
    // todo
    const {dispatch, params} = this.props
    dispatch(deleteCompany(params.id)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
      } else {
        dispatch(pathJump('/company'))
      }
    })
  }

  render () {
    const { intl: { formatMessage }, location: { pathname }, params, dispatch} = this.props
    const {
      loading,
      companyFlowStatus,
      picModal,
      slideList,
      textContent,
      companyInfo,
      logo,
      tabKey,
      demoVideo_percent,
      courseModal,
      CourseInCount,
      CourseInCurrentPage,
      courseInCompnay,
      selectedCourseOut,
      restCourseOut,
      courseId,
      selectT,
      CourseOutcurrentPage,
      courseInfo,
      tableLoading,
      selectedStudent,
      StudentCount,
      StudentCurrentPage,
      studentModalTable,
      studentId,
      studentModal,
      studentModalTablecurrentPage,
      checkStatus,
      exelList,
      // admin
      AdminCount,
      AdminCurrentPage,
      selectedAdmin,
      // Group
      GroupCount,
      GroupCurrentPage,
      selectedGroup,
      groupModal,
      groupInfo,
      groupId,
      groupTabKey,
      selectC,
      restGroupCourse,
      selectedGroupCourse,
      GroupCourseCount,
      GroupCoursecurrentPage,
      selectedGroupStudent,
      GroupStudentCount,
      GroupStudentcurrentPage,
      restGroupStudent,
      selectStu
    } = this.state

    console.log(258, demoVideo_percent, restCourseOut && restCourseOut.toJS())
    console.log(258, studentModalTable, studentModalTable && studentModalTable.toJS())
    const uploadButton = (
      <div>
        <Icon type='plus' />
        <div className='ant-upload-text'>Upload</div>
      </div>
    )
    const renderOption = config => {
      console.log(269, config)
      if (config) {
        return config.map(v => (
          <Option key={v.id} value={v.id}>
            {v.name_zh}
          </Option>
        ))
      }
    }
    const getCourseOutList = (list, name = 'id') => {
      let arr = []
      if (list) {
        let _list = list.toJS()
        _list.forEach(item => {
          arr.push({
            ...item.course,
            id: item[name]
          })
        })
      }
      console.log(321, arr)
      return arr.map(item => (
        <Option key={item.id} value={item.id}>
          {item.name_zh}
        </Option>
      ))
    }
    const getGroupStudentList = (list, name = 'id') => {
      let arr = []
      if (list) {
        let _list = list.toJS()
        console.log(_list)
        _list.forEach(item => {
          arr.push({
            ...item.person,
            id: item[name]
          })
        })
      }
      console.log(321, arr)
      return arr.map(item => (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      ))
    }

    const getChapterList = list => {
      let arr = []
      arr = [...list.toJS()]
      console.log(321, arr)
      return arr.map(item => (
        <Option key={item.id} value={item.id}>
          {item.name_zh}
        </Option>
      ))
    }
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
      if (column.dataIndex === 'description') {
        styleHeight = { ...styleHeight, height: 'auto' }
      }

      if (courseInfo) {
        text = column.deep ? courseInfo.getIn(column.deep) : courseInfo.get(column.dataIndex)
        if (column.render) {
          console.log(text)
          text = column.render(text)
        }
        console.log(column.dataIndex, text)
      } else {
        text = ''
      }

      return (
        <Col key={column.dataIndex} span={column.span || 8} className={`payment-item`} style={styleHeight}>
          {!column.noLabel && (
            <Col span={column.labelSpan || 6} className='payment-label' style={{ fontWeight: 'bold' }}>
              {formatMessage({ id: `courseInOut_${column.dataIndex}` })}
            </Col>
          )}
          <Col span={column.valueSpan || 18} className={`payment-value ${column.className}`}>
            {renderForm(text, column)}
          </Col>
        </Col>
      )
    }
    const columns = [
      {
        dataIndex: _course.name_zh,
        render: (text, record, index) => {
          return record.getIn(['course', 'name_zh'])
        }
      },
      {
        dataIndex: _course.name_en,
        render: (text, record, index) => {
          return record.getIn(['course', 'name_en'])
        }
      },
      {
        dataIndex: _course.createdAt,
        render: (text, record, index) => moment(record.get('createdAt') || null).format('YYYY-MM-DD')
      },
      {
        dataIndex: _course.endDt,
        render: (text, record, index) => moment(record.get('endDt') || null).format('YYYY-MM-DD')
      },
      {
        dataIndex: _course.videoType,
        render: (text, record, index) => {
          return record.getIn(['coursePermission', 'type']) ? formatMessage({id:courseType[record.getIn(['coursePermission', 'type'])]}) : ''
        }
      },
      {
        dataIndex: _course.categories,
        render: (text, record, index) => {
          let arr = []
          let _record = record.toJS()
          _record.course && _record.course.categories &&
            _record.course.categories.forEach(item => {
              arr.push(item.name_zh)
            })
          return arr.toString()
        }
      },
      {
        dataIndex: _course.teacherIds,
        render: (text, record, index) => {
          let arr = []
          let _record = record.toJS()
          _record.course && _record.course.teachers &&
            _record.course.teachers.forEach(item => {
              if (item.person) {
                arr.push(item.person.name)
              }
            })
          return arr.toString()
        }
      },
      {
        dataIndex: _course.detail,
        render: (text, record, index) => {
          return <a onClick={() => this.courseDetail(record.get('id'), record)}>{formatMessage({ id: 'detail' })}</a>
        }
      }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `courseInOut_${item.dataIndex}` })
    }))
    const groupCourseColumns = [
      {
        dataIndex: _course.name_zh,
        render: (text, record, index) => {
          return record.getIn(['course', 'name_zh'])
        }
      },
      {
        dataIndex: _course.name_en,
        render: (text, record, index) => {
          return record.getIn(['course', 'name_en'])
        }
      },
      {
        dataIndex: _course.endDt,
        render: (text, record, index) => {
          if (record.get('proCoursePermissions')) {
            moment(record.getIn(['proCoursePermissions', 'endDt'])).format('YYYY-MM-DD')
            let record_ = record.toJS()
            let mo = record_.proCoursePermissions[0].endDt
            return mo ? moment(mo).format('YYYY-MM-DD') : ''
          }
        }
      },
      {
        dataIndex: _course.categories,
        render: (text, record, index) => {
          let arr = []
          let _record = record.toJS()
          _record.course && _record.course.categories &&
            _record.course.categories.forEach(item => {
              arr.push(item.name_zh)
            })
          return arr.toString()
        }
      },
      {
        dataIndex: _course.teacherIds,
        render: (text, record, index) => {
          let arr = []
          let _record = record.toJS()
          _record.course && _record.course.teachers &&
            _record.course.teachers.forEach(item => {
              if (item.person) {
                arr.push(item.person.name)
              }
            })
          return arr.toString()
        }
      },
      {
        dataIndex: _course.detail,
        render: (text, record, index) => {
          return <a onClick={() => this.deleteGroupCourse(record.get('id'), record)}>{formatMessage({ id: 'delete' })}</a>
        }
      }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `courseInOut_${item.dataIndex}` })
    }))
    // student
    const studentColumns = [
      {
        dataIndex: _student.name,
        render: (text, record, index) => {
          return record.getIn(['person', 'name'])
        }
      },
      {
        dataIndex: _student.position
      },
      {
        dataIndex: _student.mail,
        render:(text, record, index) => {
          return record.getIn(['person', 'account', 'mail'])
        }
      },
      {
        dataIndex: _student.status,
        render: (text, record, index) => {
          return formatMessage({ id: activeStatus[record.getIn(['person', 'account', 'accountStatus'])] })
        }
      },
      {
        dataIndex: _student.group,
        render: (text, record, index) => {
          // return formatMessage({ id: activeStatus[record.getIn(['groups', 'name_zh'])] })
          let record_ = record.toJS()
          let arr = []
          record_.groups && record_.groups.forEach(item => {
            arr.push(item.name_zh)
          })
          return arr.toString()
        }
      },
      {
        dataIndex: _student.detail,
        render: (text, record, index) => {
          return (
            <div>
              <a onClick={() => {
                const { dispatch } = this.props
                dispatch(pathJump(`/student/studentDetail/${record.get('id')}`))
              }}>{formatMessage({ id: 'detail' })}</a>
              <a style={{marginLeft:16}} onClick={() => this.deleteStu(record.get('id'))}>{formatMessage({ id: 'pullOut' })}</a>
            </div>
          )
        }
      }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `student_${item.dataIndex}` })
    }))
    const groupStudentColumns = [
      {
        dataIndex: _student.name,
        render: (text, record, index) => {
          return record.getIn(['person', 'name'])
        }
      },
      {
        dataIndex: _student.position
      },
      {
        dataIndex: _student.mail,
        render:(text, record, index) => {
          return record.getIn(['person', 'account', 'mail'])
        }
      },
      {
        dataIndex: _student.group,
        render: (text, record, index) => {
          return formatMessage({ id: activeStatus[record.getIn(['person', 'account', 'accountStatus'])] })
        }
      },
      {
        dataIndex: _student.detail,
        render: (text, record, index) => {
          return <a onClick={() => this.deleteGroupStudent(record.get('id'))}>{formatMessage({ id: 'delete' })}</a>
        }
      }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `student_${item.dataIndex}` })
    }))
    const studentModalColumns = [
      {
        dataIndex: _student.name,
        width:100,
        render:(text, record, index) => {
          if (record.get('operation') === 'save') {
            return text
          } else if (record.get('operation') === 'edit') {
            return (
              <Input value={text} onChange={e => this.editCell(e.target.value, 'name', record.get('id'))} />
            )
          }
        }
      },
      {
        dataIndex: _student.position,
        width:100,
        render:(text, record, index) => {
          if (record.get('operation') === 'save') {
            return text
          } else if (record.get('operation') === 'edit') {
            return (
              <Input value={text} onChange={e => this.editCell(e.target.value, 'position', record.get('id'))} />
            )
          }
        }
      },
      {
        dataIndex: _student.mail,
        width:250,
        render:(text, record, index) => {
          if (record.get('operation') === 'save') {
            return text
          } else if (record.get('operation') === 'edit') {
            return (
              <Input value={text} onChange={e => this.editCell(e.target.value, 'mail', record.get('id'))} />
            )
          }
        }
      },
      {
        dataIndex: _student.message,
        width:250
      },
      {
        dataIndex: _student.operation,
        width:50,
        render: (text, record, index) => {
          if (record.get('operation') === 'save') {
            return <a onClick={() => this.rowEdit(record.get('id'))}>{formatMessage({id:'edit'})}</a>
          } else if (record.get('operation') === 'edit') {
            return <a onClick={() => this.rowSave(record.get('id'))}>{formatMessage({id:'save_btn'})}</a>
          }
        }
      },
      {
        dataIndex: _student.delete,
        width:50,
        render: (text, record, index) => {
          return <a onClick={() => this.deleteStudentModal(record.get('id'))}>{formatMessage({ id: 'delete' })}</a>
        }
      }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `student_${item.dataIndex}` })
    }))
    // 课程
    const courseOutColumns = [
      {
        dataIndex: _course.name_zh,
        render: (text, record, index) => {
          return record.getIn(['course', 'name_zh'])
        }
      },
      {
        dataIndex: _course.name_en,
        render: (text, record, index) => {
          return record.getIn(['course', 'name_en'])
        }
      },
      {
        dataIndex: _course.videoType,
        render: (text, record, index) => {
          return record.getIn(['coursePermission', 'type']) ? formatMessage({id:courseType[record.getIn(['coursePermission', 'type'])]}) : ''
        }
      },
      {
        dataIndex: _course.categories,
        render: (text, record, index) => {
          let arr = []
          let _record = record.toJS()
          _record.course && _record.course.categories &&
            _record.course.categories.forEach(item => {
              arr.push(item.name_zh)
            })
          return arr.toString()
        }
      },
      {
        dataIndex: _course.teacherIds,
        render: (text, record, index) => {
          let arr = []
          let _record = record.toJS()
          _record.course && _record.course.teachers &&
            _record.course.teachers.forEach(item => {
              if (item.person) {
                arr.push(item.person.name)
              }
            })
          return arr.toString()
        }
      },
      {
        dataIndex: _course.detail,
        render: (text, record, index) => {
          return <a onClick={() => this.deleteTableCourseOut(record.get('id'))}>{formatMessage({ id: 'delete' })}</a>
        }
      }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `courseInOut_${item.dataIndex}` })
    }))
    // admin
    const adminColumns = [
      {
        dataIndex: _student.name,
        render: (text, record, index) => {
          return record.getIn(['person', 'name'])
        }
      },
      {
        dataIndex: _student.position
      },
      {
        dataIndex: _student.mail,
        render:(text, record, index) => {
          return record.getIn(['person', 'account', 'mail'])
        }
      },
      {
        dataIndex: _student.status,
        render: (text, record, index) => {
          return formatMessage({ id: activeStatus[record.getIn(['person', 'account', 'accountStatus'])] })
        }
      },
      {
        dataIndex: _student.group,
        render: (text, record, index) => {
          return formatMessage({ id: activeStatus[record.getIn(['person', 'account', 'accountStatus'])] })
        }
      },
      {
        dataIndex: _student.detail,
        render: (text, record, index) => {
          return <a onClick={() => {
            const { dispatch } = this.props
            dispatch(pathJump(`/student/studentDetail/${record.get('id')}`))
          }}>{formatMessage({ id: 'detail' })}</a>
        }
      }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `student_${item.dataIndex}` })
    }))
    // group
    const groupColumns = [
      {
        dataIndex: _group.name_zh
      },
      {
        dataIndex: _group.name_en
      },
      {
        dataIndex: _group.createdAt,
        render:(text, record, index) => text ? moment(text).format('YYYY-MM-DD') : ''
      },
      {
        dataIndex: _group.endDt,
        render:(text, record, index) => text ? moment(text).format('YYYY-MM-DD') : ''
      },
      {
        dataIndex: _group.detail,
        render: (text, record, index) => {
          return <a onClick={() => this.groupDetail(record.get('id'))}>{formatMessage({ id: 'detail' })}</a>
        }
      }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `group_${item.dataIndex}` })
    }))
    // company Basic
    const formColumns1 = [
      {
        dataIndex: _company.createdAt,
        show:params.id === 'new',
        FormTag: (
          <span>
            {companyInfo.get('createdAt') && moment(companyInfo.get('createdAt')).format('YYYY-MM-DD')}
          </span>
        )
      },
      {
        dataIndex: _company.updatedAt,
        show:params.id === 'new',
        FormTag: (
          <span>
            {companyInfo.get('updatedAt') && moment(companyInfo.get('updatedAt')).format('YYYY-MM-DD')}
          </span>
        )
      },
      {
        dataIndex: _company.name
      },
      {
        dataIndex: _company.companyType
      },
      {
        dataIndex: _company.startDt,
        // 不能这种相互校验，会出现栈溢出
        // option:{
        //   rules: [
        //     {
        //       required: true,
        //       message: ' ',
        //       validator: (relu, value, cb) => {
        //         console.log(value)
        //         this.formRef1.validateFields(['endDt'], (err, v) => {
        //           if (err) {
        //             cb(false)
        //           } else {
        //             console.log(value, v.endDt)
        //             if (value.isAfter(v.endDt, 'day')) {
        //               cb(false)
        //             } else {
        //               cb()
        //             }
        //           }
        //         })
        //       }
        //     }
        //   ]
        // },
        FormTag:<DatePicker style={{ width:'100%' }} />
      },
      {
        dataIndex: _company.endDt,
        option:{
          rules: [
            {
              required: true,
              message: ' ',
              validator: (relu, value, cb) => {
                console.log(value)
                this.formRef1.validateFields(['startDt'], (err, v) => {
                  if (err) {
                    cb(false)
                  } else {
                    console.log(value, v.startDt)
                    if (value.isBefore(v.startDt, 'day')) {
                      cb(false)
                    } else {
                      cb()
                    }
                  }
                })
              }
            }
          ]
        },
        FormTag:<DatePicker style={{ width:'100%' }} />
      },
      {
        dataIndex: _company.address
      },
      {
        dataIndex: _company.size
      },
      {
        dataIndex: _company.website
      }
    ]
      .map(item => {
        if (item.dataIndex !== 'createdAt' && item.dataIndex !== 'updatedAt' && !item.option) {
          return ({
            ...item,
            title: formatMessage({ id: `companyDetail_${item.dataIndex}` }),
            placeholder: formatMessage({ id: `companyDetail_${item.dataIndex}` }),
            option: { rules: [{ required: true, message:' ' }] }
          })
        } else {
          return ({
            ...item,
            title: formatMessage({ id: `companyDetail_${item.dataIndex}` }),
            placeholder: formatMessage({ id: `companyDetail_${item.dataIndex}` })
          })
        }
      })
      .filter(item => {
        if (!item.show) {
          return item
        }
      })
    // company
    const formColumns2 = [
      {
        dataIndex: _company.maxPersonCount,
        option: { rules: [{ required: true, pattern:/^\d{1,10}$/, message:' ' }] }
      }
    ]
      .map(item => {
        if (item.dataIndex !== 'createdAt' && item.dataIndex !== 'updatedAt' && !item.option) {
          return ({
            ...item,
            title: formatMessage({ id: `companyDetail_${item.dataIndex}` }),
            placeholder: formatMessage({ id: `companyDetail_${item.dataIndex}` }),
            option: { rules: [{ required: true, message:' ' }] }
          })
        } else {
          return ({
            ...item,
            title: formatMessage({ id: `companyDetail_${item.dataIndex}` }),
            placeholder: formatMessage({ id: `companyDetail_${item.dataIndex}` })
          })
        }
      })
      .filter(item => {
        if (!item.show) {
          return item
        }
      })
    const formColumnsGroup = [
      {
        dataIndex: _group.name_zh
      },
      {
        dataIndex: _group.name_en
      },
      {
        dataIndex: _group.description_zh,
        FormTag: <TextArea autosize={{ minRows: 5, maxCols: 6 }} />
      },
      {
        dataIndex: _group.description_en,
        FormTag: <TextArea autosize={{ minRows: 5, maxCols: 6 }} />
      },
      {
        dataIndex: _group.endDt,
        FormTag:<DatePicker />
      }
    ]
      .map(item => {
        if (item.dataIndex !== 'createdAt' && item.dataIndex !== 'updatedAt' && !item.option) {
          return ({
            ...item,
            title: formatMessage({ id: `group_${item.dataIndex}` }),
            placeholder: formatMessage({ id: `group_${item.dataIndex}` }),
            option: { rules: [{ required: true, message:' ' }] }
          })
        } else {
          return ({
            ...item,
            title: formatMessage({ id: `group_${item.dataIndex}` }),
            placeholder: formatMessage({ id: `group_${item.dataIndex}` })
          })
        }
      })
      .filter(item => {
        if (!item.show) {
          return item
        }
      })
    // 课程
    const formColumnsCourse = [
      {
        dataIndex: _course.createdAt,
        render:text => text ? moment(text).format('YYYY-MM-DD') : '',
        span:12
      },
      {
        dataIndex: _course.teacherIds,
        deep:['course', 'teachers'],
        render:text => {
          let arr = []
          text && text.toJS().forEach(item => {
            if (item.person) {
              arr.push(item.person.name)
            }
          })
          return arr.toString()
        },
        span:12
      },
      {
        dataIndex: _course.categories,
        deep:['course', 'categories'],
        render:text => {
          let arr = []
          text && text.toJS().forEach(item => {
            arr.push(item.name_zh)
          })
          return arr.toString()
        },
        span:12
      },
      {
        dataIndex: _course.videoType,
        deep:['coursePermission', 'type'],
        render:text => courseType[text] ? formatMessage({id:courseType[text]}) : '',
        span:12
      }
    ]
      .map(item => {
        if (item.dataIndex !== 'createdAt' && item.dataIndex !== 'updatedAt' && !item.option) {
          return ({
            ...item,
            title: formatMessage({ id: `course_${item.dataIndex}` }),
            placeholder: formatMessage({ id: `course_${item.dataIndex}` }),
            option: { rules: [{ required: true, message:' ' }] }
          })
        } else {
          return ({
            ...item,
            title: formatMessage({ id: `course_${item.dataIndex}` }),
            placeholder: formatMessage({ id: `course_${item.dataIndex}` })
          })
        }
      })
      .filter(item => {
        if (!item.show) {
          return item
        }
      })
    const formColumnsCourseOut = [
      {
        dataIndex: _course.endDt,
        FormTag:<DatePicker />
      }
    ]
      .map(item => {
        if (item.dataIndex !== 'createdAt' && item.dataIndex !== 'updatedAt' && !item.option) {
          return ({
            ...item,
            title: formatMessage({ id: `course_${item.dataIndex}` }),
            placeholder: formatMessage({ id: `course_${item.dataIndex}` }),
            option: { rules: [{ required: true, message:' ' }] }
          })
        } else {
          return ({
            ...item,
            title: formatMessage({ id: `course_${item.dataIndex}` }),
            placeholder: formatMessage({ id: `course_${item.dataIndex}` })
          })
        }
      })
      .filter(item => {
        if (!item.show) {
          return item
        }
      })
    const rowSelectionStudent = {
      selectedRowKeys:this.state.Studentselected.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        let Studentselected = {
          selectedRowKeys: selectedRowKeys,
          selectedRows: selectedRows
        }
        console.log(selectedRowKeys)
        this.setState({
          Studentselected
        })
      }
    }
    const rowSelectionAdmin = {
      selectedRowKeys:this.state.Adminselected.selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        let Adminselected = {
          selectedRowKeys: selectedRowKeys,
          selectedRows: selectedRows
        }
        console.log(selectedRowKeys)
        this.setState({
          Adminselected
        })
      }
    }
    return (
      <Row>
        <Title
          title={
            params.id !== 'new'
              ? formatMessage({ id: `${_tit.companyDetail}` })
              : formatMessage({ id: `${_tit.newCompany}` })
          }
          rightContent={
            params.id !== 'new' && (
              <Row style={{ width: '100%', textAlign: 'right' }}>
                <Button onClick={() => this.deleteCom()} style={{ marginRight: 24 }}>
                  {formatMessage({ id: 'deleteCompany' })}
                </Button>
              </Row>
            )
          }
        />
        <Card loading={loading} hoverable className={'wrap-card wrap-new'} style={{minWidth:1000}}>
          <Row style={{ width: 1000 }}>
            <Col span={24} style={{ padding: '16px 125px' }}>
              {logo ? (
                <Avatar
                  style={{ widht: 100, height: 100 }}
                  onClick={() => this.setState({ picModal: true })}
                  src={companyInfo && `${picURL}${logo}`}
                  className='user-header'
                />
              ) : (
                <Avatar
                  className='user-header'
                  style={{ paddingTop: 16, widht: 100, height: 100 }}
                  onClick={() => this.setState({ picModal: true })}
                >
                  <Icon type='plus' />
                  <div className='ant-upload-text'>Upload</div>
                </Avatar>
              )}
            </Col>
            <Col span={24}>
              <p className={'little-title'}>公司信息</p>
              <SimpleForm
                columns={formColumns1}
                initial={companyInfo}
                colSpan={12}
                labelCol={{ span: 6 }}
                onChange={this.changeForm}
                hideRequiredMark
                ref={f => {
                  this.formRef1 = f
                }}
              />
            </Col>
            <Col span={24}>
              <p className={'little-title'}>相关限制</p>
              <SimpleForm
                columns={formColumns2}
                initial={companyInfo}
                colSpan={12}
                labelCol={{ span: 6 }}
                onChange={this.changeForm}
                hideRequiredMark
                ref={f => {
                  this.formRef2 = f
                }}
              />
            </Col>
          </Row>
          <Row style={{ width: 1000, marginTop: 32 }}>
            <Col span={12} style={{ textAlign: 'center' }}>
              {params.id === 'new' && (
                <div>
                  <Button loading={this.state.btnLoading} onClick={() => this.create()} style={{ marginRight: 24 }} type='primary'>
                    {formatMessage({ id: 'create' })}
                  </Button>
                  <Button onClick={() => history.back()} style={{ marginRight: 24 }}>
                    {formatMessage({ id: 'cancel' })}
                  </Button>
                </div>
              )}

              {params.id !== 'new' && (
                <div>
                  <Button loading={this.state.btnLoading} onClick={() => this.update()} style={{ marginRight: 24 }} type='primary'>
                    {formatMessage({ id: 'save_btn' })}
                  </Button>
                  <Button
                    onClick={() => {
                      history.back()
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
        {params.id !== 'new' && (
          <Card loading={loading} hoverable className={'wrap-card wrap-new'} style={{marginTop: 24, marginBottom:24, minWidth:1000}}>
            <Tabs
              activeKey={tabKey}
              onChange={e => {
                console.log(e)
                this.setState({tabKey:e})
              }}
              style={{minHeight:600}}
            >
              <TabPane tab={formatMessage({id:'course'})} key={'course'}>
                <ImmutableTable
                  loading={tableLoading}
                  columns={columns}
                  // rowSelection={rowSelection}
                  dataSource={courseInCompnay}
                  title={() => (
                    <Row>
                      <Button type='primary' style={{marginRight:16}} onClick={() => this.setState({
                        courseModal:true
                      })}>
                        {formatMessage({id:'add_course'})}
                      </Button>
                      <Input style={{ width:200 }} ref={
                        f => { this.courseIn = f }} />
                      <Button type='primary' style={{ marginTop: -2 }} onClick={() => this.CourseInSearch()}>
                        {formatMessage({ id: 'search' })}
                      </Button>
                    </Row>
                  )}
                  pagination={{
                    pageSize: 10,
                    total: CourseInCount,
                    showQuickJumper: CourseInCount > 10,
                    current: CourseInCurrentPage
                  }}
                  onChange={e => this.changeTable(e, 'CourseIn')}
                  rowKey={record => record.get('id')}
                />
              </TabPane>
              <TabPane tab={formatMessage({id:'student'})} key={'student'}>
                <ImmutableTable
                  loading={tableLoading}
                  columns={studentColumns}
                  rowSelection={rowSelectionStudent}
                  dataSource={selectedStudent}
                  title={() => (
                    <Row>
                      <Col span={24}>
                        <Button type='primary' style={{marginRight:16}} onClick={() => this.setState({
                          studentModal:true
                        })}>
                          {formatMessage({id:'uploadToAdd_student'})}
                        </Button>
                        <Button onClick={() => this.operation('active')} style={{ marginRight: 24 }} type='primary'>
                          {formatMessage({ id: 'active' })}
                        </Button>
                        <Button onClick={() => this.operation('suspend')} style={{ marginRight: 24 }} type='primary'>
                          {formatMessage({ id: 'suspend' })}
                        </Button>
                        {/* <Button onClick={() => this.deleteStu()} style={{ marginRight: 24 }} type='danger'>
                          {formatMessage({ id: 'deleteOne' })}
                        </Button> */}
                        <Input style={{ width:200 }} ref={
                          f => { this.studentS = f }} />
                        <Button type='primary' style={{ marginTop: -2 }} onClick={() => this.StudentSearch()}>
                          {formatMessage({ id: 'search' })}
                        </Button>
                      </Col>
                    </Row>
                  )}
                  pagination={{
                    pageSize: 10,
                    total: StudentCount,
                    showQuickJumper: StudentCount > 10,
                    current: StudentCurrentPage
                  }}
                  onChange={e => this.changeTable(e, 'Student')}
                  rowKey={record => record.get('id')}
                />
              </TabPane>
              <TabPane tab={formatMessage({id:'group'})} key={'group'}>
                <ImmutableTable
                  loading={tableLoading}
                  columns={groupColumns}
                  // rowSelection={rowSelection}
                  dataSource={selectedGroup}
                  title={() => (
                    <Row>
                      <Button type='primary' style={{marginRight:16}} onClick={() => this.setState({
                        groupModal:true
                      })}>
                        {formatMessage({id:'add_group'})}
                      </Button>
                      <Input style={{ width:200 }} ref={
                        f => { this.GroupG = f }} />
                      <Button type='primary' style={{ marginTop: -2 }} onClick={() => this.GroupSearch()}>
                        {formatMessage({ id: 'search' })}
                      </Button>
                    </Row>
                  )}
                  pagination={{
                    pageSize: 10,
                    total: GroupCount,
                    showQuickJumper: GroupCount > 10,
                    current: GroupCurrentPage
                  }}
                  onChange={e => this.changeTable(e, 'Group')}
                  rowKey={record => record.get('id')}
                />
              </TabPane>
            </Tabs>
          </Card>
        )}
        <Modal
          visible={picModal}
          onCancel={() => this.setState({ uploadId: null, picModal: false, slideList: [] })}
          title={formatMessage({ id: 'headerPic' })}
          onOk={() => this.handlePicModal('logo')}
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
            <Col>
              {'只能上传图片.jpg .png .gif 并且只能小于2MB'}
            </Col>
          </Row>
        </Modal>
        <Modal
          visible={courseModal}
          onCancel={() => {
            this.setState({ courseId: null, courseModal: false, selectedCourseOut:Immutable.fromJS([]) })
          }}
          title={formatMessage({id:'course'})}
          onOk={this.handleCourseModal}
          maskClosable={false}
          width={1000}
          footer={
            <Row>
              {courseId && (
                <Button type='danger' onClick={() => this.deleteCoursePermission()}>
                  {formatMessage({id:'delete_course'})}
                </Button>
              )}
              <Button onClick={() => {
                this.setState({ courseId: null, courseModal: false, selectedCourseOut:Immutable.fromJS([]) })
              }}>
                {formatMessage({id:'cancel'})}
              </Button>
              <Button type='primary' onClick={() => this.handleCourseModal()}>
                {this.state.courseId ? formatMessage({id:'save_btn'}) : formatMessage({id:'check_add'})}
              </Button>
            </Row>
          }
        >
          <Row style={{ marginTop: 16, marginBottom: 16 }}>
            <Card className={'wrap-new'}>
              {!courseId && (
                <ImmutableTable
                  loading={loading}
                  columns={courseOutColumns}
                  // rowSelection={rowSelection}
                  dataSource={selectedCourseOut}
                  title={() => (
                    <Row>
                      <Col span={18}>
                        <Select
                          allowClear
                          value={selectT}
                          filterOption={(inputValue, option) => this.filterOption(inputValue, option)}
                          placeholder='Please select'
                          mode='multiple'
                          style={{ minWidth: 200, maxWidth: 600 }}
                          onChange={value => this.setState({ selectT: value })}
                        >
                          {getCourseOutList(restCourseOut)}
                        </Select>
                        <Button type='primary' style={{ marginTop: -2 }} onClick={() => this.addCourseOut()}>
                          {formatMessage({ id: 'add' })}
                        </Button>
                      </Col>
                    </Row>
                  )}
                  pagination={{
                    pageSize: 10,
                    total: selectedCourseOut.toJS().length,
                    showQuickJumper: selectedCourseOut.toJS().length > 10,
                    current: CourseOutcurrentPage
                  }}
                  onChange={e => this.changeCourseOutTable(e)}
                  rowKey={record => record.get('id')}
                />
              )}
              {courseId && (
                <Row className='payment-read' style={{ margin: '10px 17px', border: 0 }}>
                  <Col className='wrap' style={{ border: 0 }}>
                    {formColumnsCourse.map(columnMap)}
                  </Col>
                </Row>
              )}
              <Row>
                <SimpleForm
                  columns={formColumnsCourseOut}
                  initial={courseInfo}
                  colSpan={12}
                  labelCol={{ span: 6 }}
                  // onChange={this.changeForm}
                  hideRequiredMark
                  ref={f => {
                    this.formCourse = f
                  }}
                />
              </Row>
            </Card>
          </Row>
        </Modal>
        <Modal
          visible={studentModal}
          onCancel={() => {
            this.setState({ studentId: null, studentModal: false, studentModalTable:Immutable.fromJS([]), exelList:[] })
          }}
          title={formatMessage({id:'student'})}
          onOk={this.handleStudentModal}
          maskClosable={false}
          width={1000}
          footer={
            <Row>
              <Button onClick={() => {
                this.setState({ studentId: null, studentModal: false, studentModalTable:Immutable.fromJS([]), exelList:[] })
              }}>
                {formatMessage({id:'cancel'})}
              </Button>
              <Button type='primary' onClick={() => this.handleStudentModal()}>
                {formatMessage({id:'check_add'})}
              </Button>
            </Row>
          }
        >
          <Row style={{ marginTop: 16, marginBottom: 16 }}>
            <Card className={'wrap-new'}>
              <Upload
                action={`${host}/a/companyStudents/parserExcel`}
                beforeUpload={this.beforeUploadExel}
                // onPreview={this.handlePreview}
                onChange={this.handleExel}
                fileList={exelList}
                name='file'
              >
                <Button>
                  <Icon type='upload' /> Upload
                </Button>
              </Upload>
            </Card>
            <Card className={'wrap-new'}>
              <ImmutableTable
                loading={loading}
                columns={studentModalColumns}
                // rowSelection={rowSelection}
                title={() => (<Row className='wrap' style={{ border:0 }}>
                  <Col span={12} className='payment-read' style={{border:0, padding:4}}>
                    <Col span={10} className='payment-label'>{'该公司所剩名额数'}</Col>
                    <Col span={14} className='payment-value'>{companyInfo.get('maxPersonCount') - companyInfo.get('totalPerson')}</Col>
                  </Col>
                  <Col span={12} className='payment-read' style={{border:0, padding:4}}>
                    <Col span={10} className='payment-label'>{'下表中学员总数为'}</Col>
                    <Col span={14} className='payment-value'>{studentModalTable ? studentModalTable.toJS().length : 0}</Col>
                  </Col>
                </Row>)}
                dataSource={studentModalTable}
                pagination={{
                  pageSize: 10,
                  total: studentModalTable.toJS().length,
                  showQuickJumper: studentModalTable.toJS().length > 10,
                  current: studentModalTablecurrentPage
                }}
                onChange={e => this.changeStudentModalTable(e)}
                rowKey={record => record.get('id')}
              />
            </Card>
          </Row>
        </Modal>
        <Modal
          visible={groupModal}
          onCancel={() => {
            this.formGroup.setFieldsValue({
              name_zh:'',
              name_en:'',
              description_en:'',
              description_zh:'',
              endDt:''
            })
            this.setState({ groupId: null, groupModal: false })
          }}
          title={formatMessage({id:'group'})}
          onOk={this.handleGroupModal}
          maskClosable={false}
          width={1000}
          footer={
            <Row>
              {groupId && (
                <Button type='danger' onClick={() => this.deleteGroup()} >{
                  formatMessage({id:'delete_group'})
                }</Button>
              )}
              <Button onClick={() => {
                this.formGroup.setFieldsValue({
                  name_zh:'',
                  name_en:'',
                  description_en:'',
                  description_zh:'',
                  endDt:''
                })
                this.setState({ groupId: null, groupModal: false })
              }}>
                {formatMessage({id:'cancel'})}
              </Button>
              <Button type='primary' disabled={this.state.btnLoading} onClick={() => this.handleGroupModal()}>
                {groupId ? formatMessage({id:'update_group'}) : formatMessage({id:'create_group'})}
              </Button>
            </Row>
          }
        >
          <Row style={{ marginTop: 16, marginBottom: 16 }}>
            <Card className={'wrap-new'}>
              <SimpleForm
                columns={formColumnsGroup}
                initial={groupInfo}
                colSpan={12}
                labelCol={{ span: 6 }}
                // onChange={this.changeForm}
                hideRequiredMark
                ref={f => {
                  this.formGroup = f
                }}
              />
            </Card>
            {groupId && (
              <Card className={'wrap-new'}>
                <Tabs activeKey={groupTabKey} onChange={e => this.setState({
                  groupTabKey:e
                })}>
                  <TabPane tab={formatMessage({id:'course'})} key='courseGroup' style={{minHeight:600}}>
                    <ImmutableTable
                      loading={tableLoading}
                      columns={groupCourseColumns}
                      // rowSelection={rowSelection}
                      title={() => (
                        <Row>
                          <Col span={24}>
                            <span>{formatMessage({id:'course_endDt'})}{':'}</span>
                            <DatePicker ref={f => { this.groupCourseE = f }} style={{ marginRight:24 }} />
                            <Select
                              allowClear
                              value={selectC}
                              filterOption={(inputValue, option) => this.filterOption(inputValue, option)}
                              placeholder='Please select'
                              mode='multiple'
                              style={{ minWidth: 200, maxWidth: 600 }}
                              onChange={value => this.setState({ selectC: value })}
                            >
                              {getCourseOutList(restGroupCourse, 'coursePermissionId')}
                            </Select>
                            <Button type='primary' style={{ marginTop: -2 }} onClick={() => this.addGroupCourse()}>
                              {formatMessage({ id: 'add' })}
                            </Button>
                          </Col>
                        </Row>
                      )}
                      dataSource={selectedGroupCourse}
                      pagination={{
                        pageSize: 10,
                        total: GroupCourseCount,
                        showQuickJumper: GroupCourseCount > 10,
                        current: GroupCoursecurrentPage
                      }}
                      onChange={e => this.changeTable(e, 'GroupCourse')}
                      rowKey={record => record.get('id')}
                    />
                  </TabPane>
                  <TabPane tab={formatMessage({id:'student'})} key='studentGroup'>
                    <ImmutableTable
                      loading={tableLoading}
                      columns={groupStudentColumns}
                      // rowSelection={rowSelection}
                      title={() => (
                        <Row>
                          <Col span={24}>
                            <Select
                              allowClear
                              value={selectStu}
                              filterOption={(inputValue, option) => this.filterOption(inputValue, option)}
                              placeholder='Please select'
                              mode='multiple'
                              style={{ minWidth: 200, maxWidth: 600 }}
                              onChange={value => this.setState({ selectStu: value })}
                            >
                              {getGroupStudentList(restGroupStudent)}
                            </Select>
                            <Button type='primary' style={{ marginTop: -2 }} onClick={() => this.addGroupStudent()}>
                              {formatMessage({ id: 'add' })}
                            </Button>
                          </Col>
                        </Row>
                      )}
                      dataSource={selectedGroupStudent}
                      pagination={{
                        pageSize: 10,
                        total: GroupStudentCount,
                        showQuickJumper: GroupStudentCount > 10,
                        current: GroupStudentcurrentPage
                      }}
                      onChange={e => this.changeTable(e, 'GroupStudent')}
                      rowKey={record => record.get('id')}
                    />
                  </TabPane>
                </Tabs>
              </Card>
            )}

          </Row>
        </Modal>
      </Row>
    )
  }
}

CompanyDetail.propTypes = {
  pathJump: React.PropTypes.func
}

const mapStateToProps = state => {
  console.log(277, state && state.toJS())
  // let _vat_credit = state.getIn([])
  return {
    // companyInfo: state.getIn(['companyDetail', 'companyInfo'])
    companyType: state.getIn(['companyType', 'companyType'])
    // chapter:state.getIn(['company', 'chapter']),
    // chapterCount:state.getIn(['company', 'chapterCount']),
    // chapterInfo:state.getIn(['company', 'chapterInfo'])
  }
}

export default Form.create()(injectIntl(connect(mapStateToProps)(CompanyDetail)))
