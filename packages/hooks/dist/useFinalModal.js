import { useInstance } from './useInstance';
export const useFinalModal = () => {
    const { proxy } = useInstance();
    const show = (component, props) => {
        proxy.$vfm.show({
            component,
            bind: {
                ...props,
            },
        });
    };
    return { $vfm: proxy.$vfm, show };
};
