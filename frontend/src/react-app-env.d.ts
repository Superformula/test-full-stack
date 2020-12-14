/// <reference types="react-scripts" />
declare namespace NodeJS {
  export interface ProcessEnv {
    /**
     * Region running the App Sync instance
     */
    REACT_APP_APPSYNC_REGION: string;

    /**
     * URL of the App Sync instance
     */
    REACT_APP_APPSYNC_URL: string;

    /**
     * API token that will be used by the application to access the appsync instance
     */
    REACT_APP_APPSYNC_API_KEY: string;

    /**
     * Map Box token
     */
    REACT_APP_MAPBOX_TOKEN: string;

    REACT_APP_MAPBOX_STYLE: string;
  }
}
