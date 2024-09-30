import type React from 'react';

export interface SafariNode {
    id?: string;
    className?: string;
}

export type SafariNodeWithChildren = React.PropsWithChildren & SafariNode;
