'use strict';

var vue = require('vue');

/**
 * 获取当前 Vue 实例
 * @returns 当前 Vue 实例的代理对象
 */
var useInstance = function useInstance() {
  var instance = vue.getCurrentInstance();
  if (!instance) {
    throw new Error('useInstance must be called within setup()');
  }
  return {
    proxy: instance.proxy,
    instance: instance,
  };
};
exports.useInstance = useInstance;
