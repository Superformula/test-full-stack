import { Max, Min } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';

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
  @Max(50)
  limit: number;
  @Field({
    nullable: true,
    description: 'Next token to use when paging result data.  This value should be empty for the first page request.',
  })
  nextToken?: string;
}
