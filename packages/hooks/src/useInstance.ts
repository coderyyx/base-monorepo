import { getCurrentInstance } from 'vue';

export const useInstance = () => {
  const instance = getCurrentInstance();

  if (!instance) {
    throw new Error('useInstance 必须在 setup 中调用');
  }

  return {
    proxy: instance.proxy,
  };
};

export default useInstance;
