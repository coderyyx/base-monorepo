import type { Simplify } from 'type-fest';
export type ComponentProps<T> = T extends new (...args: any[]) => infer V ? V extends {
    $props: infer P;
} ? Simplify<P> : Record<string, any> : Record<string, any>;
export declare const useFinalModal: () => {
    $vfm: {
        show: (options: {
            component: any;
            bind?: any;
        }) => void;
    };
    show: <T>(component: T, props: ComponentProps<T> & Record<string, any>) => void;
};
