import React from 'react';
import useImage from './useImage';

const Decorator = () => {
    const [src, setSrc] = React.useState<string | undefined>('https://avatars.githubusercontent.com/u/88612813?v=4');
    const { hasError, htmlImage } = useImage(src);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <img src={htmlImage?.src} alt="Image" />
            <input type="text" value={src} onChange={e => setSrc(e.target.value)} />
            <p>hasError: {hasError ? 'true' : 'false'}</p>
        </div>
    );
};

const meta = {
    title: 'ReactHooks/useImage',
    decorators: Decorator,
};
export default meta;
export const Primary = {};
