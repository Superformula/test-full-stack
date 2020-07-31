import { Max, Min } from "class-validator";
import { Field, InputType, Int } from "type-graphql";

export const MAX_USER_PAGE_SIZE = 100;

/**
 * Class representing a page request.
 */
@InputType("PageRequest", {
  description: "Object that represents a page request",
})
export class PageRequest {
  @Field((_type) => Int, {
    description: "Maximum number of results requested in a page",
  })
  @Min(1)
  @Max(MAX_USER_PAGE_SIZE)
  limit: number;
  // @Field((_type) => Int, {
  //   nullable: false,
  //   description:
  //     "Page number to retrieve.  This is a '1' based value so to request the first page, this value should be '1'",
  // })
  // @Min(1)
  // pageNumber?: number;
  @Field((_type) => String, {
    nullable: true,
    description:
      "Cursor value to utilize while resuming fetch of paginated data.",
  })
  cursor?: string;
}
