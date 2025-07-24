import { getCurrentInstance } from 'vue';

/**
 * 获取当前 Vue 实例
 * @returns 当前 Vue 实例的代理对象
 */
export const useInstance = () => {
  const instance = getCurrentInstance();

  if (!instance) {
    throw new Error('useInstance must be called within setup()');
  }

  return {
    proxy: instance.proxy,
    instance: instance,
  };
};
