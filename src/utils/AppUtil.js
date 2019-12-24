import {EventEmitter} from 'fbemitter';

let emitter   = new EventEmitter();

/*
 * 订阅事件
 * @param eventType
 * @param callback
 */
const on = (eventType, callback) => emitter.addListener(eventType, callback);

/*
 * 触发事件
 * @param eventType
 * @param args
 */
const emit = (eventType, ...args) => {
    emitter.emit(eventType, ...args);
};

/*
 * 取消事件订阅
 * @param eventType
 */
const removeAllListeners = (eventType) => {
    emitter.removeAllListeners(eventType);
};
//
// /*
//  * 扩展Ajax请求
//  * @param params
//  * {
// 	 *     url: {String} 请求API路径
// 	 *     loading: {Boolean} 是否显示加载状态（菊花屏）
// 	 *     data: {JSON} 请求数据
// 	 *     type: {String} 请求类型，POST或GET等，默认GET
// 	 *     async: {Boolean} 是否异步，默认true
// 	 *     dataType: {String} text或json，默认
// 	 *     callback: {Function} 成功后的回调函数
// 	 *     completeCallback: {Function} 请求结束后的回调函数
// 	 * }
//  */
// const ajax = (params) => {
//
//     // 检测网络链接
//     if (!navigator.onLine) {
//         emit('APP-MESSAGE-OPEN', {
//             content : '网络链接失败，请重试！',
//         });
//         return;
//     }
//
//     const completeCallback = (result) => {
//         if (params.completeCallback) {
//             params.completeCallback(result);
//         }
//
//         emit(AppEventNames.APP_SET_LOADING_STATE_HANDLE, false);
//     };
//
//     const successCallback = (result) => {
//         try {
//             if (!result.success) {
//                 if ('ERROR_UNLOGIN' === result.messageCode) {
//                     emit('APP-SET-QUIT-LOGINED-STATE-HANDLE');
//                     SessionStore.setSessionLED(0);
//                     return;
//                 }
//             }
//             params.callback(result);
//         } catch (error) {
//             console.error(error);
//         }
//     };
//
//     const errorCallback = (xhr, textStatus, errorThrown) => {
//         if (params.errorCallback) {
//             params.errorCallback(xhr, textStatus, errorThrown);
//         }
//     };
//
//     let options = {};
//     let param   = params.param || '';
//
//     if (!params.data) {
//         params.data = {};
//     }
//
//     options.data          = JSON.stringify(params.data);
//     options.success       = successCallback;
//     options.error         = errorCallback;
//     options.complete      = completeCallback;
//     options.url           = params.url + param;
//     options.type          = params.type || 'POST';
//     options.async         = params.async || true;
//     options.dataType      = params.dataType || 'json';
//     options.contentType   = 'application/json';
//     options.crossDomain   = true;
//     options.ignoreSession = false;
//
//     try {
//         $.ajax(options);
//     } catch (e) {
//         emit('APP-MESSAGE-OPEN', {content : e});
//     }
// };
//
// const post = (option) => {
//     ajax(Object.assign(option, {type : 'POST'}));
// };
//
// const get = (option) => {
//     ajax(Object.assign(option, {type : 'GET'}));
// };
//
// const del = (option) => {
//     ajax(Object.assign(option, {type : 'DELETE'}));
// };
//
// const put = (option) => {
//     ajax(Object.assign(option, {type : 'PUT'}));
// };
//
// const upload = (uploadedFile, url, id) => new Promise((resolve) => {
//     let formData = new FormData();
//     formData.append('attach', uploadedFile);
//     formData.append('appId', id);
//     let upload = request.post(url)
//         .send(formData);
//     upload.end((_, response) => {
//         // console.log(err);
//         resolve(response);
//     });
// });

/*
 * 上传图片到图片服务器，支持多图片上传
 * url:图片服务器地址
 * folder：上传文件夹
 * params：上传文件数组列表
 */
// const uploadToImgServer = (params) => new Promise((resolve) => {
//     let formData = new FormData();
//     params.map(function (item) {
//         formData.append('attach', item);
//     });
//
//     let upload = request.post(`${HostApi.default.IMAGES_UPLOAD}`)
//         .send(formData);
//     upload.end((err, response) => {
//         if (null !== err) {
//             console.error(err);
//         }
//         resolve(response);
//     });
// });

// const deleteImgFromServer = (filename) => new Promise((resolve) => {
//     request
//         .delete(`${HostApi.default.SYS_DELETE_FILE(filename)}`)
//         .send()
//         .end((err, response) => {
//             if (null !== err) {
//                 console.error(err);
//             }
//             resolve(response)
//         })
// });

export default {
    on,
    emit,
    removeAllListeners,
};

