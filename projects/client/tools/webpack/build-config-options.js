/**
 * These options are used to configure the compile time config for the client.
 * 
 * The webpack pipeline uses this to get the environment variable, which is then built into the bundle.
 */
const BACKEND_HOST_URI = process.env['BACKEND_HOST_URI'] || "localhost:4080";

module.exports = {
    BACKEND_HOST_URI: BACKEND_HOST_URI
};