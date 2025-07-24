import { ref, watch, onUnmounted } from 'vue';

/**
 * 防抖 Hook
 * @param value 需要防抖的值
 * @param options 配置选项
 * @returns 防抖后的值
 */
var useDebounce = function useDebounce(value) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$delay = options.delay,
    delay = _options$delay === void 0 ? 300 : _options$delay,
    _options$immediate = options.immediate,
    immediate = _options$immediate === void 0 ? false : _options$immediate;
  var debouncedValue = ref(value.value);
  var timeoutId = null;
  var updateValue = function updateValue() {
    debouncedValue.value = value.value;
  };
  watch(
    value,
    function (newValue) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (immediate && timeoutId === null) {
        updateValue();
      }
      timeoutId = window.setTimeout(function () {
        updateValue();
        timeoutId = null;
      }, delay);
    },
    {
      immediate: true,
    },
  );
  onUnmounted(function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });
  return debouncedValue;
};
export { useDebounce };
