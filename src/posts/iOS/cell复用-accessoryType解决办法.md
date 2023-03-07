---
title: "Cell的accessoryType属性标记单元格之后，出现的重用问题"
date: 2017-02-13
category:
  - iOS
tag:
  - iOS
  - Bug录
---

> 今天项目里出现一个问题，就是做一个列表选择，然后点击导航栏的确定按钮返回上级界面，并把选择的 cell 数据传递到上级界面。再使用 accessoryType 属性标记单元格之后会出现重用问题。

## 解决办法

- 把 tableView 的 allowsMultipleSelection 属性设为了 YES；

  ```objc
  _tableView.allowsMultipleSelection = YES;
  ```

- 在 didSelectRowAtIndexPath 和 didDeselectRowAtIndexPath 方法里面使用了如下方法实现了点击单元格然后用 check mark 标记的方式。

```objc
-(void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath {

      UITableViewCell *cell = [tableView cellForRowAtIndexPath:indexPath];

	  cell.accessoryType = UITableViewCellAccessoryCheckmark;
}

-(void)tableView:(UITableView *)tableView didDeselectRowAtIndexPath:(NSIndexPath *)indexPath {
	[tableView cellForRowAtIndexPath:indexPath].accessoryType = UITableViewCellAccessoryNone;
}
```

### 重点来了 两种思路

- 记录选择的 indexpath

```objc
 	// 1.设一个NSMutableArray属性，元素个数跟你的_dataArray一样，初始化里面存的都是0。

	 NSMutableArray* selectionArray = [NSMutableArray array];
	 for (NSInteger i = 0; i < _dataArray.count; i++) {
    	[selectionArray addObject:@(0)]; // 0 表示未选中，1 表示选中了
	 }
	 self.selectionArray = selectionArray;

   // 2.在 didSelectRowAtIndexPath:里

	 [self.selectionArray replaceObjectAtIndex:indexPath.row withObject:@(1)];

	 [self.tableView reloadData];

   // 3.在 didDeselectRowAtIndexPath里：

	 [self.selectionArray replaceObjectAtIndex:indexPath.row withObject:@(0)];

	 [self.tableView reloadData];

   // 4.在 cellForRow里：
	UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:identifier];
	cell.textLabel.text = _dataArray[indexPath.row];
	NSInteger selected = [self.selectionArray[indexPath.row] IntegerValue];
	if (selected == 0) {
    cell.accessoryType = UITableViewCellAccessoryNone;
	} else {
    	cell.accessoryType = UITableViewCellAccessoryCheckmark;
	}
	return cell;
```

- 利用 cell 的 selected 属性

  - 继承 UITableViewCell，在 setSeleted:animated:方法里面，根据选择状态，修改 accessoryType

```objc
	 - (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    	 [super setSelected:selected animated:animated];
		 self.accessoryType = selected?UITableViewCellAccessoryCheckmark:UITableViewCellAccessoryNone;
		 // Configure the view for the selected state
	 }

	// 在 cellForRow里：
	cell.accessoryType = cell.selected?UITableViewCellAccessoryCheckmark:UITableViewCellAccessoryNone;

```

### 至此已完美解决因为复用所导致的问题

```objc
	// 设置tableView可不可以选中
    self.tableView.allowsSelection = NO;

    // 允许tableview多选
    self.tableView.allowsMultipleSelection = YES;

    // 编辑模式下是否可以选中
    self.tableView.allowsSelectionDuringEditing = NO;

    // 编辑模式下是否可以多选
    self.tableView.allowsMultipleSelectionDuringEditing = YES;

    // 获取被选中的所有行
     [self.tableView indexPathsForSelectedRows]

    // 获取当前可见的行
     [self.tableView indexPathsForVisibleRows];
```
