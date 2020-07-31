import { Max, Min } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

export const MAX_USER_PAGE_SIZE = 100;

/**
 * Class representing a page request.
 */
@InputType('PageRequest', {
  description: 'Object that represents a page request',
})
export class PageRequest {
  @Field((_type) => Int, {
    description: 'Maximum number of results requested in a page',
  })
  @Min(1)
  @Max(MAX_USER_PAGE_SIZE)
  limit: number;
  @Field((_type) => String, {
    nullable: true,
    description:
      'Cursor value to utilize while resuming fetch of paginated data.',
  })
  cursor?: string;
}
