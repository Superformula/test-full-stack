/// <reference types="react-scripts" />

declare namespace NodeJS {
  export interface ProcessEnv {
    /**
     * Mapbox token
     */
    REACT_APP_MAP_TOKEN: string

    /**
     * Mapbox Map Style identification
     */
    REACT_APP_MAP_STYLE: string

    /**
     * AppSync Region
     */
    REACT_APP_GRAPHQL_REGION: string

    /**
     * AppSync URL
     */
    REACT_APP_GRAPHQL_URI: string

    /**
     * AppSync Api Key
     */
    REACT_APP_GRAPHQL_TOKEN: string
  }
}
