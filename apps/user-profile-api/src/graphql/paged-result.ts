import { ClassType, Field, ObjectType } from 'type-graphql';

/**
 * Class representing a result that contains a page of data.
 */
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
    @Field({
      nullable: true,
      description: 'Next token to use when paging result data.  This value can be empty if isLastPage == true.',
    })
    nextToken: string;
  }
  return PagedResultClass;
}
