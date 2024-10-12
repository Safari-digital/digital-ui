import React from 'react';
import { useElementSize } from '../../modules';
import type { PopOverProps } from './PopOver';

export function useOnOpen(open: boolean, anchor: PopOverProps['anchor'], callback?: () => void) {
    const windowSize = useElementSize(window);
    const [hasOpened, setHasOpened] = React.useState(false);

    React.useEffect(() => {
        if (!hasOpened && open) {
            callback?.();
            setHasOpened(true);
        } else if (hasOpened && !open) {
            setHasOpened(false);
        }
    }, [hasOpened, callback, open]);

    React.useEffect(() => {
        if (!anchor) return;
        anchor.style.zIndex = open ? '1002' : 'unset';
    }, [anchor, open, windowSize]);
}
