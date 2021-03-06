import { easyfetch } from './FetchHelper'
import {
  host,
  gender_type,
  customerFreezed,
  product_subcategory,
  product_type,
  product_style,
  supplierShowType,
  fieldListConfig,
  AESKey
} from '../config'
import Immutable from 'immutable'
import moment from 'moment'
import { formatDate, formatMoney, configDirectory, configDirectoryObject, formatAddress } from '../utils/formatData'
import CryptoJS from 'crypto-js'
import zh from '../locale/zh'
import en from '../locale/en'

exports.fetchPayment = id => easyfetch(host, `orders/${id}`, 'get')

// array to Object
Array.prototype.toObject = function (key = 'id') {
  let obj = {}
  this.forEach(item => {
    if (item[key] !== undefined) {
      obj[item[key]] = item
    }
  })
  return obj
}

export function JSONparse (json) {
  var parsed
  try {
    parsed = JSON.parse(json)
  } catch (e) {}
  // console.log('转换JSON字段', parsed)
  return parsed
}

// 保存创建申请单的值到sessionStorage

exports.savePaymentToStorage = obj => {
  // console.log('保存 payment 数据到 sessionStorage')
  sessionStorage.setItem('payment', JSON.stringify(obj))
}

exports.getPaymentFormStorage = () => JSONparse(sessionStorage.getItem('payment'))
exports.removePaymentToStorage = () => sessionStorage.removeItem('payment')

// 设置表单的默认值
export const setFormDefaultValue = props => {
  let initial = {}
  console.log('navigator', window.navigator)
  let language = ['zh', 'zh-CN'].some(v => v === window.navigator.language) ? zh : en
  if (props.initial) {
    // console.log('init', props.initial && props.initial.toJS())
    props.columns.forEach(item => {
      // 获取表单的默认值
      const value =
        props.initial.getIn(item.deep || [item.dataIndex]) ||
        props.initial.getIn(item.dataIndex) ||
        props.initial.get(item.dataIndex)
      // console.log('vvv',value)
      if (value) {
        if (item.transform) {
          // console.log('======',item.transform(value))
          initial[item.dataIndex] = item.transform(value)
        } else {
          initial[item.dataIndex] = value
        }
      } else {
        if (value === 0) {
          initial[item.dataIndex] = value
        } else {
          initial[item.dataIndex] = undefined
        }
      }
    })

    // 如果有id也放入表单中
    // if (props.initial.get('id')) {
    //  initial.id=props.initial.get('id')
    //  props.form.setFieldsValue({keys:props.initial.get('id')})
    // }

    if (props.initial.has('validDate')) {
      initial.validDate = moment(props.initial.get('validDate'), 'YYYY/MM/DD') || ''
    }
    if (props.initial.has('INVDate')) {
      initial.INVDate = moment(props.initial.get('INVDate'), 'YYYY/MM/DD') || ''
    }
    if (props.initial.has('actualInvoiceDate')) {
      initial.actualInvoiceDate = moment(props.initial.get('actualInvoiceDate'), 'YYYY/MM/DD') || ''
    }
    if (props.initial.has('collectedDate')) {
      initial.collectedDate = moment(props.initial.get('collectedDate'), 'YYYY/MM/DD') || ''
    }
    if (props.initial.has('inValidDate')) {
      initial.inValidDate = moment(props.initial.get('inValidDate'), 'YYYY/MM/DD') || ''
    }
    if (props.initial.has('birthday')) {
      initial.birthday = moment(props.initial.get('birthday'), 'YYYY/MM/DD') || ''
    }
    if (props.initial.has('createdAt')) {
      initial.createdAt = moment(props.initial.get('createdAt'), 'YYYY/MM/DD') || ''
    }
    if (props.initial.has('updatedAt')) {
      initial.updatedAt = moment(props.initial.get('updatedAt'), 'YYYY/MM/DD') || ''
    }
    if (props.initial.has('startDt')) {
      initial.startDt = moment(props.initial.get('startDt'), 'YYYY/MM/DD') || ''
    }
    if (props.initial.has('endDt')) {
      initial.endDt = moment(props.initial.get('endDt'), 'YYYY/MM/DD') || ''
    }

    if (props.initial.has('startDate')) {
      initial.startDate = moment(props.initial.get('startDate').substring(0, 10)) || ''
    }

    if (props.initial.has('roles')) {
      initial.roles = []
      props.initial.get('roles').forEach(v => {
        initial.roles.push(v.get('id'))
      })
    } else {
      initial.roles = []
    }
    // 专业领域
    if (props.initial.has('field')) {
      initial.field = []
      props.initial
        .get('field')
        .split(',')
        .forEach(v => {
          initial.field.push(language[fieldListConfig[v]] || fieldListConfig[v] || v)
        })
    } else {
      initial.field = []
    }
    // 课程课程类别
    if (props.initial.has('categories')) {
      initial.categoryIds = []
      props.initial.get('categories').forEach(v => {
        initial.categoryIds.push(v.get('id'))
      })
    } else {
      initial.categoryIds = []
    }
    // 讲师
    if (props.initial.has('teachers')) {
      initial.teacherIds = []
      props.initial.get('teachers').forEach(v => {
        initial.teacherIds.push(v.get('id'))
      })
    } else {
      initial.teacherIds = []
    }
  } else {
    props.form.resetFields()
  }
  console.log('表单默认值', initial)

  let _canBeSet = {}
  props.columns.map(v => {
    for (let k in initial) {
      if (v.dataIndex === k) {
        _canBeSet[k] = initial[k]
      }
    }
  })

  console.log('kkkkkk', _canBeSet)
  props.form && props.form.setFieldsValue(_canBeSet)
}

// 设置表单必选项
export function getFormRequired (message, type) {
  return {
    initialValue: [],
    rules: [{ required: true, message, type }]
  }
}

// 将分散在details 数据抽出和并成一条数据
export function splitDataFromField (data = Immutable.List(), field = 'details') {
  let $formatVendor = Immutable.List()
  let mergeCount = 0
  data.forEach($v => {
    let mergeSpan = 1 // 用来标识合并rowSpan
    let mergeGroup = 0 // 用来标识合并项的Row class,用来优化row hover
    const $base = $v.delete(field)
    const $details = $v.get(field)
    if ($details.size > 1) {
      mergeGroup = ++mergeCount
      mergeSpan = $details.size
      const $list = $details.map(($detil, i) =>
        $detil.merge(
          $base.merge({
            merge: i > 0 ? 0 : mergeSpan,
            mergeGroup
          })
        )
      )
      $formatVendor = $formatVendor.concat($list)
    } else {
      $formatVendor = $formatVendor.concat([$base])
    }
  })
  return $formatVendor
}

// 加密aes

exports.encryptAes = data => {
  let iv = CryptoJS.enc.Utf8.parse(AESKey)

  let enc = CryptoJS.AES.encrypt(data, iv, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })

  return enc.toString()
}

// sha256 加密

exports.encryptSha256 = data => {
  let enc = CryptoJS.SHA256(data).toString()

  return enc
}

export const formmatTimeToDay = value => {
  return value ? moment(value).format('YYYY-MM-DD') : ''
}
