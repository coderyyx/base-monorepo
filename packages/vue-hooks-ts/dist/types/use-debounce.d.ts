import { Ref } from 'vue';
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
export declare const useDebounce: <T>(value: Ref<T>, options?: UseDebounceOptions) => Ref<T>;
//# sourceMappingURL=use-debounce.d.ts.map