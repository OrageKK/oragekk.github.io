---
title: "textfield限制输入字符"
date: 2017-05-21
category:
  - iOS
tag:
  - iOS
---

> 记录一下限制输入字符的判断。不仅局限于中文或英文

- 首先在 ViewDidLoad 中注册通知

```objc
[[NSNotificationCenter defaultCenter]addObserver:self selector:@selector(textFieldEditChanged:)
	name:@"UITextFieldTextDidChangeNotification" object:self.userTF];
```

- 下面是判断逻辑 由于需求有中文键盘下的字母数字输入，所以其中那部分判断如不需要可以去除

```objc
// 输入字符判断
-(void)textFieldEditChanged:(NSNotification *)obj {
    UITextField *textField = (UITextField *)obj.object;
    NSString *toBeString = textField.text;
    NSString *lang = [textField.textInputMode primaryLanguage];
    if ([lang isEqualToString:@"zh-Hans"])// 简体中文输入
    	{
        //获取高亮部分
        UITextRange *selectedRange = [textField markedTextRange];
        UITextPosition *position = [textField positionFromPosition:selectedRange.start offset:0];

        // 没有高亮选择的字，则对已输入的文字进行字数统计和限制

        if (!position || !selectedRange)
        {
            if (toBeString.length > MAX_CHINESE_LENGTH)
            {
                NSRange rangeIndex = [toBeString rangeOfComposedCharacterSequenceAtIndex:MAX_CHINESE_LENGTH];
                if (rangeIndex.length == 1)
                {

                    textField.text = [toBeString substringToIndex:MAX_CHINESE_LENGTH];
                }
                else
                {
                    NSRange rangeRange = [toBeString rangeOfComposedCharacterSequencesForRange:NSMakeRange(0, MAX_CHINESE_LENGTH)];
                    textField.text = [toBeString substringWithRange:rangeRange];
                }
            }
            if (toBeString.length > MAX_ENGLISH_LENGTH)
            {
                NSRange rangeIndex = [toBeString rangeOfComposedCharacterSequenceAtIndex:MAX_ENGLISH_LENGTH];
                if (rangeIndex.length == 1)
                {
                    textField.text = [toBeString substringToIndex:MAX_ENGLISH_LENGTH];
                }
                else
                {
                    NSRange rangeRange = [toBeString rangeOfComposedCharacterSequencesForRange:NSMakeRange(0, MAX_ENGLISH_LENGTH)];
                    textField.text = [toBeString substringWithRange:rangeRange];
                }
            }
        }
    }
    	// 中文输入法以外的直接对其统计限制即可，不考虑其他语种情况
    	else
    	{
        	if (toBeString.length > MAX_ENGLISH_LENGTH)
        		{
            		NSRange rangeIndex = [toBeString rangeOfComposedCharacterSequenceAtIndex:MAX_ENGLISH_LENGTH];
            		if (rangeIndex.length == 1)
            		{
                		textField.text = [toBeString substringToIndex:MAX_ENGLISH_LENGTH];
            		}
            		else
            		{
                NSRange rangeRange = [toBeString rangeOfComposedCharacterSequencesForRange:NSMakeRange(0, MAX_ENGLISH_LENGTH)];
                textField.text = [toBeString substringWithRange:rangeRange];
            		}
        		}
    		}
		}
```
