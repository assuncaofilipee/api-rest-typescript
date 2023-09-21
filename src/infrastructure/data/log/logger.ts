import pino from "pino";

const Logger = pino({
  level: 'debug', 
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  },
});

export default Logger;