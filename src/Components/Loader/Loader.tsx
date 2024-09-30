import React from 'react';
import { useClassName } from '../../modules';
import './Loader.styles.css';

export interface LoaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    color?: 'primary' | 'text' | 'disabled';
    size?: 'small' | 'medium' | 'large';
}

export default function Loader({ color = 'text', size = 'medium', ...props }: LoaderProps) {
    const className = useClassName({ ...props, color, size }, 'Loader');
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
