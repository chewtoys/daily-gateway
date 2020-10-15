import pino from 'pino';
import config from './config';

const loggerOptions = (() => {
  if (config.env === 'test') {
    return { level: 'error' };
  }
  return undefined;
})();

export default pino(loggerOptions);
