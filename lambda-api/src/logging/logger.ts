import {
  Logger,
  LoggerOptions,
  createLogger as CreateLogger,
  format,
  transports,
} from "winston";
import WinstonCloudWatch from "winston-cloudwatch";
import envConfig from "../envConfig";

/**
 * Create a {@link Logger} with configuration from config file.
 * @param options optional {@link LoggerOptions} for configuration.
 */
export const createLogger = (
  options: LoggerOptions = envConfig.loggerOptions
): Logger => {
  const logger = CreateLogger({
    transports: [
      new transports.Console({
        format: format.colorize(),
        level: envConfig.logLevel,
      }),
    ],
    defaultMeta: { function: envConfig.apiName },
    ...options,
  });

  // Set up cloud watch logging in prod
  if (process.env.NODE_ENV === "production") {
    logger.add(
      new WinstonCloudWatch({
        logGroupName: envConfig.apiName,
        logStreamName: "first",
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
export const createContextLogger = (
  additionalContext: unknown,
  options?: LoggerOptions
): Logger => createLogger(options).child(additionalContext);
