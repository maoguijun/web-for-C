/*
 * @Author: Maoguijun
 * @Date: 2018-01-03 16:32:20
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-03-14 16:09:18
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
  course_tableField as _course,
  teacher_tableField as _teacher,
  fieldList,
  activeStatus,
  picURL,
  fieldListConfig,
  videoList,
  windowRuler,
  videoStatus
} from '../../../../config'
import Immutable, { fromJS } from 'immutable'
import { formatMoney } from '../../../../utils/formatData'
import { getFormRequired } from '../../../../utils/common'
import {
  fetchCourseInfo,
  newCourse,
  updateCourse,
  operateCourse,
  fetchUploadAuth,
  updateUploadAuth,
  fetchCourse,
  fetchChapter,
  fetchChapterInfo,
  newChapter,
  updateChapter,
  fetchParagraphs,
  deleteParagraphs,
  newCoursePermissions,
  deleteCoursePermissions,
  fetchParagraphsInfo,
  newParagraphs,
  updateParagraphs
} from '../modules/courseDetail'
import TableTitle from '../../../../components/TableTitle/TableTitle'
import './courseDetail_.scss'
import { courseDetailData } from '../../../../testData'
import { upTo } from '../../../../components/uploadToAliyun/uploadToAliyun'
const Option = Select.Option
const Search = Input.Search
const RadioGroup = Radio.Group
const FormItem = Form.Item
const { TextArea } = Input

const TabPane = Tabs.TabPane
const { MonthPicker, RangePicker } = DatePicker
import moment from 'moment'
import { fetchCourseType } from '../../../courseType_manager/modules/courseType'
import { fetchTeacher } from '../../../user_manager/teacher/modules/teacher'

class CourseDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      tableLoading:false,
      courseFlowStatus: 1,
      slideList: [],
      picModal: false,
      courseInfo: Immutable.fromJS({
        person: {}
      }),
      picture: '',
      textContent: '',
      Teachercount:0,
      TeachercurrentPage:1,
      demoVideo_percent: 0,
      demoVideoName: '', // 试看视频的名字
      demoVideoId:'', // 试看视频的id
      demoVideoStatus:0, // 试看视频的转码状态
      demoVideo_waitToCha:false, // 试看视频的是否上传完成
      wait:false,
      tabKey:'teacher',
      chapterInfo:Immutable.fromJS({}),
      videoModal: false,
      courseId:null,
      selectedTeacher: Immutable.fromJS([]), // table 中选入的老师
      restTeacher: Immutable.fromJS([]), // 待选框中剩余的老师
      filterTeacher: Immutable.fromJS([]), // table 中筛选后的老师
      selectT: [], // 选中的老师
      selectedChapter:Immutable.fromJS([]), // table 中选入的章节
      restChapter:Immutable.fromJS([]), // 待选框中剩余的章节
      selectC:[],
      ChapterCount:0,
      ChapterCurrentPage:1,
      chapterId:null,

      paragraphs:Immutable.fromJS([]), // 章节详情中的录播
      ParagraphsCount:0,
      ParagraphsCurrentPage:1,

      selectedBroad:Immutable.fromJS([]), // table 中选入的点播
      restBroad:Immutable.fromJS([]), // 待选框中剩余的点播
      BroadCount:0,
      broadInfo:Immutable.fromJS({}),
      BroadCurrentPage:1,
      selectB:[],
      broadModal:false,
      broadId:null,
      broadVideoName:'', // video 的上传name
      broadVideoId:'', // video 的上传Id
      broadVideoStatus:0,
      broadVideo_waitToCha:false,
      broadVideo_percent:0,
      broadPicture:'',
      broadPicModal:false,
      broadTeacherList:Immutable.fromJS([]), // 视频待选老师
      //
      serchTeacher:'',

      broadPermision:false // 创建点播权限

    }
  }
  /**
   *
   *
   * @memberof CourseDetail
   */
  componentWillMount () {
    const { dispatch, params, location } = this.props
    // 拉取课程
    dispatch(fetchCourseType())
    if (params.id !== 'new') {
      this.setState({ loading: true, tableLoading:true })
      dispatch(fetchCourseInfo(params.id)).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
        } else {
          console.log(e.payload)
          // 课程权限
          if (e.payload.coursePermissions) {
            e.payload.coursePermissions.forEach(item => {
              if (item.type === 1) {
                this.setState({
                  broadPermision:true
                })
              }
            })
          }
          let json = {
            limit:10,
            offset:0,
            courseId:params.id
          }
          let proms = [
            dispatch(fetchTeacher()),
            dispatch(fetchChapter(json)),
            dispatch(fetchParagraphs(json))
          ]
          Promise.all(proms).then(([teacher, chapter, paragraph]) => {
            let teachers = [ ...teacher.payload.objs ]
            let restTeacher = []
            e.payload.teachers.forEach(item => {
              restTeacher = teachers.filter(v => {
                console.log(134, item, v)
                if (item.id !== v.id) {
                  return v
                }
              })
            })
            this.setState({
              courseInfo: Immutable.fromJS(e.payload),
              courseFlowStatus:e.payload.courseStatus,
              picture: e.payload.picture,
              demoVideoName:e.payload.demoVideoName,
              demoVideoId:e.payload.demoVideo,
              demoVideoStatus:e.payload.demoVideoStatus,
              restTeacher: Immutable.fromJS(restTeacher),
              selectedTeacher:Immutable.fromJS(e.payload.teachers),
              Teachercount:restTeacher.length,
              selectedChapter:Immutable.fromJS(chapter.payload.objs),
              ChapterCount:chapter.payload.count,
              BroadCount:paragraph.payload.count,
              selectedBroad:Immutable.fromJS(paragraph.payload.objs)
            })
            if (e.payload.demoVideo) {
              this.setState({
                demoVideo_waitToCha:true
              })
            }
          }).finally(() => {
            this.setState({
              loading: false,
              tableLoading:false
            })
          })
        }
      })
    } else {
      dispatch(fetchTeacher()).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
        } else {
          this.setState({
            restTeacher: Immutable.fromJS(e.payload.objs)
          })
        }
      })
    }
  }
  onFetch = (values, limit, offset, cur = 1, type) => {
    const { chapterId } = this.state
    this.setState({ tableLoading: true, [`${type}CurrentPage`]: cur })
    const { dispatch, params } = this.props
    values = {
      ...values,
      limit: limit,
      offset: offset,
      courseId:params.id
    }
    if (type === 'Chapter') {
      dispatch(fetchChapter(values)).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
          this.setState({ tableLoading: false })
        } else {
          this.setState({
            tableLoading: false,
            ChapterCount: e.payload.count,
            selectedChapter:Immutable.fromJS(e.payload.objs)
          })
        }
      })
    } else if (type === 'Paragraphs') {
      dispatch(fetchParagraphs({...values, chapterId:chapterId})).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
          this.setState({ tableLoading: false })
        } else {
          this.setState({
            tableLoading: false,
            ParagraphsCount: e.payload.count,
            paragraphs:Immutable.fromJS(e.payload.objs)
          })
        }
      })
    } else if (type === 'Broad') {
      dispatch(fetchParagraphs({...values, chapterId:chapterId})).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
          this.setState({ tableLoading: false })
        } else {
          this.setState({
            tableLoading: false,
            BroadCount: e.payload.count,
            selectedBroad:Immutable.fromJS(e.payload.objs)
          })
        }
      })
    }
  }

  changeTable = (pagination, type) => {
    // console.log(pagination, filters, sorter)
    const limit = 10
    const offset = (pagination.current - 1) * limit
    this.onFetch({}, limit, offset, pagination.current, type)
  }
  changeTeacherTable = (pagination) => {
    console.log(199, pagination)
    this.setState({
      TeachercurrentPage:pagination.current
    })
  }
  // 搜索老师
  teacherSearch = () => {
    const { selectedTeacher } = this.state
    let _selectedTeacher = selectedTeacher.toJS()
    console.log(211, this.tea.input.value)
    let filterTeacher = _selectedTeacher.filter(item => {
      if (item.person.name.includes(this.tea.input.value)) {
        return item
      }
    })
    console.log(216, filterTeacher)
    this.setState({
      searchTeacher:this.tea.input.value,
      filterTeacher:Immutable.fromJS(filterTeacher)
    })
  }
  // 搜索章节
  ChapterSearch = () => {
    const {dispatch, params} = this.props
    this.setState({
      tableLoading:true
    })
    console.log(this.cha)
    let json = {
      limit:10,
      offset:0,
      name:this.cha.input.value,
      courseId:params.id
    }
    dispatch(fetchChapter(json)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
        this.setState({
          tableLoading:false
        })
      } else {
        this.setState({
          tableLoading:false,
          ChapterCount:e.payload.count,
          selectedChapter:Immutable.fromJS(e.payload.objs)
        })
      }
    })
  }
  // 搜索点播
  BroadSearch = () => {
    const {dispatch, params} = this.props
    this.setState({
      tableLoading:true
    })
    console.log(this.bro)
    let json = {
      limit:10,
      offset:0,
      name:this.bro.input.value,
      courseId:params.id
    }
    dispatch(fetchParagraphs(json)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
        this.setState({
          tableLoading:false
        })
      } else {
        this.setState({
          tableLoading:false,
          BroadCount:e.payload.count,
          selectedBroad:Immutable.fromJS(e.payload.objs)
        })
      }
    })
  }
  // 视频权限
  changeSwitch = (per, type, name) => {
    const { dispatch, params } = this.props
    const { courseInfo } = this.state
    let courseInfo_ = courseInfo.toJS()
    console.log(359, courseInfo_)
    let perId = ''
    if (courseInfo_.coursePermissions) {
      courseInfo_.coursePermissions.forEach(item => {
        if (item.type === type) {
          perId = item.id
        }
      })
    }
    // 如果当前有权限
    if (per) {
      dispatch(deleteCoursePermissions(perId)).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
        } else {
          dispatch(fetchCourseInfo(params.id)).then(e => {
            if (e.error) {
              message.error(e.error.message, 1)
            } else {
              message.success('删除权限成功', 1)
              this.setState({
                courseInfo:Immutable.fromJS(e.payload),
                [name]:false
              })
            }
          })
        }
      })
    } else {
      let json = {
        courseId:params.id,
        type:type
      }
      dispatch(newCoursePermissions(json)).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
        } else {
          dispatch(fetchCourseInfo(params.id)).then(e => {
            if (e.error) {
              message.error(e.error.message, 1)
            } else {
              message.success('获取权限成功', 1)
              this.setState({
                courseInfo:Immutable.fromJS(e.payload),
                [name]:true
              })
            }
          })
        }
      })
    }
  }
  // chapterDetail
  chapterDetail = (id) => {
    const { dispatch, params } = this.props
    dispatch(fetchChapterInfo(id)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
        return
      } else {
        console.log(281, e.payload)
        this.setState({
          chapterModal:true,
          chapterInfo:Immutable.fromJS(e.payload),
          chapterId:id
          // paragraphs:Immutable.fromJS(e.payload.paragraphs)
        })
      }
    })
    let json = {
      chapterId:id,
      courseId:params.id,
      limit:10,
      offset:0
    }
    dispatch(fetchParagraphs(json)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
      } else {
        console.log(e.payload)
        this.setState({
          paragraphs:Immutable.fromJS(e.payload.objs),
          ParagraphsCount:e.payload.count
        })
      }
    })
  }
  // broadDetail
  broadDetail = (id) => {
    const { dispatch, params } = this.props
    dispatch(fetchParagraphsInfo(id)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
        return
      } else {
        console.log(281, e.payload)
        this.setState({
          broadModal:true,
          broadInfo:Immutable.fromJS(e.payload),
          broadId:id,
          broadVideoName:e.payload.videoName,
          broadVideoId:e.payload.video,
          broadPicture:e.payload.picture
          // paragraphs:Immutable.fromJS(e.payload.paragraphs)
        })
        if (e.payload.video) {
          this.setState({
            broadVideo_waitToCha:true
          })
        }
        dispatch(fetchTeacher({chapterId:e.payload.chapterId})).then(e => {
          if (e.error) {
            message.error(e.error.message, 1)
          } else {
            this.setState({
              broadTeacherList:Immutable.fromJS(e.payload.objs)
            })
          }
        })
      }
    })
  }
  // 上传
  beforeUpload = file => {
    const { intl:{formatMessage} } = this.props
    let fileType = [
      'image/jpeg',
      'image/png',
      'image/gif'
    ]
    const isPIC = fileType.some(item => file.type === item)
    if (!isPIC) {
      message.error(formatMessage({id:'plsUploadImage'}), 1)
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error(formatMessage({id:'plsLess2'}), 1)
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

  // 激活暂停
  operation = operation => {
    const { dispatch, intl: { formatMessage }, params } = this.props
    if (operation === 'active') {
      let json = {
        ids: [params.id],
        courseStatus: 1
      }
      dispatch(operateCourse(params.id, json)).then(e => {
        if (!e.error) {
          message.success('success', 1)
          dispatch(fetchCourseInfo(params.id)).then(event => {
            if (event.error) {
              message.error(event.error.message, 1)
            } else {
              this.setState({
                courseInfo: Immutable.fromJS(event.payload),
                loading: false,
                courseFlowStatus:event.payload.courseStatus
              })
            }
          })
        }
      })
    } else if (operation === 'suspend') {
      let json = {
        ids: [params.id],
        courseStatus: 0
      }
      dispatch(operateCourse(params.id, json)).then(e => {
        if (!e.error) {
          message.success('success', 1)
          dispatch(fetchCourseInfo(params.id)).then(event => {
            if (event.error) {
              message.error(event.error.message, 1)
            } else {
              this.setState({
                courseInfo: Immutable.fromJS(event.payload),
                loading: false,
                courseFlowStatus:event.payload.courseStatus
              })
            }
          })
        }
      })
    }
  }

  handlePicModal = (name) => {
    const { courseInfo, slideList } = this.state
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
  // 删除点播
  deleteParagraphs = id => {
    const {dispatch, params } = this.props
    const { chapterId } = this.state
    dispatch(deleteParagraphs(id)).then(e => {
      if (e.error) {
        message.error(e.error.message, 1)
      } else {
        let json = {
          chapterId:chapterId,
          courseId:params.id,
          limit:10,
          offset:0
        }
        dispatch(fetchParagraphs(json)).then(e => {
          if (e.error) {
            message.error(e.error.message, 1)
          } else {
            console.log(e.payload)
            this.setState({
              paragraphs:Immutable.fromJS(e.payload.objs),
              ParagraphsCount:e.payload.count
            })
          }
        })
      }
    })
  }
  // 新增 或者 更新 chapter
  handleChapterModal = () => {
    const { params, dispatch } = this.props
    const { courseInfo, slideList, chapterId } = this.state
    console.log('todo')
    this.chapM.validateFields((err, value) => {
      if (err) {
        return
      } else {
        console.log('chapter', value)
        let json = {
          courseId:params.id,
          ...value
        }
        if (chapterId) {
          dispatch(updateChapter(chapterId, json)).then(e => {
            if (e.error) {
              message.error(e.error.message, 1)
            } else {
              let j = {
                courseId:params.id,
                name:this.cha.input.value,
                limit:10,
                offset:0
              }
              console.log(j)
              dispatch(fetchChapter(j)).then(event => {
                if (event.error) {
                  message.error(event.error.message, 1)
                } else {
                  this.chapM.setFieldsValue({
                    name_zh:'',
                    name_en:'',
                    teacherIds:[],
                    order:''
                  })
                  console.log(390, event)
                  this.setState({
                    chapterId:null,
                    chapterModal:false,
                    ChapterCount:event.payload.count,
                    selectedChapter:Immutable.fromJS(event.payload.objs)
                  })
                }
              })
            }
          })
        } else {
          dispatch(newChapter(json)).then(e => {
            if (e.error) {
              message.error(e.error.message, 1)
            } else {
              let j = {
                courseId:params.id,
                name:this.cha.input.value,
                limit:10,
                offset:0
              }
              console.log(j)
              dispatch(fetchChapter(j)).then(event => {
                if (event.error) {
                  message.error(event.error.message, 1)
                } else {
                  this.chapM.setFieldsValue({
                    name_zh:'',
                    name_en:'',
                    teacherIds:[],
                    order:''
                  })
                  this.setState({
                    chapterModal:false,
                    ChapterCount:event.payload.count,
                    selectedChapter:Immutable.fromJS(event.payload.objs)
                  })
                }
              })
            }
          })
        }
      }
    })
  }
  // 新增 或者 更新 broad
  handleBroadModal = () => {
    const { params, dispatch } = this.props
    const { courseInfo, broadId, broadPicture, broadVideoId, broadVideoName } = this.state
    console.log('todo')
    this.broD.validateFields((err, value) => {
      if (err) {
        return
      } else {
        console.log('broad', value)
        let json = {
          courseId:params.id,
          picture:broadPicture,
          video:broadVideoId,
          videoName:broadVideoName,
          ...value
        }
        if (broadId) {
          dispatch(updateParagraphs(broadId, json)).then(e => {
            if (e.error) {
              message.error(e.error.message, 1)
            } else {
              let j = {
                courseId:params.id,
                name:this.bro.input.value,
                limit:10,
                offset:0
              }
              console.log(j)
              dispatch(fetchParagraphs(j)).then(event => {
                if (event.error) {
                  message.error(event.error.message, 1)
                } else {
                  this.broD.setFieldsValue({
                    name_zh:'',
                    name_en:'',
                    teacherId:'',
                    order:'',
                    duration:'',
                    chapterId:''
                  })
                  console.log(390, event)
                  this.setState({
                    broadId:null,
                    broadModal:false,
                    BroadCount:event.payload.count,
                    selectedBroad:Immutable.fromJS(event.payload.objs),
                    broadTeacherList:Immutable.fromJS([]),
                    broadPicture:'',
                    broadVideoName:''
                  })
                }
              })
            }
          })
        } else {
          dispatch(newParagraphs(json)).then(e => {
            if (e.error) {
              message.error(e.error.message, 1)
            } else {
              console.log(697, e)
              let j = {
                courseId:params.id,
                name:this.bro.input.value,
                limit:10,
                offset:0
              }
              console.log(j)
              dispatch(fetchParagraphsInfo(e.payload.id)).then(event => {
                if (event.error) {
                  message.error(event.error.message, 1)
                } else {
                  this.setState({
                    broadInfo:Immutable.fromJS(event.payload),
                    broadId:e.payload.id
                  })
                }
              })
            }
          })
        }
      }
    })
  }
  receiveRaw = content => {
    console.log('recieved Raw content', content)
  }
  create = () => {
    // todo
    const { dispatch, intl: { formatMessage } } = this.props
    const { picture, demoVideoName, selectedTeacher, demoVideoId } = this.state
    this.formRef.validateFields((error, value) => {
      if (error) {
        message.info(formatMessage({ id: 'checkRuler' }), 1)
        return
      }
      let tableTeacherKeys = []
      let _selectedTeacher = selectedTeacher.toJS()
      _selectedTeacher.forEach(item => {
        tableTeacherKeys.push(item.id)
      })
      console.log(value)
      if (tableTeacherKeys.length === 0) {
        message.error(formatMessage({id:'plsAddTeachers'}), 1)
        return
      }
      let json = {
        picture,
        ...value,
        demoVideo: demoVideoId,
        demoVideoName:demoVideoName,
        teacherIds: tableTeacherKeys
      }
      console.log(json)
      dispatch(newCourse(json)).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
        } else {
          message.success(formatMessage({ id: 'submitSuccess' }), 1)
          dispatch(pathJump('/course'))
        }
      })
    })
  }
  update = () => {
    // todo
    const { dispatch, intl: { formatMessage }, params } = this.props
    const { picture, demoVideoName, selectedTeacher, demoVideoId } = this.state
    this.formRef.validateFields((error, value) => {
      if (error) {
        message.info(formatMessage({ id: 'checkRuler' }), 1)
        return
      }
      let tableTeacherKeys = []
      let _selectedTeacher = selectedTeacher.toJS()
      _selectedTeacher.forEach(item => {
        tableTeacherKeys.push(item.id)
      })
      console.log(value)
      let json = {
        picture,
        ...value,
        demoVideo: demoVideoId,
        demoVideoName:demoVideoName,
        teacherIds: tableTeacherKeys
      }
      console.log(json)
      dispatch(updateCourse(params.id, json)).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
        } else {
          message.success(formatMessage({ id: 'submitSuccess' }), 1)
        }
      })
    })
  }
  roll = id => {
    const {intl:{formatMessage}} = this.props
    console.log(id)
    let cb = () => {
      console.log(236, window[`${id}_percent`] + '')
      if (window[`${id}_percent`]) {
        this.setState({
          wait:false
        })
      } else {
        this.setState({
          wait:true
        })
      }
      if (this.state[`${id}_percent`] >= 100) {
        clearInterval(persent)
        message.success(formatMessage({id:'upload_success'}), 1)
        // 把window 上的这个数字改成0
        window[`${id}_percent`] = 0
        this.setState({
          [`${id}_percent`]: 0,
          [`${id}_waitToCha`]:true
        })
      } else {
        this.setState({
          [`${id}_percent`]: Math.ceil(window[`${id}_percent`])
        })
      }
    }
    let persent = setInterval(cb, 100)
  }

  startUpload = (id, files, name) => {
    const { dispatch } = this.props
    if (this.state[`${id}Id`]) {
      let json = {
        videoId:this.state[`${id}Id`]
      }
      dispatch(updateUploadAuth(json)).then(e => {
        if (e.error) {
          message.error(e.error.message, 1)
        } else {
          let { VideoId, UploadAuth, UploadAddress } = e.payload
          if (UploadAuth && UploadAddress) {
            upTo(id, files, UploadAuth.replace('=', ''), UploadAddress.replace('=', ''))
            this.roll(id)
            this.setState({
              [`${id}Id`]: VideoId
            })
            uploader.onUploadProgress
          }
        }
      })
    } else {
      let json = {
        Title:name
      }
      dispatch(fetchUploadAuth(json)).then(e => {
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
  }

  getList = list => {
    if (list) {
      return list.toJS()
    }
  }
  // 添加老师
  addTeacher = () => {
    const { selectT, selectedTeacher, restTeacher } = this.state
    console.log(283, selectT)
    let _restTeacher = restTeacher.toJS()
    let _selectedTeacher = selectedTeacher.toJS()
    selectT.forEach(v => {
      _restTeacher.forEach(item => {
        console.log(291, v, item.id)
        if (item.id === v) {
          _selectedTeacher.unshift(item)
        }
      })
      _restTeacher = _restTeacher.filter(item => {
        if (item.id !== v) {
          return item
        }
      })
    })
    this.setState({
      selectT: [],
      restTeacher: Immutable.fromJS(_restTeacher),
      selectedTeacher: Immutable.fromJS(_selectedTeacher)
    })
  }
  // 下拉框的筛选
  filterOption = (inputValue, option) => {
    // console.log(299,inputValue, option)
    return option.props.children.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
  }
  // 删除table中已经添加的teacher
  deleteTableTeacher = id => {
    console.log(id)
    const { selectedTeacher, restTeacher } = this.state
    let _restTeacher = restTeacher.toJS()
    let _selectedTeacher = selectedTeacher.toJS()
    _selectedTeacher.forEach(item => {
      if (item.id === id) {
        _restTeacher.push(item)
      }
    })
    _selectedTeacher = _selectedTeacher.filter(item => {
      if (item.id !== id) {
        return item
      }
    })
    this.setState({
      selectedTeacher: Immutable.fromJS(_selectedTeacher),
      restTeacher: Immutable.fromJS(_restTeacher)
    })
  }

  render () {
    const { intl: { formatMessage }, location: { pathname }, params, dispatch, courseType} = this.props
    const {
      loading,
      courseFlowStatus,
      picModal,
      slideList,
      textContent,
      courseInfo,
      picture,
      demoVideo_percent,
      demoVideoName,
      demoVideoId,
      demoVideoStatus,
      wait,
      videoModal,
      selectedTeacher,
      restTeacher,
      selectT,
      selectedChapter,
      restChapter,
      selectC,
      selectedBroad,
      restBroad,
      selectB,
      categoryIds,
      tabKey,
      chapterModal,
      chapterInfo,
      Teachercount,
      TeachercurrentPage,
      searchTeacher,
      filterTeacher,
      ChapterCount,
      ChapterCurrentPage,
      tableLoading,
      paragraphs,
      ParagraphsCount,
      ParagraphsCurrentPage,
      BroadCount,
      BroadCurrentPage,
      chapterId,
      broadPermision,
      broadModal,
      broadId,
      broadInfo,
      broadVideoName,
      broadVideo_percent,
      broadPicModal,
      broadPicture,
      broadTeacherList,
      broadVideoId,
      demoVideo_waitToCha,
      broadVideo_waitToCha,
      broadVideoStatus
    } = this.state

    console.log(258, demoVideo_percent, restTeacher && restTeacher.toJS())
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
    const getTeacherList = list => {
      let arr = []
      if (list) {
        let _list = list.toJS()
        _list.forEach(item => {
          arr.push({
            ...item.person,
            id: item.id
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
    const columns = [
      {
        dataIndex: _teacher.name,
        render: (text, record, index) => {
          return record.getIn(['person', 'name'])
        }
      },
      { dataIndex: _teacher.createdAt, render: text => text ? moment(text).format('YYYY-MM-DD') : '' },
      { dataIndex: _teacher.updatedAt, render: text => text ? moment(text).format('YYYY-MM-DD') : '' },
      {
        dataIndex: _teacher.field,
        render: (text, record, index) => {
          let arr = text.split(',')
          arr = arr.map(item => formatMessage({id:fieldListConfig[item]}))
          let string = arr.join('，')
          return (
            <div style={{ display: 'inline-block', marginRight: '15px' }}>
              <Tooltip title={<p>{string}</p>}>
                {string && string.length > 25 ? (
                  <span>
                    {string.substring(0, 25) + ' ··· '}
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
          return formatMessage({ id: activeStatus[record.getIn(['person', 'account', 'accountStatus'])] })
        }
      },
      {
        dataIndex: _teacher.detail,
        render: (text, record, index) => {
          return <a onClick={() => this.deleteTableTeacher(record.get('id'))}>{formatMessage({ id: 'delete' })}</a>
        }
      }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `teacher_${item.dataIndex}` })
    }))
    const chapterColumns = [
      {
        dataIndex: _course.name_zh
      },
      {
        dataIndex: _course.name_en
      },
      {
        dataIndex: _course.createdAt,
        render: text => moment(text || null).format('YYYY-MM-DD')
      },
      {
        dataIndex: _course.updatedAt,
        render: text => moment(text || null).format('YYYY-MM-DD')
      },
      {
        dataIndex: _course.detail,
        render: (text, record, index) => {
          return <a onClick={() => this.chapterDetail(record.get('id'))}>{formatMessage({ id: 'detail' })}</a>
        }
      }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `courseDetailChapter_${item.dataIndex}` })
    }))
    const broadColumns = [
      {
        dataIndex: _course.name_zh
      },
      {
        dataIndex: _course.name_en
      },
      {
        dataIndex: _course.createdAt,
        render: text => text ? moment(text).format('YYYY-MM-DD') : ''
      },
      {
        dataIndex: _course.updatedAt,
        render: text => text ? moment(text).format('YYYY-MM-DD') : ''
      },
      {
        dataIndex: _course.detail,
        render: (text, record, index) => {
          return <a onClick={() => this.broadDetail(record.get('id'))}>{formatMessage({ id: 'detail' })}</a>
        }
      }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `courseDetailBroad_${item.dataIndex}` })
    }))
    const paragraphsColumns = [
      {
        dataIndex: _course.name_zh
      },
      {
        dataIndex: _course.name_en
      },
      {
        dataIndex: _course.createdAt,
        render: text => text ? moment(text).format('YYYY-MM-DD') : ''
      },
      {
        dataIndex: _course.updatedAt,
        render: text => text ? moment(text).format('YYYY-MM-DD') : ''
      },
      {
        dataIndex: _course.operation,
        render: (text, record, index) => {
          return <a onClick={() => this.deleteParagraphs(record.get('id'))}>{formatMessage({ id: 'delete' })}</a>
        }
      }
    ].map(item => ({
      ...item,
      title: formatMessage({ id: `courseDetail_${item.dataIndex}` })
    }))
    const formColumns = [
      {
        dataIndex: _course.courseStatus,
        show: params.id === 'new',
        colSpan:24,
        labelCol:{span:3},
        wrapperCol:{span:21},
        FormTag: (
          <span>
            {courseInfo.get('courseStatus') !== undefined && formatMessage({ id: activeStatus[courseInfo.get('courseStatus')] })}
          </span>
        )
      },
      {
        dataIndex: _course.courseHours
      },
      {
        dataIndex: _course.name_zh
      },
      {
        dataIndex: _course.name_en
      },
      {
        dataIndex: _course.categoryIds,
        FormTag: (
          <Select
            mode='multiple'
            allowClear
            // defaultValue={categoryIds}
            // onSelect={value => {
            //   let { categoryIds } = this.state
            //   categoryIds.push(value)
            //   this.setState({
            //     categoryIds
            //   })
            // }}
            filterOption={(inputValue, option) => this.filterOption(inputValue, option)}
            placeholder='Please select'
          >
            {renderOption(this.getList(courseType))}
          </Select>
        )
      },
      { dataIndex: _course.description_zh, FormTag: <TextArea autosize={{ minRows: 5, maxRows: 6 }} /> },
      { dataIndex: _course.description_en, FormTag: <TextArea autosize={{ minRows: 5, maxRows: 6 }} /> },
      {
        dataIndex: _course.demoVideo,
        colSpan:24,
        labelCol:{span:3},
        wrapperCol:{span:21},
        FormTag: (
          <Row>
            <Col span={4}>
              <input
                type='file'
                name='file'
                id='demoVideo'
                style={{ width: 74 }}
                onChange={e => {
                  let name = e.target.files[0].name && e.target.files[0].name.slice(0, e.target.files[0].name.indexOf('.'))
                  this.setState({
                    demoVideoName: name,
                    demoVideo_waitToCha:false
                  })
                  console.log(e.target.files)
                  const isVideo = videoList.some(item => item === e.target.files[0].type)
                  if (!isVideo) {
                    message.error(formatMessage({id:'plsUploadVideo'}), 1)
                    return
                  }
                  this.startUpload('demoVideo', e.target.files, name)
                }}
              />
            </Col>
            <Col span={20}>
              <span>{<a onClick={() => window.open(`/AliyunScan/index.html?${demoVideoId}&&${courseInfo.get('PlayAuth')}`, 'scan', windowRuler)}>{demoVideoName}</a>}</span>
              {demoVideo_percent > 0 && (
                <Progress
                  percent={demoVideo_percent}
                  size='small'
                  strokeWidth={5}
                  style={{ position: 'relative', top: -24 }}
                />
              )}
              {wait && (
                <div style={{ position:'relative', top:-24 }}>{formatMessage({id:'waitToUpload'})}</div>
              )}
              {/* {demoVideo_waitToCha && (<div style={{ position:'relative', top: -24 }}>{formatMessage({id:videoStatus[demoVideoStatus]})}</div>)} */}
            </Col>
            <Col span={24}>
              {'视频上传完成后，需要保存之后才可以观看'}
            </Col>
          </Row>
        )
      }
    ]
      .map(item => {
        if (item.dataIndex !== 'status') {
          return ({
            ...item,
            title: formatMessage({ id: `courseDetail_${item.dataIndex}` }),
            option: { rules: [{ required: true, message:' ' }] },
            placeholder: formatMessage({ id: `courseDetail_${item.dataIndex}` })
          })
        } else {
          return ({
            ...item,
            title: formatMessage({ id: `courseDetail_${item.dataIndex}` }),
            placeholder: formatMessage({ id: `courseDetail_${item.dataIndex}` })
          })
        }
      })
      .filter(item => {
        if (!item.show) {
          return item
        }
      })
    const formColumnsChapter = [
      {
        dataIndex: _course.name_zh
      },
      {
        dataIndex: _course.name_en
      },
      {
        dataIndex: _course.order
      },
      {
        dataIndex: _course.teacherIds,
        FormTag: (
          <Select
            mode='multiple'
            allowClear
            filterOption={(inputValue, option) => this.filterOption(inputValue, option)}
            placeholder='Please select'
          >
            {getTeacherList(selectedTeacher)}
          </Select>
        )
      }
    ]
      .map(item => {
        if (item.dataIndex !== 'status') {
          return ({
            ...item,
            title: formatMessage({ id: `courseDetailChapter_${item.dataIndex}` }),
            option: { rules: [{ required: true, message:' ' }] },
            placeholder: formatMessage({ id: `courseDetailChapter_${item.dataIndex}` })
          })
        } else {
          return ({
            ...item,
            title: formatMessage({ id: `courseDetailChapter_${item.dataIndex}` }),
            placeholder: formatMessage({ id: `courseDetailChapter_${item.dataIndex}` })
          })
        }
      })
      .filter(item => {
        if (!item.show) {
          return item
        }
      })
    const formColumnsBroad = [
      {
        dataIndex: _course.name_zh
      },
      {
        dataIndex: _course.name_en
      },
      {
        dataIndex: _course.duration
      },
      {
        dataIndex: _course.order
      },
      {
        dataIndex: _course.chapterId,
        FormTag: (
          <Select
            // mode='tags'
            allowClear
            onChange={value => {
              const { selectedTeacher } = this.state
              const { dispatch } = this.props
              let _selectedTeacher = []
              if (selectedTeacher.toJS()) {
                _selectedTeacher = selectedTeacher.toJS().map(item => {
                  if (item.chapterId !== value) {
                    return item
                  }
                })
              }
              dispatch(fetchTeacher({
                chapterId:value
              })).then(e => {
                if (e.error) {
                  message.error(e.error.message, 1)
                } else {
                  this.setState({
                    broadTeacherList:Immutable.fromJS(e.payload.objs)
                  })
                }
              })
            }}
            filterOption={(inputValue, option) => this.filterOption(inputValue, option)}
            placeholder='Please select'
          >
            {getChapterList(selectedChapter)}
          </Select>
        )
      },
      {
        dataIndex: _course.teacherId,
        FormTag: (
          <Select
            // mode='tags'
            allowClear
            filterOption={(inputValue, option) => this.filterOption(inputValue, option)}
            placeholder='Please select'
          >
            {getTeacherList(broadTeacherList)}
          </Select>
        )
      }
    ]
      .map(item => {
        if (item.dataIndex !== 'status') {
          return ({
            ...item,
            title: formatMessage({ id: `courseDetailBroad_${item.dataIndex}` }),
            option: { rules: [{ required: true, message:' ' }] },
            placeholder: formatMessage({ id: `courseDetailBroad_${item.dataIndex}` })
          })
        } else {
          return ({
            ...item,
            title: formatMessage({ id: `courseDetailBroad_${item.dataIndex}` }),
            placeholder: formatMessage({ id: `courseDetailBroad_${item.dataIndex}` })
          })
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
              ? formatMessage({ id: `${_tit.courseDetail}` })
              : formatMessage({ id: `${_tit.newCourse}` })
          }
          rightContent={
            params.id !== 'new' && (
              <Row style={{ width: '100%', textAlign: 'right' }}>
                <Button
                  onClick={() => this.operation('active')}
                  style={{ marginRight: 24 }}
                  disabled={courseFlowStatus}
                >
                  {formatMessage({ id: 'active' })}
                </Button>
                <Button
                  onClick={() => this.operation('suspend')}
                  style={{ marginRight: 24 }}
                  disabled={!courseFlowStatus}
                >
                  {formatMessage({ id: 'suspend' })}
                </Button>
              </Row>
            )
          }
        />
        <Card loading={loading} hoverable className={'wrap-card wrap-new'}>
          <Row style={{ width: 1000 }}>
            <Col span={24} style={{ padding: '16px 125px' }}>
              {picture ? (
                <Avatar
                  style={{ width: 160, height: 100 }}
                  onClick={() => this.setState({ picModal: true })}
                  src={courseInfo && `${picURL}${picture}`}
                  className='user-header'
                />
              ) : (
                <Avatar
                  className='user-header header-down'
                  style={{ paddingTop: 16, width: 160, height: 100 }}
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
                initial={courseInfo}
                colSpan={12}
                labelCol={{ span: 6 }}
                onChange={this.changeForm}
                hideRequiredMark
                ref={f => {
                  this.formRef = f
                }}
              />
            </Col>
            {params.id === 'new' && (
              <Col span={24}>
                <ImmutableTable
                  loading={loading}
                  columns={columns}
                  // rowSelection={rowSelection}
                  dataSource={selectedTeacher}
                  title={() => (
                    <Row>
                      <span style={{ marginRight:16 }}>{formatMessage({id:'teacher'})}{':'}</span>
                      <Select
                        allowClear
                        value={selectT}
                        filterOption={(inputValue, option) =>
                          this.filterOption(inputValue, option)
                        }
                        placeholder='Please select'
                        mode='tags'
                        style={{ minWidth: 200, maxWidth: 600 }}
                        onChange={value => this.setState({ selectT: value })}
                      >
                        {getTeacherList(restTeacher)}
                      </Select>
                      <Button type='primary' style={{ marginTop: -2 }} onClick={() => this.addTeacher()}>
                        {formatMessage({ id: 'add' })}
                      </Button>
                    </Row>
                  )}
                  pagination={{
                    pageSize: 10,
                    total: selectedTeacher && selectedTeacher.toJS().length,
                    showQuickJumper: selectedTeacher && selectedTeacher.toJS().length > 10,
                    current: TeachercurrentPage
                  }}
                  onChange={(pagination) => this.changeTeacherTable(pagination)}
                  rowKey={record => record.get('id')}
                />
              </Col>
            )}
          </Row>
          <Row style={{ width: 1000, marginTop: 32 }}>
            <Col span={12} style={{ textAlign: 'center' }}>
              {params.id === 'new' && (
                <div>
                  <Button onClick={() => this.create()} style={{ marginRight: 24 }} type='primary'>
                    {formatMessage({ id: 'create' })}
                  </Button>
                  <Button style={{ marginRight: 24 }}>
                    {formatMessage({ id: 'cancel' })}
                  </Button>
                </div>
              )}

              {params.id !== 'new' && (
                <div>
                  <Button onClick={() => this.update()} style={{ marginRight: 24 }} type='primary'>
                    {formatMessage({ id: 'save_btn' })}
                  </Button>
                  <Button
                    onClick={() => {
                      dispatch(pathJump('course'))
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
          <Card loading={loading} hoverable className={'wrap-card wrap-new'} style={{marginTop: 24, marginBottom:24}}>
            <Tabs
              activeKey={tabKey}
              onChange={e => {
                console.log(e)
                this.setState({tabKey:e})
              }}
              style={{minHeight:600}}
            >
              <TabPane tab={formatMessage({id:'teacher'})} key={'teacher'}>
                <ImmutableTable
                  loading={loading}
                  columns={columns}
                  // rowSelection={rowSelection}
                  dataSource={searchTeacher ? filterTeacher : selectedTeacher}
                  title={() => (
                    <Row>
                      <Input style={{ width:200 }} ref={
                        f => { this.tea = f }} />
                      <Button type='primary' style={{ marginTop: -2 }} onClick={() => this.teacherSearch()}>
                        {formatMessage({ id: 'search' })}
                      </Button>
                      <span style={{ marginLeft:16 }}>{formatMessage({id:'teacher'})}{':'}</span>
                      <Select
                        allowClear
                        value={selectT}
                        filterOption={(inputValue, option) => {
                          this.filterOption(inputValue, option)
                        }}
                        placeholder='Please select'
                        mode='tags'
                        style={{ minWidth: 200, maxWidth: 600, marginLeft:8 }}
                        onChange={value => this.setState({ selectT: value })}
                      >
                        {getTeacherList(restTeacher)}
                      </Select>
                      <Button type='primary' style={{ marginTop: -2 }} onClick={() => this.addTeacher()}>
                        {formatMessage({ id: 'add' })}
                      </Button>
                    </Row>
                  )}
                  pagination={{
                    pageSize: 10,
                    total: searchTeacher ? (selectedTeacher && selectedTeacher.toJS().length) : (filterTeacher && filterTeacher.toJS().length),
                    showQuickJumper: searchTeacher ? (selectedTeacher && selectedTeacher.toJS().length) : (filterTeacher && filterTeacher.toJS().length) > 10,
                    current: TeachercurrentPage
                  }}
                  onChange={e => this.changeTeacherTable(e)}
                  rowKey={record => record.get('id')}
                />
                <Button type='primary' style={{marginTop:16}} onClick={() => this.update()} >
                  {formatMessage({id:'save_btn'})}
                </Button>
              </TabPane>
              <TabPane tab={formatMessage({id:'chapter'})} key={'chapter'}>
                <ImmutableTable
                  loading={tableLoading}
                  columns={chapterColumns}
                  // rowSelection={rowSelection}
                  dataSource={selectedChapter}
                  title={() => (
                    <Row>
                      <Button type='primary' style={{marginRight:16}} onClick={() => this.setState({
                        chapterModal:true
                      })}>
                        {formatMessage({id:'create_chapter'})}
                      </Button>
                      <Input style={{ width:200, marginLeft:16 }} ref={
                        f => { this.cha = f }} />
                      <Button type='primary' style={{ marginTop: -2 }} onClick={() => this.ChapterSearch()}>
                        {formatMessage({ id: 'search' })}
                      </Button>
                    </Row>
                  )}
                  pagination={{
                    pageSize: 10,
                    total: ChapterCount,
                    showQuickJumper: ChapterCount > 10,
                    current: ChapterCurrentPage
                  }}
                  onChange={e => this.changeTable(e, 'Chapter')}
                  rowKey={record => record.get('id')}
                />
                {/* <Button type='primary' style={{marginTop:16}} onClick={() => this.update()} >
                  {formatMessage({id:'save_btn'})}
                </Button> */}
              </TabPane>
              <TabPane tab={formatMessage({id:'recordedBroadcast'})} key={'recordedBroadcast'}>
                <ImmutableTable
                  loading={tableLoading}
                  columns={broadColumns}
                  // rowSelection={rowSelection}
                  dataSource={selectedBroad}
                  title={() => (
                    <Row>
                      <span>{formatMessage({id:'broadPermission'})}:</span>
                      <Switch checkedChildren='YES' unCheckedChildren='NO' checked={broadPermision} onChange={() => this.changeSwitch(broadPermision, 1, 'broadPermision')} />
                      <Button type='primary' style={{marginLeft:16}} onClick={() => this.setState({
                        broadModal:true
                      })}>
                        {formatMessage({id:'create_broad'})}
                      </Button>

                      <Input style={{ width:200, marginLeft:16 }} ref={
                        f => { this.bro = f }} />
                      <Button type='primary' style={{ marginTop: -2 }} onClick={() => this.BroadSearch()}>
                        {formatMessage({ id: 'search' })}
                      </Button>
                    </Row>
                  )}
                  pagination={{
                    pageSize: 10,
                    total: BroadCount,
                    showQuickJumper: BroadCount > 10,
                    current: BroadCurrentPage
                  }}
                  onChange={e => this.changeTable(e, 'Broad')}
                  rowKey={record => record.get('id')}
                />
              </TabPane>
              {/* <TabPane tab={formatMessage({id:'live'})} key={'live'}>live</TabPane>
              <TabPane tab={formatMessage({id:'offLive'})} key={'offLive'}>offLive</TabPane> */}
            </Tabs>
          </Card>
        )}
        <Modal
          visible={picModal}
          onCancel={() => this.setState({ uploadId: null, picModal: false, slideList: [] })}
          title={formatMessage({ id: 'headerPic' })}
          onOk={() => this.handlePicModal('picture')}
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
          visible={broadPicModal}
          onCancel={() => this.setState({ broadPicModal: false, slideList: [] })}
          title={'视频封面'}
          onOk={() => this.handlePicModal('broadPicture')}
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
          visible={chapterModal}
          onCancel={() => {
            this.chapM.setFieldsValue({
              name_zh:'',
              name_en:'',
              teacherIds:[]
            })
            this.setState({ chapterId: null, chapterModal: false })
          }}
          title={formatMessage({id:'chapter'})}
          onOk={this.handleChapterModal}
          maskClosable={false}
          width={1000}
          footer={
            <Row>
              <Button onClick={() => {
                this.chapM.setFieldsValue({
                  name_zh:'',
                  name_en:'',
                  teacherIds:[]
                })
                this.setState({ chapterId: null, chapterModal: false })
              }}>
                {formatMessage({id:'cancel'})}
              </Button>
              <Button type='primary' onClick={() => this.handleChapterModal()}>
                {chapterId ? formatMessage({id:'update_chapter'}) : formatMessage({id:'create_chapter'})}
              </Button>
            </Row>
          }
        >
          <Row style={{ marginTop: 16, marginBottom: 16 }}>
            <Card className={'wrap-new'}>
              <SimpleForm
                columns={formColumnsChapter}
                initial={chapterInfo}
                colSpan={12}
                labelCol={{ span: 6 }}
                // onChange={this.changeForm}
                hideRequiredMark
                ref={f => {
                  this.chapM = f
                }}
              />
            </Card>
            {chapterId && (
              <Card style={{marginTop:16}} className={'wrap-new'}>
                <ImmutableTable
                  loading={tableLoading}
                  columns={paragraphsColumns}
                  // rowSelection={rowSelection}
                  dataSource={paragraphs}
                  title={() => (
                    <Row>
                      {formatMessage({id:'recordedBroadcast'})}
                    </Row>
                  )}
                  pagination={{
                    pageSize: 10,
                    total: ParagraphsCount,
                    showQuickJumper: ParagraphsCount > 10,
                    current: ParagraphsCurrentPage
                  }}
                  onChange={e => this.changeTable(e, 'Paragraphs')}
                  rowKey={record => record.get('id')}
                />
              </Card>
            )}
          </Row>
        </Modal>
        <Modal
          visible={broadModal}
          onCancel={() => {
            this.broD.setFieldsValue({
              name_zh:'',
              name_en:'',
              teacherId:'',
              order:'',
              duration:'',
              chapterId:''
            })
            this.setState({ broadId: null, broadModal: false, broadPicture:'', broadTeacherList:Immutable.fromJS([]), broadVideoName:'' })
          }}
          title={formatMessage({id:'recordedBroadcast'})}
          // onOk={this.handleBroadModal}
          maskClosable={false}
          width={1000}
          footer={null}
        >
          <Row style={{ marginTop: 16, marginBottom: 16 }}>
            <Card className={'wrap-new'}>
              <Row>
                <SimpleForm
                  columns={formColumnsBroad}
                  initial={broadInfo}
                  colSpan={12}
                  labelCol={{ span: 6 }}
                  // onChange={this.changeForm}
                  hideRequiredMark
                  ref={f => {
                    this.broD = f
                  }}
                />
              </Row>
              <Row>
                <Col style={{ textAlign:'right', paddingRight:8 }} span={3}>{'视频封面:'}</Col>
                <Col span={21}>
                  {broadPicture ? (
                    <Avatar
                      style={{ widht: 100, height: 100 }}
                      onClick={() => this.setState({ broadPicModal: true })}
                      src={courseInfo && `${picURL}${broadPicture}`}
                      className='user-header'
                    />
                  ) : (
                    <Avatar
                      className='user-header'
                      style={{ paddingTop: 16, widht: 100, height: 100 }}
                      onClick={() => this.setState({ broadPicModal: true })}
                    >
                      <Icon type='plus' />
                      <div className='ant-upload-text'>Upload</div>
                    </Avatar>
                  )}
                </Col>
              </Row>
              {!broadId && (
                <Row style={{marginTop:16}}>
                  <Col style={{ textAlign:'center' }}>
                    <Button
                      type='primary'
                      onClick={() => this.handleBroadModal()}>{formatMessage({id:'saveAndUpload'})}
                    </Button>
                  </Col>
                </Row>
              )}
            </Card>
            {broadId && (
              <Card style={{marginTop:16}} className={'wrap-new'}>
                <Row>
                  <Col span={3} style={{ textAlign:'right', paddingRight:8 }}>
                    {'点播视频:'}
                  </Col>
                  <Col span={4}>
                    <input
                      type='file'
                      name='file'
                      id='broadVideo'
                      style={{ width: 74 }}
                      onChange={e => {
                        let name = e.target.files[0].name && e.target.files[0].name.slice(0, e.target.files[0].name.indexOf('.'))
                        this.setState({
                          broadVideoName: name,
                          broadVideo_waitToCha:false
                        })
                        const isVideo = videoList.some(item => item === e.target.files[0].type)
                        if (!isVideo) {
                          message.error(formatMessage({id:'plsUploadVideo'}), 1)
                          return
                        }
                        this.startUpload('broadVideo', e.target.files, name)
                      }}
                    />
                  </Col>
                  <Col span={16}>
                    <span>{<a onClick={() => window.open(`/AliyunScan/index.html?${broadVideoId}&&${broadInfo.get('PlayAuth')}`, 'scan', windowRuler)}>{broadVideoName}</a>}</span>
                    {broadVideo_percent > 0 && (
                      <Progress
                        percent={broadVideo_percent}
                        size='small'
                        strokeWidth={5}
                        style={{ position: 'relative' }}
                      />
                    )}
                    {wait && (
                      <div>{formatMessage({id:'waitToUpload'})}</div>
                    )}
                    {/* {broadVideo_waitToCha && (<div>{formatMessage({id:videoStatus[broadVideoStatus]})}</div>)} */}
                  </Col>
                  <Col span={24}>
                    {'视频上传完成后，需要保存之后才可以观看'}
                  </Col>
                </Row>
                <Row style={{ marginTop:24 }}>
                  <Col style={{textAlign: 'center'}}>
                    <Button type='primary' onClick={() => this.handleBroadModal()}>{formatMessage({id:'save_btn'})}</Button>
                  </Col>
                </Row>
              </Card>
            )}
          </Row>
        </Modal>
      </Row>
    )
  }
}

CourseDetail.propTypes = {
  pathJump: React.PropTypes.func
}

const mapStateToProps = state => {
  console.log(277, state && state.toJS())
  // let _vat_credit = state.getIn([])
  return {
    // courseInfo: state.getIn(['courseDetail', 'courseInfo'])
    courseType: state.getIn(['courseType', 'courseType'])
    // chapter:state.getIn(['course', 'chapter']),
    // chapterCount:state.getIn(['course', 'chapterCount']),
    // chapterInfo:state.getIn(['course', 'chapterInfo'])
  }
}

export default Form.create()(injectIntl(connect(mapStateToProps)(CourseDetail)))
