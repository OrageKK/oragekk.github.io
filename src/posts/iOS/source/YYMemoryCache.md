---
title: "YYMemoryCache 源码分析"
date: 2019-04-26 16:08:25
category:
  - iOS
tag:
  - iOS
---

# YYMemoryCache 源码分析

:::tip
 YYMemoryCache 是内存缓存，所以存取速度非常快，主要用到两种数据结构的 LRU 淘汰算法
:::



1. LRU 淘汰算法

   > LRU（Least recently used，最近最少使用）算法根据数据的历史访问记录来进行淘汰数据，其核心思想是“如果数据最近被访问过，那么将来被访问的几率也更高”。
   >
   > 最常见的实现是使用一个链表保存缓存数据
   >
   > 【命中率】
   >
   > 当存在热点数据时，LRU 的效率很好，但偶发性的、周期性的批量操作会导致 LRU 命中率急剧下降，缓存污染情况比较严重。
   >
   > Cache 的容量是有限的，当 Cache 的空间都被占满后，如果再次发生缓存失效，就必须选择一个缓存块来替换掉。LRU 法是依据各块使用的情况， 总是选择那个最长时间未被使用的块替换。这种方法比较好地反映了程序局部性规律
<!-- more -->
2. 数据结构

   - 双向链表 (Doubly Linked List)
   - 哈希表 (Dictionary)

3. 缓存操作

   - 新数据插入到链表头部；
   - 每当缓存命中（即缓存数据被访问），则将数据移到链表头部；
   - 当链表满的时候，将链表尾部的数据丢弃。

4. 分析图

   [![bpM38.png](https://storage6.cuntuku.com/2019/04/27/bpM38.png)](https://cuntuku.com/image/bpM38)

5. YYMemoryCache.m 里的两个分类

   1. 链表节点 `_YYLinkedMapNode`

      ```objc
      @interface _YYLinkedMapNode : NSObject {
          @package
          // 指向前一个节点
          __unsafe_unretained _YYLinkedMapNode *_prev; // retained by dic
          // 指向后一个节点
          __unsafe_unretained _YYLinkedMapNode *_next; // retained by dic
          // 缓存key
          id _key;
          // 缓存对象
          id _value;
          // 当前缓存内存开销
          NSUInteger _cost;
          // 缓存时间
          NSTimeInterval _time;
      }
      @end
      ```

   2. 链表 `_YYLinkedMap`

      ```objc
      @interface _YYLinkedMap : NSObject {
          @package
          // 用字典保存所有节点_YYLinkedMapNode (为什么不用oc字典?因为用CFMutableDictionaryRef效率高，毕竟基于c)
          CFMutableDictionaryRef _dic;
          // 总缓存开销
          NSUInteger _totalCost;
          // 总缓存数量
          NSUInteger _totalCount;
          // 链表头节点
          _YYLinkedMapNode *_head;
          // 链表尾节点
          _YYLinkedMapNode *_tail;
          // 是否在主线程上，异步释放 _YYLinkedMapNode对象
          BOOL _releaseOnMainThread;
          // 是否异步释放 _YYLinkedMapNode对象
          BOOL _releaseAsynchronously;
      }
      // 添加节点到链表头节点
      - (void)insertNodeAtHead:(_YYLinkedMapNode *)node;
      // 移动当前节点到链表头节点
      - (void)bringNodeToHead:(_YYLinkedMapNode *)node;
      // 移除链表节点
      - (void)removeNode:(_YYLinkedMapNode *)node;
      // 移除链表尾节点(如果存在)
      - (_YYLinkedMapNode *)removeTailNode;
      // 移除所有缓存
      - (void)removeAll;
      @end
      ```

6. 链表插入、查找、替换操作实现

   - 添加节点到链表头节点

     ```objc
     // 添加节点到链表头节点
     - (void)insertNodeAtHead:(_YYLinkedMapNode *)node {
         // 哈希表保存链表节点node
         CFDictionarySetValue(_dic, (__bridge const void *)(node->_key), (__bridge const void *)(node));
         // 叠加该缓存开销到总内存开销
         _totalCost += node->_cost;
         // 总缓存数+1
         _totalCount++;
         if (_head) {
             // 存在链表头，取代当前表头
             node->_next = _head;
             _head->_prev = node;
             // 重新赋值链表表头临时变量_head
             _head = node;
         } else {
             // 不存在链表头
             _head = _tail = node;
         }
     }
     ```

     ![](https://upload-images.jianshu.io/upload_images/295346-1cb03d629ecbf2fa.png)

   - 移动当前节点到链表头节点

     ```objc
     // 移动当前节点到链表头节点
     - (void)bringNodeToHead:(_YYLinkedMapNode *)node {
         // 当前节点已是链表头节点
         if (_head == node) return;

         if (_tail == node) {
             //**如果node是链表尾节点**

             // 把node指向的上一个节点赋值给链表尾节点
             _tail = node->_prev;
             // 把链表尾节点指向的下一个节点赋值nil
             _tail->_next = nil;
         } else {
             //**如果node是非链表尾节点和链表头节点**
             // 此处比较难以理解：总结如下
             // 链接当前节点上节点(node->_prev)到当前节点下节点（node->_next）的上索引(->_prev)
             node->_next->_prev = node->_prev;
             // 链接当前节点下节点(node->_next)到当前节点上节点（node->_prev）的下索引(->_next)
             node->_prev->_next = node->_next;
             // 此处操作等于将本节点上下索引分别赋值给右左节点上下索引，将上下节点链接
         }
         // 把链表头节点赋值给node指向的下一个节点
         node->_next = _head;
         // 把node指向的上一个节点赋值nil
         node->_prev = nil;
         // 把节点赋值给链表头节点的指向的上一个节点
         _head->_prev = node;
         _head = node;
     }

     ```

     ![](https://upload-images.jianshu.io/upload_images/295346-682e8396c2d9e092.png)

   - 移除节点

     - 移除指定节点

       ```objc
       // 移除节点
       - (void)removeNode:(_YYLinkedMapNode *)node {
           // 从字典中移除node
           CFDictionaryRemoveValue(_dic, (__bridge const void *)(node->_key));
           // 减掉总内存消耗
           _totalCost -= node->_cost;
           // // 总缓存数-1
           _totalCount--;
           // 重新连接链表(看图分析吧)
           if (node->_next) node->_next->_prev = node->_prev;
           if (node->_prev) node->_prev->_next = node->_next;
           if (_head == node) _head = node->_next;
           if (_tail == node) _tail = node->_prev;
       }
       ```

     - 移除尾节点

       ```objc
       // 移除尾节点(如果存在)
       - (_YYLinkedMapNode *)removeTailNode {
           if (!_tail) return nil;
           // 拷贝一份要删除的尾节点指针
           _YYLinkedMapNode *tail = _tail;
           // 移除链表尾节点
           CFDictionaryRemoveValue(_dic, (__bridge const void *)(_tail->_key));
           // 减掉总内存消耗
           _totalCost -= _tail->_cost;
           // 总缓存数-1
           _totalCount--;
           if (_head == _tail) {
               // 清除节点，链表上已无节点了
               _head = _tail = nil;
           } else {
               // 设倒数第二个节点为链表尾节点
               _tail = _tail->_prev;
               _tail->_next = nil;
           }
           // 返回完tail后_tail将会释放
           return tail;
       }
       ```

     - 移除所有缓存

       ```objc
       // 移除所有缓存
       - (void)removeAll {
           // 清空内存开销与缓存数量
           _totalCost = 0;
           _totalCount = 0;
           // 清空头尾节点
           _head = nil;
           _tail = nil;

           if (CFDictionaryGetCount(_dic) > 0) {
               // 拷贝一份字典
               CFMutableDictionaryRef holder = _dic;
               // 重新分配新的空间
               _dic = CFDictionaryCreateMutable(CFAllocatorGetDefault(), 0, &kCFTypeDictionaryKeyCallBacks, &kCFTypeDictionaryValueCallBacks);

               if (_releaseAsynchronously) {
                   // 异步释放缓存
                   dispatch_queue_t queue = _releaseOnMainThread ? dispatch_get_main_queue() : YYMemoryCacheGetReleaseQueue();
                   dispatch_async(queue, ^{
                       CFRelease(holder); // hold and release in specified queue
                   });
               } else if (_releaseOnMainThread && !pthread_main_np()) {
                   // 主线程上释放缓存
                   dispatch_async(dispatch_get_main_queue(), ^{
                       CFRelease(holder); // hold and release in specified queue
                   });
               } else {
                   // 同步释放缓存
                   CFRelease(holder);
               }
           }
       }
       ```

> 图片引用自[YYCache 源码分析(二)](https://www.jianshu.com/p/492c3c3a0485) 感谢作者
>
> ps 未完待续……
