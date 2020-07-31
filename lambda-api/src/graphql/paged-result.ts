import { Min } from 'class-validator';
import { ClassType, Field, Int, ObjectType } from 'type-graphql';

/**
 * Class representing a result that contains a page of data.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function PagedResult<TItem>(TItemClass: ClassType<TItem>) {
  @ObjectType('PagedResult', {
    isAbstract: true,
    description: 'Page of result data',
  })
  abstract class PagedResultClass {
    // here we use the runtime argument
    @Field((_type) => [TItemClass])
    values: TItem[];
    @Field({
      nullable: false,
      description: 'true if this is the last page of data, false otherwise',
    })
    isLastPage: boolean;
    @Field((_type) => Int, {
      description: 'Number of results found for the page request',
    })
    count: number;
    @Field((_type) => String, {
      nullable: true,
      description:
        'Cursor value to utilize while resuming fetch of paginated data.',
    })
    @Min(1)
    cursor?: string;
  }
  return PagedResultClass;
}
