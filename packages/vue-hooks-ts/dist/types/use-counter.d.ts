import { Ref } from 'vue';
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
export declare const useCounter: (options?: UseCounterOptions) => UseCounterReturn;
//# sourceMappingURL=use-counter.d.ts.map