/**
 * 获取当前 Vue 实例
 * @returns 当前 Vue 实例的代理对象
 */
export declare const useInstance: () => {
    proxy: import("vue").default<Record<string, any>, Record<string, any>, never, never, (event: string, ...args: any[]) => import("vue").default>;
    instance: {
        proxy: import("vue").default;
    };
};
//# sourceMappingURL=use-instance.d.ts.map