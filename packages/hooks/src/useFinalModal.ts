/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Simplify } from 'type-fest';

import { useInstance } from './useInstance';

// Vue 2.7 组件 Props 类型提取
export type ComponentProps<T> = T extends new (...args: any[]) => infer V
  ? V extends { $props: infer P }
    ? Simplify<P>
    : Record<string, any>
  : Record<string, any>;

export const useFinalModal = () => {
  const { proxy } = useInstance();

  const show = <T>(component: T, props: ComponentProps<T> & Record<string, any>) => {
    (proxy.$vfm.show as any)({
      component,
      bind: {
        ...props,
      },
    });
  };

  return { $vfm: proxy.$vfm, show };
};
