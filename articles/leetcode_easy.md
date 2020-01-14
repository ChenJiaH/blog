# 【持续更新】Leetcode 做题学算法

本文记录刷题过程中的整个思考过程，以供参考。主要内容涵盖：

- 题目分析设想
- 编写代码验证
- 查阅他人解法
- 思考总结

## 目录

- [1.两数之和](#1两数之和)
- [7.整数反转](#7整数反转)
- [9.回文数](#9回文数)
- [13.罗马数字转整数](#13罗马数字转整数)
- [14.最长公共前缀](#14最长公共前缀)
- [20.有效的括号](#20有效的括号)
- [21.合并两个有序链表](#21合并两个有序链表)
- [26.删除排序数组中的重复项](#26删除排序数组中的重复项)
- [27.移除元素](#27移除元素)
- [28.实现strStr](#28实现strStr)
- [35.搜索插入位置](#35搜索插入位置)
- [38.报数](#38报数)
- [53.最大子序和](#53最大子序和)
- [58.最后一个单词的长度](#58最后一个单词的长度)
- [66.加一](#66加一)
- [67.二进制求和](#67二进制求和)
- [69.x的平方根](#69x的平方根)
- [70.爬楼梯](#70爬楼梯)
- [83.删除排序链表中的重复元素](#83删除排序链表中的重复元素)
- [88.合并两个有序数组](#88合并两个有序数组)
- [100.相同的树](#100相同的树)
- [101.对称二叉树](#101对称二叉树)
- [104.二叉树的最大深度](#104二叉树的最大深度)
- [107.二叉树的层次遍历II](#107二叉树的层次遍历II)
- [108.将有序数组转换为二叉搜索树](#108将有序数组转换为二叉搜索树)
- [110.平衡二叉树](#110平衡二叉树)
- [111.二叉树的最小深度](#111二叉树的最小深度)
- [112.路径总和](#112路径总和)
- [118.杨辉三角](#118杨辉三角)
- [119.杨辉三角Ⅱ](#119杨辉三角Ⅱ)
- [121.买卖股票的最佳时机](#121买卖股票的最佳时机)
- [122.买卖股票的最佳时机Ⅱ](#122买卖股票的最佳时机Ⅱ)
- [125.验证回文串](#125验证回文串)
- [136.只出现一次的数字](#136只出现一次的数字)
- [141.环形链表](#141环形链表)

## Easy

### 1.两数之和

[题目地址](https://leetcode-cn.com/problems/two-sum/)

#### 题目描述

给定一个整数数组 `nums` 和一个目标值 `target`，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。

你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。

示例：

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
- 时间复杂度：`O(n^2)`

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
- 时间复杂度： `O(n^2)` ，阶乘的时间复杂度为 `O(n)`

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
- 时间复杂度： `O(n)`

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
- 时间复杂度： `O(n)`

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
- 时间复杂度： `O(n)`

#### 思考总结

这里我做个了简单的校验：输入 `[2,2,2], 4` ，发现期望输出是 `[0, 2]` ，而不是 `[0, 1]` ,所以上面有几种解法实际上都过不了。如果是为了满足这种输出，我的推荐方案是 `两次遍历 HashMap` 。但是我个人是觉得 `HashMap` 一次遍历是更合理的。

### 7.整数反转

[题目地址](https://leetcode-cn.com/problems/reverse-integer/)

#### 题目描述

给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。

示例:

```javascript
输入: 123
输出: 321

输入: -123
输出: -321

输入: 120
输出: 21
```

注意:

假设我们的环境只能存储得下 32 位的有符号整数，则其数值范围为 `[−2^31,  2^31 − 1]`。请根据这个假设，如果反转后整数溢出那么就返回 0。

#### 题目分析设想

从题干上来看，有几个要注意的点：

- 溢出返回 `0`
- `0` 为首位需要去掉取自然数

这里我有两种思路：

- 利用数组反转 `reverse` 来反转再做自然数转换
- 取余拿到每位上的数字再做加法和符号及溢出处理

#### 编写代码验证

**Ⅰ.数组反转**

代码：

```javascript
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    const isNegative = x < 0
    const rev = Number(Math.abs(x).toString().split('').reverse().join(''))
    if (isNegative && -rev >= -Math.pow(2, 31)) {
        return -rev
    } else if (!isNegative && rev <= Math.pow(2,31) - 1) {
        return rev
    } else {
        return 0
    }
};
```

结果：

- 1032/1032 cases passed (96 ms)
- Your runtime beats 73.33 % of javascript submissions
- Your memory usage beats 28.03 % of javascript submissions (35.9 MB)
- 时间复杂度： `O(1)`

**Ⅱ.取余**

代码：

```javascript
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    const isNegative = x < 0
    let res = 0
    while(x !== 0) {
        res = res * 10 + x % 10
        x = parseInt(x / 10)
    }
    if ((isNegative && res >= -Math.pow(2, 31)) || (!isNegative && res <= Math.pow(2,31) - 1)) {
        return res
    } else {
        return 0
    }
};
```

结果：

- 1032/1032 cases passed (80 ms)
- Your runtime beats 96.71 % of javascript submissions
- Your memory usage beats 56.8 % of javascript submissions (35.7 MB)
- 时间复杂度： `O(log10(n))`

对比发现，使用取余的方式，性能上明显优于数组反转。

#### 查阅他人解法

思路基本上都是这两种，未发现方向不同的解法。

#### 思考总结

对比发现还有一些考虑不周的地方需要补全，比如说一些特殊值可直接返回，避免运算。这里我也做了一个简单的校验：输入 `-0`，发现期望输出是 `0` 而不是 `-0`。所以，我这里的代码做一些优化，如下：

```javascript
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    if (x === 0) return 0
    function isOverflow (num) {
        return num < -Math.pow(2, 31) || (num > Math.pow(2,31) - 1)
    }
    if (isOverflow(x)) return 0
    let res = 0
    while(x !== 0) {
        res = res * 10 + x % 10
        x = parseInt(x / 10)
    }
    return isOverflow(res) ? 0 : res
};
```

### 9.回文数

[题目地址](https://leetcode-cn.com/problems/palindrome-number/)

#### 题目描述

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

示例：

```javascript
输入: 121
输出: true

输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。

输入: 10
输出: false
解释: 从右向左读, 为 01 。因此它不是一个回文数。
```

进阶:

你能不将整数转为字符串来解决这个问题吗？

#### 题目分析设想

这道题的第一感觉有点类似上一题整数反转的拓展，所以我们从两个方向入手：

- 整数转字符串
- 取余，前后逐位判断

在写的过程中需要考虑到去掉一些运算：把 `<0` 和 `-0` 排除，因为负数和 `-0` 一定不为回文数；一位正整数一定是回文数；除了 `0` 以外，尾数为 `0` 的不是回文数。

#### 编写代码验证

**Ⅰ.转字符串**

代码：

```javascript
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x < 0 || Object.is(x, -0) || (x % 10 === 0 && x !== 0)) return false;
    if (x < 10) return true;
    const rev = parseInt(x.toString().split('').reverse().join(''))
    return rev === x
};
```

结果：

- 11509/11509 cases passed (252 ms)
- Your runtime beats 79.41 % of javascript submissions
- Your memory usage beats 52 % of javascript submissions (45.7 MB)
- 时间复杂度： `O(1)`

这里有用到 `ES6` 的 `Object.is` 来判断是否为 `-0` ，当然 `ES5` 你也可以这么判断：

```javascript
function (x) {
    return x === 0 && 1 / x < 0;    // -Infinity
}
```

可能有人会问不需要考虑数字溢出问题吗？

输入的数字不溢出，如果是回文数的话，那么输出的数字一定不溢出；如果不是回文数，不管溢出与否，都是返回 `false`。

**Ⅱ.取余**

代码：

```javascript
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x < 0 || Object.is(x, -0) || (x % 10 === 0 && x !== 0)) return false;
    if (x < 10) return true;
    let div = 1
    while (x / div >= 10) { // 用来找出位数，比如121，那么就找到100，得到整数位
        div *= 10
    }
    while(x > 0) {
        let left = parseInt(x / div); // 左侧数起
        let right = x % 10; // 右侧数起
        if (left !== right) return false;

        x = parseInt((x % div) / 10);   // 去掉左右各一位数

        div /= 100; // 除数去两位
    }
    return true;
};
```

结果：

- 11509/11509 cases passed (232 ms)
- Your runtime beats 86.88 % of javascript submissions
- Your memory usage beats 67.99 % of javascript submissions (45.5 MB)
- 时间复杂度： `O(log10(n))`

#### 查阅他人解法

这里看到一个更为巧妙的方式，只需要翻转一半即可。比如说 `1221` ，只需要翻转后两位 `21` 即可。

Ⅰ.翻转一半

代码：

```javascript
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    if (x < 0 || Object.is(x, -0) || (x % 10 === 0 && x !== 0)) return false;
    if (x < 10) return true;
    let rev = 0;    // 翻转的数字

    while(x > rev) {
        rev = rev * 10 + x % 10
        x = parseInt(x / 10)
    }

    return x === rev || x === parseInt(rev / 10);   // 奇数的话需要去掉中间数做比较
};
```

结果：

- 11509/11509 cases passed (188 ms)
- Your runtime beats 99.62 % of javascript submissions
- Your memory usage beats 92.69 % of javascript submissions (44.8 MB)
- 时间复杂度： `O(log10(n))`

#### 思考总结

综上，最推荐翻转一半的解法。

### 13.罗马数字转整数

[题目地址](https://leetcode-cn.com/problems/roman-to-integer/)

#### 题目描述

罗马数字包含以下七种字符: `I， V， X， L，C，D` 和 `M`。

| 字符 | 数值 |
| :----: | :----: |
| I | 1 |
| V | 5 |
| X | 10 |
| L | 50 |
| C | 100 |
| D | 500 |
| M | 1000 |

例如， 罗马数字 2 写做 `II` ，即为两个并列的 1。12 写做 `XII` ，即为 `X + II` 。 27 写做  `XXVII`, 即为 `XX + V + II` 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 `IIII`，而是 `IV`。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 `IX`。这个特殊的规则只适用于以下六种情况：

- `I` 可以放在 `V` (5) 和 `X` (10) 的左边，来表示 4 和 9。
- `X` 可以放在 `L` (50) 和 `C` (100) 的左边，来表示 40 和 90。
- `C` 可以放在 `D` (500) 和 `M` (1000) 的左边，来表示 400 和 900。

给定一个罗马数字，将其转换成整数。输入确保在 1 到 3999 的范围内。

示例：

```javascript
输入: "III"
输出: 3

输入: "IV"
输出: 4

输入: "IX"
输出: 9

输入: "LVIII"
输出: 58
解释: L = 50, V= 5, III = 3.

输入: "MCMXCIV"
输出: 1994
解释: M = 1000, CM = 900, XC = 90, IV = 4.
```

#### 题目分析设想

这道题有个比较直观的想法，因为特殊情况有限可枚举，所以我这里有两个方向：

- 枚举所有特殊组合，然后进行字符串遍历
- 直接字符串遍历，判断当前位和后一位的大小

#### 编写代码验证

**Ⅰ.枚举特殊组合**

代码：

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const hash = {
        'I': 1,
        'IV': 4,
        'V': 5,
        'IX': 9,
        'X': 10,
        'XL': 40,
        'L': 50,
        'XC': 90,
        'C': 100,
        'CD': 400,
        'D': 500,
        'CM': 900,
        'M': 1000
    }
    let res = 0
    for(let i = 0; i < s.length;) {
        if (i < s.length - 1 && hash[s.substring(i, i + 2)]) { // 在 hash 表中，说明是特殊组合
            res += hash[s.substring(i, i + 2)]
            i += 2
        } else {
            res += hash[s.charAt(i)]
            i += 1
        }
    }
    return res
};
```

结果:

- 3999/3999 cases passed (176 ms)
- Your runtime beats 77.06 % of javascript submissions
- Your memory usage beats 80.86 % of javascript submissions (39.8 MB)
- 时间复杂度： `O(n)`

**Ⅱ.直接遍历**

代码：

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const hash = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    }
    let res = 0
    for(let i = 0; i < s.length; i++) {
        if (i === s.length - 1) {
            res += hash[s.charAt(i)]
        } else {
            if (hash[s.charAt(i)] >= hash[s.charAt(i + 1)]) {
                res += hash[s.charAt(i)]
            } else {
                res -= hash[s.charAt(i)]
            }
        }
    }
    return res
};
```

结果：

- 3999/3999 cases passed (176 ms)
- Your runtime beats 84.42 % of javascript submissions
- Your memory usage beats 90.55 % of javascript submissions (39.6 MB)
- 时间复杂度： `O(n)`

##### 查阅他人解法

这里还看到一种方式，全部先按加法算，如果有前一位小于后一位的情况，直接减正负差值 `2/20/200` 。来看看代码：

**Ⅰ.差值运算**

代码：

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function(s) {
    const hash = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50,
        'C': 100,
        'D': 500,
        'M': 1000
    }
    let res = 0
    for(let i = 0; i < s.length; i++) {
        res += hash[s.charAt(i)]
        if (i < s.length - 1 && hash[s.charAt(i)] < hash[s.charAt(i + 1)]) {
            res -= 2 * hash[s.charAt(i)]
        }
    }
    return res
};
```

结果：

- 3999/3999 cases passed (232 ms)
- Your runtime beats 53.57 % of javascript submissions
- Your memory usage beats 80.05 % of javascript submissions (39.8 MB)
- 时间复杂度： `O(n)`

换汤不换药，只是做了个加法运算而已，没有太大的本质区别。

#### 思考总结

综上，暂时没有看到一些方向上不一致的解法。我这里推荐字符串直接遍历的解法，性能最佳。

### 14.最长公共前缀

[题目地址](https://leetcode-cn.com/problems/longest-common-prefix/)

#### 题目描述

编写一个函数来查找字符串数组中的最长公共前缀。

如果不存在公共前缀，返回空字符串 ""。

示例：

```javascript
输入: ["flower","flow","flight"]
输出: "fl"

输入: ["dog","racecar","car"]
输出: ""
解释: 输入不存在公共前缀。
```

说明:

所有输入只包含小写字母 `a-z` 。

#### 题目分析设想

这道题一看觉得肯定是需要遍历的题，无非是算法上的优劣罢了。我有三个方向来尝试解题：

- 遍历每列，取出数组第一项，逐个取字符串的每一位去遍历数组
- 遍历每项，取出数组第一项，逐步从后截取，判断是否匹配数组中的每一项
- 分治，将数组递归不断细成俩部分，分别求最大匹配后，再汇总求最大匹配

#### 编写代码验证

**Ⅰ.遍历每列**

代码：

```javascript
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (strs.length === 0) return ''
    if (strs.length === 1) return strs[0] || ''
    const str = strs.shift()
    for(let i = 0; i < str.length; i++) {
        const char = str.charAt(i)
        for(let j = 0; j < strs.length; j++) {
            if (i === strs[j].length || strs[j].charAt(i) !== char) {
                return str.substring(0, i)
            }
        }
    }
    return str
};
```

结果：

- 118/118 cases passed (68 ms)
- Your runtime beats 89.17 % of javascript submissions
- Your memory usage beats 57.83 % of javascript submissions (34.8 MB)
- 时间复杂度： `O(n)`

**Ⅱ.遍历每项**

代码：

```javascript
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (strs.length === 0) return ''
    if (strs.length === 1) return strs[0] || ''
    let str = strs.shift()
    for(let i = 0; i < strs.length; i++) {
        while (strs[i].indexOf(str) !== 0) {
            str = str.substring(0, str.length - 1);
            if (!str) return ''
        }
    }
    return str
};
```

结果：

- 118/118 cases passed (64 ms)
- Your runtime beats 94.63 % of javascript submissions
- Your memory usage beats 96.69 % of javascript submissions (33.5 MB)
- 时间复杂度： `O(n)`

**Ⅲ.分治**

代码：

```javascript
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (strs.length === 0) return ''
    if (strs.length === 1) return strs[0] || ''
    function arrayToString (arr, start, end) {
        if (start === end) {    // 说明数组中只剩一项了
            return arr[start]
        } else {
            const mid = parseInt((start + end) / 2)
            const leftStr = arrayToString(arr, start, mid)
            const rightStr = arrayToString(arr, mid + 1, end)
            return getCommonPrefix(leftStr, rightStr)
        }
    }
    // 两个字符串取最长前缀
    function getCommonPrefix(left, right) {
        const min = Math.min(left.length, right.length)
        for(let i = 0; i < min; i++) {
            if (left.charAt(i) !== right.charAt(i)) {
                return left.substring(0, i)
            }
        }
        return left.substring(0, min)
    }
    return arrayToString(strs, 0, strs.length - 1)
};
```

结果：

- 118/118 cases passed (60 ms)
- Your runtime beats 98.09 % of javascript submissions
- Your memory usage beats 34.54 % of javascript submissions (35.1 MB)
- 时间复杂度： `O(n)`

#### 查阅他人解法

这里还看见使用二分法，跟分治还是略有差异，是每次丢弃不包含答案的区间来减少运算量。

**Ⅰ.二分法**

代码：

```javascript
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (strs.length === 0) return ''
    if (strs.length === 1) return strs[0] || ''
    // 找到最短字符串长度
    let minLen = 0
    for(let i = 0; i < strs.length; i++) {
        minLen = minLen === 0 ? strs[i].length : Math.min(minLen, strs[i].length)
    }

    function isCommonPrefix (arr, pos) {
        const str = arr[0].substring(0, pos)    // 取第一项的前一半
        for(let i = 0 ; i < arr.length; i++) {
            if (arr[i].indexOf(str) !== 0) {
                return false
            }
        }
        return true
    }

    let low = 1
    let high = minLen   // 截取最大数量

    while (low <= high) {
        const mid = parseInt((low + high) / 2)
        if (isCommonPrefix(strs, mid)) {    // 如果前半段是
            low = mid + 1   // 继续判断后半段
        } else {
            high = mid - 1  // 前半段继续对半分继续判断
        }
    }

    return strs[0].substring(0, (low + high) / 2)
};
```

结果：

- 118/118 cases passed (64 ms)
- Your runtime beats 94.63 % of javascript submissions
- Your memory usage beats 93.96 % of javascript submissions (33.5 MB)
- 时间复杂度： `O(log(n))`

#### 思考总结

具体情况具体分析，比如分治的算法也可以应用在快速排序中。个人比较推荐分治法和二分法求解这道题。

### 20.有效的括号

[题目地址](https://leetcode-cn.com/problems/valid-parentheses/)

#### 题目描述

给定一个只包括 `'('，')'，'{'，'}'，'['，']'` 的字符串，判断字符串是否有效。

有效字符串需满足：

1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。

注意空字符串可被认为是有效字符串。

示例：

```javascript
输入: "()"
输出: true

输入: "()[]{}"
输出: true

输入: "(]"
输出: false

输入: "([)]"
输出: false

输入: "{[]}"
输出: true
```

#### 题目分析设想

这道题从题面来看，仍然需要对字符串做遍历处理，找到相互匹配的括号，剔除后继续做处理即可。所以这道题我的解题想法是：

- 使用栈来记录，匹配的一对就出栈，最后判断栈是否为空

有几点需要注意下，可以减少一些计算量：

1. 题面说明了字符串只含有三种括号，所以长度为奇数，一定无效
2. 只要有一对不符合，则可判定一定无效
3. 堆栈长度超过字符串长度一半，则一定无效
4. 先找到右括号则一定无效

#### 编写代码验证

**Ⅰ.记录栈**

代码：

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if (s === '') return true;
    if (s.length % 2) return false;
    // hash 表做好索引
    const hash = {
        '(': ')',
        '[': ']',
        '{': '}'
    }
    let arr = []
    for (let i = 0; i < s.length; i++) {
        if (!hash[s.charAt(i)]) { // 推入的是右括号
            if (!arr.length || hash[arr[arr.length - 1]] !== s.charAt(i)) {
                return false
            } else {
                arr.pop()
            }
        } else {
            if (arr.length >= s / 2) {   // 长度超过一半
                return false
            }
            arr.push(s.charAt(i))
        }
    }
    return !arr.length
};
```

结果：

- 76/76 cases passed (64 ms)
- Your runtime beats 90.67 % of javascript submissions
- Your memory usage beats 64.59 % of javascript submissions (33.8 MB)
- 时间复杂度： `O(n)`

#### 查阅他人解法

发现一个很暴力的解法，虽然效率不高，但是思路清奇。我们来看看实现：

**Ⅰ.暴力正则**

代码：

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if (s === '') return true;
    if (s.length % 2) return false;

    while(s.length) {
        const s_ = s
        s = s.replace('()','').replace('[]','').replace('{}','')
        if (s === s_) return false;
    }
    return true;
};
```

结果：

- 76/76 cases passed (104 ms)
- Your runtime beats 14.95 % of javascript submissions
- Your memory usage beats 19.75 % of javascript submissions (35.7 MB)
- 时间复杂度： `O(n)`

#### 思考总结

就这题而言，我还是更倾向于增加一个辅助栈来做记录。因为一旦去掉只包含括号的限制，那么正则将无法解答。

### 21.合并两个有序链表

[题目地址](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

#### 题目描述

将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。

示例：

```javascript
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```

#### 题目分析设想

这道题从题面上就说明了这是一道链表相关问题，要进行链表合并，无非是修改链表指针指向，或者是链表拼接。所以，这道题我有两种思路的解法：

- 修改指针，不断取出某一条链表中的数，插入到另外一条链表
- 链表拼接，递归比较哪条链表的元素更小，就截取拼接到另一条

两种方式的区别很明显，修改指针的方式需要存储和不断修改指针指向，拼接的方式直接做链表拼接。

当然这里也有一些特殊值需要考虑进来。

#### 编写代码验证

**Ⅰ.修改指针**

代码：

```javascript
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    if (l1 === null) return l2
    if (l2 === null) return l1
    // 结果链表
    let l = new ListNode(0)
    // 不断更新的当前结点指针，对象赋值为传址，所以下面改指针指向即可
    let cursor = l
    // 会有一个先遍历完，变成 null
    while(l1 !== null && l2 !== null) {
        if (l1.val <= l2.val) { // 哪个小，指针就指向哪
            cursor.next = l1
            l1 = l1.next
        } else {
            cursor.next = l2
            l2 = l2.next
        }
        // 可以理解为 l.next.next.next ...
        cursor = cursor.next
    }
    // 有一个为空则可以直接拼接
    cursor.next = l1 === null ? l2 : l1
    return l.next
};
```

结果：

- 208/208 cases passed (60 ms)
- Your runtime beats 99.51 % of javascript submissions
- Your memory usage beats 51.04 % of javascript submissions (35.4 MB)
- 时间复杂度 `O(m + n)` ，分别代表两个链表长度

**Ⅱ.链表拼接**

代码：

```javascript
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    if (l1 === null) return l2
    if (l2 === null) return l1
    if (l1.val < l2.val) {
        l1.next = mergeTwoLists(l1.next, l2)
        return l1   // 这个是合并后的了
    } else {
        l2.next = mergeTwoLists(l1, l2.next)
        return l2   // 这个是合并后的了
    }
};
```

结果：

- 208/208 cases passed (68 ms)
- Your runtime beats 96.41 % of javascript submissions
- Your memory usage beats 51.04 % of javascript submissions (35.4 MB)
- 时间复杂度 `O(m + n)` ，分别代表两个链表长度

#### 查阅他人解法

思路基本上都是这两种，未发现方向不同的解法。

无非是有些解法额外开辟了新的链表来记录，或者一些细节上的差异。

#### 思考总结

这里的链表拼接解法，有没有发现跟 [上一期](https://github.com/ChenJiaH/blog/issues/44) 14题中的分治思路是一样的？对，实际上这个也是分治思路的一个应用。

### 26.删除排序数组中的重复项

[题目地址](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

#### 题目描述

给定一个排序数组，你需要在**原地**删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在**原地**修改输入数组并在使用 O(1) 额外空间的条件下完成。

示例：

```javascript
给定数组 nums = [1,1,2],

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。

你不需要考虑数组中超出新长度后面的元素。

给定 nums = [0,0,1,1,1,2,2,3,3,4],

函数应该返回新的长度 5, 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4。

你不需要考虑数组中超出新长度后面的元素。
```

说明:

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以“引用”方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

```javascript
// nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝
int len = removeDuplicates(nums);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```


#### 题目分析设想

如果是单纯的数组去重，那有很多种方法可以做。所以题目也加了限制条件，总结一下比较重要的几点：

- 不要使用额外的数组空间，空间复杂度为 `O(1)`
- 原地删除重复元素
- 不需要考虑超过新长度后面的元素

这意味着不允许使用新的数组来解题，也就是对原数组进行操作。最后一点注意点可以看出，数组项的拷贝复制是一个方向，第二点可以看出数组删除是一个方向。删除元素的话就不会超过，所以不需要考虑两者结合。所以这题我分两个方向来解：

- 拷贝数组元素
- 删除数组元素

#### 编写代码验证

**Ⅰ.拷贝数组元素**

代码：

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if (nums.length === 0) return 0;
    var len = 1
    for(let i = 1; i < nums.length; i++) {
        if(nums[i] !== nums[i - 1]) { // 后一项不等于前一项
            nums[len++] = nums[i] // 拷贝数组元素
        }
    }
    return len
};
```

结果：

- 161/161 cases passed (68 ms)
- Your runtime beats 99.81 % of javascript submissions
- Your memory usage beats 77.54 % of javascript submissions (36.6 MB)
- 时间复杂度 `O(n)`

**Ⅱ.删除数组元素**

代码：

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if (nums.length === 0) return 0;
    for(let i = 1; i < nums.length;) {
        if(nums[i] === nums[i - 1]) { // 后一项等于前一项
            nums.splice(i, 1)
        } else {
            i++
        }
    }
    return nums.length
};
```

结果：

- 161/161 cases passed (96 ms)
- Your runtime beats 75.93 % of javascript submissions
- Your memory usage beats 30.85 % of javascript submissions (37.3 MB)
- 时间复杂度 `O(n)`

#### 查阅他人解法

这里看见一种很巧妙的解法，双指针法。相当于一个用于计数，一个用于扫描。

**Ⅰ.双指针法**

代码：

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    if (nums.length === 0) return 0;

    let i = 0;
    for(let j = 1; j < nums.length; j++) {
        if (nums[j] !== nums[i]) {
            nums[++i] = nums[j]
        }
    }
    return i + 1  // 下标 +1 为数组长度
};
```

结果：

- 161/161 cases passed (68 ms)
- Your runtime beats 99.81 % of javascript submissions
- Your memory usage beats 84.03 % of javascript submissions (36.5 MB)
- 时间复杂度 `O(n)`

#### 思考总结

就三种解法而言，删除数组元素会频繁修改数组，不建议使用。双指针法和拷贝数组元素代码逻辑相似，但是思路上是截然不同的。

### 27.移除元素

[题目地址](https://leetcode-cn.com/problems/remove-element/)

#### 题目描述

给定一个数组 `nums` 和一个值 `val`，你需要**原地**移除所有数值等于 `val` 的元素，返回移除后数组的新长度。

不要使用额外的数组空间，你必须在**原地**修改输入数组并在使用 `O(1)` 额外空间的条件下完成。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

示例：

```javascript
给定 nums = [3,2,2,3], val = 3,

函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。

你不需要考虑数组中超出新长度后面的元素。

给定 nums = [0,1,2,2,3,0,4,2], val = 2,

函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。

注意这五个元素可为任意顺序。

你不需要考虑数组中超出新长度后面的元素。
```

说明:

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以“引用”方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

```javascript
// nums 是以“引用”方式传递的。也就是说，不对实参作任何拷贝
int len = removeElement(nums, val);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中该长度范围内的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```

#### 题目分析设想

这题跟上一题非常相似，所以我们可以沿用上题的方向来解这道题：

- 删除数组元素
- 双指针法

#### 编写代码验证

**Ⅰ.删除数组元素**

代码：

```javascript
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    if (nums.length === 0) return 0;

    for(let i = 0; i < nums.length;) {
        if (nums[i] === val) {
            nums.splice(i, 1)
        } else {
            i++
        }
    }
};
```

结果：

- 113/113 cases passed (64 ms)
- Your runtime beats 89.43 % of javascript submissions
- Your memory usage beats 47.42 % of javascript submissions (33.7 MB)
- 时间复杂度 `O(n)`

**Ⅱ.双指针法**

代码：

```javascript
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    if (nums.length === 0) return 0;

    let i = 0
    for(let j = 0; j < nums.length; j++) {
        if (nums[j] !== val) {
            nums[i++] = nums[j]
        }
    }
    return i
};
```

结果：

- 113/113 cases passed (60 ms)
- Your runtime beats 95.11 % of javascript submissions
- Your memory usage beats 98.18 % of javascript submissions (33.3 MB)
- 时间复杂度 `O(n)`

#### 查阅他人解法

看到两个略有差异的方法：

- 单指针法，使用 `const of` 替换一次遍历，只是写法区别，没有本质提升
- 交换移除，相同时候与最后一项交换，同时数组长度减1

**Ⅰ.单指针法**

代码：

```javascript
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    if (nums.length === 0) return 0;

    let i = 0;
    for(const num of nums) {
        if(num !== val) {
            nums[i++] = num;
        }
    }
    return i;
};
```

结果：

- 113/113 cases passed (68 ms)
- Your runtime beats 80.29 % of javascript submissions
- Your memory usage beats 43.35 % of javascript submissions (33.7 MB)
- 时间复杂度 `O(n)`

**Ⅱ.交换移除**

代码：

```javascript
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
    if (nums.length === 0) return 0;

    let i = nums.length;
    for(let j = 0; j < i;) {
        if (nums[j] === val) {
            nums[j] = nums[--i]
        } else {
            j++
        }
    }

    return i;
};
```

结果：

- 113/113 cases passed (68 ms)
- Your runtime beats 80.29 % of javascript submissions
- Your memory usage beats 44.53 % of javascript submissions (33.7 MB)
- 时间复杂度 `O(n)`

#### 思考总结

这里开拓下思路：如果要移除的是多项，那么还是使用指针法做处理合适；如果是移除单项，那么使用交互移除法其实遍历次数最少。


### 28.实现strStr

[题目地址](https://leetcode-cn.com/problems/implement-strstr/)

#### 题目描述

实现 `strStr()` 函数。

给定一个 `haystack` 字符串和一个 `needle` 字符串，在 `haystack` 字符串中找出 `needle` 字符串出现的第一个位置 (从0开始)。如果不存在，则返回 `-1`。

示例：

```javascript
输入: haystack = "hello", needle = "ll"
输出: 2

输入: haystack = "aaaaa", needle = "bba"
输出: -1
```

说明:

当 `needle` 是空字符串时，我们应当返回什么值呢？这是一个在面试中很好的问题。

对于本题而言，当 `needle` 是空字符串时我们应当返回 `0` 。这与 `C` 语言的 `strstr()` 以及 `Java` 的 `indexOf()` 定义相符。

#### 题目分析设想

这道题很明显是一道字符串搜索的题目，估计是在考察算法，但是受限知识面，所以我就先以现有方式实现作答，再来学习算法了。

- `IndexOf` 这个是原生方法，考察这个就没有意义了，所以不做详细论述
- 遍历匹配，相当于自己实现一个 `IndexOf`

#### 编写代码验证

**Ⅰ.遍历匹配**

代码：

```javascript
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (needle === '') return 0
    if (needle.length > haystack.length) return -1
    if (needle.length === haystack.length && needle !== haystack) return -1
    for(let i = 0; i < haystack.length; i++) {
        if (i + needle.length > haystack.length) {
            return -1
        } else {
            const str = haystack.substr(i, needle.length)
            if (str === needle) {
                return i
            }
        }
    }
    return -1
};
```

结果：

- 74/74 cases passed (64 ms)
- Your runtime beats 90.58 % of javascript submissions
- Your memory usage beats 44.22 % of javascript submissions (33.9 MB)
- 时间复杂度 `O(n)`

#### 查阅他人解法

首先查阅《算法导论》，看到字符串匹配有以下四种：

- 朴素字符串匹配算法
- Rabin-Karp 算法
- 利用有限自动机进行字符串匹配
- KMP 算法

然后再看题解，大概还找到以下三种算法：

- BM 算法
- Horspool 算法
- Sunday 算法

**Ⅰ.朴素字符串匹配算法**

算法说明：

通过一个循环找到所有有效便宜，该循环对 `n-m+1` 个可能的 `s` 值进行检测，看能否满足条件 `P[1..m] = T[s+1...s+m]`。其中 `n` 是字符串长度， 'm' 是匹配字符串长度。

代码：

```javascript
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (needle === '') return 0
    if (needle.length > haystack.length) return -1
    if (needle.length === haystack.length && needle !== haystack) return -1

    let i = 0;
    let j = 0;
    while(j < needle.length && i < haystack.length) {
        if(haystack[i] === needle[j]) { // 同位相等，继续判断下一位
            i++;
            j++;
        } else {
            i = i - j + 1; // i 偏移
            j = 0; // j 重置

            if (i + needle.length > haystack.length) { // 我增加的优化点，减少一些运算
                return -1
            }
        }
    }
    if (j >= needle.length) { // 子串比完了，此时 j 应该等于 needle.length
        return i - needle.length;
    } else {
        return -1
    }
};
```

结果：

- 74/74 cases passed (56 ms)
- Your runtime beats 98.45 % of javascript submissions
- Your memory usage beats 30.12 % of javascript submissions (34.8 MB)
- 时间复杂度 `O(m*n)`

**Ⅱ.Rabin-Karp 算法**

算法说明：

进行哈希运算，将字符串转成对应的哈希值进行比对，类似16进制。这里题目是字符串，我就用 `ASCII` 值来表示每个字符的哈希值，那么就可以计算出模式串的哈希值，再进行滚动比较。

每次滚动只需要做固定的 `-*+` 三个操作，即可得出滚动串的哈希值了。

比如计算 `bbc` ,哈希值为 `hash = (b.charCodeAt() * 128 ^ 2 + b.charCodeAt() * 128 + c.charCodeAt())`，如果要计算后新值 `bca` 则为 `(hash - b.charCodeAt() * 128 ^ 2) * 128 + c.charCodeAt()`。

代码：

```javascript
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (needle === '') return 0
    if (needle.length > haystack.length) return -1
    if (needle.length === haystack.length && needle !== haystack) return -1

    let searchHash = 0 // 搜索字符串的hash值
    let startHash = 0 // 字符串起始的hash值

    for(let i = 0; i < needle.length; i++) {
        searchHash += needle.charCodeAt(i) * Math.pow(2, needle.length - i - 1)
        startHash += haystack.charCodeAt(i) * Math.pow(2, needle.length - i - 1)
    }

    if (startHash === searchHash)  return 0

    for(let j = 1; j < haystack.length - needle.length + 1; j++) {
        startHash = (startHash - haystack.charCodeAt(j - 1) * Math.pow(2, needle.length - 1)) * 2 + haystack.charCodeAt(j + needle.length - 1)
        if (startHash === searchHash) {
            return j
        }
    }
    return -1
};
```

结果：

- 74/74 cases passed (68 ms)
- Your runtime beats 81.31 % of javascript submissions
- Your memory usage beats 16.86 % of javascript submissions (35.4 MB)
- 时间复杂度 `O(m*n)`



> 注意：这里可能会存在溢出的情况，所以不是所有情况都适用。

**Ⅲ.利用有限自动机进行字符串匹配**

算法说明：

通过对文本字符串 `T` 进行扫描，找出模式 `P` 的所有出现位置。它们只对每个文本字符检查一次，并且检查每个文本字符时所用的时间为常数。一句话概括：字符输入引起状态机状态变更，通过状态转换图得到预期结果。

这里主要的核心点是判断每次输入，找到最长的后缀匹配，如果最长时的长度等于查找字符串长度，那就一定包含该查找字符串。

代码：

```javascript
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (needle === '') return 0
    if (needle.length > haystack.length) return -1
    if (needle.length === haystack.length && needle !== haystack) return -1

    // 查找最大匹配后缀长度
    function findSuffix (Pq) {
        let suffixLen = 0
        let k = 0
        while(k < Pq.length && k < needle.length) {
            let i = 0;
            for(i = 0; i <= k; i++) {
                // 找needle中的多少项为当前状态对应字符串的匹配项
                if (Pq.charAt(Pq.length - 1 - k + i) !== needle.charAt(i)) {
                    break;
                }
            }

            // 所有项都匹配，即找到了后缀
            if (i - 1 == k) {
                suffixLen = k+1;
             }
            k++
        }
        return suffixLen
    }

    // 获取所有输入的字符集，比如 'abbc' 和 'cd' 合集为 ['a','b','c','d']
    const setArr = Array.from(new Set(haystack + needle)) // 用户输入的可选项

    // 建立状态机
    const hash = {}
    for(let q = 0; q < haystack.length; q++) {
        for(let k = 0; k < setArr.length; k++) {
            const char = haystack.substring(0, q) + setArr[k] // 下个状态的字符
            const nextState = findSuffix(char)
            // 求例如 0.a 0.b 0.c 的值
            if (!hash[q]) {
                hash[q] = {}
            }
            hash[q][char] = nextState
        }
    }

    // 根据状态机求解
    let matchStr = ''
    for(let n = 0; n < haystack.length; n++) {
        const map = hash[n]
        matchStr += haystack[n]
        const nextState = map[matchStr]

        if (nextState === needle.length) {
            return n - nextState + 1
        }
    }
    return -1
};
```

结果：

- 74/74 cases passed (84 ms)
- Your runtime beats 35.05 % of javascript submissions
- Your memory usage beats 5.05 % of javascript submissions (39.8 MB)
- 时间复杂度 `O(n)`


**Ⅳ.KMP 算法**

算法说明：

可以理解为在状态机的基础上，使用了一个前缀函数来进行状态判断。本质上也是前缀后缀的思想。

代码：

```javascript
// @lc code=start
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (needle === '') return 0
    if (needle.length > haystack.length) return -1
    if (needle.length === haystack.length && needle !== haystack) return -1

    // 生成匹配串各个位置下下的最长公共前后缀长度哈希表
    function getHash () {
        let i = 0 // arr[i] 表示 i 前面的字符串的最长公共前后缀长度
        let j = 1
        let hash = {
            0: 0
        }
        while (j < needle.length) {
            if (needle.charAt(i) === needle.charAt(j)) { // 相等直接 i j 都后移
                hash[j++] = ++i
            } else if (i === 0) {   // i 为起点且两者不相等，那么一定为0
                hash[j] = 0
                j++
            } else {
                // 这里解释一下： 因为i前面的字符串与j前面的字符串拥有相同的最长公共前后缀，也就是说i前面字符串的最长公共后缀与j前面字符串的最长公共前缀相同，所以i只需回到i前面字符串最长公共前缀的后一位开始比较
                i = hash[i - 1]
            }
        }
        return hash
    }

    const hash = getHash()
    let i = 0 // 母串中的位置
    let j = 0 // 子串中的位置
    while(i < haystack.length && j < needle.length) {
        if (haystack.charAt(i) === needle.charAt(j)) {  // 两个匹配，同时后移
            i++
            j++
        } else if (j === 0) { // 两个不匹配，并且j在起点，则母串后移
            i++
        } else {
            j = hash[j - 1]
        }
    }
    if (j === needle.length) {  // 循环完了，说明匹配到了
        return i - j
    } else {
        return -1
    }
};
```

结果：

- 74/74 cases passed (60 ms)
- Your runtime beats 94.74 % of javascript submissions
- Your memory usage beats 23.73 % of javascript submissions (35.1 MB)
- 时间复杂度 `O(n)`

**Ⅴ.BM 算法**

算法说明：

基于后缀匹配，匹配从后开始，但移动还是从前开始，只是定义了两个规则：坏字符规则和好后缀规则。

通俗来讲就是先验证是否为坏字符，然后判断是否在搜索词中进行对应的偏移进行下一步验证。如果匹配的话就从后往前校验，如果仍然匹配，就为好后缀。核心思想是每次位移都在坏字符和好后缀规则中取较大值，由于两个规则都只与匹配项相关，所以可以提前生成规则表。

代码：

```javascript
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (needle === '') return 0
    if (needle.length > haystack.length) return -1
    if (needle.length === haystack.length && needle !== haystack) return -1

    function makeBadChar (needle) {
        let hash = {}
        for(let i = 0; i < 256; i++) { // ascii 字符长度
            hash[String.fromCharCode(i)] = -1 // 初始化为-1
        }
        for(let i = 0; i < needle.length; i++) {
            hash[needle.charAt(i)] = i  // 最后出现该字符的位置
        }
        return hash
    }

    function makeGoodSuffix (needle) {
        let hashSuffix = {}
        let hashPrefix = {}
        for(let i = 0; i < needle.length; i++) {
            hashSuffix[i] = -1
            hashPrefix[i] = false
        }
        for(let i = 0; i < needle.length - 1; i++) { // needle[0, i]
            let j = i
            k = 0 // 公共后缀子串长度，尾部取k个出来进行比较
            while(j >= 0 && needle.charAt(j) === needle.charAt(needle.length - 1 - k)) { // needle[0,needle.length - 1]
                --j
                ++k
                hashSuffix[k] = j + 1 // 起始下标
            }

            if (j === -1) { // 说明全部匹配，意味着此时公共后缀子串也是模式的前缀子串
                hashPrefix[k] = true
            }
        }
        return { hashSuffix, hashPrefix }
    }

    function moveGoodSuffix (j, needle) {
        let k = needle.length - 1 - j
        let suffixes = makeGoodSuffix(needle).hashSuffix
        let prefixes = makeGoodSuffix(needle).hashPrefix
        if (suffixes[k] !== -1) { // 找到了跟好后缀一样的子串，获取下标
            return j - suffixes[k] + 1
        }
        for(let r = j + 2; r < needle.length; ++r) {
            if (prefixes[needle.length - r]) { // needle.length 是好后缀子串长度
                return r // 对齐前缀到好后缀
            }
        }
        return needle.length // 全部匹配，直接移动字符串长度
    }

    let badchar = makeBadChar(needle)
    let i = 0;
    while(i < haystack.length - needle.length + 1) {
        let j
        for(j = needle.length - 1; j >= 0; --j) {
            if (haystack.charAt(i + j) != needle[j]) {
                break; // 坏字符，下标为j
            }
        }
        if (j < 0) { // 匹配成功
            return i // 第一个匹配字符的位置
        }
        let moveLen1 = j - badchar[haystack.charAt(i + j)]
        let moveLen2 = 0
        if (j < needle.length -1) { // 如果有好后缀
            moveLen2 = moveGoodSuffix(j, needle)
        }
        i = i + Math.max(moveLen1, moveLen2)
    }

    return -1
};
```

结果：

- 74/74 cases passed (72 ms)
- Your runtime beats 69.29 % of javascript submissions
- Your memory usage beats 5.05 % of javascript submissions (37 MB)
- 时间复杂度 `O(n)`

**Ⅵ.Horspool 算法**

算法说明：

将主串中匹配窗口的最后一个字符跟模式串中的最后一个字符比较。如果相等，继续从后向前对主串和模式串进行比较，直到完全相等或者在某个字符处不匹配为止。如果不匹配，则根据主串匹配窗口中的最后一个字符在模式串中的下一个出现位置将窗口向右移动。

代码：

```javascript
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (needle === '') return 0
    if (needle.length > haystack.length) return -1
    if (needle.length === haystack.length && needle !== haystack) return -1

    let hash = {}
    for(let i = 0; i < 256; i++) {
        hash[i] = needle.length // 默认初始化为最大偏移量，也就是匹配串长度
    }
    for(let i = 0; i < needle.length - 1; i++) {
        hash[needle.charCodeAt(i)] = needle.length - 1 - i // 每个字符距离右侧的距离
    }

    let pos = 0

    while(pos < (haystack.length - needle.length + 1)) {
        let j = needle.length - 1 // 从右往左
        while(j >= 0 && haystack.charAt(pos + j) === needle.charAt(j)) {
            j--
        }
        if (j < 0) { // 全部匹配
            return pos
        } else { // 不匹配
            pos += hash[haystack.charCodeAt(pos + needle.length - 1)]
        }
    }

    return -1
};
```

结果：

- 74/74 cases passed (68 ms)
- Your runtime beats 79.76 % of javascript submissions
- Your memory usage beats 16.14 % of javascript submissions (35.4 MB)
- 时间复杂度 `O(n)`

**Ⅶ.Sunday 算法**

算法说明：

它的思想跟 `BM 算法` 相似，但是它是从前往后匹配，匹配失败时关注主串内参与匹配的后一位字符。如果该字符不存在匹配字符中，则多偏移一位；如果存在，则偏移匹配串长度减该字符最右出现的位置。

代码：

```javascript
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (needle === '') return 0
    if (needle.length > haystack.length) return -1
    if (needle.length === haystack.length && needle !== haystack) return -1

    let hash = {}
    for(let i = 0; i < needle.length; i++) {
        hash[needle.charAt(i)] = needle.length - i // 偏移表
    }

    for(let i = 0; i < haystack.length;) {
        let j
        for(j = 0; j < needle.length; j++) {
            if (haystack.charAt(i + j) !== needle.charAt(j)) {
                break
            }
        }
        if(j === needle.length) { // 完全匹配
            return i
        }
        if (i + needle.length >= haystack.length) { // 未找到
            return -1
        } else {
            i += hash[haystack.charAt(i + needle.length)] || needle.length + 1
        }
    }

    return -1
};
```

结果：

- 74/74 cases passed (56 ms)
- Your runtime beats 98.3 % of javascript submissions
- Your memory usage beats 74.1 % of javascript submissions (33.6 MB)
- 时间复杂度 `O(n)`

#### 思考总结

就理解的难易度来讲，我建议先看 `Sunday 算法` 和 `Horspool 算法`，不过 `RMP 算法` 的匹配思路打开了眼界，利用后缀前缀来处理问题。这里把常见的字符串算法都做了一次尝试，整体下来收获颇丰。

### 35.搜索插入位置

[题目地址](https://leetcode-cn.com/problems/search-insert-position/)

#### 题目描述

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

你可以假设数组中无重复元素。

示例：

```javascript
输入: [1,3,5,6], 5
输出: 2

输入: [1,3,5,6], 2
输出: 1

输入: [1,3,5,6], 7
输出: 4

输入: [1,3,5,6], 0
输出: 0
```

#### 题目分析设想

这道题目有点明显，题干说明了是排序数组，重点是排序数组，所以很明显的第一反应会使用二分法来解题。同时可以注意一下，数组中无重复元素。所以这道题我就按两个方案来作答：

- 暴力法，直接遍历
- 二分法，可以理解成不断折半排除不可能

#### 编写代码验证

**Ⅰ.暴力法**

代码：

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    if (nums.length === 0 || nums[0] > target) return 0;
    if(nums[nums.length - 1] < target) return nums.length;

    for(let i = 0; i < nums.length; i++) {
        if(nums[i] >= target) return i
    }
};
```

结果：

- 62/62 cases passed (60 ms)
- Your runtime beats 92.48 % of javascript submissions
- Your memory usage beats 63.22 % of javascript submissions (33.8 MB)
- 时间复杂度 `O(n)`

**Ⅱ.二分法**

代码：

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function(nums, target) {
    if (nums.length === 0 || nums[0] > target) return 0;
    if(nums[nums.length - 1] < target) return nums.length;

    let left = 0; // 起点
    let right = nums.length - 1; // 终点
    while(left < right) {
         // 零填充右位移，使用位运算避免溢出，大部分情况下等于 (left + right / 2)
        let i = parseInt((left + right) >>> 1) // 这里选择取左
        if (nums[i] < target) { // 中位数小于目标值
            left = i + 1 // 排除中位数左侧
        } else {
            right = i // 排除中位数右侧
        }
    }
    return left
};
```

结果：

- 62/62 cases passed (52 ms)
- Your runtime beats 99.31 % of javascript submissions
- Your memory usage beats 61.31 % of javascript submissions (33.8 MB)
- 时间复杂度 `O(log2(n))`

#### 查阅他人解法

基本上这道题就是针对二分法进行考察的，所以没有看到其他特别的解法。

#### 思考总结

看见排序数组，查找下标，那么就可以果断选择二分法啦。

### 38.报数

[题目地址](https://leetcode-cn.com/problems/count-and-say/)

#### 题目描述

报数序列是一个整数序列，按照其中的整数的顺序进行报数，得到下一个数。其前五项如下：

```javascript
1.     1
2.     11
3.     21
4.     1211
5.     111221
```

`1` 被读作 `"one 1"` (`"一个一"`),即 `11`。

`11` 被读作 `"two 1s"` (`"两个一"`),即 `21`。

`21` 被读作 `"one 2"`, `"one 1"` （`"一个二"` , `"一个一"`) , 即 `1211`。

给定一个正整数 n（1 ≤ n ≤ 30），输出报数序列的第 n 项。

注意：整数顺序将表示为一个字符串。

示例:

```javascript
输入: 1
输出: "1"

输入: 4
输出: "1211"
```

#### 题目分析设想

这道题目有点绕，其实我们只看右侧项就可以，每次都是读上一次项。报数的规则实际上就是相同连续数字合并后进行每位的报数。最简单的想法是直接使用正则替换就可以了。当然也可以从递归和遍历的方式来作答，我们分别来看看。

- 正则法，替换相同连续数字为 `长度 + 数字本身`
- 递归法，不断转换成 `n-1` 求解
- 遍历法，不断转换成 `n+1` 求解

#### 编写代码验证

**Ⅰ.正则法**

代码：

```javascript
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    let str = '1'
    for(let i = 1; i < n; i++) {
        // 匹配项长度+第一位即为读数
        str = str.replace(/(\d)\1*/g, (match) => (`${match.length}${match.charAt(0)}`))
    }
    return str
};
```

结果：

- 18/18 cases passed (56 ms)
- Your runtime beats 98.81 % of javascript submissions
- Your memory usage beats 32.53 % of javascript submissions (35.6 MB)
- 时间复杂度 `O(n)`

**Ⅱ.递归法**

代码：

```javascript
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    if (n === 1) return '1'
    debugger
    let str = countAndSay(n - 1)
    let item = str.charAt(0)

    let count = 0 // 计数器
    let res = ''
    for(let i = 0; i < str.length; i++) {
        if(str.charAt(i) === item) {
            count++
        } else {
            res += `${count}${item}`
            item = str.charAt(i)
            count = 1
        }

        if (i === str.length - 1) { // 最后一位，需要取数
            res += `${count}${item}`
        }
    }
    return res
};
```

结果：

- 18/18 cases passed (64 ms)
- Your runtime beats 92.23 % of javascript submissions
- Your memory usage beats 28.23 % of javascript submissions (35.7 MB)
- 时间复杂度 `O(n^2)`

**Ⅲ.遍历法**

代码：

```javascript
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    let str = '1'
    for(let i = 1; i < n; i++) {
        str = countEach(str)
    }
    function countEach(str) {
        let count = 0
        let res = ''
        for(let i = 0; i < str.length; i++) {
            if(i === 0 || str.charAt(i) === str.charAt(i - 1)) {
                count++
            } else {
                res += `${count}${str.charAt(i - 1)}`
                count = 1
            }
            if (i === str.length - 1) {
                res += `${count}${str.charAt(i)}`
            }
        }

        return res
    }

    return str
};
```

结果：

- 18/18 cases passed (60 ms)
- Your runtime beats 96.98 % of javascript submissions
- Your memory usage beats 41.69 % of javascript submissions (35.5 MB)
- 时间复杂度 `O(n^2)`

#### 查阅他人解法

这里看到一个开怀一笑的解法，直接字典法，缺点很明显，但是当前情况下确实是最快的。

**Ⅰ.正则法**

代码：

```javascript
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    const map = {
        1:"1",
		2:"11",
		3:"21",
		4:"1211",
		5:"111221",
		6:"312211",
		7:"13112221",
		8:"1113213211",
		9:"31131211131221",
		10:"13211311123113112211",
		11:"11131221133112132113212221",
		12:"3113112221232112111312211312113211",
		13:"1321132132111213122112311311222113111221131221",
		14:"11131221131211131231121113112221121321132132211331222113112211",
		15:"311311222113111231131112132112311321322112111312211312111322212311322113212221",
		16:"132113213221133112132113311211131221121321131211132221123113112221131112311332111213211322211312113211",
		17:"11131221131211132221232112111312212321123113112221121113122113111231133221121321132132211331121321231231121113122113322113111221131221",
		18:"31131122211311123113321112131221123113112211121312211213211321322112311311222113311213212322211211131221131211132221232112111312111213111213211231131122212322211331222113112211",
		19:"1321132132211331121321231231121113112221121321132122311211131122211211131221131211132221121321132132212321121113121112133221123113112221131112311332111213122112311311123112111331121113122112132113213211121332212311322113212221",
		20:"11131221131211132221232112111312111213111213211231132132211211131221131211221321123113213221123113112221131112311332211211131221131211132211121312211231131112311211232221121321132132211331121321231231121113112221121321133112132112312321123113112221121113122113121113123112112322111213211322211312113211",
		21:"311311222113111231133211121312211231131112311211133112111312211213211312111322211231131122211311122122111312211213211312111322211213211321322113311213212322211231131122211311123113223112111311222112132113311213211221121332211211131221131211132221232112111312111213111213211231132132211211131221232112111312211213111213122112132113213221123113112221131112311311121321122112132231121113122113322113111221131221",
		22:"132113213221133112132123123112111311222112132113311213211231232112311311222112111312211311123113322112132113213221133122112231131122211211131221131112311332211211131221131211132221232112111312111213322112132113213221133112132113221321123113213221121113122123211211131221222112112322211231131122211311123113321112131221123113111231121113311211131221121321131211132221123113112211121312211231131122211211133112111311222112111312211312111322211213211321322113311213211331121113122122211211132213211231131122212322211331222113112211",
		23:"111312211312111322212321121113121112131112132112311321322112111312212321121113122112131112131221121321132132211231131122211331121321232221121113122113121113222123112221221321132132211231131122211331121321232221123113112221131112311332111213122112311311123112112322211211131221131211132221232112111312211322111312211213211312111322211231131122111213122112311311221132211221121332211213211321322113311213212312311211131122211213211331121321123123211231131122211211131221131112311332211213211321223112111311222112132113213221123123211231132132211231131122211311123113322112111312211312111322212321121113122123211231131122113221123113221113122112132113213211121332212311322113212221",
		24:"3113112221131112311332111213122112311311123112111331121113122112132113121113222112311311221112131221123113112221121113311211131122211211131221131211132221121321132132212321121113121112133221123113112221131112311332111213213211221113122113121113222112132113213221232112111312111213322112132113213221133112132123123112111311222112132113311213211221121332211231131122211311123113321112131221123113112221132231131122211211131221131112311332211213211321223112111311222112132113212221132221222112112322211211131221131211132221232112111312111213111213211231132132211211131221232112111312211213111213122112132113213221123113112221133112132123222112111312211312112213211231132132211211131221131211132221121311121312211213211312111322211213211321322113311213212322211231131122211311123113321112131221123113112211121312211213211321222113222112132113223113112221121113122113121113123112112322111213211322211312113211",
		25:"132113213221133112132123123112111311222112132113311213211231232112311311222112111312211311123113322112132113212231121113112221121321132132211231232112311321322112311311222113111231133221121113122113121113221112131221123113111231121123222112132113213221133112132123123112111312111312212231131122211311123113322112111312211312111322111213122112311311123112112322211211131221131211132221232112111312111213111213211231132132211211131221232112111312212221121123222112132113213221133112132123123112111311222112132113213221132213211321322112311311222113311213212322211211131221131211221321123113213221121113122113121132211332113221122112133221123113112221131112311332111213122112311311123112111331121113122112132113121113222112311311221112131221123113112221121113311211131122211211131221131211132221121321132132212321121113121112133221123113112221131112212211131221121321131211132221123113112221131112311332211211133112111311222112111312211311123113322112111312211312111322212321121113121112133221121321132132211331121321231231121113112221121321132122311211131122211211131221131211322113322112111312211322132113213221123113112221131112311311121321122112132231121113122113322113111221131221",
		26:"1113122113121113222123211211131211121311121321123113213221121113122123211211131221121311121312211213211321322112311311222113311213212322211211131221131211221321123113213221121113122113121113222112131112131221121321131211132221121321132132211331121321232221123113112221131112311322311211131122211213211331121321122112133221121113122113121113222123211211131211121311121321123113111231131122112213211321322113311213212322211231131122211311123113223112111311222112132113311213211221121332211231131122211311123113321112131221123113111231121113311211131221121321131211132221123113112211121312211231131122113221122112133221121113122113121113222123211211131211121311121321123113213221121113122113121113222113221113122113121113222112132113213221232112111312111213322112311311222113111221221113122112132113121113222112311311222113111221132221231221132221222112112322211213211321322113311213212312311211131122211213211331121321123123211231131122211211131221131112311332211213211321223112111311222112132113213221123123211231132132211231131122211311123113322112111312211312111322111213122112311311123112112322211213211321322113312211223113112221121113122113111231133221121321132132211331121321232221123123211231132132211231131122211331121321232221123113112221131112311332111213122112311311123112112322211211131221131211132221232112111312111213111213211231132132211211131221131211221321123113213221123113112221131112211322212322211231131122211322111312211312111322211213211321322113311213211331121113122122211211132213211231131122212322211331222113112211",
		27:"31131122211311123113321112131221123113111231121113311211131221121321131211132221123113112211121312211231131122211211133112111311222112111312211312111322211213211321322123211211131211121332211231131122211311122122111312211213211312111322211231131122211311123113322112111331121113112221121113122113111231133221121113122113121113222123211211131211121332211213211321322113311213211322132112311321322112111312212321121113122122211211232221123113112221131112311332111213122112311311123112111331121113122112132113311213211321222122111312211312111322212321121113121112133221121321132132211331121321132213211231132132211211131221232112111312212221121123222112132113213221133112132123123112111311222112132113311213211231232112311311222112111312211311123113322112132113212231121113112221121321132122211322212221121123222112311311222113111231133211121312211231131112311211133112111312211213211312111322211231131122211311123113322113223113112221131112311332211211131221131211132211121312211231131112311211232221121321132132211331221122311311222112111312211311123113322112132113213221133122211332111213112221133211322112211213322112111312211312111322212321121113121112131112132112311321322112111312212321121113122112131112131221121321132132211231131122211331121321232221121113122113121122132112311321322112111312211312111322211213111213122112132113121113222112132113213221133112132123222112311311222113111231132231121113112221121321133112132112211213322112111312211312111322212311222122132113213221123113112221133112132123222112111312211312111322212321121113121112133221121311121312211213211312111322211213211321322123211211131211121332211213211321322113311213212312311211131122211213211331121321122112133221123113112221131112311332111213122112311311123112111331121113122112132113121113222112311311222113111221221113122112132113121113222112132113213221133122211332111213322112132113213221132231131122211311123113322112111312211312111322212321121113122123211231131122113221123113221113122112132113213211121332212311322113212221",
		28:"13211321322113311213212312311211131122211213211331121321123123211231131122211211131221131112311332211213211321223112111311222112132113213221123123211231132132211231131122211311123113322112111312211312111322111213122112311311123112112322211213211321322113312211223113112221121113122113111231133221121321132132211331121321232221123123211231132132211231131122211331121321232221123113112221131112311332111213122112311311123112112322211211131221131211132221232112111312211322111312211213211312111322211231131122111213122112311311221132211221121332211213211321322113311213212312311211131122211213211331121321123123211231131122211211131221232112111312211312113211223113112221131112311332111213122112311311123112112322211211131221131211132221232112111312211322111312211213211312111322211231131122111213122112311311221132211221121332211211131221131211132221232112111312111213111213211231132132211211131221232112111312211213111213122112132113213221123113112221133112132123222112111312211312112213211231132132211211131221131211322113321132211221121332211213211321322113311213212312311211131122211213211331121321123123211231131122211211131221131112311332211213211321322113311213212322211322132113213221133112132123222112311311222113111231132231121113112221121321133112132112211213322112111312211312111322212311222122132113213221123113112221133112132123222112111312211312111322212311322123123112111321322123122113222122211211232221123113112221131112311332111213122112311311123112111331121113122112132113121113222112311311221112131221123113112221121113311211131122211211131221131211132221121321132132212321121113121112133221123113112221131112212211131221121321131211132221123113112221131112311332211211133112111311222112111312211311123113322112111312211312111322212321121113121112133221121321132132211331121321132213211231132132211211131221232112111312212221121123222112311311222113111231133211121321321122111312211312111322211213211321322123211211131211121332211231131122211311123113321112131221123113111231121123222112111331121113112221121113122113111231133221121113122113121113221112131221123113111231121123222112111312211312111322212321121113121112131112132112311321322112111312212321121113122122211211232221121321132132211331121321231231121113112221121321133112132112312321123113112221121113122113111231133221121321132132211331221122311311222112111312211311123113322112111312211312111322212311322123123112112322211211131221131211132221132213211321322113311213212322211231131122211311123113321112131221123113112211121312211213211321222113222112132113223113112221121113122113121113123112112322111213211322211312113211",
		29:"11131221131211132221232112111312111213111213211231132132211211131221232112111312211213111213122112132113213221123113112221133112132123222112111312211312112213211231132132211211131221131211132221121311121312211213211312111322211213211321322113311213212322211231131122211311123113223112111311222112132113311213211221121332211211131221131211132221231122212213211321322112311311222113311213212322211211131221131211132221232112111312111213322112131112131221121321131211132221121321132132212321121113121112133221121321132132211331121321231231121113112221121321133112132112211213322112311311222113111231133211121312211231131122211322311311222112111312211311123113322112132113212231121113112221121321132122211322212221121123222112111312211312111322212321121113121112131112132112311321322112111312212321121113122112131112131221121321132132211231131122111213122112311311222113111221131221221321132132211331121321231231121113112221121321133112132112211213322112311311222113111231133211121312211231131122211322311311222112111312211311123113322112132113212231121113112221121321132122211322212221121123222112311311222113111231133211121312211231131112311211133112111312211213211312111322211231131122111213122112311311222112111331121113112221121113122113121113222112132113213221232112111312111213322112311311222113111221221113122112132113121113222112311311222113111221132221231221132221222112112322211211131221131211132221232112111312111213111213211231132132211211131221232112111312211213111213122112132113213221123113112221133112132123222112111312211312111322212321121113121112133221132211131221131211132221232112111312111213322112132113213221133112132113221321123113213221121113122123211211131221222112112322211231131122211311123113321112132132112211131221131211132221121321132132212321121113121112133221123113112221131112311332111213211322111213111213211231131211132211121311222113321132211221121332211213211321322113311213212312311211131122211213211331121321123123211231131122211211131221131112311332211213211321223112111311222112132113213221123123211231132132211231131122211311123113322112111312211312111322111213122112311311123112112322211213211321322113312211223113112221121113122113111231133221121321132132211331121321232221123123211231132132211231131122211331121321232221123113112221131112311332111213122112311311123112112322211211131221131211132221232112111312211322111312211213211312111322211231131122111213122112311311221132211221121332211213211321322113311213212312311211131211131221223113112221131112311332211211131221131211132211121312211231131112311211232221121321132132211331121321231231121113112221121321133112132112211213322112312321123113213221123113112221133112132123222112311311222113111231132231121113112221121321133112132112211213322112311311222113111231133211121312211231131112311211133112111312211213211312111322211231131122111213122112311311221132211221121332211211131221131211132221232112111312111213111213211231132132211211131221232112111312211213111213122112132113213221123113112221133112132123222112111312211312111322212311222122132113213221123113112221133112132123222112311311222113111231133211121321132211121311121321122112133221123113112221131112311332211322111312211312111322212321121113121112133221121321132132211331121321231231121113112221121321132122311211131122211211131221131211322113322112111312211322132113213221123113112221131112311311121321122112132231121113122113322113111221131221",
		30:"3113112221131112311332111213122112311311123112111331121113122112132113121113222112311311221112131221123113112221121113311211131122211211131221131211132221121321132132212321121113121112133221123113112221131112212211131221121321131211132221123113112221131112311332211211133112111311222112111312211311123113322112111312211312111322212321121113121112133221121321132132211331121321132213211231132132211211131221232112111312212221121123222112311311222113111231133211121321321122111312211312111322211213211321322123211211131211121332211231131122211311123113321112131221123113111231121123222112111331121113112221121113122113111231133221121113122113121113221112131221123113111231121123222112111312211312111322212321121113121112131112132112311321322112111312212321121113122122211211232221121321132132211331121321231231121113112221121321132132211322132113213221123113112221133112132123222112111312211312112213211231132132211211131221131211322113321132211221121332211231131122211311123113321112131221123113111231121113311211131221121321131211132221123113112211121312211231131122211211133112111311222112111312211312111322211213211321223112111311222112132113213221133122211311221122111312211312111322212321121113121112131112132112311321322112111312212321121113122122211211232221121321132132211331121321231231121113112221121321132132211322132113213221123113112221133112132123222112111312211312112213211231132132211211131221131211322113321132211221121332211213211321322113311213212312311211131122211213211331121321123123211231131122211211131221131112311332211213211321223112111311222112132113213221123123211231132132211231131122211311123113322112111312211312111322111213122112311311123112112322211213211321322113312211223113112221121113122113111231133221121321132132211331222113321112131122211332113221122112133221123113112221131112311332111213122112311311123112111331121113122112132113121113222112311311221112131221123113112221121113311211131122211211131221131211132221121321132132212321121113121112133221123113112221131112311332111213122112311311123112112322211322311311222113111231133211121312211231131112311211232221121113122113121113222123211211131221132211131221121321131211132221123113112211121312211231131122113221122112133221121321132132211331121321231231121113121113122122311311222113111231133221121113122113121113221112131221123113111231121123222112132113213221133112132123123112111312211322311211133112111312211213211311123113223112111321322123122113222122211211232221121113122113121113222123211211131211121311121321123113213221121113122123211211131221121311121312211213211321322112311311222113311213212322211211131221131211221321123113213221121113122113121113222112131112131221121321131211132221121321132132211331121321232221123113112221131112311322311211131122211213211331121321122112133221121113122113121113222123112221221321132132211231131122211331121321232221121113122113121113222123211211131211121332211213111213122112132113121113222112132113213221232112111312111213322112132113213221133112132123123112111311222112132113311213211221121332211231131122211311123113321112131221123113112221132231131122211211131221131112311332211213211321223112111311222112132113212221132221222112112322211211131221131211132221232112111312111213111213211231131112311311221122132113213221133112132123222112311311222113111231132231121113112221121321133112132112211213322112111312211312111322212321121113121112131112132112311321322112111312212321121113122122211211232221121311121312211213211312111322211213211321322123211211131211121332211213211321322113311213211322132112311321322112111312212321121113122122211211232221121321132132211331121321231231121113112221121321133112132112312321123113112221121113122113111231133221121321132122311211131122211213211321222113222122211211232221123113112221131112311332111213122112311311123112111331121113122112132113121113222112311311221112131221123113112221121113311211131122211211131221131211132221121321132132212321121113121112133221123113112221131112311332111213213211221113122113121113222112132113213221232112111312111213322112132113213221133112132123123112111312211322311211133112111312212221121123222112132113213221133112132123222113223113112221131112311332111213122112311311123112112322211211131221131211132221232112111312111213111213211231132132211211131221131211221321123113213221123113112221131112211322212322211231131122211322111312211312111322211213211321322113311213211331121113122122211211132213211231131122212322211331222113112211"
    }

    return map[n]
};
```

结果：

- 18/18 cases passed (56 ms)
- Your runtime beats 98.81 % of javascript submissions
- Your memory usage beats 98.5 % of javascript submissions (33.5 MB)
- 时间复杂度 `O(1)`

#### 思考总结

总体而言，这道题用正则去解答十分简单，考验的点在正则的匹配这块；当然递归或者遍历也是常规思路；字典法纯属一乐。推荐使用正则来解答此题。

### 53.最大子序和

[题目地址](https://leetcode-cn.com/problems/maximum-subarray/)

#### 题目描述

给定一个整数数组 `nums` ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

示例:

```javascript
输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
```

进阶:

如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。

#### 题目分析设想

这道题首先基本解法肯定是暴力的遍历求解，直接遍历找出最大区间。当然这里我们也可以使用动态规划来思考问题，列出动态和转移方程式，等于求解 `Max(d[0, i])`。另外进阶里面提示分治法，分治法在之前有用过，我们也可以做为一个方向。所以大概有三种：

- 遍历求解，直接遍历算出各区间值
- 动态规划问题，求解动态问题，找到每个动态区间的最大值
- 分治，不断二分找区间内的最大子序和

注意一下，只要是寻找最大值最小值的，初始值需要定义为理论上的最大最小值。

#### 编写代码验证

**Ⅰ.遍历求解**

代码：

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let res = Number.MIN_SAFE_INTEGER
    for(let i = 0; i < nums.length; i++) {
        let sum = 0
        // 分别算出 i 开始的最大子序和
        for(let j = i; j < nums.length; j++) {
            sum += nums[j];
            res = Math.max(res, sum)
        }
    }
    return res
};
```

结果：

- 202/202 cases passed (272 ms)
- Your runtime beats 7.61 % of javascript submissions
- Your memory usage beats 41.88 % of javascript submissions (35.1 MB)
- 时间复杂度 `O(n^2)`

**Ⅱ.动态规划**

代码：

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let res = dp = nums[0] // 初始值
    for(let i = 1; i < nums.length; i++) {
        dp = Math.max(dp + nums[i], nums[i]) // 动态取得最大值
        res = Math.max(res, dp)
    }
    return res
};
```

结果：

- 202/202 cases passed (68 ms)
- Your runtime beats 90.14 % of javascript submissions
- Your memory usage beats 45 % of javascript submissions (35.1 MB)
- 时间复杂度 `O(n)`

**Ⅲ.分治**

代码：

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    // 不断分治
    function countByDichotomy (start, end) {
        // 存储左侧结果，右侧结果，两者更大值，以及两者相加的值
        // 解释一下：最大子序列在左右两区间内要么过界要么不过界。
        // 如果不过界，则最大值为 Max(left, right)
        // 如果过界，则最大为左区间到中间的最大值加中间到右区间的最大值
        if (end === start) { // 数组就一项
            return {
                lmax: nums[start], // 左半区间包含其右端点的最大子序和
                rmax: nums[start], // 右半区间包含其左端点的最大子序和
                sum: nums[start], // 总和
                result: nums[start] // 区域内部的最大子序和
            }
        } else {
            const mid = (start + end) >>> 1 // 这个取中位数写法之前解释过，避免溢出
            const left = countByDichotomy(start, mid) // 左区间中计算结果
            const right = countByDichotomy(mid + 1, end) // 右区间中计算结果
            return {
                lmax: Math.max(left.lmax, left.sum + right.lmax),
                rmax: Math.max(right.rmax, left.rmax + right.sum),
                sum: left.sum + right.sum,
                result: Math.max(left.rmax + right.lmax, Math.max(left.result, right.result))
            }
        }
    }
    return countByDichotomy(0, nums.length - 1).result;
};
```

结果：

- 202/202 cases passed (60 ms)
- Your runtime beats 97.89 % of javascript submissions
- Your memory usage beats 5.01 % of javascript submissions (36.7 MB)
- 时间复杂度 `O(n)`

#### 查阅他人解法

查阅题解的过程中发现了以下几种有意思的思路：

- 动态规划，使用增益的思路。其实上面我们写的动态规划是一样的
- 贪心法，尝试多加一位，取较大值
- 分治中使用贪心法求区间

**Ⅰ.动态规划**

代码：

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let res = nums[0]
    let sum = nums[0] // 增益
    for(let i = 1; i < nums.length; i++) {
        if (sum > 0) { // 正向增益， sum 保留并加上当前遍历数字
            sum += nums[i]
        } else { // sum 更新为当前遍历数字
            sum = nums[i]
        }
        res = Math.max(res, sum)
    }
    return res
};
```

结果：

- 202/202 cases passed (60 ms)
- Your runtime beats 97.89 % of javascript submissions
- Your memory usage beats 47.5 % of javascript submissions (35.1 MB)
- 时间复杂度 `O(n)`

**Ⅱ.贪心法**

代码：

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let res = Number.MIN_SAFE_INTEGER // 初始值
    let sum = 0
    for(let i = 0; i < nums.length; i++) {
        sum += nums[i]
        res = Math.max(res, sum)
        if (sum < 0) { // 重新开始找子序串
            sum = 0;
        }
    }
    return res
};
```

结果：

- 202/202 cases passed (68 ms)
- Your runtime beats 90.14 % of javascript submissions
- Your memory usage beats 45 % of javascript submissions (35.1 MB)
- 时间复杂度 `O(n)`

**Ⅲ.分治中使用贪心法求区间**

代码：

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    // 获取跨边界的和
    function getMaxCross (start, mid, end) {
        let leftRes = Number.MIN_SAFE_INTEGER
        let leftSum = 0
        for(let i = mid; i >= start; i--) {
            leftSum += nums[i]
            leftRes = Math.max(leftRes, leftSum)
        }

        let rightRes = Number.MIN_SAFE_INTEGER
        let rightSum = 0
        for(let i = mid + 1; i <= end; i++) {
            rightSum += nums[i]
            rightRes = Math.max(rightRes, rightSum)
        }

        return leftRes + rightRes
    }

    function countByDichotomy (start, end) {
        if (start === end) {
            return nums[start]
        } else {
            const mid = (start + end) >>> 1
            const leftSum = countByDichotomy(start, mid)
            const rightSum = countByDichotomy(mid + 1, end)
            const midSum = getMaxCross(start, mid, end)
            // 三者比较最大的就为最大子序和
            return Math.max(leftSum, rightSum, midSum)
        }
    }

    return countByDichotomy(0, nums.length - 1)
};
```

结果：

- 202/202 cases passed (72 ms)
- Your runtime beats 80.56 % of javascript submissions
- Your memory usage beats 49.38 % of javascript submissions (35.1 MB)
- 时间复杂度 `O(nlog(n))`

#### 思考总结

个人认为动态规划在这套题里面解题思路清晰，贪心法也可以理解为基于遍历基础上做的延伸，而分治法需要画图加以理解。一般看到这种最大最长的题目，基本上就可以用动态规划问题来尝试作答了。

### 58.最后一个单词的长度

[题目地址](https://leetcode-cn.com/problems/length-of-last-word/)

#### 题目描述

给定一个仅包含大小写字母和空格 `' '` 的字符串，返回其最后一个单词的长度。

如果不存在最后一个单词，请返回 `0` 。

说明：一个单词是指由字母组成，但不包含任何空格的字符串。

示例：

```javascript
输入: "Hello World"
输出: 5
```

#### 题目分析设想

这道题看上去像是一道字符串题，我们可以从以下几个方面来尝试作答：

- 遍历，从末尾开始，效率高
- lastIndexOf，直接找空格
- 正则
- split

#### 编写代码验证

**Ⅰ.遍历**

代码：

```
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    if(!s.length) return 0
    let i = s.length - 1
    while(i >= 0 && s.charAt(i) === ' ') {
        i--
    }
    if(i < 0) return 0 // 全是空格

    let j = i
    while(j >= 0 && s.charAt(j) != ' ') {
        j--
    }
    return i - j
};
```

结果：

- 59/59 cases passed (64 ms)
- Your runtime beats 81.14 % of javascript submissions
- Your memory usage beats 29.72 % of javascript submissions (33.8 MB)
- 时间复杂度 `O(n)`

**Ⅱ.lastIndexOf**

代码：

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    if(!s.length) return 0
    s = s.trim()
    const idx = s.lastIndexOf(' ')
    return idx === -1 ? s.length : s.length - 1 - idx
};
```

结果：

- 59/59 cases passed (48 ms)
- Your runtime beats 99.48 % of javascript submissions
- Your memory usage beats 36.52 % of javascript submissions (33.7 MB)
- 时间复杂度 `O(1)`

**Ⅲ.正则**

代码：

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    if(!s.length) return 0
    const match = s.match(/([a-zA-Z]+)\s*$/)
    let res = 0
    if (match) {
        res = match.pop()
        return res.length
    }
    return res
};
```

结果：

- 59/59 cases passed (80 ms)
- Your runtime beats 26.65 % of javascript submissions
- Your memory usage beats 5.95 % of javascript submissions (34.2 MB)
- 时间复杂度 `O(1)`

**Ⅳ.split**

代码：

```javascript
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function(s) {
    if(!s.length) return 0
    s = s.trim()
    const arr = s.split(' ')
    if (arr.length) {
        let str = arr.pop()
        return str.length
    } else {
        return 0
    }
};
```

结果：

- 59/59 cases passed (60 ms)
- Your runtime beats 90.57 % of javascript submissions
- Your memory usage beats 13.8 % of javascript submissions (34 MB)
- 时间复杂度 `O(1)`

#### 查阅他人解法

没有在题解中看到什么特别的解法，大部分都是基于类库解的，比如 `Javascript` 中 `String` 和 `Array` 的方法。或者是遍历实现的。

#### 思考总结

直到现在也没有弄明白这道题的考察点在哪里？不过我建议感兴趣的同学，可以自己拓展实现 `lastIndexOf` ，参考 [上一期](https://github.com/ChenJiaH/blog/issues/45) 28题的数十种解法，应该能有不小收获。

### 66.加一

[题目地址](https://leetcode-cn.com/problems/plus-one/)

#### 题目描述

给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。

最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

你可以假设除了整数 0 之外，这个整数不会以零开头。

示例：

```javascript
输入: [1,2,3]
输出: [1,2,4]
解释: 输入数组表示数字 123。

输入: [4,3,2,1]
输出: [4,3,2,2]
解释: 输入数组表示数字 4321。
```

#### 题目分析设想

这道题我有两个大方向，一是数组遍历进行求解，另外一种是数组转数字再处理。但是转数字可能会溢出，所以就只想到从遍历的角度来作答。

- 遍历，从后往前遍历找到不为9的项，后面填0就可以了

#### 编写代码验证

**Ⅰ.遍历**

代码：

```javascript
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    for(let i = digits.length - 1; i >= 0; i--) {
        // 找不到不为9的数，直接加1输出就可以了
        if(digits[i] !== 9) {
            digits[i]++
            return digits
        } else {
            digits[i] = 0
        }
    }
    digits.unshift(1)
    return digits
};
```

结果：

- 109/109 cases passed (60 ms)
- Your runtime beats 93.72 % of javascript submissions
- Your memory usage beats 26.35 % of javascript submissions (33.8 MB)
- 时间复杂度 `O(n)`

#### 查阅他人解法

发现思路基本都是遍历，但是具体实现会有些差距，这里只列举一个最简单的。

**Ⅰ.遍历**

代码：

```javascript
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    for(let i = digits.length - 1; i >= 0; i--) {
        digits[i]++
        // 取10的余数，做了赋值操作，为0就继续进位
        digits[i] %= 10
        if(digits[i] !== 0) {
            return digits
        }
    }
    digits.unshift(1)
    return digits
};
```

结果：

- 109/109 cases passed (64 ms)
- Your runtime beats 85.29 % of javascript submissions
- Your memory usage beats 94.34 % of javascript submissions (33.4 MB)
- 时间复杂度 `O(n)`

#### 思考总结

这道题可能大众的想法会转成数字再处理，但是做数字运算的时候，千万要记住考虑溢出的问题。另外因为是加1，所以倒序遍历就可以了。至于是判断末位为9还是对10取余，我觉得都是一个很好理解的思路，也避免了代码的繁琐。

### 67.二进制求和

[题目地址](https://leetcode-cn.com/problems/add-binary/)

#### 题目描述

给定两个二进制字符串，返回他们的和（用二进制表示）。

输入为非空字符串且只包含数字 `1` 和 `0`。

示例：

```javascript
输入: a = "11", b = "1"
输出: "100"

输入: a = "1010", b = "1011"
输出: "10101"
```

#### 题目分析设想

这道题又是一道加法题，所以记住下，直接转数字进行加法可能会溢出，所以不可取。所以我们需要遍历每一位来做解答。我这有两个大方向：补0后遍历，和不补0遍历。但是基本的依据都是本位相加，逢2进1即可，类似手写10进制加法。

- 补0后遍历，可以采用先算出的位数推入数组最后反转，也可以采用先算出的位数填到对应位置后直接输出
- 不补0遍历，根据短数组的长度进行遍历，长数组剩下的数字与短数组生成的进位进行计算

#### 查阅他人解法

**Ⅰ.补0后遍历，先算先推**

代码：

```javascript
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    let times = Math.max(a.length, b.length) // 需要遍历次数
    // 补 0
    while(a.length < times) {
        a = '0' + a
    }
    while(b.length < times) {
        b = '0' + b
    }
    let res = []
    let carry = 0 // 是否进位
    for(let i = times - 1; i >= 0; i--) {
        const num = carry + (a.charAt(i) | 0) + (b.charAt(i) | 0)
        carry = num >= 2 ? 1 : 0
        res.push(num % 2)
    }
    if (carry === 1) {
        res.push(1)
    }
    return res.reverse().join('')
};
```

结果：

- 294/294 cases passed (68 ms)
- Your runtime beats 95.13 % of javascript submissions
- Your memory usage beats 72.58 % of javascript submissions (35.4 MB)
- 时间复杂度 `O(n)`

**Ⅱ.补0后遍历，按位运算**

代码：

```javascript
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    let times = Math.max(a.length, b.length) // 需要遍历次数
    // 补 0
    while(a.length < times) {
        a = '0' + a
    }
    while(b.length < times) {
        b = '0' + b
    }
    let res = []
    let carry = 0 // 是否进位
    for(let i = times - 1; i >= 0; i--) {
        res[i] = carry + (a.charAt(i) | 0) + (b.charAt(i) | 0)
        carry = res[i] >= 2 ? 1 : 0
        res[i] %= 2
    }
    if (carry === 1) {
        res.unshift(1)
    }
    return res.join('')
};
```

结果：

- 294/294 cases passed (60 ms)
- Your runtime beats 99.65 % of javascript submissions
- Your memory usage beats 65.82 % of javascript submissions (35.5 MB)
- 时间复杂度 `O(n)`

**Ⅲ.不补0遍历**

> 当然处理方式还是可以选择上面两种，我这就采用先算先推来处理了。

代码：

```javascript
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    let max = Math.max(a.length, b.length) // 最大长度
    let min = Math.min(a.length, b.length) // 最大公共长度

    // 将长字符串拆成两部分
    let left = a.length > b.length ? a.substr(0, a.length - b.length) : b.substr(0, b.length - a.length)
    let right = a.length > b.length ? a.substr(a.length - b.length) : b.substr(b.length - a.length)

    // 公共长度部分遍历
    let rightRes = []
    let carry = 0
    for(let i = min - 1; i >= 0; i--) {
        const num = carry + (right.charAt(i) | 0) + (((a.length > b.length ? b : a)).charAt(i) | 0)
        carry = num >= 2 ? 1 : 0
        rightRes.push(num % 2)
    }

    let leftRes = []
    for(let j = max - min - 1; j >= 0; j--) {
        const num = carry + (left.charAt(j) | 0)
        carry = num >= 2 ? 1 : 0
        leftRes.push(num % 2)
    }

    if (carry === 1) {
        leftRes.push(1)
    }
    return leftRes.reverse().join('') + rightRes.reverse().join('')
};
```

结果:

- 294/294 cases passed (76 ms)
- Your runtime beats 80.74 % of javascript submissions
- Your memory usage beats 24.48 % of javascript submissions (36.2 MB)
- 时间复杂度 `O(n)`

#### 查阅他人解法

看到一些细节上的区别，我这使用 `'1' | 0` 来转数字，有的使用 `''1' - '0''`。另外还有就是初始化结果数组长度为最大长度加1后，最后判断首位是否为0需要剔除的，我这使用的是判断最后是否还要进位补1。

这里还看到用一个提案中的 `BigInt` 类型来解决的

**Ⅰ.BigInt**

代码：

```javascript
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {
    return (BigInt("0b"+a) + BigInt("0b"+b)).toString(2);
};
```

结果：

- 294/294 cases passed (52 ms)
- Your runtime beats 100 % of javascript submissions
- Your memory usage beats 97.05 % of javascript submissions (34.1 MB)
- 时间复杂度 `O(1)`

#### 思考总结

通过 `BigInt` 的方案我们能看到，使用原生方法确实性能更优。简单说一下这个类型，目前还在提案阶段，看下面的等式基本就能知道实现原理自己写对应 `Hack` 来实现了：

```javascript
BigInt(10) = '10n'
BigInt(20) = '20n'
BigInt(10) + BigInt(20) = '30n'
```

虽然这种方式很友好，但是还是希望看到加法题的时候，能考虑到遍历按位处理。

### 69.x的平方根

[题目地址](https://leetcode-cn.com/problems/sqrtx/)

#### 题目描述

实现 `int sqrt(int x)` 函数。

计算并返回 x 的平方根，其中 x 是非负整数。

由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

示例：

```javascript
输入: 4
输出: 2

输入: 8
输出: 2
说明: 8 的平方根是 2.82842...,
     由于返回类型是整数，小数部分将被舍去。
```

#### 题目分析设想

同样，这里类库提供的方法 `Math.sqrt(x)` 就不说了，这也不是本题想考察的意义。所以这里有几种方式：

- 暴力法，这里不用考虑溢出是因为x没溢出，所以即使加到平方根加1，也会终止循环
- 二分法，直接取中位数运算，可以快速排除当前区域一半的区间

#### 编写代码验证

**Ⅰ.暴力法**

代码：

```javascript
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    if (x === 0) return 0
    let i = 1
    while(i * i < x) {
        i++
    }
    return i * i === x ? i : i - 1
};
```

结果：

- 1017/1017 cases passed (120 ms)
- Your runtime beats 23 % of javascript submissions
- Your memory usage beats 34.23 % of javascript submissions (35.7 MB)
- 时间复杂度 `O(n)`

**Ⅱ.二分法**

代码：

```javascript
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    if (x === 0) return 0
    let l = 1
    let r = x >>> 1
    while(l < r) {
        // 这里要用大于判断，所以取右中位数
        const mid = (l + r + 1) >>> 1

        if (mid * mid > x) {
            r = mid - 1
        } else {
            l = mid
        }
    }
    return l
};
```

结果：

- 1017/1017 cases passed (76 ms)
- Your runtime beats 96.08 % of javascript submissions
- Your memory usage beats 59.17 % of javascript submissions (35.5 MB)
- 时间复杂度 `O(log2(n))`

#### 查阅他人解法

这里看见了两个有意思的解法：

- 2的幂次底层优化
- 牛顿法

**Ⅰ.幂次优化**

稍微解释一下，二分法需要做乘法运算，他这里改用加减法

```javascript
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    let l = 0
    let r = 1 << 16 // 2的16次方，这里我猜是因为上限2^32所以取一半
    while (l < r - 1) {
        const mid = (l + r) >>> 1
        if (mid * mid <= x) {
            l = mid
        } else {
            r = mid
        }
    }
    return l
};
```

结果：

1017/1017 cases passed (72 ms)
Your runtime beats 98.46 % of javascript submissions
Your memory usage beats 70.66 % of javascript submissions (35.4 MB)
- 时间复杂度 `O(log2(n))`

**Ⅱ.牛顿法**

算法说明：

在迭代过程中，以直线代替曲线，用一阶泰勒展式（即在当前点的切线）代替原曲线，求直线与 xx 轴的交点，重复这个过程直到收敛。

首先随便猜一个近似值 `x`，然后不断令 `x` 等于 `x` 和 `a/x` 的平均数，迭代个六七次后 `x` 的值就已经相当精确了。

公式可以写为 `X[n+1]=(X[n]+a/X[n])/2`

代码：

```javascript
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    if (x === 0 || x === 1) return x

    let a = x >>> 1
    while(true) {
        let cur = a
        a = (a + x / a) / 2
        // 这里是为了消除浮点运算的误差，1e-5是我试出来的
        if (Math.abs(a - cur) < 1e-5) {
            return parseInt(cur)
        }
    }
};
```

结果：

- 1017/1017 cases passed (68 ms)
- Your runtime beats 99.23 % of javascript submissions
- Your memory usage beats 9.05 % of javascript submissions (36.1 MB)
- 时间复杂度 `O(log2(n))`

#### 思考总结

这里就提一下新接触的牛顿法吧，实际上是牛顿迭代法，主要是迭代操作。由于在单根附近具有平方收敛，所以可以转换成线性问题去求平方根的近似值。主要应用场景有这两个方向：

- 求方程的根
- 求解最优化问题

### 70.爬楼梯

[题目地址](https://leetcode-cn.com/problems/climbing-stairs/)

#### 题目描述

假设你正在爬楼梯。需要 `n` 阶你才能到达楼顶。

每次你可以爬 `1` 或 `2` 个台阶。你有多少种不同的方法可以爬到楼顶呢？

注意：给定 `n` 是一个正整数。

示例：

```javascript
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶

输入： 3
输出： 3
解释： 有三种方法可以爬到楼顶。
1.  1 阶 + 1 阶 + 1 阶
2.  1 阶 + 2 阶
3.  2 阶 + 1 阶
```

#### 题目分析设想

这道题很明显可以用动态规划和斐波那契数列来求解。然后我们来看看其他正常思路，如果使用暴力法的话，那么复杂度将会是 `2^n`，很容易溢出，但是如果能够优化成 `n` 的话，其实还可以求解的。所以这道题我就从以下三个方向来作答：

- 哈希递归，也就是暴力运算的改进版，通过存下算过的值降低复杂度
- 动态规划
- 斐波那契数列

#### 编写代码验证

**Ⅰ.哈希递归**

代码：

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    let hash = {}
    return count(0)
    function count (i) {
        if (i > n) return 0
        if (i === n) return 1

        // 这步节省运算
        if(hash[i] > 0) {
            return hash[i]
        }

        hash[i] = count(i + 1) + count(i + 2)
        return hash[i]
    }
};
```

结果：

- 45/45 cases passed (52 ms)
- Your runtime beats 98.67 % of javascript submissions
- Your memory usage beats 48.29 % of javascript submissions (33.7 MB)
- 时间复杂度 `O(n)`

**Ⅱ.动态规划**

代码：

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if (n === 1) return 1
    if (n === 2) return 2
    // dp[0] 多一位空间，省的后面做减法
    let dp = new Array(n + 1).fill(0)
    dp[1] = 1
    dp[2] = 2
    for(let i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
};
```

结果：

- 45/45 cases passed (48 ms)
- Your runtime beats 99.48 % of javascript submissions
- Your memory usage beats 21.49 % of javascript submissions (33.8 MB)
- 时间复杂度 `O(n)`

**Ⅲ.斐波那契数列**

其实斐波那契数列就可以用动态规划来实现，所以下面的代码思路很相似。

代码：

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if (n === 1) return 1
    if (n === 2) return 2
    let num1 = 1
    let num2 = 2
    for(let i = 3; i <= n; i++) {
        let count = num1 + num2
        num1 = num2
        num2 = count
    }
    // 相当于fib(n)
    return num2
};
```

结果：

- 45/45 cases passed (56 ms)
- Your runtime beats 95.49 % of javascript submissions
- Your memory usage beats 46.1 % of javascript submissions (33.7 MB)
- 时间复杂度 `O(n)`

#### 查阅他人解法

查看题解发现这么几种解法：

- 斐波那契公式（原来有计算公式可以直接用，尴尬）
- Binets 方法
- 排列组合

**Ⅰ.斐波那契公式**

代码：

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    const sqrt_5 = Math.sqrt(5)
    // 由于 F0 = 1，所以相当于需要求 n+1 的值
    const fib_n = Math.pow((1 + sqrt_5) / 2, n + 1) - Math.pow((1 - sqrt_5) / 2, n + 1)
    return Math.round(fib_n / sqrt_5)
};
```

结果：

- 45/45 cases passed (52 ms)
- Your runtime beats 98.67 % of javascript submissions
- Your memory usage beats 54.98 % of javascript submissions (33.6 MB)
- 时间复杂度 `O(log(n))`

**Ⅱ.Binets 方法**

算法说明：

使用矩阵乘法来得到第 n 个斐波那契数。注意需要将初始项从 `fib(2)=2,fib(1)=1` 改成 `fib(2)=1,fib(1)=0` ，来达到矩阵等式的左右相等。

[解法参考官方题解](https://leetcode-cn.com/problems/climbing-stairs/solution/pa-lou-ti-by-leetcode/)

代码：

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {

    function pow(a, n) {
        let ret = [[1,0],[0,1]] // 矩阵
        while(n > 0) {
            if ((n & 1) === 1) {
                ret = multiply(ret, a)
            }
            n >> 1
            a = multiply(a, a)
        }
        return ret;
    }
    function multiply(a, b) {
        let c = [[0,0], [0,0]]
        for (let i = 0; i < 2; i++) {
            for(let j = 0; j < 2; j++) {
                c[i][j] = a[i][0] * b[0][j] + a[i][1] * b[1][j]
            }
        }
        return c
    }

    let q = [[1,1], [1, 0]]
    let res = pow(q, n)
    return res[0][0]
};
```

结果：

测试用例可以输出，提交发现超时。

> 这个笔者还没完全理解，所以很抱歉，暂时没有 js 相应代码分析，后续会补上。也欢迎您补充给我，感谢！

**Ⅲ.排列组合**

代码：

```javascript
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    // n 个台阶走 i 次1阶和 j 次2阶走到，推导出 i + 2*j = n
    function combine(m, n) {
        if (m < n) [m, n] = [n, m];
        let count = 1;
        for (let i = m + n, j = 1; i > m; i--) {
            count *= i;
            if (j <= n) count /= j++;
        }
        return count;
    }
    let total = 0;
    // 取出所有满足条件的解
    for (let i = 0,j = n; j >= 0; j -= 2, i++) {
      total += combine(i, j);
    }
    return total;
};
```

结果：

- 45/45 cases passed (60 ms)
- Your runtime beats 87.94 % of javascript submissions
- Your memory usage beats 20.72 % of javascript submissions (33.8 MB)
- 时间复杂度 `O(n^2)`

#### 思考总结

这种叠加的问题，首先就会想到动态规划的解法，刚好这里又满足斐波那契数列，所以我是推荐首选这两种解法。另外通过查看他人解法学到了斐波那契公式，以及站在排列组合的角度去解，开拓了思路。

### 83.删除排序链表中的重复元素

[题目地址](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-list/)

#### 题目描述

给定一个排序链表，删除所有重复的元素，使得每个元素只出现一次。

示例：

```javascript
输入: 1->1->2
输出: 1->2

输入: 1->1->2->3->3
输出: 1->2->3
```

#### 题目分析设想

注意一下，给定的是一个排序链表，所以只需要依次更改指针就可以直接得出结果。当然，也可以使用双指针来跳过重复项即可。所以这里有两个方向：

- 直接运算，通过改变指针指向
- 双指针，通过跳过重复项

如果是无序链表，我会建议先得到所有值然后去重后（比如通过Set）生成新链表作答。

#### 编写代码验证

**Ⅰ.直接运算**

代码：

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    // 复制一个用做操作，由于对象是传址，所以改指针指向即可
    let cur = head
    while(cur !== null && cur.next !== null) {
        if (cur.val === cur.next.val) { // 值相等
            cur.next = cur.next.next
        } else {
            cur = cur.next
        }
    }
    return head
};
```

结果：

- 165/165 cases passed (76 ms)
- Your runtime beats 87.47 % of javascript submissions
- Your memory usage beats 81.21 % of javascript submissions (35.5 MB)
- 时间复杂度 `O(n)`

**Ⅱ.双指针法**

代码：

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    // 新建哨兵指针和当前遍历指针
    if (head === null || head.next === null) return head
    let pre = head
    let cur = head
    while(cur !== null) {
        debugger
        if (cur.val === pre.val) {
            // 当前指针移动
            cur = cur.next
        } else {
            pre.next = cur
            pre = cur
        }
    }
    // 最后一项如果重复需要把head.next指向null
    pre.next = null
    return head
};
```

结果：

- 165/165 cases passed (80 ms)
- Your runtime beats 77.31 % of javascript submissions
- Your memory usage beats 65.1 % of javascript submissions (35.7 MB)
- 时间复杂度 `O(n)`

#### 查阅他人解法

忘记了，这里确实还可以使用递归来作答。

**Ⅰ.递归法**

代码：

```javascript
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
    if(head === null || head.next === null) return head
    if (head.val === head.next.val) { // 值相等
        return deleteDuplicates(head.next)
    } else {
        head.next = deleteDuplicates(head.next)
    }
    return head
};
```

结果：

- 165/165 cases passed (80 ms)
- Your runtime beats 77.31 % of javascript submissions
- Your memory usage beats 81.21 % of javascript submissions (35.5 MB)
- 时间复杂度 `O(n)`

#### 思考总结

关于链表的题目一般都是通过修改指针指向来作答，区分单指针和双指针法。另外，遍历也是可以实现的。

### 88.合并两个有序数组

[题目地址](https://leetcode-cn.com/problems/merge-sorted-array/)

#### 题目描述

给定两个有序整数数组 `nums1` 和 `nums2`，将 `nums2` 合并到 `nums1` 中，使得 `num1` 成为一个有序数组。

说明:

- 初始化 `nums1` 和 `nums2` 的元素数量分别为 `m` 和 `n`。
- 你可以假设 `nums1` 有足够的空间（空间大小大于或等于 `m + n`）来保存 `nums2` 中的元素。

示例：

```javascript
输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出: [1,2,2,3,5,6]
```

#### 题目分析设想

之前我们做过删除排序数组中的重复项，其实这里也类似。可以从这几个方向作答：

- 数组合并后排序
- 遍历数组并进行插入
- 双指针法，轮流比较

但是由于题目有限定空间都在 `nums1` ，并且不要写 `return` ，直接在 `nums1` 上修改，所以我这里主要的思路就是遍历，通过 `splice` 来修改数组。区别就在于遍历的方式方法。

- 从前往后
- 从后往前
- 合并后排序再赋值

#### 编写代码验证

**Ⅰ.从前往后**

代码：

```javascript
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    // 两个数组对应指针
    let p1 = 0
    let p2 = 0
    // 这里需要提前把nums1的元素拷贝出来，要不然比较赋值后就丢失了
    let cpArr = nums1.splice(0, m)

    // 数组指针
    let p = 0
    while(p1 < m && p2 < n) {
        // 先赋值，再进行+1操作
        nums1[p++] = cpArr[p1] < nums2[p2] ? cpArr[p1++] : nums2[p2++]
    }
    // 已经有p个元素了，多余的元素要删除，剩余的要加上
    if (p1 < m) {
        // 剩余元素，p1 + m + n - p = m + n - (p - p1) = m + n - p2
        nums1.splice(p, m + n - p, ...cpArr.slice(p1, m + n - p2))
    }
    if (p2 < n) {
        // 剩余元素，p2 + m + n - p = m + n - (p - p2) = m + n - p1
        nums1.splice(p, m + n - p, ...nums2.slice(p2, m + n - p1))
    }
};
```

结果：

- 59/59 cases passed (48 ms)
- Your runtime beats 100 % of javascript submissions
- Your memory usage beats 64.97 % of javascript submissions (33.8 MB)
- 时间复杂度 `O(m + n)`

**Ⅱ.从后往前**

代码：

```javascript
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    // 避免 nums1 = [0,0,0,0], nums2 = [1,2] 这种 nums1.length > nums2.length 并且 m = 0
    nums1.splice(m, nums1.length - m)
    // 两个数组对应指针
    let p1 = m - 1
    let p2 = n - 1
    // 数组指针
    let p = m + n - 1
    while(p1 >= 0 && p2 >= 0) {
        // 先赋值，再进行-1操作
        nums1[p--] = nums1[p1] < nums2[p2] ? nums2[p2--] : nums1[p1--]
    }
    // 可能nums2有剩余，由于指针是下标，所以截取数量需要加1
    nums1.splice(0, p2 + 1, ...nums2.slice(0, p2 + 1))
};
```

结果：

- 59/59 cases passed (52 ms)
- Your runtime beats 99.76 % of javascript submissions
- Your memory usage beats 78.3 % of javascript submissions (33.6 MB)
- 时间复杂度 `O(m + n)`

**Ⅲ.合并后排序再赋值**

代码：

```javascript
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    arr = [].concat(nums1.splice(0, m), nums2.splice(0, n))
    arr.sort((a, b) => a - b)
    for(let i = 0; i < arr.length; i++) {
        nums1[i] = arr[i]
    }
};
```

结果：

- 59/59 cases passed (64 ms)
- Your runtime beats 90.11 % of javascript submissions
- Your memory usage beats 31.21 % of javascript submissions (34.8 MB)
- 时间复杂度 `O(m + n)`

#### 查阅他人解法

这里看到一个直接用两次 `while` ，然后直接用 `m/n` 来计算下标的，没有额外空间，但是本质上也是从后往前遍历。

**Ⅰ.两次while**

代码：

```javascript
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
    // 避免 nums1 = [0,0,0,0], nums2 = [1,2] 这种 nums1.length > nums2.length 并且 m = 0
    // nums1.splice(m, nums1.length - m)
    // 从后开始赋值
    while(m !== 0 && n !== 0) {
        nums1[m + n - 1] = nums1[m - 1] > nums2[n - 1] ? nums1[--m] : nums2[--n]
    }
    // nums2 有剩余
    while(n !== 0) {
        nums1[m + n - 1] = nums2[--n]
    }
};
```

结果：

- 59/59 cases passed (56 ms)
- Your runtime beats 99.16 % of javascript submissions
- Your memory usage beats 64.26 % of javascript submissions (33.8 MB)
- 时间复杂度 `O(m + n)`

#### 思考总结

碰到数组操作，会优先考虑双指针法，具体指针方向可以由题目逻辑来决定。

### 100.相同的树

[题目地址](https://leetcode-cn.com/problems/same-tree/)

#### 题目描述

给定两个二叉树，编写一个函数来检验它们是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

示例：

```javascript
输入:       1         1
          / \       / \
         2   3     2   3

        [1,2,3],   [1,2,3]

输出: true

输入:      1          1
          /           \
         2             2

        [1,2],     [1,null,2]

输出: false

输入:       1         1
          / \       / \
         2   1     1   2

        [1,2,1],   [1,1,2]

输出: false
```

#### 题目分析设想

题目直接说了是二叉树，而二叉树的遍历方式有两种：深度优先和广度优先，我就从这两个思路来作答。

#### 编写代码验证

**Ⅰ.深度优先**

代码：

```javascript
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if (p === null && q === null) return true
    if (p === null || q === null) return false

    if (p.val !== q.val) return false

    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
};
```

结果：

- 57/57 cases passed (52 ms)
- Your runtime beats 98.81 % of javascript submissions
- Your memory usage beats 16.66 % of javascript submissions (33.8 MB)
- 时间复杂度 `O(n)` ，`n` 为节点个数

**Ⅱ.广度优先**

代码：

```javascript
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {
    if (p === null && q === null) return true
    if (p === null || q === null) return false

    let pQ =[p] // 左侧比较队列
    let qQ =[q] // 右侧比较队列

    let res = true

    while(true) {
        if (!pQ.length || !qQ.length) {
            res = pQ.length === qQ.length
            break
        }
        // 当前比较节点
        let curP = pQ.shift()
        let curQ = qQ.shift()
        if ((curP && !curQ) || (!curP && curQ) || (curP && curQ && curP.val !== curQ.val)) {
            res = false
            break
        } else {
            let pL = curP ? curP.left : null
            let pR = curP ? curP.right : null
            if (pL || pR) { // 至少一个存在才有意义
                pQ.push(pL, pR) // 依次推入比较数组，实际上就是广度优先
            }
            let qL = curQ ? curQ.left : null
            let qR = curQ ? curQ.right : null
            if (qL || qR) { // 至少一个存在才有意义
                qQ.push(qL, qR) // 依次推入比较数组，实际上就是广度优先
            }
        }
    }

    return res
};
```

结果：

- 57/57 cases passed (64 ms)
- Your runtime beats 73.27 % of javascript submissions
- Your memory usage beats 15.53 % of javascript submissions (33.8 MB)
- 时间复杂度 `O(n)` ，`n` 为节点个数

#### 查阅他人解法

思路基本上都是这两种，未发现方向不同的解法。

#### 思考总结

一般碰到二叉树的题，要么就深度遍历，要么就广度遍历。深度优先，也叫先序遍历。

### 101.对称二叉树

[题目地址](https://leetcode-cn.com/problems/symmetric-tree/)

#### 题目描述

给定一个二叉树，检查它是否是镜像对称的。

例如，二叉树 `[1,2,2,3,4,4,3]` 是对称的。

示例：

```javascript
    1
   / \
  2   2
 / \ / \
3  4 4  3
```

但是下面这个 `[1,2,2,null,3,null,3]` 则不是镜像对称的:

```javascript
   1
   / \
  2   2
   \   \
   3    3
```

说明:

如果你可以运用递归和迭代两种方法解决这个问题，会很加分。

#### 题目分析设想

还是一道二叉树的题，所以常规思路就是遍历操作，深度优先或广度优先都可。镜像对称可以观察到很明显的特点是有相同的根节点值，且每个树的右子树与另一个树的左字数对称相等。深度优先的方式，其实就是递归的思路，符合题目的说明。

#### 编写代码验证

**Ⅰ.深度优先**

代码：

```javascript
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    function isMirror (l, r) {
        if (l === null && r === null) return true
        if (l === null || r === null) return false

        return l.val === r.val && isMirror(l.left, r.right) && isMirror(l.right, r.left)
    }
    return isMirror(root, root)
};
```

结果：

- 195/195 cases passed (68 ms)
- Your runtime beats 87.74 % of javascript submissions
- Your memory usage beats 41.48 % of javascript submissions (35.5 MB)
- 时间复杂度 `O(n)` ，`n` 为节点个数

**Ⅱ.广度优先**

代码：

```javascript
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if (root === null) return true
    // 初始队列
    let q = [root.left, root.right]
    // 依次将同级push进队列，每次取两个对称节点进行判断
    while(q.length) {
        let l = q.shift()
        let r = q.shift()
        if (l === null && r === null) continue
        if (l === null || r === null) return false
        if (l.val !== r.val) return false

        q.push(l.left, r.right, l.right, r.left)
    }
    return true
};
```

结果：

- 195/195 cases passed (64 ms)
- Your runtime beats 94.88 % of javascript submissions
- Your memory usage beats 28.3 % of javascript submissions (35.6 MB)
- 时间复杂度 `O(n)` ，`n` 为节点个数

#### 查阅他人解法

看到一个有意思的思路，将树按照左中右的顺序输入到数组，加上层数，该数组也是对称的。

**Ⅰ.左中右顺序输出数组**

代码：

```javascript
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
    if (root === null) return true
    // 输出数组
    let arr = []
    search(arr, root, 1);
    // 入参分别为输出，节点和层级
    function search(output, n, k) {
        if (n.left !== null) {
            search(output, n.left, k+1)
        }

        if (n.right !== null) {
            search(output, n.right, k + 1);
        }
    }
     //判断是否对称
     let i = 0, j = arr.length - 1
     while (i < j) {
         if (arr[i] != arr[j]) {
             return false
         }
         i++
         j--
     }
     return true
};
```

结果：

- 195/195 cases passed (72 ms)
- Your runtime beats 76.3 % of javascript submissions
- Your memory usage beats 6.11 % of javascript submissions (36.3 MB)
- 时间复杂度 `O(n)` ，`n` 为节点个数

#### 思考总结

这道题的大致解法都是遍历节点或者利用队列，只是在递归的细节上会有些差异。左中右输出数组的思路很清奇，虽然效率明显会更低下，但是不失为一种思路。

### 104.二叉树的最大深度

[题目地址](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

#### 题目描述

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：

给定二叉树 `[3,9,20,null,null,15,7]`，

```javascript
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最大深度 3 。

#### 题目分析设想

这道题最基本的思路就是计算出每条子节点的深度，再进行比较。为了提升效率，可以增加同级比对，去除不可能是最长节点的叶节点计算。

所以这里我就用以下几种思路来实现深度优先算法。

- 递归，直接获取子树最大高度加 1
- 利用队列，求深度转化为求有多少层

#### 编写代码验证

**Ⅰ.递归**

代码：

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (root === null) return 0
    // 左侧子树的最大高度
    let l = maxDepth(root.left)
    // 右侧子树的最大高度
    let r = maxDepth(root.right)
    return Math.max(l, r) + 1
};
```

结果：

- 39/39 cases passed (60 ms)
- Your runtime beats 99 % of javascript submissions
- Your memory usage beats 45.77 % of javascript submissions (37.1 MB)
- 时间复杂度 `O(n)` ，`n` 为节点个数

**Ⅱ.利用队列**

代码：

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (root === null) return 0
    // 队列
    let q = [root]
    let dep = 0
    while(q.length) {
        let size = q.length
        dep++
        while(size > 0) {
            let node = q.shift()
            if (node.left !== null) q.push(node.left)
            if (node.right !== null) q.push(node.right)
            size--
        }
    }
    return dep
};
```

结果：

- 39/39 cases passed (68 ms)
- Your runtime beats 91.33 % of javascript submissions
- Your memory usage beats 30.1 % of javascript submissions (37.2 MB)
- 时间复杂度 `O(n)` ，`n` 为节点个数

#### 查阅他人解法

这里看到一个用栈的角度来实现的，取栈高度的最大值，其他的基本都是循环的细节差异，大体思路一致。

**Ⅰ.利用栈**

代码：

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    if (root === null) return 0
    // 栈
    let s = [{
        node: root,
        dep: 1
    }]
    let dep = 0

    while(s.length) {
        // 先进后出
        var cur = s.pop()
        if (cur.node !== null) {
            let curDep = cur.dep
            dep = Math.max(dep, curDep)
            if (cur.node.left !== null) s.push({node: cur.node.left, dep: curDep + 1})
            if (cur.node.right !== null) s.push({node: cur.node.right, dep: curDep + 1})
        }
    }
    return dep
};
```

结果：

- 39/39 cases passed (72 ms)
- Your runtime beats 81.41 % of javascript submissions
- Your memory usage beats 66.6 % of javascript submissions (37 MB)
- 时间复杂度 `O(n)` ，`n` 为节点个数

#### 思考总结

二叉树的操作，一般就是深度优先和广度优先，所以基本上就朝这两个方向上去解，然后进行优化就可以了。

### 107.二叉树的层次遍历II

[题目地址](https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/)

#### 题目描述

给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）

例如：

给定二叉树 `[3,9,20,null,null,15,7]`,

```javascript
    3
   / \
  9  20
    /  \
   15   7
```

返回其自底向上的层次遍历为：

```javascript
[
  [15,7],
  [9,20],
  [3]
]
```

#### 题目分析设想

这道题在我看来还是两种方式，深度优先和广度优先。

- 深度优先，记录下每个节点对应的层数后，按层数反向输出即可
- 广度优先，记录下每层的节点后反向输出

#### 编写代码验证

**Ⅰ.深度优先**

代码：

```javascript
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
    // 当前层级标识
    let idx = 0
    let res = []

    function levelOrder(node, floor, arr) {
        if (node === null) return arr
        if(arr[floor]) {
            arr[floor].push(node.val)
        } else {
            arr[floor] = [node.val]
        }
        levelOrder(node.left, floor + 1, arr)
        levelOrder(node.right, floor + 1, arr)
        return arr
    }

    return levelOrder(root, idx, res).reverse()
};
```

结果：

- 34/34 cases passed (68 ms)
- Your runtime beats 77.01 % of javascript submissions
- Your memory usage beats 34.78 % of javascript submissions (34.7 MB)
- 时间复杂度 `O(n)` ，`n` 为节点个数

**Ⅱ.广度优先**

代码：

```javascript
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrderBottom = function(root) {
    if (root === null) return []
    // 初始队列
    let q = [root]
    let res = []

    while(q.length) {
        // 当前层节点数量
        const count = q.length
        let curArr = []
        for(let i = 0; i < count;i++) {
            const node = q.shift()
            curArr.push(node.val)
            // 将子节点依次推入队列
            if (node.left) q.push(node.left)
            if (node.right ) q.push(node.right )
        }
        res.push(curArr)
    }
    return res.reverse()
};
```

结果：

- 34/34 cases passed (64 ms)
- Your runtime beats 89.2 % of javascript submissions
- Your memory usage beats 32.3 % of javascript submissions (34.7 MB)
- 时间复杂度 `O(n)` ，`n` 为节点个数

#### 查阅他人解法

没有看到什么特别的解法，主要都是按 BFS 和 DFS 来处理，要么迭代，要么递归等等。

这里就介绍下别的吧，在第一种解法中我们使用的是前序优先，当然用中序优先或后序优先也可以，下面代码可以说明区别：

```javascript
// 先序，顺序为 根 -> 左 -> 右
function levelOrder(node, floor, arr) {
    if(arr[floor]) {
        arr[floor].push(node.val)
    } else {
        arr[floor] = [node.val]
    }

    levelOrder(node.left, floor + 1, arr)
    levelOrder(node.right, floor + 1, arr)
    return arr
}
// 中序，顺序为 左 -> 根 -> 右
function levelOrder(node, floor, arr) {
    levelOrder(node.left, floor + 1, arr)

   if(arr[floor]) {
       arr[floor].push(node.val)
   } else {
       arr[floor] = [node.val]
   }

    levelOrder(node.right, floor + 1, arr)
    return arr
}
// 后序，顺序为 左 -> 右 -> 根
function levelOrder(node, floor, arr) {
    levelOrder(node.left, floor + 1, arr)
    levelOrder(node.right, floor + 1, arr)

    if(arr[floor]) {
        arr[floor].push(node.val)
    } else {
        arr[floor] = [node.val]
    }
    return arr
}
```

#### 思考总结

二叉树的题目就根据情况在深度优先和广度优先中择优选择即可，基本不会有太大的问题。

### 108.将有序数组转换为二叉搜索树

[题目地址](https://leetcode-cn.com/problems/convert-sorted-array-to-binary-search-tree/)

#### 题目描述

将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。

本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

示例:

```javascript
给定有序数组: [-10,-3,0,5,9],

一个可能的答案是：[0,-3,9,-10,null,5]，它可以表示下面这个高度平衡二叉搜索树：

      0
     / \
   -3   9
   /   /
 -10  5
```

#### 题目分析设想

这里有两点要注意的：高度平衡二叉树要求每个节点的左右两个子树的高度差的绝对值不超过 1；而二叉搜索树要求左子树上所有节点值小于根节点，右子树上所有节点值大于根节点。

而题目给出的是一个有序的数组，所以可以直接考虑二分后进行处理，我这就直接递归作答：找到根节点，递归生成左右子树。

#### 编写代码验证

**Ⅰ.递归**

代码：

```javascript
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    if (!nums.length) return null
    // 中位数，用偏移避免溢出
    const mid = nums.length >>> 1
    const root = new TreeNode(nums[mid])
    root.left = sortedArrayToBST(nums.slice(0, mid))
    root.right = sortedArrayToBST(nums.slice(mid + 1))
    return root
};
```

结果：

- 32/32 cases passed (80 ms)
- Your runtime beats 70.72 % of javascript submissions
- Your memory usage beats 29.79 % of javascript submissions (37.8 MB)
- 时间复杂度 `O(n)`

#### 查阅他人解法

这里看到另外一种解法，先创建一个平衡二叉树，然后中序遍历树同时遍历数组即可，因为中序遍历出来的刚好是有序数组。

**Ⅰ.创建树后中序遍历数组赋值**

代码：

```javascript
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
    if (!nums.length) return null

    // 节点总数
    let len = nums.length
    let root = new TreeNode(-1);
    let q = [root]
    // 已经创建了根节点
    len--
    while(len) {
        const node = q.shift()
        // 左子树
        const l = new TreeNode(-1)
        q.push(l)
        node.left = l
        len--
        if (len) {
            // 右子树
            const r = new TreeNode(-1)
            q.push(r)
            node.right = r
            len--
        }
    }

    let i = 0
    inorder(root)
    function inorder(node) {
        if (node === null) return
        inorder(node.left)
        node.val = nums[i++]
        inorder(node.right)
    }

    return root
};
```

结果：

- 32/32 cases passed (72 ms)
- Your runtime beats 93.4 % of javascript submissions
- Your memory usage beats 24.12 % of javascript submissions (37.8 MB)
- 时间复杂度 `O(n)`

#### 思考总结

这里其实是个逆向思维，之前是二叉树输出数组，现在变成数组转成二叉树。刚好可以翻一下前序中序和后序的区别，这里中序就可以了。不过这道题我还是更推荐递归二分求解。

### 110.平衡二叉树

[题目地址](https://leetcode-cn.com/problems/balanced-binary-tree/)

#### 题目描述

给定一个二叉树，判断它是否是高度平衡的二叉树。

本题中，一棵高度平衡二叉树定义为：

> 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。

示例 1:

给定二叉树 `[3,9,20,null,null,15,7]`

```javascript
    3
   / \
  9  20
    /  \
   15   7
```

返回 `true` 。

示例 2:

给定二叉树 `[1,2,2,3,3,null,null,4,4]`

```javascript
       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
```

返回 `false` 。

#### 题目分析设想

我们上一期做过通过遍历求二叉树的最大深度的题目，这题最粗暴的一个方案就是计算出每个子树的最大深度做高度判断，很明显，这个效率低下。我们可以通过改成自底而上的方案，当中间过程不符合，则可以跳出计算。

#### 编写代码验证

**Ⅰ.计算子树最大深度做判断**

代码：

```javascript
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    if (root === null) return true
    function maxDepth (node) {
        if (node === null) return 0
        const l = maxDepth(node.left)
        const r = maxDepth(node.right)
        return Math.max(l, r) + 1
    }

    return Math.abs(maxDepth(root.left) - maxDepth(root.right)) <= 1
    && isBalanced(root.left)
    && isBalanced(root.right)
};
```

结果：

- 227/227 cases passed (80 ms)
- Your runtime beats 77.66 % of javascript submissions
- Your memory usage beats 26.73 % of javascript submissions (37.8 MB)
- 时间复杂度 `O(n^2)`

**Ⅱ.自底而上**

代码：

```javascript
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
    function maxDepth (node) {
        if (node === null) return 0
        const l = maxDepth(node.left)
        if (l === -1) return -1
        const r = maxDepth(node.right)
        if (r === -1) return -1
        return Math.abs(l - r) <= 1 ? Math.max(l, r) + 1 : -1
    }

    return maxDepth(root) !== -1
};
```

结果：

- 227/227 cases passed (72 ms)
- Your runtime beats 95.44 % of javascript submissions
- Your memory usage beats 50.5 % of javascript submissions (37.5 MB)
- 时间复杂度 `O(n)`

#### 查阅他人解法

思路基本上都是这两种，未发现方向不同的解法。

#### 思考总结

这里很明显，大家都是用深度遍历来解决问题，计算子树深度会发现，有很多重复运算，所以不妨试试自底而上的方式，直接在计算高度过程中就返回，也可以叫做“提前阻断”。所以，这道题建议是使用自底而上的方式来作答。

### 111.二叉树的最小深度

[题目地址](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

#### 题目描述

给定一个二叉树，找出其最小深度。

最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

**说明:** 叶子节点是指没有子节点的节点。

示例：

给定二叉树 `[3,9,20,null,null,15,7],`

```javascript
    3
   / \
  9  20
    /  \
   15   7
```

返回它的最小深度  2.

#### 题目分析设想

这道题很明显自顶而下就可以了，判断每个节点的子节点是否存在，不存在，则该路径为最短路径。如果存在，就按深度的方式比较最小值。总体上来说，也可以用之前求最大深度的几种方式来作答。

#### 编写代码验证

**Ⅰ.递归**

代码：

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
    if (root === null) return 0
    if (root.left === null && root.right === null) return 1
    let res = Infinity
    if(root.left !== null) {
        res = Math.min(minDepth(root.left), res)
    }
    if(root.right !== null) {
        res = Math.min(minDepth(root.right), res)
    }
    return res + 1
};
```

结果：

- 41/41 cases passed (76 ms)
- Your runtime beats 69.08 % of javascript submissions
- Your memory usage beats 5.55 % of javascript submissions (37.9 MB)
- 时间复杂度 `O(n)`

**Ⅱ.利用栈迭代**

代码：

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
    if (root === null) return 0
    if (root.left === null && root.right === null) return 1
    // 栈
    let s = [{
        node: root,
        dep: 1
    }]
    let dep = Infinity
    while(s.length) {
        // 先进后出
        var cur = s.pop()
        if (cur.node !== null) {
            let curDep = cur.dep
            if (cur.node.left === null && cur.node.right === null) {
                dep = Math.min(dep, curDep)
            }
            if (cur.node.left !== null) s.push({node: cur.node.left, dep: curDep + 1})
            if (cur.node.right !== null) s.push({node: cur.node.right, dep: curDep + 1})
        }
    }
    return dep
};
```

结果：

- 41/41 cases passed (68 ms)
- Your runtime beats 93.82 % of javascript submissions
- Your memory usage beats 75.31 % of javascript submissions (37 MB)
- 时间复杂度 `O(n)`

**Ⅲ.利用队列**

代码：

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
    if (root === null) return 0
    if (root.left === null && root.right === null) return 1
    // 队列
    let s = [{
        node: root,
        dep: 1
    }]
    let dep = 0
    while(s.length) {
        // 先进先出
        var cur = s.shift()
        var node = cur.node
        dep = cur.dep
        if (node.left === null && node.right === null) break;
        if (node.left !== null) s.push({node: node.left, dep: dep + 1})
        if (node.right !== null) s.push({node: node.right, dep: dep + 1})
    }
    return dep
};
```

结果：

- 41/41 cases passed (76 ms)
- Your runtime beats 69.08 % of javascript submissions
- Your memory usage beats 6.79 % of javascript submissions (37.7 MB)
- 时间复杂度 `O(n)`

#### 查阅他人解法

总体上而言分成深度优先和广度优先，最基本的就是递归和迭代了。没有发现二叉树相关题目的一些新奇解法。

#### 思考总结

很明显可以看出递归和利用栈迭代是深度优先，利用队列是广度优先。这里自顶而下比较合适，只要找到叶子节点，直接就是最小深度了，可以省去不少运算。

### 112.路径总和

[题目地址](https://leetcode-cn.com/problems/path-sum/)

#### 题目描述

给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。

说明: 叶子节点是指没有子节点的节点。

示例:

给定如下二叉树，以及目标和 `sum = 22`，

```javascript
              5
             / \
            4   8
           /   / \
          11  13  4
         /  \      \
        7    2      1
```

返回 `true`, 因为存在目标和为 22 的根节点到叶子节点的路径 `5->4->11->2`。

#### 题目分析设想

这道题我的想法是因为要找到叶子节点，所以深度优先更为合适，这里就使用前文的两种方法：

- 递归
- 利用栈迭代

#### 编写代码验证

**Ⅰ.递归**

代码：

```javascript
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function(root, sum) {
    if (root === null) return false
    // 剩余需要的值
    sum -= root.val
    if (root.left === null && root.right === null) {
        return sum === 0
    } else {
        return hasPathSum(root.left, sum) || hasPathSum(root.right, sum)
    }
};
```

结果：

- 114/114 cases passed (80 ms)
- Your runtime beats 62.09 % of javascript submissions
- Your memory usage beats 56.9 % of javascript submissions (37.1 MB)
- 时间复杂度 `O(n)`

**Ⅱ.迭代**

代码：

```javascript
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function(root, sum) {
    if (root === null) return false
    // 栈
    let stack = [{
        node: root,
        remain: sum - root.val
    }]
    while(stack.length) {
        // 先进后出
        var cur = stack.pop()
        var node = cur.node
        if (node.left === null && node.right === null && cur.remain === 0) return true
        if (node.left !== null) {
            stack.push({
                node: node.left,
                remain: cur.remain - node.left.val
            })
        }
        if (node.right !== null) {
            stack.push({
                node: node.right,
                remain: cur.remain - node.right.val
            })
        }
    }
    return false
};
```

结果：

- 114/114 cases passed (72 ms)
- Your runtime beats 88.51 % of javascript submissions
- Your memory usage beats 33.33 % of javascript submissions (37.2 MB)
- 时间复杂度 `O(n)`

#### 查阅他人解法

这里看到一个方案是采用后序遍历，路径长度由之前的栈改成变量保存，但是这个在我看来没有中序遍历合适，感兴趣的可以 [点此查阅](https://leetcode-cn.com/problems/path-sum/solution/hou-xu-bian-li-qiu-lu-jing-he-by-watson-14/) 。另外还是有选择使用广度优先，利用队列来解的，这里也算一个不同思路，就当做补充吧。

**Ⅰ.利用队列**

代码：

```javascript
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function(root, sum) {
    if (root === null) return false
    // 队列
    let q = [{
        node: root,
        sum: root.val
    }]
    while(q.length) {
        // 当前层元素的个数
        for(let i = 0; i < q.length; i++) {
            let cur = q.shift()
            let node = cur.node
            if (node.left === null && node.right === null && cur.sum === sum) return true

            if (node.left !== null) {
                q.push({ node: node.left, sum: cur.sum + node.left.val})
            }
            if (node.right !== null) {
                q.push({ node: node.right, sum: cur.sum + node.right.val})
            }
        }
    }
    return false
};
```

结果：

- 114/114 cases passed (72 ms)
- Your runtime beats 88.51 % of javascript submissions
- Your memory usage beats 56.32 % of javascript submissions (37.1 MB)
- 时间复杂度 `O(n)`

### 118.杨辉三角

[题目地址](https://leetcode-cn.com/problems/pascals-triangle/)

#### 题目描述

给定一个非负整数 numRows，生成杨辉三角的前 numRows 行。

![杨辉三角](https://upload.wikimedia.org/wikipedia/commons/0/0d/PascalTriangleAnimated2.gif)

在杨辉三角中，每个数是它左上方和右上方的数的和。

示例:

```javascript
输入: 5
输出:
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]
```

#### 题目分析设想

这道题最笨的方案就是双重循环，首尾为1，其他位为 `S(l)[n] = S(l-1)[n-1] + S(l-1)[n]` 。当然这里很明显也可以当做一个动态规划问题来解答。

> 这里有个坑，给的是索引，不是第 n 行

#### 编写代码验证

**Ⅰ.动态规划**

代码：

```javascript
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    let res = []
    for(let i = 0; i < numRows; i++) {
        // 所有默认都填了1，可以节省不少运算
        res.push(new Array(i+1).fill(1))
        // 第三行开始才需要修改
        for(j = 1; j < i; j++) {
            res[i][j] = res[i-1][j] + res[i-1][j-1]
        }
    }
    return res
};
```

结果：

- 15/15 cases passed (60 ms)
- Your runtime beats 85.2 % of javascript submissions
- Your memory usage beats 55.52 % of javascript submissions (33.6 MB)
- 时间复杂度 `O(n^2)`

#### 查阅他人解法

这里看到两个不同方向的，一个是递归，因为这题在递归卡片中，一个是二项式定理。

**Ⅰ.递归**

代码：

```javascript
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
    let res = []

    function sub(row, numRows, arr) {
        let temp = []
        if (row < numRows) {
            for (let i = 0; i <= row; i++) {
                if (row === 0) {
                    temp.push(1)
                } else {
                    let left = i - 1 >= 0 ? arr[row - 1][i - 1] : 0
                    let right = i < arr[row - 1].length ? arr[row - 1][i] : 0
                    temp.push(left + right)
                }
            }
            arr.push(temp)
            sub(++row, numRows, arr)
            return arr
        } else {
            return arr
        }
    }
    return sub(0, numRows, res)
};
```

结果：

- 15/15 cases passed (64 ms)
- Your runtime beats 68.27 % of javascript submissions
- Your memory usage beats 56.86 % of javascript submissions (33.6 MB)
- 时间复杂度 `O(n^2)`

**Ⅱ.二项式定理**

优势在于可以直接计算第n行，用二项式定理公式计算。 `(a+b)^n` 一共有n+1项，每一项的系数对应杨辉三角的第 n 行。第 r 项的系数等于 组合数 `C(n,r)` 。

代码：

```javascript
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
    var res = [];

    /**
     * 组合数
     * @param n
     * @param r
     * @returns {number}
     * @constructor
     */
    function C(n, r) {
        if(n == 0) return 1;
        return F(n) / F(r) / F(n - r);
    }
    /**
     * 阶乘
     * @param n
     * @returns {number}
     * @constructor
     */
    function F(n) {
        var s = 1;
        for(var i = 1;i <= n;i++) {
            s *= i;
        }
        return s;
    }

    for (var i = 0;i < numRows;i++){
        res[i] = [];
        for (var j = 0;j < i + 1;j++){
            res[i].push(C(i, j));
        }
    }
    return res;
};
```

结果：

- 15/15 cases passed (64 ms)
- Your runtime beats 68.27 % of javascript submissions
- Your memory usage beats 5.02 % of javascript submissions (34.3 MB)
- 时间复杂度 `O(n^2)`

#### 思考总结

对于数学敏感的开发者，很容易就想到使用二项式定理。但是在我看来，找到了一个计算规则，就很容易想到使用动态规划来解决问题，我也推荐使用动态规划来生成杨辉三角。

### 119.杨辉三角Ⅱ

[题目地址](https://leetcode-cn.com/problems/pascals-triangle-ii/)

#### 题目描述

给定一个非负索引 k，其中 k ≤ 33，返回杨辉三角的第 k 行。

在杨辉三角中，每个数是它左上方和右上方的数的和。

示例:

```javascript
输入: 3
输出: [1,3,3,1]
```

进阶：

你可以优化你的算法到 O(k) 空间复杂度吗？

#### 题目分析设想

上面从他人解法中发现了二项式定理可以直接求第 n 行。另外我们也可以发现个规律，第几行实际上就有几个数，且首尾为1。当然也可以使用动态规划来作答。

#### 编写代码验证

**Ⅰ.动态规划**

代码：

```javascript
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    // rowIndex 是索引，0相当于第1行
    if (rowIndex === 0) return [1]
    let res = []
    for(let i = 0; i < rowIndex + 1; i++) {
        let temp = new Array(i+1).fill(1)
        // 第三行开始才需要修改
        for(let j = 1; j < i; j++) {
            temp[j] = res[j - 1] + res[j]
        }
        res = temp
    }
    return res
};
```

结果：

- 34/34 cases passed (64 ms)
- Your runtime beats 75.77 % of javascript submissions
- Your memory usage beats 54.9 % of javascript submissions (33.8 MB)
- 时间复杂度 `O(n^2)`

**Ⅱ.二项式定理**

代码：

```javascript
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    /**
     * 组合数
     * @param n
     * @param r
     * @returns {number}
     * @constructor
     */
    function C(n, r) {
        if(n == 0) return 1;
        return F(n) / F(r) / F(n - r);
    }
    /**
     * 阶乘
     * @param n
     * @returns {number}
     * @constructor
     */
    function F(n) {
        var s = 1;
        for(var i = 1;i <= n;i++) {
            s *= i;
        }
        return s;
    }
    let res = []
    // 因为是通过上一项计算，所以第1项的 n 为0
    for (var i = 0;i < rowIndex + 1;i++){
        res.push(C(rowIndex, i));
    }
    return res;
};
```

结果：

- 34/34 cases passed (52 ms)
- Your runtime beats 99.12 % of javascript submissions
- Your memory usage beats 41.18 % of javascript submissions (34.5 MB)
- 时间复杂度 `O(n)`

#### 查阅他人解法

因为发现每行的对称性，所以也可以求一半后反转复制即可。

**Ⅰ.反转复制**

代码：

```javascript
/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    // rowIndex 是索引，0相当于第1行
    if (rowIndex === 0) return [1]
    let res = []
    for(let i = 0; i < rowIndex + 1; i++) {
        let temp = new Array(i+1).fill(1)
        // 第三行开始才需要修改
        const mid = i >>> 1
        for(let j = 1; j < i; j++) {
            if (j > mid) {
                temp[j] = temp[i - j]
            } else {
                temp[j] = res[j - 1] + res[j]
            }
        }
        res = temp
    }
    return res
};
```

结果：

- 34/34 cases passed (60 ms)
- Your runtime beats 88.47 % of javascript submissions
- Your memory usage beats 60.78 % of javascript submissions (33.7 MB)
- 时间复杂度 `O(n^2)`

#### 思考总结

其实更像一个数学问题，不断地找出规律来节省运算，真是“学好数理化，走遍天下都不怕”。

### 121.买卖股票的最佳时机

[题目地址](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/)

#### 题目描述

给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

如果你最多只允许完成一笔交易（即买入和卖出一支股票），设计一个算法来计算你所能获取的最大利润。

注意你不能在买入股票前卖出股票。

示例 1:

```javascript
输入: [7,1,5,3,6,4]
输出: 5
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
     注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格。
```

示例 2:

```javascript
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

#### 题目分析设想

这道题，我的第一反应有点像求最大子序和，只不过这里不是求连续，是求单个，转换为增益的思想来处理。当然也可以使用两次遍历的笨办法来求解。我们分别来验证一下。

#### 编写代码验证

**Ⅰ.两次遍历**

代码：

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if (prices.length < 2) return 0
    // 因为是利润，所以不考虑负数
    let profit = 0
    for(let i = 0; i < prices.length; i++) {
        for(let j = i + 1; j < prices.length; j++) {
            profit = Math.max(prices[j] - prices[i], profit)
        }
    }
    return profit
};
```

结果：

- 200/200 cases passed (384 ms)
- Your runtime beats 25.89 % of javascript submissions
- Your memory usage beats 19.85 % of javascript submissions (35.9 MB)
- 时间复杂度 `O(n^2)`

**Ⅱ.增益思想**

代码：

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if (prices.length < 2) return 0
    // 因为是利润，所以不考虑负数
    let profit = 0
    let last = 0
    for(let i = 0; i < prices.length - 1; i++) {
        // 这里其实可以转换为每两项价格相减后，再求最大子序和
        // prices[i + 1] - prices[i] 就是增益，和0比较是因为求利润，不是求连续和
        last = Math.max(0, last + prices[i + 1] - prices[i])
        profit = Math.max(profit, last)
    }
    return profit
};
```

结果：

- 200/200 cases passed (64 ms)
- Your runtime beats 94.53 % of javascript submissions
- Your memory usage beats 19.85 % of javascript submissions (35.9 MB)
- 时间复杂度 `O(n)`

#### 查阅他人解法

这里看到两种不同的思考，一种是理解为波峰和波谷，找到波谷后的下一个波峰，判断每个波峰与波谷差值的大小。另外一种是基于状态机的动态规划，也就是说把可能性都前置运算后，再进行比较。

**Ⅰ.波峰波谷**

代码：

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if (prices.length < 2) return 0
    // 波谷
    let min = Infinity
    // 因为是利润，所以不考虑负数
    let profit = 0
    for(let i = 0; i < prices.length; i++) {
        if (prices[i] < min) {
            min = prices[i]
        } else if (prices[i] - min > profit) {
            // 这里是当前这个波峰和波谷的差值与历史的进行比较
            profit = prices[i] - min
        }
    }
    return profit
};
```

结果：

- 200/200 cases passed (68 ms)
- Your runtime beats 86.75 % of javascript submissions
- Your memory usage beats 21.34 % of javascript submissions (35.8 MB)
- 时间复杂度 `O(n)`

**Ⅱ.动态规划**

代码：

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if (prices.length < 2) return 0
    // 动态初始数组
    let dp = new Array(prices.length).fill([])
    // 0：用户手上不持股所能获得的最大利润，特指卖出股票以后的不持股，非指没有进行过任何交易的不持股
    // 1：用户手上持股所能获得的最大利润
    // 状态 dp[i][0] 表示：在索引为 i 的这一天，用户手上不持股所能获得的最大利润
    // 状态 dp[i][1] 表示：在索引为 i 的这一天，用户手上持股所能获得的最大利润
    // -prices[i] 就表示，在索引为 i 的这一天，执行买入操作得到的收益
    dp[0][0] = 0
    dp[0][1] = -prices[0]

    for(let i = 1; i < prices.length; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
        dp[i][1] = Math.max(dp[i - 1][1], -prices[i])
    }
    return dp[prices.length - 1][0]
};
```

结果：

- 200/200 cases passed (72 ms)
- Your runtime beats 75.01 % of javascript submissions
- Your memory usage beats 12.43 % of javascript submissions (36.7 MB)
- 时间复杂度 `O(n)`

这个思路还有一系列的优化过程，可以[点击这里查看](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock/solution/bao-li-mei-ju-dong-tai-gui-hua-chai-fen-si-xiang-b/)

#### 思考总结

很多问题都可以转换成动态规划的思想来解决，但是我这里还是更推荐使用增益思想，也可以理解为差分数组。但是如果题目允许多次买入卖出，我会更推荐使用动态规划来解决问题。

### 122.买卖股票的最佳时机Ⅱ

[题目地址](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

#### 题目描述

给定一个数组，它的第 i 个元素是一支给定股票第 i 天的价格。

设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。

注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。

示例 1:

```javascript
输入: [7,1,5,3,6,4]
输出: 7
解释: 在第 2 天（股票价格 = 1）的时候买入，在第 3 天（股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     随后，在第 4 天（股票价格 = 3）的时候买入，在第 5 天（股票价格 = 6）的时候卖出, 这笔交易所能获得利润 = 6-3 = 3 。
```

示例 2:

```javascript
输入: [1,2,3,4,5]
输出: 4
解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。
     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。
     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
```javascript

示例 3:

```javascript
输入: [7,6,4,3,1]
输出: 0
解释: 在这种情况下, 没有交易完成, 所以最大利润为 0。
```

#### 题目分析设想

上面刚刚做了算最大收益的，这题明显是算累计收益的，所以可以按以下几个方向：

- 一次遍历，直接遍历，不断比较前后两天价格，如果后一天收益高，则差值加到利润，可以理解为贪心算法。
- 波峰波谷，找到所有波峰波谷，差值相加即可
- 动态规划

#### 编写代码验证

**Ⅰ.一次遍历**

代码：

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let profit = 0
    for(let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1]
        }
    }
    return profit
};
```

结果：

- 201/201 cases passed (68 ms)
- Your runtime beats 77.02 % of javascript submissions
- Your memory usage beats 13.55 % of javascript submissions (35.7 MB)
- 时间复杂度 `O(n)`

**Ⅱ.波峰波谷**

代码：

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if (!prices.length) return 0
    let profit = 0
    // 波峰波谷
    let min = max = prices[0]
    let i = 0
    while (i < prices.length - 1) {
        while(prices[i] >= prices[i + 1]) {
            i++
        }
        min = prices[i]
        while(prices[i] <= prices[i + 1]) {
            i++
        }
        max = prices[i]
        profit += max - min
    }
    return profit
};
```

结果：

- 201/201 cases passed (68 ms)
- Your runtime beats 77.02 % of javascript submissions
- Your memory usage beats 14.4 % of javascript submissions (35.7 MB)
- 时间复杂度 `O(n)`

**Ⅲ.动态规划**

代码：

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if (prices.length < 2) return 0
    // 动态初始数组
    let dp = new Array(prices.length).fill([])
    // 0：用户手上不持股所能获得的最大利润，特指卖出股票以后的不持股，非指没有进行过任何交易的不持股
    // 1：用户手上持股所能获得的最大利润
    // 状态 dp[i][0] 表示：在索引为 i 的这一天，用户手上不持股所能获得的最大利润
    // 状态 dp[i][1] 表示：在索引为 i 的这一天，用户手上持股所能获得的最大利润
    // -prices[i] 就表示，在索引为 i 的这一天，执行买入操作得到的收益
    dp[0][0] = 0
    dp[0][1] = -prices[0]

    for(let i = 1; i < prices.length; i++) {
        dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
        dp[i][1] = Math.max(dp[i - 1][1], dp[i][0] - prices[i])
    }
    return dp[prices.length - 1][0]
};
```

结果：

- 201/201 cases passed (76 ms)
- Your runtime beats 37.68 % of javascript submissions
- Your memory usage beats 5.13 % of javascript submissions (36.7 MB)
- 时间复杂度 `O(n)`

#### 查阅他人解法

这里看到了动态规划的优化版，主要是降低空间复杂度。其他的思路都区别不大。

**Ⅰ.动态规划优化版**

代码：

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if (prices.length < 2) return 0
    // cash 表示持有现金
    // hold 表示持有股票
    let cash = new Array(prices.length).fill(null)
    let hold = new Array(prices.length).fill(null)

    cash[0] = 0
    hold[0] = -prices[0]

    for(let i = 1; i < prices.length; i++) {
        cash[i] = Math.max(cash[i - 1], hold[i - 1] + prices[i])
        hold[i] = Math.max(hold[i - 1], cash[i - 1] - prices[i])
    }
    return cash[prices.length - 1]
};
```

结果：

- 201/201 cases passed (68 ms)
- Your runtime beats 77.02 % of javascript submissions
- Your memory usage beats 9.7 % of javascript submissions (36 MB)
- 时间复杂度 `O(n)`

**还可以进一步进行状态压缩**

代码：

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    if (prices.length < 2) return 0
    // cash 表示持有现金
    // hold 表示持有股票
    // 加了两个变量来存储上一次的值
    let cash = tempCash = 0
    let hold = tempHold = -prices[0]

    for(let i = 1; i < prices.length; i++) {
        cash = Math.max(tempCash, tempHold + prices[i])
        hold = Math.max(tempHold, tempCash - prices[i])

        tempCash = cash
        tempHold = hold
    }
    return tempCash
};
```

结果：

- 201/201 cases passed (72 ms)
- Your runtime beats 58.45 % of javascript submissions
- Your memory usage beats 10.55 % of javascript submissions (35.8 MB)
- 时间复杂度 `O(n)`

#### 思考总结

就这道题而言，我会推荐使用一次遍历的方式，也就是贪心算法，理解起来会十分清晰。当然，动态规划的解决范围更广，基本上可以解决这类型的所有题目。增益也是一个比较常见的手段。总体而言，这两道股票题还比较简单。

### 125.验证回文串

[题目地址](https://leetcode-cn.com/problems/valid-palindrome/)

#### 题目描述

给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。

说明：本题中，我们将空字符串定义为有效的回文串。

示例:

```javascript
输入: "A man, a plan, a canal: Panama"
输出: true

输入: "race a car"
输出: false
```

#### 题目分析设想

这道题我有两个方向，一是改变原输入串，二是不改变原输入串。

- 改变原输入串，可以去掉非字母和数字的字符后，反转判断或者双指针判断或者单指针
- 不改变原输入串，直接双指针判断

主要作答方法就是反转判断，双指针法以及二分法。

#### 编写代码验证

**Ⅰ.反转判断**

代码：

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    // 正则去除不满足条件的字符
    let str = s.toLowerCase().replace(/[^0-9a-z]/g, '')
    return str === str.split('').reverse().join('')
};
```

结果：

- 476/476 cases passed (72 ms)
- Your runtime beats 95.33 % of javascript submissions
- Your memory usage beats 47.7 % of javascript submissions (38.1 MB)
- 时间复杂度： `O(1)`

**Ⅱ.双指针法（预处理字符）**

代码：

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    // 正则去除不满足条件的字符
    let str = s.toLowerCase().replace(/[^0-9a-z]/g, '')
    let len = str.length
    let l = 0
    let r = len - 1
    while(l < r) {
        if (str.charAt(l) !== str.charAt(r)) {
            return false
        }
        l++
        r--
    }
    return true
};
```

结果：

- 476/476 cases passed (76 ms)
- Your runtime beats 89.25 % of javascript submissions
- Your memory usage beats 70.96 % of javascript submissions (37.4 MB)
- 时间复杂度： `O(n)`

**Ⅲ.单指针法（预处理字符）**

代码：

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    // 正则去除不满足条件的字符
    let str = s.toLowerCase().replace(/[^0-9a-z]/g, '')
    let len = str.length
    // 最多需要判断的次数
    let max = len >>> 1
    let i = 0
    while(i < max) {
        if (len % 2) { // 奇数
            if (str.charAt(max - i - 1) !== str.charAt(max + i + 1)) {
                return false
            }
        } else { // 偶数
            if (str.charAt(max - i - 1) !== str.charAt(max + i)) {
                return false
            }
        }
        i++
    }
    return true
};
```

结果：

- 476/476 cases passed (72 ms)
- Your runtime beats 95.33 % of javascript submissions
- Your memory usage beats 56.02 % of javascript submissions (38 MB)
- 时间复杂度： `O(n)`

**Ⅳ.双指针法**

代码：

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    let len = s.length
    let l = 0
    let r = len - 1
    while (l < r) {
        if (!/[0-9a-zA-Z]/.test(s.charAt(l))) {
            l++
        } else if (!/[0-9a-zA-Z]/.test(s.charAt(r))) {
            r--
        } else {
            if(s.charAt(l).toLowerCase() !== s.charAt(r).toLowerCase()) {
                return false
            }
            l++
            r--
        }

    }
    return true
};
```

结果：

- 476/476 cases passed (76 ms)
- Your runtime beats 89.25 % of javascript submissions
- Your memory usage beats 13.06 % of javascript submissions (42 MB)
- 时间复杂度： `O(n)`

#### 查阅他人解法

这里看到一种利用栈的思路，先进后出，推一半入栈然后进行比较。

**Ⅰ.利用栈**

代码：

```javascript
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    // 正则去除不满足条件的字符
    let str = s.toLowerCase().replace(/[^0-9a-z]/g, '')
    let mid = str.length >>> 1
    let stack = str.substr(0, mid).split('')
    // 起始位置如果字符个数为奇数则跳过中间位
    for(let i = str.length % 2 ? mid + 1 : mid; i < str.length; i++) {
        const last = stack.pop()
        if (last !== str.charAt(i)) {
            return false
        }
    }
    return true
};
```

结果：

- 476/476 cases passed (84 ms)
- Your runtime beats 65.67 % of javascript submissions
- Your memory usage beats 71.81 % of javascript submissions (37.4 MB)
- 时间复杂度： `O(n)`

#### 思考总结

总体而言，判断回文字符或者相关的题目，我更推荐采用双指针法，思路非常清晰。这里头尾递归比较也可以作答，就不在这里列举了。

### 136.只出现一次的数字

[题目地址](https://leetcode-cn.com/problems/single-number/)

#### 题目描述

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

说明：

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

```javascript
输入: [2,2,1]
输出: 1

输入: [4,1,2,1,2]
输出: 4
``

#### 题目分析设想

这题说明了线性时间复杂度，所以最多一次遍历。很容易想到用 Hash 表或者其他方式对各数字出现次数做个统计来求解，但是需要考虑如何不适用额外空间。这里很明显就指向了离散数学中的异或运算。

- Hash 法，需要额外 `O(n)` 的空间
- 异或运算

#### 编写代码验证

**Ⅰ.Hash 法**

代码：

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let hash = {}
    for(let i = 0; i < nums.length; i++) {
        if (hash[nums[i]]) {
            hash[nums[i]] = false
        } else if (hash[nums[i]] === undefined) {
            hash[nums[i]] = true
        }
    }
    for(let i in hash) {
        if(hash[i]) {
            return parseInt(i)
        }
    }
};
```

结果：

- 16/16 cases passed (72 ms)
- Your runtime beats 68.39 % of javascript submissions
- Your memory usage beats 5.49 % of javascript submissions (38.6 MB)
- 时间复杂度： `O(n)`

**Ⅱ.异或运算**

简单列一下几条运算规则，利用这规则，发现很容易作答这道题。

- 交换律： a^b^c = a^c^b
- 任何数和 0 异或为本身：a^0 = a
- 相同的数异或为 0：a^a = 0

代码：

```javascript
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    let n = 0
    for(let i = 0; i < nums.length; i++) {
        n ^= nums[i]
    }
    return n
};
```

结果：

- 16/16 cases passed (60 ms)
- Your runtime beats 95.77 % of javascript submissions
- Your memory usage beats 74.07 % of javascript submissions (35.3 MB)
- 时间复杂度： `O(n)`

#### 查阅他人解法

没有发现其他不同方向的解法。

#### 思考总结

这里的话第一想法大多都是借助哈希表来实现，但是由于有补充说明，所以更推荐使用异或算法。纯粹是数学公式的应用场景之一，没有什么太多好总结的地方。

### 141.环形链表

[题目地址](https://leetcode-cn.com/problems/linked-list-cycle/)

#### 题目描述

给定一个链表，判断链表中是否有环。

为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。

```javascript
示例 1：
输入：head = [3,2,0,-4], pos = 1
输出：true
解释：链表中有一个环，其尾部连接到第二个节点。

示例 2：
输入：head = [1,2], pos = 0
输出：true
解释：链表中有一个环，其尾部连接到第一个节点。

示例 3：
输入：head = [1], pos = -1
输出：false
解释：链表中没有环。
```

进阶：

你能用 O(1)（即，常量）内存解决此问题吗？

#### 题目分析设想

这道题的本质其实就是对象的比较，而对应的相等应当是引用同样的内存，可以想象成数组中找到同样的元素。所以第一个想法就是哈希表，当然也可以使用快慢指针来做处理。由于哈希表需要额外的内存，所以可以做优化，比如直接改变原对象，做特殊标识或者其他方式。

- 哈希表，直接利用哈希表存储，也可以使用 Map/Set 等等，直接判断对象相等即可
- 特殊标识，哈希表需要额外空间，可以直接在原对象上打标识，或者置为空等等特殊标识均可
- 双指针法，一快一慢，如果是环，那必然会存在相等的时候，如果不是环，那快的先走完

#### 编写代码验证

**Ⅰ.哈希表**

代码：

```javascript
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    let hashArr = []
    // val 可能为 0 ,所以不能直接 ！head
    while (head !== null) {
        if (hashArr.includes(head)) {
            return true
        } else {
            hashArr.push(head)
            head = head.next
        }
    }
    return false
};
```

结果：

- 17/17 cases passed (116 ms)
- Your runtime beats 12.03 % of javascript submissions
- Your memory usage beats 5.05 % of javascript submissions (38.5 MB)
- 时间复杂度： `O(n)`

**Ⅱ.特殊标识法**

代码：

```javascript
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    while (head && head.next) {
        if (head.FLAG) {
            return true
        } else {
            head.FLAG = true
            head = head.next
        }
    }
    return false
};
```

结果：

- 17/17 cases passed (76 ms)
- Your runtime beats 78.6 % of javascript submissions
- Your memory usage beats 16.32 % of javascript submissions (37.5 MB)
- 时间复杂度： `O(n)`

**Ⅲ.双指针法**

代码：

```javascript
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    if (head && head.next) {
        let slow = head
        let fast = head.next
        while(slow !== fast) {
            if (fast && fast.next) {
                // 快指针需要比慢指针移动速度快，才能追上，所以是 .next.next
                fast = fast.next.next
                slow = slow.next
            } else {
                // 快指针走到头了，所以必然不是环
                return false
            }
        }
        return true
    } else {
        return false
    }
};
```

结果：

- 17/17 cases passed (76 ms)
- Your runtime beats 78.6 % of javascript submissions
- Your memory usage beats 56.97 % of javascript submissions (36.6 MB)
- 时间复杂度： `O(n)`

#### 查阅他人解法

这里发现一个有意思的思路，通过链路导致。如果是环，那么倒置后的尾节点等于倒置前的头节点。如果不是环，那么就是正常的倒置不相等。

**Ⅰ.倒置法**

代码：

```javascript
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    if (head === null || head.next === null) return false
    if (head === head.next) return true
    let p = head.next
    let q = p.next
    let x = head
    head.next = null
    // 相当于每遍历一个链表，就把后面的指向前面一项，这样当循环的时候，会反方向走出环形
    while(q !== null) {
        p.next = x
        x = p
        p = q
        q = q.next
    }
    return p === head
};
```

结果：

- 17/17 cases passed (72 ms)
- Your runtime beats 90.05 % of javascript submissions
- Your memory usage beats 35.91 % of javascript submissions (36.8 MB)
- 时间复杂度： `O(n)`

#### 思考总结

一般去重或者找到重复项用哈希的方式都能解决，但是在这题里，题目期望空间复杂度是 `O(1)`，要么是改变原数据本身，要么是使用双指针法。这里我比较推荐双指针法，当然倒置法也比较巧妙。

