import { ref, Ref, watch, onUnmounted, UnwrapRef } from 'vue';

export interface UseDebounceOptions {
  delay?: number;
  immediate?: boolean;
}

/**
 * 防抖 Hook
 * @param value 需要防抖的值
 * @param options 配置选项
 * @returns 防抖后的值
 */
export const useDebounce = <T>(value: Ref<T>, options: UseDebounceOptions = {}): Ref<T> => {
  const { delay = 300, immediate = false } = options;

  const debouncedValue = ref<any>(value.value);
  let timeoutId: number | null = null;

  const updateValue = () => {
    debouncedValue.value = value.value;
  };

  watch(
    value,
    (newValue) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (immediate && timeoutId === null) {
        updateValue();
      }

      timeoutId = window.setTimeout(() => {
        updateValue();
        timeoutId = null;
      }, delay);
    },
    { immediate: true },
  );

  onUnmounted(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  });

  return debouncedValue;
};
