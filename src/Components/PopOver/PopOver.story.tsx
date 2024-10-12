/* eslint react-hooks/rules-of-hooks: 0 */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PopOver, { type PopOverProps } from './PopOver';
import { Button } from '../Button';
import { Box } from '../Box';
import { Color } from '../../modules';

const meta: Meta<PopOverProps> = {
    title: 'Layout/PopOver',
    component: PopOver,
    decorators: () => {
        const [open, setOpen] = React.useState(false);
        const [direction, setDirection] = React.useState<'left' | 'right'>('left');
        const [includeButton, setIncludeButton] = React.useState(false);
        const [backgroundColor, setBackgroundColor] = React.useState(Color.getRandomColor());
        const ref = React.useRef(null);

        return (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '100vh',
                    width: '100vw',
                }}>
                <Box
                    fullWidth
                    fullHeight
                    align="center"
                    justify="center"
                    direction="row"
                    gap={3}
                    color={backgroundColor}>
                    <Box>
                        <Button ref={ref} onClick={() => setOpen(!open)}>
                            Toggle
                        </Button>
                    </Box>
                </Box>
                <PopOver
                    anchor={ref.current}
                    includeAnchor={includeButton}
                    open={open}
                    onOpen={() => setBackgroundColor(Color.getRandomColor())}
                    onClose={() => setOpen(!open)}
                    direction={direction}>
                    <Box gap={2}>
                        <Box gap={2}>
                            <Button onClick={() => setDirection(direction === 'left' ? 'right' : 'left')}>
                                Change direction
                            </Button>
                            <Button onClick={() => setIncludeButton(includeButton => !includeButton)}>
                                Include anchor
                            </Button>
                        </Box>
                        <Box>Some cool content</Box>
                    </Box>
                </PopOver>
            </div>
        );
    },
};

type Story = StoryObj<typeof meta>;
export default meta;

export const Primary: Story = {};
