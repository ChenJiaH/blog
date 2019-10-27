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
- [14.罗马数字转整数](#14罗马数字转整数)

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

### 14.罗马数字转整数

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