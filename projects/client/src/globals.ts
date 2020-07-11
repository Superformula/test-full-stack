/**
 * Declare variables that are populated at Build-time
 */
declare const __SYS_BACKEND_HOST_URI__: string;
declare const __SYS_GOOGLE_MAPS_API_KEY__: string;

/**
 * Define user friend variables for consumption
 */
const BACKEND_HOST_URI = __SYS_BACKEND_HOST_URI__;
const GOOGLE_MAPS_API_KEY = __SYS_GOOGLE_MAPS_API_KEY__;

export {
    BACKEND_HOST_URI,
    GOOGLE_MAPS_API_KEY
};