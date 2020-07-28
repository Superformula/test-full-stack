import { Logger, LoggerOptions, createLogger as wCreateLogger, format, transports } from 'winston';
import * as WinstonCloudWatch from 'winston-cloudwatch';

const apiName = 'user-profile-api';

/**
 * Create a {@link Logger} with configuration from config file.
 * @param options optional {@link LoggerOptions} for configuration.
 */
export const createLogger = (options?: LoggerOptions): Logger => {
  const logger = wCreateLogger({
    format: format.combine(format.errors({ stack: true }), format.json(), format.timestamp()),
    transports: [
      new transports.Console({
        format: format.colorize(),
      }),
    ],
    defaultMeta: { function: apiName },
  });

  if (options) {
    logger.configure(options);
  }

  // Set up cloud watch logging in prod
  if (process.env.NODE_ENV === 'production') {
    logger.add(
      new WinstonCloudWatch({
        logGroupName: 'user-profile-api',
        logStreamName: 'first',
      })
    );
  }

  return logger;
};

/**
 * Create a {@link Logger} with a child context.
 * @param additionalContext The child context
 * @param options optional {@link LoggerOptions} for configuration.
 */
export const createContextLogger = (additionalContext: any, options?: LoggerOptions): Logger => createLogger(options).child(additionalContext);
