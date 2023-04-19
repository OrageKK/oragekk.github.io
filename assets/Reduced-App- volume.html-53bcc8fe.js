import{_ as l,O as o,P as i,Q as e,ad as t,a4 as r,U as n,C as d}from"./framework-dab5a93a.js";const s={},c=e("figure",null,[e("img",{src:"https://zero-space.s3.amazonaws.com/photos/2e6cc210-e9a6-4a0f-9c05-2c4056a982acx840.jpg",alt:"",tabindex:"0",loading:"lazy"}),e("figcaption")],-1),h=e("blockquote",null,[e("p",null,"把打包好的.ipa 文件的后缀改为.zip 并解压。右键.appbundle 选择显示包内容。有些情况下，大一点的文件压缩后反而比小一点的文件压缩后的体积小，而我们真正关心的时候解压后的真实体积，所以一定要解压里面的资源文件，看解压后的 size。从 APP Store 下载的.ipa 文件要比自己本地打包的要大，因为 APP Store 对 ipa 包又做了加密处理。Xcode 的 Organizer window 的 Estimate Size 功能能估计本地打包文件从 APP Store 下载时的大小。根据优化的 28 定律和常识，首先当然是多媒体资源的体积啦。")],-1),p=e("h2",{id:"图片",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#图片","aria-hidden":"true"},"#"),t(" 图片")],-1),u=e("p",null,"压缩图片 不重要的图片可适当采用 8bit PNG 图片 1.什么是矢量图 矢量图是由计算机的算法产生的，可以无限放大或缩小，不会有任何损失，通常由矢量软件制作。 2.什么是位图 位图是由一个一个的小色块组成，放大后会看到那些小色块，同一面积内小色块越多，分辨率就越高。 3.矢量图的优缺点 可以无限放大或缩小，不会影响图像素质，文件体积较小，编辑灵活。缺点是表达的色彩层次不清，整体观感效果不如位图 4.位图的优缺点 不能放太大，减少文件分辨率后会影响图片质量，图片战胜空间较大，优点是能很细腻地表达图片的效果，图片表达效果非常好 5.什么情况下用位图，什么情况下用矢量图 一些对图片要求高的用位图，例如照片。其他的尽量用矢量图。例如文字、表格、卡通图片等",-1),_=e("li",null,[e("p",null,"去掉无用的图片")],-1),b={href:"http://www.jianshu.com/p/d01110c80495",target:"_blank",rel:"noopener noreferrer"},g=e("li",null,[e("p",null,"如果不需要使用透明，可以用 jpeg 代替 PNG。jpeg 减少了些效率但更加小。需权衡性能，大小。")],-1),m={href:"https://developer.apple.com/library/ios/qa/qa1681/_index.html",target:"_blank",rel:"noopener noreferrer"},f=e("h2",{id:"音频",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#音频","aria-hidden":"true"},"#"),t(" 音频")],-1),x={href:"https://developer.apple.com/videos/wwdc/2011/?id=404",target:"_blank",rel:"noopener noreferrer"},C=n('<h2 id="视频" tabindex="-1"><a class="header-anchor" href="#视频" aria-hidden="true">#</a> 视频</h2><ul><li>视频也可以使用类似于音频的处理方法，音视频的压缩可以很大程度的压缩，但是要注意压缩的格式，是不是会增加编解码的负担，这要权衡考虑。</li></ul><h2 id="assets" tabindex="-1"><a class="header-anchor" href="#assets" aria-hidden="true">#</a> Assets</h2><ul><li>检查 bundle 中的无用文件，不要打包到 app 或者静态库中。可以点击文件，在右侧的 file inspector 里面的 target membership 中取消勾选；或者在 build phase 里面的 Copy Bundle Resources 中去掉。</li><li>确定 dead code（代码被定义但从未被调用）被剥离，build setting 里 DEAD_CODE_STRIPPING = YES。 去掉冗余的代码，即使一点冗余代码，编译后体积也是很可观的。</li></ul><h2 id="编译设置" tabindex="-1"><a class="header-anchor" href="#编译设置" aria-hidden="true">#</a> 编译设置</h2>',5),y=n("<li><p><code>Optimization Level</code>设置为<code>Fastest, Smallest [-Os]</code>，<code>Strip Debug</code><code>Symbols During Copy</code>设置为<code>YES (COPY_PHASE_STRIP = YES)</code> 这样会减小接近一半的体积，但是在 release 版本，这些貌似是默认的配置，但是不妨也检查一下。 此外在 debug 版本最好在完成开发测试后，设置成这种模式，重新测试一遍，因为不同的编译设置可能会掩盖一些 bug。</p></li><li><p>设置<code>IOS_DEPLOYMENT_TARGET</code> 为想要运行系统的最低版本</p></li>",2),A={href:"http://lib.csdn.net/base/16",target:"_blank",rel:"noopener noreferrer"},S=e("code",null,"ARCHS = arm64",-1),k={href:"https://www.innerfence.com/howto/apple-ios-devices-dates-versions-instruction-sets",target:"_blank",rel:"noopener noreferrer"},P=e("h2",{id:"其他",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#其他","aria-hidden":"true"},"#"),t(" 其他")],-1),R=e("ul",null,[e("li",null,"将应用的中一些数据，如长字符串、表格等移到外部文件中，不要放在代码里面，这样能减小一些体积，因为外部文件的压缩率要比应用中的数据压缩率高。")],-1),v=e("h2",{id:"编译选项",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#编译选项","aria-hidden":"true"},"#"),t(" 编译选项")],-1),E=e("li",null,"编译器优化级别 Build Settings->Optimization Level 有几个编译优化选项，release 版应该选择 Fastest, Smalllest，这个选项会开启那些不增加代码大小的全部优化，并让可执行文件尽可能小。",-1),O={href:"https://developer.apple.com/library/mac/documentation/DeveloperTools/Conceptual/MachOTopics/1-Articles/executing_files.html#//apple_ref/doc/uid/TP40001829-97021-TPXREF121",target:"_blank",rel:"noopener noreferrer"},w={href:"https://developer.apple.com/legacy/library/documentation/Performance/Conceptual/CodeFootprint/CodeFootprint.pdf",target:"_blank",rel:"noopener noreferrer"},D=e("h3",{id:"第三方库统计",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#第三方库统计","aria-hidden":"true"},"#"),t(" 第三方库统计")],-1),T={href:"https://gist.github.com/bang590/8f3e9704f1c2661836cd",target:"_blank",rel:"noopener noreferrer"},N=n('<h3 id="arc-mrc" tabindex="-1"><a class="header-anchor" href="#arc-mrc" aria-hidden="true">#</a> ARC-&gt;MRC</h3><p>有人提出用 ARC 写的代码编译出来的可执行文件是会比用 MRC 大的，原因大致是 ARC 代码会在某些情况多出一些 retain 和 release 的指令，例如调用一个方法，它返回的对象会被 retain，退出作用域后会被 release，MRC 就不需要，汇编指令变多，机器码变多，可执行文件就变大了。还有其他细节实现的区别，先不纠结了。 那用 ARC 究竟会增大多少体积？我觉得从汇编指令的增多减少去算是很难算准确的，这东西涉及细节太多，还是得从统计的角度计算。做了几个对比试验，统计了几个同时支持 ARC/MRC 的开源项目在开启/关闭 ARC 的情况下<strong>TEXT 代码段的大小对比。只对比</strong>TEXT 代码段是因为： ARC 对可执行文件大小的影响几乎都是在代码段 可执行文件会进行某种对齐，例如有些段在不足 32K 的时候填充 0 直到对齐 32K，若用可执行文件大小对比结果可能是对齐后的，不准确。</p><p>实验数据：</p><table><thead><tr><th>-------</th><th style="text-align:center;">MBProgressHUD</th><th style="text-align:center;">SDWebImage</th><th style="text-align:center;">FMDB</th></tr></thead><tbody><tr><td>开启 ARC</td><td style="text-align:center;">19532</td><td style="text-align:center;">24424</td><td style="text-align:center;">29056</td></tr><tr><td>关闭 ARC</td><td style="text-align:center;">17648</td><td style="text-align:center;">22575</td><td style="text-align:center;">25848</td></tr><tr><td>对比</td><td style="text-align:center;">↓9.6%</td><td style="text-align:center;">↓7.5%</td><td style="text-align:center;">↓11%</td></tr></tbody></table><p>结果是 ARC 大概会使代码段增加 10%的 size，考虑代码段占可执行文件大约有 80%，估计对整个可执行文件的影响会是 8%。 可以评估一下 8%的体积下降是不是值得把项目里某些模块改成 MRC，这样程序的维护成本上升了，一般不到特殊情况不建议这么做。</p><h3 id="无用代码" tabindex="-1"><a class="header-anchor" href="#无用代码" aria-hidden="true">#</a> 无用代码</h3><p>在项目里新建一个类，给它添加几个方法，但不要在任何地方 import 它，build 完项目后观察 linkmap，你会发现这个类还是被编译进可执行文件了。 按 C++的经验，没有被使用到的类和方法编译器都会优化掉，不会编进最终的可执行文件，但 object-c 不一样，因为 object-c 的动态特性，它可以通过类和方法名反射获得这个类和方法进行调用，所以就算在代码里某个类没被使用到，编译器也没法保证这个类不会在运行时通过反射去调用，所以只要是在项目里的文件，无论是否又被使用到都会被编译进可执行文件。 对此我们可以通过脚本，遍历整个项目的文件，找出所有没有被引用的类文件和没有被调用的方法，在保证没有其他地方动态调用的情况下把它们去掉。如果整个项目历时很长，历时代码遗留较多，这个清理对可执行文件省出的空间还是挺可观的。</p><h3 id="类-方法名长度" tabindex="-1"><a class="header-anchor" href="#类-方法名长度" aria-hidden="true">#</a> 类/方法名长度</h3><p>观察 linkmap 可以发现每个类和方法名都在__cstring 段里都存了相应的字符串值，所以类和方法名的长短也是对可执行文件大小是有影响的，原因还是 object-c 的动态特性，因为需要通过类/方法名反射找到这个类/方法进行调用，object-c 对象模型会把类/方法名字符串都保存下来。 对此我们可以考虑在编译前把所有类和方法名进行混淆，跟压缩 js 一样，把长名字替换成短名字，这样做的好处除了缩小体积外，还对安全性有很大提升，别人拿到可执行文件对它 class-dump 出来的结果都是混淆后的类和方法名，就无法从类和方法名中猜出某个方法是做什么的，就难以挂钩子进行 hack。不过这样做有个缺点，就是 crash 堆栈反解出来的堆栈方法名会是混淆后的，需要再加一层混淆-&gt;原名的转换，实现和使用成本有点高。 实际上这部分占用的长度比较小，中型项目也就几百 K，对安全性要求高的情况可以试试。</p><h3 id="冗余字符串" tabindex="-1"><a class="header-anchor" href="#冗余字符串" aria-hidden="true">#</a> 冗余字符串</h3><p>代码上定义的所有静态字符串都会记录在在可执行文件的__cstring 段，如果项目里 Log 非常多，这个空间占用也是可观的，也有几百 K 的大小，可以考虑清理所有冗余的字符串。另外如果有特别长的字符串，建议抽离保存成静态文件，因为 AppStore 对可执行文件加密导致压缩率低，特别长的字符串抽离成静态资源文件后压缩率会比在可执行文件里高很多。</p><h3 id="checklist" tabindex="-1"><a class="header-anchor" href="#checklist" aria-hidden="true">#</a> CheckList</h3>',12),z={href:"http://lib.csdn.net/base/1",target:"_blank",rel:"noopener noreferrer"},M=e("img",{src:"http://upload-images.jianshu.io/upload_images/2076247-dde8e96bdd40396b.png?imageMogr2/auto-orient/strip|imageView2/2/w/1240",alt:"",loading:"lazy"},null,-1),j={href:"http://blog.cnbang.net/tech/2296/",target:"_blank",rel:"noopener noreferrer"};function B(L,F){const a=d("ExternalLinkIcon");return o(),i("div",null,[c,h,p,u,e("ul",null,[_,e("li",null,[e("p",null,[t("用代码绘制简单的纯色图片  "),e("a",b,[t("用 Sketch 和 PaintCode 快速得到绘制代码"),r(a)])])]),g,e("li",null,[e("p",null,[t("对 32 位的图片，尽肯能的使用高压缩率，使用 PS 的“Save For Web”功能，可以有效的减小 JPEG 和 PNG 图片的尺寸。 默认情况下，在 build 时，PNG 图像就被"),e("a",m,[t("pngcrush"),r(a)]),t("压缩。")])])]),f,e("ul",null,[e("li",null,[t("压缩音频，"),e("a",x,[t("尽可能使用 AAC 或者 MP3 格式，并且使用一个较低的码率。通常 44.1khz 的码率有点浪费，降低一定的码率也不会丢失多少音质"),r(a)])])]),C,e("ul",null,[y,e("li",null,[e("p",null,[t("设置需要的 arm "),e("a",A,[t("架构"),r(a)]),t("，设置 "),S,t("可以消除 armv6 架构，潜在的减少近一半的容量。 "),e("a",k,[t("iOS Devices: ARM，尺寸，像素一览表"),r(a)]),t(" 1，如果想自己的 app 在各个机器都能够最高效率的运行，则需要将 Build Active Architecture Only 改为 NO,Valid architectures 选择对应的指令集：armv7 armv7s arm64。这个会为各个指令集编译对应的代码，因此最后的 ipa 体积基本翻了 3 倍,Release 版本必须 NO。 2，如果想让 app 体积保持最小，则现阶段应该选择 Valid architectures 为 armv7,这样 Build Active Architecture Only 选 YES 或 NO 就无所谓了")])])]),P,R,v,e("ol",null,[E,e("li",null,[t("去除符号信息 Strip Linked Product / Deployment Postprocessing / Symbols Hidden by Default 在 release 版本应该设为 yes，可以去除不必要的调试符号。Symbols Hidden by Default 会把所有符号都定义成”private extern”，详细信息见"),e("a",O,[t("官方文档"),r(a)]),t("。 这些选项目前都是 XCode 里 release 的默认选项，但旧版 XCode 生成的项目可能不是，可以检查一下。其他优化还可以参考官方文档—"),e("a",w,[t("CodeFootprint.pdf"),r(a)])])]),D,e("p",null,[t("项目里会引入很多第三方静态库，如果能知道这些第三方库在可执行文件里占用的大小，就可以评估是否值得去找替代方案去掉这个第三方库。我们可以从 linkmap 中统计出这个信息，对此写了个 node.js 脚本，可以通过 linkmap 统计每个.o 目标文件占用的体积和每个.a 静态库占用的体积，"),e("a",T,[t("详见这里"),r(a)]),t("(需翻墙)。")]),N,e("p",null,[t("最后把缩减"),e("a",z,[t("iOS"),r(a)]),t("安装包大小的各种方法列出来做了张 CheckList 图： "),M]),e("p",null,[t("参考文献："),e("a",j,[t("http://blog.cnbang.net/tech/2296/"),r(a)])])])}const I=l(s,[["render",B],["__file","Reduced-App- volume.html.vue"]]);export{I as default};