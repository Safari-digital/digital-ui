const LIBPREFIX = 'SAFARI-UI';

export type LogType = 'info' | 'error';

const log = (type: LogType, ...message: any[]) => {
    console[type](`${LIBPREFIX} - ${type}:`, ...message);
};

const logError = (...message: string[]) => log('error', ...message);

const logInfo = (...message: string[]) => log('info', ...message);

export default { log, logError, logInfo };
