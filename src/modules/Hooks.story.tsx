/* eslint react-hooks/rules-of-hooks: 0 */
import React from 'react';
import { useElement, useElementSize } from './Element';
import { useImage } from './Image';
import { Box } from '../components';
import type { StoryObj } from '@storybook/react';

export default { title: 'Utilities/ReactHooks' };

export const UseElement: StoryObj = {
    decorators: () => {
        const ref = React.useRef<HTMLDivElement>(null);
        const boxRef = React.useRef<HTMLDivElement>(null);
        const windowElement = useElementSize(window);
        const refElement = useElement(ref);
        const idElement = useElement<HTMLDivElement>('ref2');
        const { size } = useElement(boxRef);

        return (
            <React.Fragment>
                <style>
                    {`
                        #resizable { background-color: lightblue; }
                        #ref1 { background-color: red; }
                        #ref2 { background-color: pink; }
                        #ref3 { background-color: lightgreen; }
                    `}
                </style>
                <Box>
                    <Box id="ref3" p={2} fullWidth>
                        <Box>Element ID: Window</Box>
                        <Box>width: {windowElement?.width}px</Box>
                        <Box>height: {windowElement?.height}px</Box>
                    </Box>
                    <Box ref={ref} id="ref1" p={2} fullWidth>
                        Element ID: {JSON.stringify(refElement?.id)}
                    </Box>
                    <Box id="ref2" p={2} fullWidth>
                        Element ID: {JSON.stringify(idElement?.id)}
                    </Box>
                </Box>
                <Box ref={boxRef} id="resizable" resizable p={2}>
                    <div>Referenced Box</div>
                    <div>width: {size?.width}px</div>
                    <div>height: {size?.height}px</div>
                </Box>
            </React.Fragment>
        );
    },
};

export const UseImage: StoryObj = {
    decorators: () => {
        const [src, setSrc] = React.useState<string | undefined>(
            'https://avatars.githubusercontent.com/u/88612813?v=4',
        );
        const { hasError, htmlImage } = useImage(src);
        return (
            <Box>
                <img src={htmlImage?.src} alt="Image" />
                <input type="text" value={src} onChange={e => setSrc(e.target.value)} />
                <p>hasError: {hasError ? 'true' : 'false'}</p>
            </Box>
        );
    },
};
