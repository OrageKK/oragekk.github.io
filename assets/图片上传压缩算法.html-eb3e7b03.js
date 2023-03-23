import{_ as e,O as t,P as a,U as n}from"./framework-475f819b.js";const i={},o=n(`<figure><img src="https://zero-space.s3.amazonaws.com/photos/bf30834c-a9de-41f4-9f39-4f44c2f2ff13x840.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><blockquote><p>由于最近公司在做图片相册选择上传的功能，对于图片的压缩算法这里我借鉴了 ochina 的 ios 端 App。其中有涉及到图片压缩的算法，这里贴出来留待后用;</p></blockquote><h3 id="gacompressionpichandle-h" tabindex="-1"><a class="header-anchor" href="#gacompressionpichandle-h" aria-hidden="true">#</a> GACompressionPicHandle.h</h3><pre><code>	#import &lt;Foundation/Foundation.h&gt;
	#import &lt;UIKit/UIKit.h&gt;
	#import &lt;CoreGraphics/CoreGraphics.h&gt;

	@class GACompressionPicHandle;
	@protocol GACompressionPicHandleDelegate &lt;NSObject&gt;
	- (void)CompressionPicHandle:(GACompressionPicHandle* )handle
  			CompressionFailureInfo:(NSString* )info;
  	@end

  	#define CompressionMax_W 1224
  	#define CompressionMax_Size 300 * 1024
  	/** OSChina 后台限制上传图片的大小*/
  	#define stand_size 1024 * 800
  	#define min_compressionRatio 0.3

  	@interface GACompressionPicHandle : NSObject

  	+ (instancetype)shareCompressionPicHandle;

@property(nonatomic,weak)id&lt;GACompressionPicHandleDelegate&gt; delegate;

	/** 分辨率越小反而越占用时间 建议分辨率高的图片使用*/
- (NSData* )scaleToSize:(CGSize)size
               image:(UIImage* )picture;

     /** 受到宽高比例问题 越接近正方形所用的时间越小 */
- (NSData *)imageByScalingAndCroppingForSize:(	CGSize)targetSize image:(UIImage *)image;
	@end
</code></pre><h3 id="gacompressionpichandle-m" tabindex="-1"><a class="header-anchor" href="#gacompressionpichandle-m" aria-hidden="true">#</a> GACompressionPicHandle.m</h3><pre><code>	#import &quot;GACompressionPicHandle.h&quot;

	@implementation GACompressionPicHandle

	static GACompressioinPicHandle*_shareCompressionPicHandle;

	+ (instancetype)shareCompressionPicHandle{
		static dispatch_once_t onceToken;
		dispatch_once(&amp;onceToken, ^{
    		_shareCompressionPicHandle = 					[[GACompressionPicHandle alloc]init];
		});
		return _shareCompressionPicHandle;
	}


	- (NSData* )scaleToSize:(CGSize)size
               image:(UIImage* )picture
               {
                   CGFloat width = CGImageGetWidth(picture.CGImage);
                   CGFloat height = CGImageGetHeight(picture.CGImage);
                   float verticalRadio = size.height * 1.0 / height;
                   float horizontalRadio = size.width * 1.0 / width;
                   float radio = 1;
                   if(verticalRadio &gt; 1 &amp;&amp; horizontalRadio &gt; 1) {
                   radio = verticalRadio &gt; horizontalRadio ? horizontalRadio : verticalRadio;
}else{
radio = verticalRadio &lt; horizontalRadio ? verticalRadio : horizontalRadio;
}
width = width * radio;
height = height * radio;

int xPos = (size.width - width) / 2;
int yPos = (size.height - height) / 2;

UIGraphicsBeginImageContext(size);

[picture drawInRect:CGRectMake(xPos, yPos, width, height)];

UIImage* scaledImage = UIGraphicsGetImageFromCurrentImageContext();

UIGraphicsEndImageContext();

NSData* scaledImageData = UIImageJPEGRepresentation(scaledImage, 1);

CGFloat compressionRatio = 0.9f;
NSData* tagerImageData = scaledImageData;
NSLog(@&quot;tagerImageData.length : %lu&quot;,(unsigned long)tagerImageData.length);
while (tagerImageData.length &gt; stand_size &amp;&amp; compressionRatio &gt; 0) {
    if (compressionRatio &lt; min_compressionRatio) {
        if ([_delegate respondsToSelector:@selector(CompressionPicHandle:CompressionFailureInfo:)]) {
            [_delegate CompressionPicHandle:self CompressionFailureInfo:@&quot;图片过大&quot;];
        }
    }
    @autoreleasepool {
        NSData* newCompressionData = UIImageJPEGRepresentation(scaledImage, compressionRatio);
        tagerImageData = newCompressionData;
    }
    compressionRatio = compressionRatio - 0.12;
    NSLog(@&quot;tagerImageData.length : %lu , compressionRatio : %lf&quot;,tagerImageData.length,compressionRatio);
}
NSLog(@&quot;compressionRatio : %lf&quot;,compressionRatio);

return tagerImageData;
}


- (NSData *)imageByScalingAndCroppingForSize:(CGSize)targetSize image:(UIImage *)image {
UIImage *sourceImage = image;
UIImage *newImage = nil;
CGSize imageSize = sourceImage.size;
CGFloat width = imageSize.width;
CGFloat height = imageSize.height;
CGFloat targetWidth = targetSize.width;
CGFloat targetHeight = targetSize.height;
CGFloat scaleFactor = 0.0;
CGFloat scaledWidth = targetWidth;
CGFloat scaledHeight = targetHeight;
CGPoint thumbnailPoint = CGPointMake(0.0,0.0);
if (CGSizeEqualToSize(imageSize, targetSize) == NO) {
CGFloat widthFactor = targetWidth / width;
CGFloat heightFactor = targetHeight / height;
if (widthFactor &gt; heightFactor){
scaleFactor = widthFactor; // scale to fit height
}else{
		scaleFactor = heightFactor; // scale to fit width
    }

    scaledWidth= width * scaleFactor;
    scaledHeight = height * scaleFactor;

    if (widthFactor &gt; heightFactor) {
        thumbnailPoint.y = (targetHeight - scaledHeight) * 0.5;
    } else if (widthFactor &lt; heightFactor){
        thumbnailPoint.x = (targetWidth - scaledWidth) * 0.5;
    }
}

UIGraphicsBeginImageContext(targetSize); // this will crop
CGRect thumbnailRect = CGRectZero;
thumbnailRect.origin = thumbnailPoint;
thumbnailRect.size.width= scaledWidth;
thumbnailRect.size.height = scaledHeight;
[sourceImage drawInRect:thumbnailRect];
newImage = UIGraphicsGetImageFromCurrentImageContext();
if(newImage == nil)
UIGraphicsEndImageContext();

NSData* scaledImageData = UIImageJPEGRepresentation(newImage, 1);

CGFloat compressionRatio = 0.9f;
NSData* tagerImageData = scaledImageData;
NSLog(@&quot;tagerImageData.length : %lu&quot;,(unsigned long)tagerImageData.length);
while (tagerImageData.length &gt; stand_size &amp;&amp; compressionRatio &gt; 0) {
    if (compressionRatio &lt; min_compressionRatio) {
        if ([_delegate respondsToSelector:@selector(CompressionPicHandle:CompressionFailureInfo:)]) {
            [_delegate CompressionPicHandle:self CompressionFailureInfo:@&quot;图片过大&quot;];
        }
    }
    @autoreleasepool {
        NSData* newCompressionData = UIImageJPEGRepresentation(newImage, compressionRatio);
        tagerImageData = newCompressionData;
    }
    compressionRatio = compressionRatio - 0.12;
    NSLog(@&quot;tagerImageData.length : %lu , compressionRatio : %lf&quot;,tagerImageData.length,compressionRatio);
}
NSLog(@&quot;compressionRatio : %lf&quot;,compressionRatio);

return tagerImageData;
</code></pre><p>}</p>`,7),s=[o];function r(g,c){return t(),a("div",null,s)}const m=e(i,[["render",r],["__file","图片上传压缩算法.html.vue"]]);export{m as default};
