import { format } from "logform";
import { LoggerOptions } from "winston";
import simple = format.simple;
import colorize = format.colorize;
import errors = format.errors;
import timestamp = format.timestamp;
import json = format.json;

const env = process.env;

export type EnvironmentType = "local" | "prod";

const environment =
  !env.NODE_ENV || env.NODE_ENV === "development" ? "local" : env.NODE_ENV;

const apiName = process.env.API_NAME;

export type EnvConfig = {
  loggerOptions: LoggerOptions;
  apiName: string;
};

const envConfigs: Record<EnvironmentType, Partial<EnvConfig>> = {
  local: {
    loggerOptions: {
      level: env.LOG_LEVEL ?? "debug",
      format: format.combine(
        timestamp(),
        simple(),
        colorize({ all: true }),
        errors({ stack: true })
      ),
    },
  },
  prod: {
    loggerOptions: {
      level: env.LOG_LEVEL ?? "info",
      format: format.combine(timestamp(), errors({ stack: true }), json()),
    },
  },
};

export default {
  ...envConfigs[environment],
  apiName,
};
