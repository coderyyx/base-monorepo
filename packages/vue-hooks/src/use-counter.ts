import { ref, Ref } from 'vue';

export interface UseCounterOptions {
  min?: number;
  max?: number;
  initialValue?: number;
}

export interface UseCounterReturn {
  count: Ref<number>;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setValue: (value: number) => void;
}

/**
 * 计数器 Hook
 * @param options 配置选项
 * @returns 计数器相关的响应式数据和方法
 */
export const useCounter = (options: UseCounterOptions = {}): UseCounterReturn => {
  const { min = -Infinity, max = Infinity, initialValue = 0 } = options;

  const count = ref(initialValue);

  const increment = () => {
    if (count.value < max) {
      count.value++;
    }
  };

  const decrement = () => {
    if (count.value > min) {
      count.value--;
    }
  };

  const reset = () => {
    count.value = initialValue;
  };

  const setValue = (value: number) => {
    if (value >= min && value <= max) {
      count.value = value;
    }
  };

  return {
    count,
    increment,
    decrement,
    reset,
    setValue,
  };
};
