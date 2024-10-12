import React from 'react';
import type { HTMLDialogElement } from 'happy-dom';
import { type PopOverProps } from './PopOver';
import { useElementSize } from '../../modules';

export function useAnchor(
    anchor: PopOverProps['anchor'],
    placeHolder: HTMLDivElement | null,
    dialog: HTMLDialogElement | null,
    options?: {
        direction?: PopOverProps['direction'];
        includeAnchor?: PopOverProps['includeAnchor'];
    },
) {
    const windowSize = useElementSize(window);
    const [anchorRect, setAnchorRect] = React.useState(new DOMRect());
    const [placeHolderRect, setPlaceHolderRect] = React.useState(new DOMRect());
    const [dialogRect, setDialogRect] = React.useState(new DOMRect());

    React.useLayoutEffect(() => {
        if (windowSize?.width !== null) {
            setAnchorRect(anchor ? anchor.getBoundingClientRect() : new DOMRect());
            setPlaceHolderRect(placeHolder ? placeHolder.getBoundingClientRect() : new DOMRect());
            setDialogRect(dialog ? dialog.getBoundingClientRect() : new DOMRect());
        }
    }, [anchor, placeHolder, dialog, windowSize]);

    const padding = React.useMemo(() => {
        if (!dialog || !dialogRect || !placeHolderRect) return { x: 0, y: 0 };
        let y = dialogRect.height;

        for (const child of dialog.children) {
            const rect = child.getBoundingClientRect();
            y -= rect.height;
        }
        return { x: (dialogRect.width - placeHolderRect.width) / 2, y: y / 2 };
    }, [dialog, dialogRect, placeHolderRect]);

    React.useEffect(() => console.log('anchor', padding), [padding]);

    // Handles placeholder visibility and size
    React.useEffect(() => {
        if (placeHolder) {
            placeHolder.style.display = options?.includeAnchor ? 'block' : 'none';
        }
        if (!anchorRect || !placeHolder) return;
        placeHolder.style.minWidth = `${anchorRect?.width}px`;
        placeHolder.style.height = `${anchorRect.bottom - anchorRect.top}px`;
    }, [anchorRect, options, placeHolder, windowSize?.width]);

    // Dialog includes is placed below the anchor
    React.useEffect(() => {
        if (!dialog || !anchorRect || options?.includeAnchor) return;
        dialog.style.top = `${anchorRect.bottom}px`;
        dialog.style.left =
            !options?.direction || options?.direction === 'left'
                ? `${anchorRect.left}px`
                : `${anchorRect.right - dialog.offsetWidth}px`;
    }, [anchorRect, dialog, options, windowSize?.width]);

    // Dialog is placed on top of the anchor and renders it
    React.useLayoutEffect(() => {
        if (!dialog || !anchorRect || !options?.includeAnchor) return;
        dialog.style.top = `${anchorRect.top - padding.y}px`;
        dialog.style.left =
            !options?.direction || options?.direction === 'left'
                ? `${anchorRect.left - padding.x}px`
                : `${anchorRect.left - dialog.offsetWidth + (anchorRect.width + padding.x)}px`;
    }, [anchorRect, dialog, options, padding, windowSize]);
}
