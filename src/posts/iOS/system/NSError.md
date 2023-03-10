---
title:      "NSError"
date:       2018-05-31
category:
  - iOS
tag:
  - iOS
---

> 前言
> 
> 整理一下在iOS开发中NSError的错误代码

## NSError

NSError是系统错误信息类

初始化方法两个

```objc
  // domain 不能为空 dict可以为空
  
  - (instancetype)initWithDomain:(NSErrorDomain)domain code:(NSInteger)code userInfo:(nullable NSDictionary *)dict;

  + (instancetype)errorWithDomain:(NSErrorDomain)domain code:(NSInteger)code userInfo:(nullable NSDictionary *)dict;
```



### 属性

- @property (readonly) NSInteger code;//错误代码

- @property (readonly, copy) NSDictionary *userInfo;//错误信息

- @property (readonly, copy) NSString *localizedDescription;//获取本地化描述

- @property (nullable, readonly, copy) NSString *localizedFailureReason;//获取失败原因

- @property (nullable, readonly, copy) NSString *localizedRecoverySuggestion;//获取恢复建议

- @property (nullable, readonly, copy) NSArray<NSString *> *localizedRecoveryOptions;本地恢复建议

- @property (nullable, readonly, strong) id recoveryAttempter;

- @property (nullable, readonly, copy) NSString *helpAnchor;

### NSError错误code对照表

```objc
NSError codes in the Cocoa error domain.

enum {
 NSFileNoSuchFileError = 4,
 NSFileLockingError = 255,
 NSFileReadUnknownError = 256,
 NSFileReadNoPermissionError = 257,
 NSFileReadInvalidFileNameError = 258,
 NSFileReadCorruptFileError = 259,
 NSFileReadNoSuchFileError = 260,
 NSFileReadInapplicableStringEncodingError = 261,
 NSFileReadUnsupportedSchemeError = 262,
 NSFileReadTooLargeError = 263,
 NSFileReadUnknownStringEncodingError = 264,
 NSFileWriteUnknownError = 512,
 NSFileWriteNoPermissionError = 513,
 NSFileWriteInvalidFileNameError = 514,
 NSFileWriteInapplicableStringEncodingError = 517,
 NSFileWriteUnsupportedSchemeError = 518,
 NSFileWriteOutOfSpaceError = 640,
 NSFileWriteVolumeReadOnlyError = 642m
 NSKeyValueValidationError = 1024,
 NSFormattingError = 2048,
 NSUserCancelledError = 3072,

NSFileErrorMinimum = 0,
 NSFileErrorMaximum = 1023,
 NSValidationErrorMinimum = 1024,
 NSValidationErrorMaximum = 2047,
 NSFormattingErrorMinimum = 2048,
 NSFormattingErrorMaximum = 2559,

NSPropertyListReadCorruptError = 3840,
 NSPropertyListReadUnknownVersionError = 3841,
 NSPropertyListReadStreamError = 3842,
 NSPropertyListWriteStreamError = 3851,
 NSPropertyListErrorMinimum = 3840,
 NSPropertyListErrorMaximum = 4095

NSExecutableErrorMinimum = 3584,
 NSExecutableNotLoadableError = 3584,
 NSExecutableArchitectureMismatchError = 3585,
 NSExecutableRuntimeMismatchError = 3586,
 NSExecutableLoadError = 3587,
 NSExecutableLinkError = 3588,
 NSExecutableErrorMaximum = 3839,

}
 URL Loading System Error Codes

These values are returned as the error code property of an NSError object with the domain “NSURLErrorDomain”.

typedef enum
 {
 NSURLErrorUnknown = -1,
 NSURLErrorCancelled = -999,
 NSURLErrorBadURL = -1000,
 NSURLErrorTimedOut = -1001,
 NSURLErrorUnsupportedURL = -1002,
 NSURLErrorCannotFindHost = -1003,
 NSURLErrorCannotConnectToHost = -1004,
 NSURLErrorDataLengthExceedsMaximum = -1103,
 NSURLErrorNetworkConnectionLost = -1005,
 NSURLErrorDNSLookupFailed = -1006,
 NSURLErrorHTTPTooManyRedirects = -1007,
 NSURLErrorResourceUnavailable = -1008,
 NSURLErrorNotConnectedToInternet = -1009,
 NSURLErrorRedirectToNonExistentLocation = -1010,
 NSURLErrorBadServerResponse = -1011,
 NSURLErrorUserCancelledAuthentication = -1012,
 NSURLErrorUserAuthenticationRequired = -1013,
 NSURLErrorZeroByteResource = -1014,
 NSURLErrorCannotDecodeRawData = -1015,
 NSURLErrorCannotDecodeContentData = -1016,
 NSURLErrorCannotParseResponse = -1017,
 NSURLErrorFileDoesNotExist = -1100,
 NSURLErrorFileIsDirectory = -1101,
 NSURLErrorNoPermissionsToReadFile = -1102,
 NSURLErrorSecureConnectionFailed = -1200,
 NSURLErrorServerCertificateHasBadDate = -1201,
 NSURLErrorServerCertificateUntrusted = -1202,
 NSURLErrorServerCertificateHasUnknownRoot = -1203,
 NSURLErrorServerCertificateNotYetValid = -1204,
 NSURLErrorClientCertificateRejected = -1205,
 NSURLErrorClientCertificateRequired = -1206,
 NSURLErrorCannotLoadFromNetwork = -2000,
 NSURLErrorCannotCreateFile = -3000,
 NSURLErrorCannotOpenFile = -3001,
 NSURLErrorCannotCloseFile = -3002,
 NSURLErrorCannotWriteToFile = -3003,
 NSURLErrorCannotRemoveFile = -3004,
 NSURLErrorCannotMoveFile = -3005,
 NSURLErrorDownloadDecodingFailedMidStream = -3006,
 NSURLErrorDownloadDecodingFailedToComplete = -3007
 }
```

### 有关网络请求失败的解释

```objc
case -1://NSURLErrorUnknown
errorMesg = @"无效的URL地址";
break;
case -999://NSURLErrorCancelled
errorMesg = @"无效的URL地址";
break;
case -1000://NSURLErrorBadURL
errorMesg = @"无效的URL地址";
break;
case -1001://NSURLErrorTimedOut
errorMesg = @"网络不给力，请稍后再试";
break;
case -1002://NSURLErrorUnsupportedURL
errorMesg = @"不支持的URL地址";
break;
case -1003://NSURLErrorCannotFindHost
errorMesg = @"找不到服务器";
break;
case -1004://NSURLErrorCannotConnectToHost
errorMesg = @"连接不上服务器";
break;
case -1103://NSURLErrorDataLengthExceedsMaximum
errorMesg = @"请求数据长度超出最大限度";
break;
case -1005://NSURLErrorNetworkConnectionLost
errorMesg = @"网络连接异常";
break;
case -1006://NSURLErrorDNSLookupFailed
errorMesg = @"DNS查询失败";
break;
case -1007://NSURLErrorHTTPTooManyRedirects
errorMesg = @"HTTP请求重定向";
break;
case -1008://NSURLErrorResourceUnavailable
errorMesg = @"资源不可用";
break;
case -1009://NSURLErrorNotConnectedToInternet
errorMesg = @"无网络连接";
break;
case -1010://NSURLErrorRedirectToNonExistentLocation
errorMesg = @"重定向到不存在的位置";
break;
case -1011://NSURLErrorBadServerResponse
errorMesg = @"服务器响应异常";
break;
case -1012://NSURLErrorUserCancelledAuthentication
errorMesg = @"用户取消授权";
break;
case -1013://NSURLErrorUserAuthenticationRequired
errorMesg = @"需要用户授权";
break;
case -1014://NSURLErrorZeroByteResource
errorMesg = @"零字节资源";
break;
case -1015://NSURLErrorCannotDecodeRawData
errorMesg = @"无法解码原始数据";
break;
case -1016://NSURLErrorCannotDecodeContentData
errorMesg = @"无法解码内容数据";
break;
case -1017://NSURLErrorCannotParseResponse
errorMesg = @"无法解析响应";
break;
case -1018://NSURLErrorInternationalRoamingOff
errorMesg = @"国际漫游关闭";
break;
case -1019://NSURLErrorCallIsActive
errorMesg = @"被叫激活";
break;
case -1020://NSURLErrorDataNotAllowed
errorMesg = @"数据不被允许";
break;
case -1021://NSURLErrorRequestBodyStreamExhausted
errorMesg = @"请求体";
break;
case -1100://NSURLErrorFileDoesNotExist
errorMesg = @"文件不存在";
break;
case -1101://NSURLErrorFileIsDirectory
errorMesg = @"文件是个目录";
break;
case -1102://NSURLErrorNoPermissionsToReadFile
errorMesg = @"无读取文件权限";
break;
case -1200://NSURLErrorSecureConnectionFailed
errorMesg = @"安全连接失败";
break;
case -1201://NSURLErrorServerCertificateHasBadDate
errorMesg = @"服务器证书失效";
break;
case -1202://NSURLErrorServerCertificateUntrusted
errorMesg = @"不被信任的服务器证书";
break;
case -1203://NSURLErrorServerCertificateHasUnknownRoot
errorMesg = @"未知Root的服务器证书";
break;
case -1204://NSURLErrorServerCertificateNotYetValid
errorMesg = @"服务器证书未生效";
break;
case -1205://NSURLErrorClientCertificateRejected
errorMesg = @"客户端证书被拒";
break;
case -1206://NSURLErrorClientCertificateRequired
errorMesg = @"需要客户端证书";
break;
case -2000://NSURLErrorCannotLoadFromNetwork
errorMesg = @"无法从网络获取";
break;
case -3000://NSURLErrorCannotCreateFile
errorMesg = @"无法创建文件";
break;
case -3001:// NSURLErrorCannotOpenFile
errorMesg = @"无法打开文件";
break;
case -3002://NSURLErrorCannotCloseFile
errorMesg = @"无法关闭文件";
break;
case -3003://NSURLErrorCannotWriteToFile
errorMesg = @"无法写入文件";
break;
case -3004://NSURLErrorCannotRemoveFile
errorMesg = @"无法删除文件";
break;
case -3005://NSURLErrorCannotMoveFile
errorMesg = @"无法移动文件";
break;
case -3006://NSURLErrorDownloadDecodingFailedMidStream
errorMesg = @"下载解码数据失败";
break;
case -3007://NSURLErrorDownloadDecodingFailedToComplete
errorMesg = @"下载解码数据失败";
break;
```
