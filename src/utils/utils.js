/**
 * @Author: Created By McChen
 * @Date: 2019/9/12
 * @Mail: chenjiahao.xyz@gmail.com
 */

const pageLockHandler = (e) => {
  e.preventDefault();
};

const pageLock = () => {
  document.addEventListener('touchmove', pageLockHandler, { capture: false, passive: false });
};

const pageUnlock = () => {
  document.removeEventListener('touchmove', pageLockHandler, { capture: false });
};

const getTime = Date.now || function () {
  return new Date().getTime();
};

const isLightColor = (hex) => {
  const rgb = [parseInt(`0x${hex.substr(0, 2)}`, 16), parseInt(`0x${hex.substr(2, 2)}`, 16), parseInt(`0x${hex.substr(4, 2)}`, 16)];
  const darkness = 1 - (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
  return darkness < 0.5;
};

const formatTime = (time, _format) => {
  if (!time) {
    return null;
  }
  const date = typeof time === 'string' && time.length === 10 ? time.replace(/-/g, '/') : time;
  const t = new Date(date);
  const format = _format || 'yyyy-MM-dd';
  const tf = function (i) {
    return (i < 10 ? '0' : '') + i;
  };
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, (a) => {
    switch (a) {
      case 'yyyy':
        return tf(t.getFullYear());
      case 'MM':
        return tf(t.getMonth() + 1);
      case 'mm':
        return tf(t.getMinutes());
      case 'dd':
        return tf(t.getDate());
      case 'HH':
        return tf(t.getHours());
      case 'ss':
        return tf(t.getSeconds());
      default:
        break;
    }
    return null;
  });
};

const getZodiac = (year) => {
  const map = ['shu', 'niu', 'hu', 'tu', 'long', 'she', 'ma', 'yang', 'hou', 'ji', 'gou', 'zhu'];
  return year ? map[(parseFloat(year) + 8) % 12] : '';
};

const restArguments = function (func, startIdx) {
  const startIndex = startIdx == null ? func.length - 1 : +startIdx;
  return function (...argus) {
    const length = Math.max(argus.length - startIndex, 0);
    const rest = Array(length);
    let index = 0;
    for (; index < length; index++) {
      rest[index] = argus[index + startIndex];
    }
    switch (startIndex) {
      case 0:
        return func.call(this, rest);
      case 1:
        return func.call(this, argus[0], rest);
      case 2:
        return func.call(this, argus[0], argus[1], rest);
      default:
        break;
    }
    const args = Array(startIndex + 1);
    for (index = 0; index < startIndex; index++) {
      args[index] = argus[index];
    }
    args[startIndex] = rest;
    return func.apply(this, args);
  };
};

const delay = restArguments((func, wait, args) => setTimeout(() => {
  func(...args);
}, wait));

const debounce = (func, wait, immediate) => {
  let timeout;
  let
    result;

  const later = (context, args) => {
    timeout = null;
    if (args) result = func.apply(context, args);
  };

  const debounced = restArguments(function (args) {
    if (timeout) clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(later, wait);
      if (callNow) result = func.apply(this, args);
    } else {
      timeout = delay(later, wait, this, args);
    }

    return result;
  });

  debounced.cancel = () => {
    clearTimeout(timeout);
    timeout = null;
  };

  return debounced;
};

const throttle = (func, wait, options = {}) => {
  let timeout;
  let context;
  let args;
  let result;
  let previous = 0;

  const later = () => {
    previous = options.leading === false ? 0 : getTime();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) {
      context = null;
      args = null;
    }
  };

  const throttled = (...argus) => {
    const now = getTime();
    if (!previous && options.leading === false) previous = now;
    const remaining = wait - (now - previous);
    context = this;
    args = argus;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) {
        context = null;
        args = null;
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = () => {
    clearTimeout(timeout);
    previous = 0;
    timeout = null;
    context = null;
    args = null;
  };

  return throttled;
};

export {
  debounce, formatTime, getTime, getZodiac, isLightColor, pageLock, pageUnlock, throttle,
};
