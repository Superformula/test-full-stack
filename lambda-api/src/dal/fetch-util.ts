import { User, UserCursor } from "../graphql/user";
import { createContextLogger } from "../logging/logger";

const log = createContextLogger({ appModule: "fetch-util" });

export const decodeCursor = (encodedCursor: string): unknown => {
  if (encodedCursor) {
    try {
      const strVal = Buffer.from(encodedCursor, "base64").toString("ascii");
      return JSON.parse(strVal);
    } catch (e) {
      log.error(`Error decoding cursor value from ${encodedCursor}`, e);
      throw e;
    }
  }
  return undefined;
};

export const encodeCursor = (cursor: unknown): string | undefined => {
  if (cursor) {
    const jsonStr = JSON.stringify(cursor);
    try {
      return Buffer.from(jsonStr).toString("base64");
    } catch (e) {
      log.error(`Error encoding cursor value for ${jsonStr}`, e);
      throw e;
    }
  }
  return undefined;
};

export const toCursor = (user: User): UserCursor => {
  return {
    name: user.name,
    createdAt: user.createdAt,
    id: user.id,
  };
};
