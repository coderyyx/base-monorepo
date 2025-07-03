import { getCurrentInstance } from 'vue';

/**
 * 获取当前 Vue 实例
 * @returns {Object} 当前 Vue 实例
 */
export const useInstance = () => {
  const { proxy } = getCurrentInstance();
  return {
    proxy,
  };
};
