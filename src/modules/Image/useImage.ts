import '@safari-digital/core';
import React from 'react';
import { Logger } from '../Logger';

export default function useImage(src: string | undefined) {
    const [hasError, setHasError] = React.useState(false);

    const htmlImage = React.useMemo(() => {
        if (!src) return;
        const img = new Image();
        img.src = src;
        return img;
    }, [src]);

    React.useEffect(() => {
        if (!htmlImage || src?.length === 0) return setHasError(true);

        htmlImage.addEventListener('error', () => {
            Logger.logError(`Image could not be loaded: ${src}`);
            setHasError(true);
        });

        htmlImage.addEventListener('load', () => setHasError(false));

        return () => {
            htmlImage.removeEventListener('error', () => setHasError(true));
            htmlImage.removeEventListener('load', () => setHasError(false));
        };
    }, [htmlImage, src]);

    return { htmlImage, hasError };
}
