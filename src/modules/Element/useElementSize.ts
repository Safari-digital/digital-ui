import React from 'react';

export default function useElementSize<T extends HTMLElement | Window>(element?: T | null) {
    const [size, setSize] = React.useState<{ width: number; height: number } | null>(null);

    React.useLayoutEffect(() => {
        if (!element) return;

        if (element instanceof Window) {
            const handleResize = () => setSize({ width: element.innerWidth, height: element.innerHeight });
            element.addEventListener('resize', handleResize);
            handleResize();
            return () => element.removeEventListener('resize', handleResize);
        }

        const resizeObserver = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect;
            setSize({ width, height });
        });
        resizeObserver.observe(element);
        return () => resizeObserver.disconnect();
    }, [element]);

    return size;
}
