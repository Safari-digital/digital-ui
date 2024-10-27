import React from 'react';
import { useClassName } from '../../modules';
import type { SafariNodeWithChildren } from '../types';
import './Loader.styles.css';

type BaseLoaderProps = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & SafariNodeWithChildren;

export interface LoaderProps extends BaseLoaderProps {
    color?: 'primary' | 'text' | 'disabled';
    size?: 'small' | 'medium' | 'large';
}

export default function Loader({ color = 'text', size = 'medium', ...props }: LoaderProps) {
    const className = useClassName({ ...props, color, size }, 'SafariUi-Loader');
    return (
        <div className={className}>
            {Array(4)
                .fill(null)
                .map((_, i) => (
                    <div key={i} />
                ))}
        </div>
    );
}
