/**
 * Declare variables that are populated at Build-time
 */
declare const __SYS_BACKEND_HOST_URI__: string;

/**
 * Define user friend variables for consumption
 */
const BACKEND_HOST_URI = __SYS_BACKEND_HOST_URI__;

export {
    BACKEND_HOST_URI
};