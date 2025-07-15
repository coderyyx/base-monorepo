// 支持传统的模块解析
declare module 'vue/types/vue' {
  interface Vue {
    $vfm: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      show: (options: { component: any; bind?: any }) => void;
    };
    $bbsApp: {
      getStatusBarHeight: () => Promise<{ data: { statusBarHeight: number } }>;
    };
  }
}

export {};
