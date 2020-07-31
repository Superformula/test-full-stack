import { format } from "logform";
import { LoggerOptions } from "winston";
import * as dotenv from "dotenv";
import simple = format.simple;
import colorize = format.colorize;
import errors = format.errors;
import timestamp = format.timestamp;
import json = format.json;

// Extract environment from '.env' if present
dotenv.config();

const env = process.env;

export type EnvironmentType = "local" | "prod";

const environment =
  !env.NODE_ENV || env.NODE_ENV === "development" ? "local" : env.NODE_ENV;

const apiName = process.env.API_NAME;
const mapboxApiToken: string = process.env.MAPBOX_API_TOKEN;
const mapboxRequestRetries: number =
  Number(process.env.MAPBOX_REQUEST_RETRIES) ?? 3;

export type EnvConfig = {
  loggerOptions: LoggerOptions;
  apiName: string;
  mapboxApiToken: string;
  mapboxApiRequestRetries: number;
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
  mapboxApiToken,
  mapboxRequestRetries,
};
