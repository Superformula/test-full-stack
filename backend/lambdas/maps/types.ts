export type AddressSuggestions = {
  placeId: string;
  description: string;
};

//Definitions from https://developers.google.com/places/web-service/autocomplete

type LengthOffset = {
  length: number;
  offset: number;
};

export type PlacePrediction = {
  /**
   * Contains the human-readable name for the returned result. For establishment results, this is usually the business name
   */
  description: string;

  /**
   * Contains an array with offset value and length. These describe the location of the entered term in the prediction
   * result text, so that the term can be highlighted if desired.
   */
  matched_substrings: LengthOffset[];

  /**
   * Textual identifier that uniquely identifies a place. To retrieve information about the place, pass this identifier
   * in the placeId field of a Places API request. For more information about place IDs, see the Place IDs overview.
   */
  place_id: string;
  reference: string;

  /**
   * distance_meters contains an integer indicating the straight-line distance between the predicted place, and the
   * specified origin point, in meters. This field is only returned when the origin point is specified in the request.
   * This field is not returned in predictions of type route.
   */
  distance_meters?: number;

  id?: string;

  /**
   * Provides pre-formatted text that can be shown in your autocomplete results, and contains the following subfields:
   */
  structured_formatting: {
    /**
     * Contains the main text of a prediction, usually the name of the place.
     */
    main_text: string;

    /**
     * Contains an array with offset value and length. These describe the location of the entered term in the prediction
     * result text, so that the term can be highlighted if desired.
     */
    main_text_matched_substrings: LengthOffset[];

    /**
     * Contains the secondary text of a prediction, usually the location of the place.
     */
    secondary_text: string;
  };

  /**
   * Contains an array of terms identifying each section of the returned description (a section of the description is
   * generally terminated with a comma). Each entry in the array has a value field, containing the text of the term, and
   * an offset field, defining the start position of this term in the description, measured in Unicode characters.
   */
  terms: {
    offset: number;
    value: string;
  }[];
};

export type PlacesApiResponse = {
  status: 'OK' | 'ZERO_RESULTS' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'INVALID_REQUEST' | 'UNKNOWN_ERROR';
  predictions: PlacePrediction[];
};
