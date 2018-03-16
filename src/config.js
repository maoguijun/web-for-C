exports.locale = {
  cn: 'zh',
  en: 'en'
}
export const AESKey = 'AGtJxHXhSqNdwKo0Tb3VOfEgYnp2DrLI'

export const tableLimit = 10
exports.host = '/api'
exports.serverurl = '/api'
// export const picURL = 'http://youplustest.oss-cn-shanghai.aliyuncs.com/' 测试url
export const picURL = '//ossyouplustesting.businesstrainingshpwc.com/' // 线上url
exports.fetchState = {
  success: 'success'
}
export const windowRuler =
  'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no,width=1400,height=800'
export const emailTest = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
export const mobileTest = /^1\d{10}$/
export const passwordTest = /[A-Za-zd]+/
export const commonLish = {
  from: 'from',
  to: 'to'
}
export const videoList = [
  'video/mp4',
  'video/avi',
  'video/x-ms-wmv',
  'video/x-flv',
  'application/x-mpegurl',
  'video/mpeg',
  'video/x-ms-asf',
  'video/x-matroska',
  'video/quicktime',
  'video/vnd.dlna.mpeg-tts',
  'video/webm'
]
// 转码状态
export const videoStatus = {
  '0': 'Transcoding',
  '1': 'transcodingOk',
  '2': 'transcodingFail'
}

exports.rootPath = {
  bill_to: 'bill_to',
  student: 'student',
  studentDetail: 'student/studentDetail',
  teacher: 'teacher',
  teacherDetail: 'teacher/teacherDetail',
  company: 'company',
  companyDetail: 'company/companyDetail',
  course: 'course',
  courseDetail: 'course/courseDetail',
  question: 'question',
  questionDetail: 'question/questionDetail',
  courseType: 'courseType',
  courseTypeDetail: 'courseType/courseTypeDetail'
}

export let titles = {
  bill_to: 'bill_to',
  student: 'student',
  studentDetail: 'studentDetail',
  teacher: 'teacher',
  teacherDetail: 'teacherDetail',
  newTeacher: 'newTeacher',
  company: 'company',
  companyDetail: 'companyDetail',
  newCompany: 'newCompany',
  course: 'course',
  courseDetail: 'courseDetail',
  newCourse: 'newCourse',
  question: 'question',
  questionDetail: 'questionDetail',
  courseType: 'courseType',
  courseTypeDetail: 'courseTypeDetail'
}
for (let key in titles) {
  titles[key] = `title_${titles[key]}`
}
// 激活状态
export const activeStatus = {
  '0': 'not_active',
  '1': 'activeted'
}

export const status = {
  '0': 'deleted',
  '1': 'normal'
}

// 用户类型
export const accountType = {
  '0': 'admin',
  '1': 'companyAdmin',
  '2': 'teacher',
  '3': 'student'
}

// 性别
export const gender = {
  '0': 'x',
  '1': 'male',
  '2': 'female'
}

// 学生类型
export const studentTypeArr = {
  '1': 'companyStudent',
  '2': 'normalStudent'
}

// 课程类型
export const courseType = {
  '1': 'recordedBroadcast',
  '2': 'live',
  '3': 'offLive'
}

// 广告类型
export const advertisingType = {
  '1': 'course',
  '2': 'link'
}

// 学生是否有权学习
export const learningAuthority = {
  '0': 'no',
  '1': 'yes'
}

// 课程 章节 视频 学习状态
export const learningStatus = {
  '0': 'notStart',
  '1': 'finished'
}

// 提问回复类型

export const questionReplyType = {
  '1': 'question',
  '2': 'reply'
}
export const questionReplyTypeArr = [
  {
    label: 'question',
    value: '0'
  },
  {
    label: 'reply',
    value: '1'
  }
]

// 学员类型
export const studentType = [
  {
    label: '个人学员',
    value: '2'
  },
  {
    label: '公司学员',
    value: '1'
  }
]
// 账号状态类型
export const FlowStatus = [
  {
    label: '未激活',
    value: '0'
  },
  {
    label: '已激活',
    value: '1'
  }
]
// 提问状态
export const questionStatus = [
  {
    label: '待回答',
    value: '1'
  },
  {
    label: '已回答',
    value: '2'
  }
]

// 提问回复类型

exports.questionReplyType = {
  '0': 'question',
  '1': 'reply'
}

// 提问回复已读状态
exports.haveRead = {
  yes: 1,
  no: 0
}

// 专业领域
export const fieldList = [
  'Marketing and Communications',
  'Management skills and Communication/influence skills',
  'International Relations/MNCs/Global Leadership/Innovation',
  'Human resources and consulting skills',
  'Consulting/business process/technology transformation'
]
export const fieldListConfig = {
  '1': 'Marketing and Communications',
  '2': 'Management skills and Communication/influence skills',
  '3': 'International Relations/MNCs/Global Leadership/Innovation',
  '4': 'Human resources and consulting skills',
  '5': 'Consulting/business process/technology transformation'
}
export const fieldListOption = [
  {
    label: 'Marketing and Communications',
    value: '1'
  },
  {
    label: 'Management skills and Communication/influence skills',
    value: '2'
  },
  {
    label: 'International Relations/MNCs/Global Leadership/Innovation',
    value: '3'
  },
  {
    label: 'Human resources and consulting skills',
    value: '4'
  },
  {
    label: 'Consulting/business process/technology transformation',
    value: '5'
  }
]

// 搜索
export const search_item = {
  flowStatus: 'flowStatus',
  id_like: 'id_like',
  'billingPlan.flowStatus': 'status',
  'clientPoDetail.description_like': 'clientPoDetail.description_like',
  'clientPoDetail.clientPoType': 'clientPoDetail.clientPoType',
  'clientPoDetail.sentToId': 'clientPoDetail.sentToId',
  'clientPoDetail.billToId': 'clientPoDetail.billToId',
  'clientPoDetail.placedToId': 'clientPoDetail.placedToId',
  'clientPoDetail.currencyId': 'clientPoDetail.currencyId',
  'clientPoDetail.clientId': 'clientPoDetail.clientId',
  budgetType: 'budgetType',
  budgetType_in: 'budgetType_in',

  studentType: 'studentType',
  mail: 'mail'
}
export const student_tableField = {
  name: 'name',
  mobile: 'mobile',
  mail: 'mail',
  position: 'position',
  companyName: 'companyName',
  studentType: 'studentType',
  flowStatus: 'flowStatus',
  detail: 'detail',
  group: 'group',
  createdAt: 'createdAt',
  lastLoginTime: 'lastLoginTime',
  status: 'status',
  updatedAt: 'updatedAt',
  workExperience: 'workExperience',
  groupNameEn: 'groupNameEn',
  groupNameZh: 'groupNameZh',
  birthday: 'birthday',
  nickName: 'nickName',
  message: 'message',
  operation: 'operation',
  delete: 'delete'
}
export const teacher_tableField = {
  name: 'name',
  mobile: 'mobile',
  mail: 'mail',
  position_en: 'position_en',
  position_zh: 'position_zh',
  companyName: 'companyName',
  studentType: 'studentType',
  flowStatus: 'flowStatus',
  detaile: 'detail',
  createdAt: 'createdAt',
  status: 'status',
  updatedAt: 'updatedAt',
  workExperience: 'workExperience',
  groupName: 'groupName',
  age: 'age',
  nickname: 'nickname',
  field: 'field',
  username: 'username',
  password: 'password',
  description: 'description',
  introduction_zh: 'introduction_zh',
  introduction_en: 'introduction_en'
}
export const company_tableField = {
  name: 'name',
  mobile: 'mobile',
  mail: 'mail',
  position: 'position',
  companyOperationer: 'companyOperationer',
  createdUser: 'createdUser',
  companyName: 'companyName',
  studentType: 'studentType',
  flowStatus: 'flowStatus',
  detaile: 'detail',
  createdAt: 'createdAt',
  status: 'status',
  updatedAt: 'updatedAt',
  companyType: 'companyType',
  startDt: 'startDt',
  endDt: 'endDt',
  address: 'address',
  size: 'size',
  website: 'website',
  maxPersonCount: 'maxPersonCount'
}
export const course_tableField = {
  name_zh: 'name_zh',
  name_en: 'name_en',
  mobile: 'mobile',
  mail: 'mail',
  position: 'position',
  companyOperationer: 'companyOperationer',
  createdUser: 'createdUser',
  companyName: 'companyName',
  studentType: 'studentType',
  flowStatus: 'flowStatus',
  detaile: 'detail',
  createdAt: 'createdAt',
  courseStatus: 'courseStatus',
  status: 'status',
  updatedAt: 'updatedAt',
  workExperience: 'workExperience',
  groupName: 'groupName',
  age: 'age',
  nickname: 'nickname',
  field: 'field',
  username: 'username',
  password: 'password',
  description: 'description',
  categoryIds: 'categoryIds',
  courseHours: 'courseHours',
  description_zh: 'description_zh',
  description_en: 'description_en',
  demoVideo: 'demoVideo',
  startDt: 'startDt',
  endDt: 'endDt',
  courseType: 'courseType',
  videoName: 'videoName',
  categories: 'categories',
  teacherIds: 'teacherIds',
  order: 'order',
  operation: 'operation',
  duration: 'duration',
  chapterId: 'chapterId',
  teacherId: 'teacherId',
  videoType: 'videoType'
}
export const question_tableField = {
  courseName_zh: 'courseName_zh',
  courseName_en: 'courseName_en',
  chapterName_zh: 'chapterName_zh',
  chapterName_en: 'chapterName_en',
  updatedAt: 'updatedAt',
  qPersonName: 'qPersonName',
  tPersonName: 'tPersonName',
  detail: 'detail',
  type: 'type',
  replyStatus: 'replyStatus',
  content: 'content',
  replyContent: 'replyContent'
}
export const courseType_tableField = {
  detaile: 'detail',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  status: 'status',
  id: 'id',
  name_zh: 'name_zh',
  name_en: 'name_en',
  createdUser: 'createdUser',
  description_zh: 'description_zh',
  description_en: 'description_en',
  course: 'course'
}
export const group_tableField = {
  detaile: 'detail',
  startDt: 'startDt',
  endDt: 'endDt',
  id: 'id',
  name_zh: 'name_zh',
  name_en: 'name_en',
  createdUser: 'createdUser',
  description_zh: 'description_zh',
  description_en: 'description_en',
  course: 'course',
  createdAt: 'createdAt'
}
