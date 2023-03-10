---
title: "初探机器学习框架CoreML"
date: 2017-11-21
category:
  - iOS
tag:
  - iOS
---

> CoreML 是 iOS 11 新推出的机器学习框架，是人工智能的核心内容，他可以在训练好的机器学习模型应用到 APP 中

![](http://upload-images.jianshu.io/upload_images/74454-4726f1eccb39b18c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

所谓已训练模型 (trained model)指的是对一组训练数据应用了某个机器学习算法后，所生成的一组结果 Core ML 是领域特定 (domain-specific) 框架和功能的基础所在。Core ML 为 Vision 提供了图像处理的支持，为 Foundation 提供了自然语言处理的支持（例如 NSLinguisticTagger 类），为 [GameplayKit](https://developer.apple.com/documentation/gameplaykit) 提供了对学习决策树 (learned decision tree) 进行分析的支持。Core ML 本身是基于底层基本类型而建立的，包括 Accelerate、BNNS 以及 Metal Performance Shaders 等。

## 获取模型

Core ML 支持多种机器学习模型，其中包括了神经网络 (Neural Network)、组合树 (Tree Ensemble)、支持向量机 (Support Vector Machine) 以及广义线性模型 (Generalized Linear Model)。Core ML 的运行需要使用 Core ML 模型格式（也就是以 .mlmodel 扩展名结尾的模型）。

Apple 提供了一些常见的[开源模型](https://developer.apple.com/machine-learning/)供大家使用，这些模型已经使用了 Core ML 模型格式。您可以自行下载这些模型，然后就可以开始在应用中使用它们了。

## 工程实例

首先因为 CoreML 和 Vision 都是 iOS 11 才有的功能，你要确保 Xcode9 和 iOS 11 的设备，当然模拟器也可以。开发语言使用 Swift4

1.  将模型添加到 Xcode 中
    创建工程并引入模型文件
    ![Snip20171121_6.png](https://storage1.cuntuku.com/2017/11/21/Snip20171121_6.png)
    单击这个文件就可以看到这个模型的详细信息
    [![Snip20171121_7.md.png](https://storage2.cuntuku.com/2017/11/21/Snip20171121_7.md.png)](https://cuntuku.com/image/KNKHr)
    下面是这个模型的官方介绍

    > Detects the dominant objects present in an image from a set of 1000 categories such as trees, animals, food, vehicles, people, and more.大意为可以从 1000 个类别中筛选传树木、动物、食品、汽车、人等等。

2.  模型解读
    inputs 中写了需要一个 image 大小 299\*299；outputs 里会有两个参数 classLabelProbs 和 classLabel
    ，classLabelProbs 是一个[string:Double]的字典数组，数组里每一个字典就是这个输入图片分析得出可能的一个结果 string 就是对图片类型的描述，而 double 就是可能性百分比。另一个 classLabel 就是最有可能的一个一个结果描述

        *Model Class*下面有这个类文件点进去可以看到如下三个类

        **input输入源，可以看到它需要一个CVPixelBuffer格式的图片作为输入**
        [![Snip20171121_8.md.png](https://storage2.cuntuku.com/2017/11/21/Snip20171121_8.md.png)](https://cuntuku.com/image/KNlCE)
        **output可以看到输出的两个参数classLabel和classLabelProbs正式我们上面有介绍过的所有可能的结果数组与最有可能的结果描述**
        [![Snip20171121_9.md.png](https://storage1.cuntuku.com/2017/11/21/Snip20171121_9.md.png)](https://cuntuku.com/image/KNgTJ)
        **inceptionv3调用这个类的Prediction方法来开始进行分析**
        [![Snip20171121_10.md.png](https://storage1.cuntuku.com/2017/11/21/Snip20171121_10.md.png)](https://cuntuku.com/image/KN1Im)

3.  编写代码
    定义一个 imageView，一个 Label，一个 button
    点击按钮打开相册选取图片，选取完成执行下面的方法，然后再 label 显示分析结果

```swift
	func process(_ image: UIImage) {
        imageView.image = image
        // 需要CVPixelBuffer格式的输入源
        guard let pixelBuffer = image.pixelBuffer(width: 299, height: 299) else {
            return
        }
        //I have `Use of unresolved identifier 'Inceptionv3'` error here when I use New Build System (File > Project Settings)   ¯\_(ツ)_/¯
        let model = Inceptionv3()
        do {
            // 调用model的prediction方法进行分析
            let output = try model.prediction(image: pixelBuffer)
            // 打印输出结果
            let probs = output.classLabelProbs.sorted { $0.value > $1.value }
            if let prob = probs.first {
                Label.text = "\(prob.key) \(prob.value)"
            }
        }
        catch {
            self.presentAlertController(withTitle: title,
                                        message: error.localizedDescription)
        }
    }
```

## 运行效果

[![Snip20171121_3.md.png](https://storage2.cuntuku.com/2017/11/21/Snip20171121_3.md.png)](https://cuntuku.com/image/KNToV)
[![Snip20171121_4.md.png](https://storage1.cuntuku.com/2017/11/21/Snip20171121_4.md.png)](https://cuntuku.com/image/KNvFW)
[![Snip20171121_5.md.png](https://storage2.cuntuku.com/2017/11/21/Snip20171121_5.md.png)](https://cuntuku.com/image/KNNdd)

## Demo

[👉Demo 下载](https://github.com/OrageKK/coreML-Examples)
**如果有帮助烦请点 star**
