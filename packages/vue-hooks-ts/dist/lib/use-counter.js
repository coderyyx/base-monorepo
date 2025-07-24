'use strict';

var vue = require('vue');

/**
 * 计数器 Hook
 * @param options 配置选项
 * @returns 计数器相关的响应式数据和方法
 */
var useCounter = function useCounter() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _options$min = options.min,
    min = _options$min === void 0 ? -Infinity : _options$min,
    _options$max = options.max,
    max = _options$max === void 0 ? Infinity : _options$max,
    _options$initialValue = options.initialValue,
    initialValue = _options$initialValue === void 0 ? 0 : _options$initialValue;
  var count = vue.ref(initialValue);
  var increment = function increment() {
    if (count.value < max) {
      count.value++;
    }
  };
  var decrement = function decrement() {
    if (count.value > min) {
      count.value--;
    }
  };
  var reset = function reset() {
    count.value = initialValue;
  };
  var setValue = function setValue(value) {
    if (value >= min && value <= max) {
      count.value = value;
    }
  };
  return {
    count: count,
    increment: increment,
    decrement: decrement,
    reset: reset,
    setValue: setValue,
  };
};
exports.useCounter = useCounter;
