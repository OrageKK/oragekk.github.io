---
title: "iOS 配置https"
date: 2017-08-16
category:
  - iOS
tag:
  - iOS
---

> 昨天试验了 iOS 11 beta6 发现原有的 https 自建证书不能使用，可能是新版本要对 ATS 加强验证，之前一直说的要全面 https 估计在不久的将来就要来临，未接入的可能要像 Apple 说的不允许上架。所以把配置过程记录在此

## 要求

启用 ATS 必须符合以下标准，不满足条件的 HTTPS 证书，ATS 都会拒绝链接：

- 服务器所有的链接使用 TLS1.2 以上版本
- HTTPS 证书必须使用 SHA 256 以上哈希算法签名
- HTTPS 证书必须使用 RAS 2048 位或 ECC 356 位以上公钥算法
- 使用前向加密技术

## AFSecurityPolicy 相关的配置

- SSLPinningMode
  SSLPinningMode 定义了 https 连接时，如何校验服务器端给予的证书

  ```objc
  typedef NS_ENUM(NSUInteger, AFSSLPinningMode){
  AFSSLPinningModeNone,
  AFSSLPinningModePublicKey,
  AFSSLPinningModeCertificate,
  };
  ```

  AFSSLPinningModeNone: 代表客户端无条件地信任服务器端返回的证书。

  AFSSLPinningModePublicKey: 代表客户端会将服务器端返回的证书与本地保存的证书中，PublicKey 的部分进行校验；如果正确，才继续进行。

  AFSSLPinningModeCertificate: 代表客户端会将服务器端返回的证书和本地保存的证书中的所有内容，包括 PublicKey 和证书部分，全部进行校验；如果正确，才继续进行。

- allowInvalidCertificates 是否支持自建证书默认 NO 改为 YES
- validatesDomainName 是否进行域名验证 默认 YES 改为 NO

## 客户端配置

- 首先导入证书到项目
  [![daoru.md.png](https://storage1.cuntuku.com/2017/08/16/daoru.md.png)](https://cuntuku.com/image/4xc6p)
  [![phases.md.png](https://storage2.cuntuku.com/2017/08/16/phases.md.png)](https://cuntuku.com/image/4xyN0)

- 配置 info.plist 文件
  [![infoplist.md.png](https://storage1.cuntuku.com/2017/08/16/infoplist.md.png)](https://cuntuku.com/image/4xA2z)
- 网络请求配置(AFN)

```objc
NSString *cerPath = [[NSBundle mainBundle] pathForResource:@"UpopRsaCert" ofType:@"cer"];//证书的路径
NSData *certData = [NSData dataWithContentsOfFile:cerPath];
NSString *cerPath2 = [[NSBundle mainBundle] pathForResource:@"verify_sign_acp" ofType:@"cer"];//证书的路径
NSData *certData2 = [NSData dataWithContentsOfFile:cerPath2];
NSString *cerPath3 = [[NSBundle mainBundle] pathForResource:@"myWebsite" ofType:@"cer"];//证书的路径
NSData *certData3 = [NSData dataWithContentsOfFile:cerPath3];
NSSet *cerArray = [NSSet setWithObjects:certData,certData2,certData3, nil];
securityPolicy.pinnedCertificates = cerArray;
[httpManager setSecurityPolicy:securityPolicy];
```
