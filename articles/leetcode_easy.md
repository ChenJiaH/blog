# 【持续更新】Leetcode 做题学算法

本文记录刷题过程中的整个思考过程，以供参考。主要内容涵盖：

 - 题目分析设想
 - 编写代码验证
 - 查阅他人解法
 - 思考总结

## Easy

### 1.两数之和

#### 题目描述

给定一个整数数组 `nums` 和一个目标值 `target`，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例:

```javascript
 给定 nums = [2, 7, 11, 15], target = 9

 因为 nums[0] + nums[1] = 2 + 7 = 9
 所以返回 [0, 1]
 ```

#### 题目分析设想

 这道题首先说明了每种输入只会对应一个答案，并且不能利用数组中同样的元素，也就意味着一个数不能被使用两次，即 `[0,0]` 这种是不合理的。

 看到这个题目，我有几个方向去尝试作答：

 - 暴力点，直接循环两次即可，预估性能最差
 - `IndexOf` ，循环次数最多，**非常不推荐**
 - 空间换时间，使用 `HashMap` ,减少一次循环

#### 编写代码验证

**Ⅰ.暴力法**

代码：

```javascript
 // 暴力点
 /**
  * @param {number[]} nums
  * @param {number} target
  * @return {number[]}
  */
var twoSum = function(nums, target) {
    for(let i = 0; i < nums.length; i++) {
        // j 从 i+1 开始，去除一些无用运算
        for(let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i,j];
            }
        }
    }
};
```

结果：

- 29/29 cases passed (124 ms)
- Your runtime beats 60.13 % of javascript submissions
- Your memory usage beats 66.05 % of javascript submissions (34.5 MB)

**Ⅱ.IndexOf**

性能最差，每次判断都需要遍历剩余数组（极度不推荐，只是多展示一个实现方案）

代码：

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    for(let i = 0; i < nums.length; i++) {
        const num = nums[i]
        const dif = target - num
        const remainArr = nums.slice(i + 1)
        if (remainArr.indexOf(dif) !== -1) {
            return [i, remainArr.indexOf(dif) + i + 1]
        }
    }
};
```

结果：

- 29/29 cases passed (212 ms)
- Your runtime beats 22.39 % of javascript submissions
- Your memory usage beats 5 % of javascript submissions (49 MB)

**Ⅲ.HashMap**

代码：

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let hash = {}
    for(let i = 0; i < nums.length; i++) {
        const num = nums[i]
        const dif = target - num
        if (hash[dif] !== undefined) {
            return [hash[dif], i]
        } else {
            hash[num] = i
        }
    }
};
```

结果：

- 29/29 cases passed (60 ms)
- Your runtime beats 98.7 % of javascript submissions
- Your memory usage beats 19.05 % of javascript submissions (35.3 MB)

对比发现，`HashMap` 方案较暴力法在速度上有明显的提升。

#### 查阅他人解法

这里看到还有两种方式，我们一一来尝试一下。

**Ⅰ.使用数组替换 HashMap**

代码：

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let arr = []
    for(let i = 0; i < nums.length; i++) {
        const num = nums[i]
        const dif = target - num
        if (arr[dif] !== undefined) {
            return [arr[dif], i]
        } else {
            arr[num] = i
        }
    }
};
```

结果：

- 29/29 cases passed (60 ms)
- Your runtime beats 98.7 % of javascript submissions
- Your memory usage beats 17.89 % of javascript submissions (35.4 MB)

跟使用 `HashMap` 性能差异不大。

**Ⅱ.两次遍历 `HashMap`**

代码：

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let res = new Map()
    for(let i = 0; i < nums.length; i++) {
        res.set(nums[i], i)
    }
    for(let i = 0; i < nums.length; i++) {
        const num = nums[i]
        const dif = target - num
        const idx = res.get(dif)
        if (idx !== undefined && idx !== i) {
            return [i, idx]
        }
    }
};
```

结果：

- 29/29 cases passed (64 ms)
- Your runtime beats 96.76 % of javascript submissions
- Your memory usage beats 10.94 % of javascript submissions (35.9 MB)

#### 思考总结

这里我做个了简单的校验：输入 `[2,2,2], 4` ，发现期望输出是 `[0, 2]` ，而不是 `[0, 1]` ,所以上面有几种解法实际上都过不了。如果是为了满足这种输出，我的推荐方案是 `两次遍历 HashMap` 。但是我个人是觉得 `HashMap` 一次遍历是更合理的。


