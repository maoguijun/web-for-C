/*
 * @Author: Maoguijun
 * @Date: 2018-01-15 12:43:05
 * @Last Modified by: Maoguijun
 * @Last Modified time: 2018-01-15 18:33:49
 */
// import { updateUploadAuth } from './../../routes/course_manager/course_detail/modules'
export const UploaderToAliyun = (id, uploadAuth, UploadAddress) => {
  const uploader = new AliyunUpload.Vod({
    // 分片大小默认1M
    partSize: 1048576,
    // 并行上传分片个数，默认5
    parallel: 5,
    // 网络原因失败时，重新上传次数，默认为3
    retryCount: 3,
    // 网络原因失败时，重新上传间隔时间，默认为2秒
    retryDuration: 2,
    // 开始上传
    onUploadstarted: function (uploadInfo) {
      console.log(
        'onUploadStarted:' +
          uploadInfo.file.name +
          ', endpoint:' +
          uploadInfo.endpoint +
          ', bucket:' +
          uploadInfo.bucket +
          ', object:' +
          uploadInfo.object
      )
      uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, UploadAddress)
    },
    // 文件上传成功
    onUploadSucceed: function (uploadInfo) {
      console.log(
        'onUploadSucceed: ' +
          uploadInfo.file.name +
          ', endpoint:' +
          uploadInfo.endpoint +
          ', bucket:' +
          uploadInfo.bucket +
          ', object:' +
          uploadInfo.object
      )
    },
    // 文件上传失败
    onUploadFailed: function (uploadInfo, code, message) {
      console.log('onUploadFailed: file:' + uploadInfo.file.name + ',code:' + code + ', message:' + message)
    },
    // 文件上传进度，单位：字节
    onUploadProgress: function (uploadInfo, totalSize, loadedPercent) {
      // console.log(
      //   'onUploadProgress:file:' +
      //     uploadInfo.file.name +
      //     ', fileSize:' +
      //     totalSize +
      //     ', percent:' +
      //     Math.ceil(loadedPercent * 100) +
      //     '%'
      // )
      window[`${id}_percent`] = loadedPercent * 100
    },
    // 上传凭证超时
    onUploadTokenExpired: function (uploadAuth) {
      console.log('onUploadTokenExpired')
      uploader.resumeUploadWithAuth(uploadAuth)
    }
  })
  window.uploader = uploader
}
export function upTo (id, files, uploadAuth, UploadAddress) {
  // console.log('-------', id, files, uploadAuth, UploadAddress)
  var userData = '{"Vod":{"UserData":"{"IsShowWaterMark":"false","Priority":"7"}"}}'
  UploaderToAliyun(id, uploadAuth, UploadAddress)
  for (let i = 0; i < files.length; i++) {
    uploader.addFile(files[i], null, null, null, userData)
  }
  uploader.startUpload()
}
