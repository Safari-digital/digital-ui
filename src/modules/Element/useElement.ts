import React from 'react';
import useElementSize from './useElementSize';

export default function useElement<T extends HTMLElement>(ref: React.RefObject<T> | string) {
    const [element, setElement] = React.useState<T | null>(null);

    React.useLayoutEffect(() => {
        if (!ref) {
            return;
        } else if (typeof ref === 'string') {
            return setElement(document.getElementById(ref) as T);
        } else {
            setElement(ref.current);
        }
    }, [ref]);

    const size = useElementSize(element);

    return {
        element,
        id: element?.id,
        className: element?.className,
        size,
    };
}
