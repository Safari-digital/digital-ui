import React from 'react';
import Logger, { type LogType } from './Logger';

export default function useLogger(type: LogType, ...message: any) {
    React.useEffect(() => Logger.log(type, ...message), [type, message]);
}
